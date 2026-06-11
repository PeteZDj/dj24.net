# dj24.net — dev notes

| Field | Value |
| --- | --- |
| GitHub | https://github.com/PeteZDj/dj24.net |
| Default branch | `main` |
| Type | Vite SPA (dual deploy) |
| Build output | `dist/` |
| Install | `npm install --legacy-peer-deps` |
| Dev server | `npm run dev` |
| Deploy | `.\publish.ps1` (force fresh deps with `-Install`) |

## Live folder
- `_live-dj24.net\` -> `C:\inetpub\wwwroot\dj24.net`  (junction)
- `_live-dj24.com\` -> `C:\inetpub\wwwroot\dj24.com`  (junction)

The junction is read-only from your point of view (don't edit it directly). All edits happen in this repo;
`publish.ps1` builds and mirrors the artifacts into the live folder, preserving the manually-maintained
`web.config` and `favicon.svg` in wwwroot.

## Notes
- DJ24: War of Sound wiki - one repo, deployed to BOTH dj24.net AND dj24.com.
- publish.ps1 copies the build output to both wwwroots.
- Live folders: _live-dj24.net/  and  _live-dj24.com/
- LARGE IMAGE ASSETS ARE GITIGNORED - they are recoverable from the initial commit
  (`git checkout 147affb -- public/images`) and live on disk under `public/images/` (177 PNGs).
- DANGER: each wwwroot contains a `_repo` junction back into this repo. `publish.ps1` passes
  `-PreserveDirs @('_repo')` so robocopy /MIR excludes it with /XD. Without that guard, /MIR
  follows the junction and deletes the entire source repo. Keep the guard.

## Typical workflow

```powershell
git pull
# edit source under src/, components/, etc.
npm run dev               # local dev server
# when ready:
.\publish.ps1            # builds + mirrors to _live; smoke tests via IIS
```
