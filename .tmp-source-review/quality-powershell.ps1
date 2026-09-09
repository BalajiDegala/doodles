$reviewRoot = Join-Path $PSScriptRoot '..\kubernetes-learning-lab'
$results = @()
$count = 0
$files = Get-ChildItem -LiteralPath $reviewRoot -Recurse -Filter '*.md'
foreach ($file in $files) {
 $text = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
 $blocks = [regex]::Matches($text, '(?ms)^(~~~|```)powershell[ \t]*\r?\n(.*?)^\1[ \t]*\r?$')
 foreach ($block in $blocks) {
  $count++
  $tokens = $null
  $errors = $null
  [void][System.Management.Automation.Language.Parser]::ParseInput($block.Groups[2].Value, [ref]$tokens, [ref]$errors)
  foreach ($error in $errors) { $results += @{file=$file.FullName;line=$error.Extent.StartLineNumber;message=$error.Message} }
 }
}
@{blocks=$count;failures=$results} | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'quality-powershell-results.json') -Encoding UTF8
@{blocks=$count;failures=$results} | ConvertTo-Json -Depth 5
if ($results.Count -gt 0) { exit 1 }

