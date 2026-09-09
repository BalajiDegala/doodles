$ErrorActionPreference = 'Continue'
$labRoot = 'F:/ops2book/kubernetes-learning-lab'
$resultPath = 'F:/ops2book/.tmp-source-review/new40-live-results.json'
$results = [System.Collections.Generic.List[object]]::new()
$createdNamespaces = [System.Collections.Generic.List[string]]::new()
$runMarker = 'questions-41-80-validation'
function K([string[]]$KubeArgs) {
    $output = & kubectl --context rancher-desktop @KubeArgs 2>&1
    $code = $LASTEXITCODE
    $message = ($output | ForEach-Object { $_.ToString() }) -join "`n"
    if ($code -ne 0) { throw $message }
    return $message
}
function Check([string]$Name, [scriptblock]$Body) {
    try { $evidence = & $Body; $results.Add([pscustomobject]@{name=$Name;status='passed';evidence=($evidence -join "`n")}); Write-Output "PASS $Name" }
    catch { $results.Add([pscustomobject]@{name=$Name;status='failed';evidence=$_.Exception.Message}); Write-Output "FAIL $Name $($_.Exception.Message)" }
    $results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $resultPath -Encoding UTF8
}
function Need([bool]$Condition,[string]$Message) { if (-not $Condition) { throw $Message } }
function New-LabNamespace([string]$Name,[string]$File) {
    $existing = K @('get','namespace',$Name,'--ignore-not-found','-o','name')
    Need ([string]::IsNullOrWhiteSpace($existing)) "Refusing to use existing namespace $Name"
    K @('create','-f',$File) | Out-Null
    $createdNamespaces.Add($Name)
    K @('label','namespace',$Name,"learning.ops2book/validation=$runMarker") | Out-Null
}
function Negative([string]$File,[string]$Pattern) {
    $output = & kubectl --context rancher-desktop apply --dry-run=server -f $File 2>&1
    $code = $LASTEXITCODE
    $message = ($output | ForEach-Object { $_.ToString() }) -join "`n"
    Need ($code -ne 0 -and $message -match $Pattern) "Expected rejection matching $Pattern; got $message"
    return $message
}
$p = "$labRoot/05-bookshop-platform"
$r = "$labRoot/06-bookshop-reliability"
try {
    foreach ($entry in @(@('k8s-learning-platform',$p),@('k8s-learning-reliability',$r))) {
        New-LabNamespace $entry[0] "$($entry[1])/manifests/00-namespace.yaml"
        K @('apply','--dry-run=server','-f',"$($entry[1])/manifests/") | Out-Null
        K @('apply','-f',"$($entry[1])/manifests/") | Out-Null
    }
    Check 'Both base Deployments and HTTP pages' {
        K @('-n','k8s-learning-platform','rollout','status','deployment/platform-catalog','--timeout=120s')
        K @('-n','k8s-learning-reliability','rollout','status','deployment/reliable-catalog','--timeout=120s')
        $page=K @('-n','k8s-learning-platform','exec','deployment/platform-catalog','--','wget','-T','3','-qO-','http://platform-catalog')
        Need ($page -match 'platform desk') 'Platform page missing'; $page
        $page=K @('-n','k8s-learning-reliability','exec','deployment/reliable-catalog','--','wget','-T','3','-qO-','http://reliable-catalog')
        Need ($page -match 'reliability desk') 'Reliability page missing'; $page
    }
    Check '41 metrics endpoint' {
        $out=K @('-n','k8s-learning-platform','exec','deployment/platform-catalog','--','wget','-T','3','-qO-','http://platform-catalog/metrics')
        Need ($out -match 'bookshop_catalog_titles 60') 'Gauge missing'; $out
    }
    Check '42 structured log Job' {
        K @('apply','-f',"$p/topics/42-centralized-logging/manifests/")
        K @('-n','k8s-learning-platform','wait','--for=condition=Complete','job/catalog-log-demo','--timeout=120s')
        $out=K @('-n','k8s-learning-platform','logs','job/catalog-log-demo')
        Need ($out -match 'catalog_started' -and $out -match 'supplier_delayed' -and $out -match 'catalog_complete') 'Expected events missing'; $out
    }
    Check '44 LimitRange defaults and quota rejections' {
        New-LabNamespace 'k8s-learning-budgets' "$p/topics/44-quotas-and-limitranges/manifests/00-namespace.yaml"
        K @('apply','-f',"$p/topics/44-quotas-and-limitranges/manifests/")
        K @('apply','-f',"$p/topics/44-quotas-and-limitranges/workloads/budget-one.yaml")
        $pod=K @('-n','k8s-learning-budgets','get','pod','budget-one','-o','json') | ConvertFrom-Json
        Need ($pod.spec.containers[0].resources.requests.cpu -eq '25m') 'Missing CPU default'
        Negative "$p/topics/44-quotas-and-limitranges/negative/too-large.yaml" 'maximum cpu'
        K @('apply','-f',"$p/topics/44-quotas-and-limitranges/workloads/budget-two.yaml")
        Negative "$p/topics/44-quotas-and-limitranges/negative/budget-extra.yaml" 'exceeded quota'
    }
    Check '46 headless DNS and Pod listener' {
        K @('apply','-f',"$p/topics/46-headless-services/manifests/")
        $svc=K @('-n','k8s-learning-platform','get','svc','catalog-peers','-o','json') | ConvertFrom-Json
        Need ($svc.spec.clusterIP -eq 'None') 'Headless Service assigned a VIP'
        K @('-n','k8s-learning-platform','exec','deployment/platform-catalog','--','nslookup','catalog-peers')
        $out=K @('-n','k8s-learning-platform','exec','deployment/platform-catalog','--','wget','-T','3','-qO-','http://catalog-peers:8080')
        Need ($out -match 'platform desk') 'Headless request failed'; $out
    }
    Check '47 restricted ephemeral inspection' {
        K @('apply','-f',"$p/topics/47-ephemeral-debugging/manifests/")
        K @('-n','k8s-learning-platform','wait','--for=condition=Ready','pod/debug-counter','--timeout=120s')
        K @('-n','k8s-learning-platform','debug','pod/debug-counter','--container=inspector','--image=busybox:1.36','--target=counter','--profile=restricted','--attach=false','--','sh','-c','ps; cat /etc/resolv.conf')
        $limit=(Get-Date).AddSeconds(60)
        do { $inspection=K @('-n','k8s-learning-platform','get','pod','debug-counter','-o','json') | ConvertFrom-Json; if ($inspection.status.ephemeralContainerStatuses[0].state.terminated) {break}; Start-Sleep -Milliseconds 500 } while ((Get-Date) -lt $limit)
        $out=K @('-n','k8s-learning-platform','logs','debug-counter','-c','inspector')
        Need ($out -match 'nameserver') 'Inspector resolver output missing'; $out
    }
    Check '48 preferred topology spreading' {
        K @('apply','-f',"$p/topics/48-topology-spread/manifests/")
        K @('-n','k8s-learning-platform','rollout','status','deployment/topology-counters','--timeout=120s')
        K @('-n','k8s-learning-platform','get','pods','-l','app=topology-counters','-o','wide')
        K @('delete','-f',"$p/topics/48-topology-spread/manifests/",'--wait=true')
    }
    Check '50 optional cert-manager issuance' {
        K @('apply','--dry-run=server','-f',"$p/topics/50-certificates-and-tls/optional/")
        K @('apply','-f',"$p/topics/50-certificates-and-tls/optional/")
        K @('-n','k8s-learning-platform','wait','--for=condition=Ready','certificate/catalog-lab','--timeout=120s')
        $secret=K @('-n','k8s-learning-platform','get','secret','catalog-lab-tls','-o','json') | ConvertFrom-Json
        Need ($secret.type -eq 'kubernetes.io/tls') 'Wrong certificate Secret type'
        'Certificate ready; TLS Secret exists; private material not logged.'
    }
    Check '53 image pull policies' {
        K @('apply','-f',"$p/topics/53-image-pulls/manifests/")
        K @('-n','k8s-learning-platform','wait','--for=condition=Ready','pod/pull-cached','pod/pull-resolve','--timeout=120s')
        K @('-n','k8s-learning-platform','get','pod','pull-cached','pull-resolve','-o','custom-columns=NAME:.metadata.name,IMAGEID:.status.containerStatuses[*].imageID')
    }
    Check '55 ready EndpointSlice backends' {
        $slices=K @('-n','k8s-learning-platform','get','endpointslices','-l','kubernetes.io/service-name=platform-catalog','-o','json') | ConvertFrom-Json
        $ready=@($slices.items.endpoints | Where-Object {$_.conditions.ready})
        Need ($ready.Count -eq 2) 'Expected two ready catalog endpoints'
        'Two ready endpoints matched the base replica count.'
    }
    Check '57 dry-run does not create a Pod' {
        K @('apply','--dry-run=server','-f',"$p/topics/57-api-admission/manifests/")
        $found=K @('-n','k8s-learning-platform','get','pod','admission-preview','--ignore-not-found','-o','name')
        Need ([string]::IsNullOrWhiteSpace($found)) 'Dry-run Pod unexpectedly exists'
    }
    Check '59 absent custom scheduler leaves Pod unassigned' {
        K @('apply','-f',"$p/topics/59-scheduler-internals/manifests/")
        $pod=K @('-n','k8s-learning-platform','get','pod','scheduler-waiting','-o','json') | ConvertFrom-Json
        Need (-not $pod.spec.nodeName -and $pod.spec.schedulerName -eq 'bookshop-uninstalled-scheduler') 'Unexpected scheduling result'
        K @('delete','-f',"$p/topics/59-scheduler-internals/manifests/",'--wait=true')
    }
    Check '65 authored configuration recovery in separate namespace' {
        New-LabNamespace 'k8s-learning-recovery' "$r/topics/65-disaster-recovery/restore/practice/namespace.yaml"
        K @('apply','-k',"$r/topics/65-disaster-recovery/restore/practice")
        K @('-n','k8s-learning-recovery','rollout','status','deployment/reliable-catalog','--timeout=120s')
        $out=K @('-n','k8s-learning-recovery','exec','deployment/reliable-catalog','--','wget','-T','3','-qO-','http://reliable-catalog')
        Need ($out -match 'reliability desk') 'Recovered catalog page missing'; $out
    }
    Check '67 HTTPRoute server schema dry-run only' { K @('apply','--dry-run=server','-f',"$r/topics/67-gateway-api/optional/") }
    Check '73 native sidecar permits Job completion' {
        K @('apply','-f',"$r/topics/73-native-sidecars/manifests/")
        K @('-n','k8s-learning-reliability','wait','--for=condition=Complete','job/native-report','--timeout=120s')
        $out=K @('-n','k8s-learning-reliability','logs','job/native-report','-c','report')
        Need ($out -match 'Bookshop report finished') 'Report marker missing'; $out
        K @('-n','k8s-learning-reliability','logs','job/native-report','-c','helper')
    }
    Check '75 selected ingress allow deny and restoration' {
        K @('apply','-f',"$r/topics/75-zero-trust/manifests/")
        K @('-n','k8s-learning-reliability','wait','--for=condition=Ready','pod/trusted-visitor','pod/unknown-visitor','--timeout=120s')
        foreach($visitor in @('trusted-visitor','unknown-visitor')) { K @('-n','k8s-learning-reliability','exec',$visitor,'--','wget','-T','3','-qO-','http://reliable-catalog') | Out-Null }
        K @('apply','-f',"$r/topics/75-zero-trust/policy/")
        try {
            $deadline=(Get-Date).AddSeconds(20); $blocked=$false
            do { $out=& kubectl --context rancher-desktop -n k8s-learning-reliability exec unknown-visitor -- wget -T 3 -qO- http://reliable-catalog 2>&1; $blocked=$LASTEXITCODE -ne 0; if(-not $blocked){Start-Sleep -Milliseconds 500} } while(-not $blocked -and (Get-Date) -lt $deadline)
            Need $blocked 'Unapproved visitor was not blocked'
            K @('-n','k8s-learning-reliability','exec','trusted-visitor','--','wget','-T','3','-qO-','http://reliable-catalog')
            'Unapproved visitor failed after policy; approved visitor fetched page.'
        } finally { K @('delete','-f',"$r/topics/75-zero-trust/policy/",'--ignore-not-found') | Out-Null }
        $deadline=(Get-Date).AddSeconds(20); $restored=$false
        do { $out=& kubectl --context rancher-desktop -n k8s-learning-reliability exec unknown-visitor -- wget -T 3 -qO- http://reliable-catalog 2>&1; $restored=$LASTEXITCODE -eq 0; if(-not $restored){Start-Sleep -Milliseconds 500} } while(-not $restored -and (Get-Date) -lt $deadline)
        Need $restored 'Visitor connectivity was not restored'; 'Restoration succeeded.'
    }
    Check '77 dummy Secret round trip' {
        K @('apply','-f',"$r/topics/77-secret-encryption/manifests/")
        $secret=K @('-n','k8s-learning-reliability','get','secret','encryption-practice','-o','json') | ConvertFrom-Json
        Need ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($secret.data.note)) -eq 'public-training-value') 'Dummy content mismatch'
        'Public dummy value matched; encryption at rest not inferred.'
    }
    Check '80 orphan and foreground garbage collection' {
        K @('apply','-f',"$r/topics/80-garbage-collection/manifests/")
        K @('-n','k8s-learning-reliability','rollout','status','deployment/disposable-counter','--timeout=120s')
        K @('-n','k8s-learning-reliability','delete','deployment','disposable-counter','--cascade=orphan','--wait=true')
        $rs=K @('-n','k8s-learning-reliability','get','rs','-l','app=disposable-counter','-o','json') | ConvertFrom-Json
        Need ($rs.items.Count -eq 1) 'Orphan ReplicaSet missing'
        K @('-n','k8s-learning-reliability','delete','rs','-l','app=disposable-counter','--cascade=foreground','--wait=true','--timeout=60s')
        $pods=K @('-n','k8s-learning-reliability','get','pods','-l','app=disposable-counter','-o','json') | ConvertFrom-Json
        Need ($pods.items.Count -eq 0) 'Owned Pods remained after foreground deletion'
        'ReplicaSet survived owner orphaning; foreground removal cleaned its Pods.'
    }
} catch { $results.Add([pscustomobject]@{name='Setup';status='failed';evidence=$_.Exception.Message}); Write-Output $_.Exception.Message }
finally {
    foreach ($owned in $createdNamespaces) {
        Check "Cleanup $owned" {
            Need ($owned -in @('k8s-learning-platform','k8s-learning-reliability','k8s-learning-budgets','k8s-learning-recovery')) 'Namespace outside allowlist'
            $actual=K @('get','namespace',$owned,'-o','json') | ConvertFrom-Json
            Need ($actual.metadata.labels.'learning.ops2book/validation' -eq $runMarker) 'Namespace ownership marker changed'
            K @('delete','namespace',$owned,'--wait=true','--timeout=120s')
        }
    }
    $results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $resultPath -Encoding UTF8
}
if (@($results | Where-Object status -eq 'failed').Count) { exit 1 }
