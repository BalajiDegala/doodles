$ErrorActionPreference='Continue'
$namespace='k8s-learning-platform'
$chapter='F:/ops2book/kubernetes-learning-lab/05-bookshop-platform'
$results=[System.Collections.Generic.List[object]]::new()
$created=$false
function K([string[]]$a){$o=& kubectl --context rancher-desktop @a 2>&1;$c=$LASTEXITCODE;$m=($o|ForEach-Object{$_.ToString()}) -join "`n";if($c -ne 0){throw $m};return $m}
function Need([bool]$c,[string]$m){if(-not $c){throw $m}}
function Check([string]$name,[scriptblock]$body){try{$e=& $body;$results.Add([pscustomobject]@{name=$name;status='passed';evidence=($e -join "`n")});Write-Output "PASS $name"}catch{$results.Add([pscustomobject]@{name=$name;status='failed';evidence=$_.Exception.Message});Write-Output "FAIL $name $($_.Exception.Message)"}}
try{
 $old=K @('get','namespace',$namespace,'--ignore-not-found','-o','name');Need ([string]::IsNullOrWhiteSpace($old)) 'Namespace already exists'
 K @('create','-f',"$chapter/manifests/00-namespace.yaml")|Out-Null;$created=$true
 K @('label','namespace',$namespace,'learning.ops2book/validation=questions-41-80-retry')|Out-Null
 K @('apply','-f',"$chapter/manifests/")|Out-Null
 K @('-n',$namespace,'rollout','status','deployment/platform-catalog','--timeout=120s')|Out-Null
 Check '46 absolute headless DNS and HTTP' {
  K @('apply','-f',"$chapter/topics/46-headless-services/manifests/")
  $resolver=K @('-n',$namespace,'exec','deployment/platform-catalog','--','cat','/etc/resolv.conf')
  $search=($resolver -split "`n" | Where-Object {$_ -match '^search '}) -split '\s+'
  $domain=$search[1]
  Need ($domain -like 'k8s-learning-platform.svc.*') 'Unexpected resolver search configuration'
  $answers=K @('-n',$namespace,'exec','deployment/platform-catalog','--','nslookup',"catalog-peers.$domain.")
  $pods=K @('-n',$namespace,'get','pods','-l','app=platform-catalog','-o','json')|ConvertFrom-Json
  foreach($pod in $pods.items){Need ($answers.Contains($pod.status.podIP)) 'Pod IP missing from DNS answer'}
  $answers
  $page=K @('-n',$namespace,'exec','deployment/platform-catalog','--','wget','-T','3','-qO-','http://catalog-peers:8080')
  Need ($page -match 'platform desk') 'Headless HTTP did not return catalog';$page
 }
 Check '47 ephemeral inspector process and resolver output' {
  K @('apply','-f',"$chapter/topics/47-ephemeral-debugging/manifests/")
  K @('-n',$namespace,'wait','--for=condition=Ready','pod/debug-counter','--timeout=120s')
  K @('-n',$namespace,'debug','pod/debug-counter','--container=inspector','--image=busybox:1.36','--target=counter','--profile=restricted','--attach=false','--','sh','-c','ps; cat /etc/resolv.conf')
  $deadline=(Get-Date).AddSeconds(60);$finished=$false
  do{$pod=K @('-n',$namespace,'get','pod','debug-counter','-o','json')|ConvertFrom-Json;$states=@($pod.status.ephemeralContainerStatuses|Where-Object{$null -ne $_});if($states.Count -gt 0 -and $states[0].state.terminated){$finished=$true;break};Start-Sleep -Milliseconds 500}while((Get-Date) -lt $deadline)
  Need $finished 'Inspector did not terminate within 60 seconds'
  Need ($states[0].state.terminated.exitCode -eq 0) 'Inspector failed'
  $logs=K @('-n',$namespace,'logs','debug-counter','-c','inspector');Need ($logs -match 'nameserver') 'Resolver evidence missing';$logs
 }
}catch{Check 'Retry setup' {throw $_.Exception.Message}}
finally{
 if($created){Check 'Cleanup retry namespace' {$n=K @('get','namespace',$namespace,'-o','json')|ConvertFrom-Json;Need ($n.metadata.labels.'learning.ops2book/validation' -eq 'questions-41-80-retry') 'Ownership changed';K @('delete','namespace',$namespace,'--wait=true','--timeout=120s')}}
 $results|ConvertTo-Json -Depth 6|Set-Content -LiteralPath 'F:/ops2book/.tmp-source-review/new40-live-retry-results.json' -Encoding UTF8
}
if(@($results|Where-Object status -eq 'failed').Count){exit 1}
