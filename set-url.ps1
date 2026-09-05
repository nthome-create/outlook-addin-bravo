# Remplace BASE_URL dans manifest.xml par l'URL GitHub Pages reelle.
# Usage : .\set-url.ps1 -User monpseudo -Repo ailis-outlook-bravo

param(
  [Parameter(Mandatory=$true)][string]$User,
  [string]$Repo = "ailis-outlook-bravo"
)

$base = "$User.github.io/$Repo"
$path = Join-Path $PSScriptRoot "manifest.xml"

(Get-Content $path -Raw -Encoding UTF8) -replace 'BASE_URL', $base |
  Set-Content $path -NoNewline -Encoding UTF8

Write-Host "manifest.xml pointe maintenant vers https://$base/"
