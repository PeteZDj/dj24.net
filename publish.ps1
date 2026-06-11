# Build & deploy dj24.net (Vite SPA, outDir=dist) -- DEPLOYS TO BOTH dj24.net AND dj24.com
# (Both domains serve the same SPA from a single repo. Add -Install to force fresh deps.)
#
# SAFETY: each wwwroot may contain a `_repo` junction pointing back into this repo.
# robocopy /MIR will delete through that junction and wipe the source repo unless the
# junction is excluded with an explicit /XD. We pass it via -PreserveDirs @('_repo')
# so the shared deploy helper adds `/XD <wwwroot>\_repo`. Do NOT remove this.
[CmdletBinding()]
param([switch]$Install)

Import-Module C:\inetpub\repos\_lib\deploy.psm1 -Force
Invoke-StaticDeploy `
  -RepoDir      $PSScriptRoot `
  -BuildDir     'dist' `
  -LiveDirs     @('C:\inetpub\wwwroot\dj24.net','C:\inetpub\wwwroot\dj24.com') `
  -SmokeHosts   @('dj24.net','dj24.com') `
  -PreserveDirs @('_repo') `
  -Install:$Install
