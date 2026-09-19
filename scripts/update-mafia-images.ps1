Add-Type -AssemblyName System.Drawing
$backupDir = "C:\inetpub\repos\dj24.net\public\images\factions\hip-hop-mafia\_backup_original"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
}

$items = @(
    @{
        src = "C:\Users\Administrator\.gemini\antigravity\brain\1052c192-e38f-4fb0-ae13-389abf809381\grand_verse_chairman_1789852521193.jpg"
        dst = "C:\inetpub\repos\dj24.net\public\images\factions\hip-hop-mafia\marcus-grand-verse-cole.png"
    },
    @{
        src = "C:\Users\Administrator\.gemini\antigravity\brain\1052c192-e38f-4fb0-ae13-389abf809381\freq_kid_amara_1789852529059.jpg"
        dst = "C:\inetpub\repos\dj24.net\public\images\factions\hip-hop-mafia\amara-freq-kid-nwosu.png"
    },
    @{
        src = "C:\Users\Administrator\.gemini\antigravity\brain\1052c192-e38f-4fb0-ae13-389abf809381\blackout_enforcer_1789852550011.jpg"
        dst = "C:\inetpub\repos\dj24.net\public\images\factions\hip-hop-mafia\kenneth-blackout-sayles.png"
    },
    @{
        src = "C:\Users\Administrator\.gemini\antigravity\brain\1052c192-e38f-4fb0-ae13-389abf809381\nadia_silk_hearts_1789852559467.jpg"
        dst = "C:\inetpub\repos\dj24.net\public\images\factions\hip-hop-mafia\nadia-silk-silk.png"
    },
    @{
        src = "C:\Users\Administrator\.gemini\antigravity\brain\1052c192-e38f-4fb0-ae13-389abf809381\chrome_redline_garage_1789852579753.jpg"
        dst = "C:\inetpub\repos\dj24.net\public\images\factions\hip-hop-mafia\dae-sun-chrome-pak.png"
    }
)

foreach ($entry in $items) {
    if (Test-Path $entry.dst) {
        Copy-Item -Path $entry.dst -Destination (Join-Path $backupDir (Split-Path $entry.dst -Leaf)) -Force
    }
    $img = [System.Drawing.Image]::FromFile($entry.src)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $img.Dispose()
    $bmp.Save($entry.dst, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host ("Successfully saved: " + $entry.dst)
}
