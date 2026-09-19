Add-Type -AssemblyName System.Drawing
$modelSheetDir = "C:\inetpub\repos\dj24.net\public\images\factions\hip-hop-mafia\model-sheets"
if (-not (Test-Path $modelSheetDir)) {
    New-Item -ItemType Directory -Path $modelSheetDir -Force | Out-Null
}

$sheets = @(
    @{
        src = "C:\Users\Administrator\.gemini\antigravity\brain\1052c192-e38f-4fb0-ae13-389abf809381\grand_verse_sheet_1789853638512.jpg"
        dst = "C:\inetpub\repos\dj24.net\public\images\factions\hip-hop-mafia\model-sheets\marcus-grand-verse-sheet.png"
    },
    @{
        src = "C:\Users\Administrator\.gemini\antigravity\brain\1052c192-e38f-4fb0-ae13-389abf809381\freq_kid_sheet_1789853646884.jpg"
        dst = "C:\inetpub\repos\dj24.net\public\images\factions\hip-hop-mafia\model-sheets\amara-freq-kid-sheet.png"
    },
    @{
        src = "C:\Users\Administrator\.gemini\antigravity\brain\1052c192-e38f-4fb0-ae13-389abf809381\blackout_sheet_1789853667697.jpg"
        dst = "C:\inetpub\repos\dj24.net\public\images\factions\hip-hop-mafia\model-sheets\kenneth-blackout-sheet.png"
    },
    @{
        src = "C:\Users\Administrator\.gemini\antigravity\brain\1052c192-e38f-4fb0-ae13-389abf809381\nadia_silk_sheet_1789853676209.jpg"
        dst = "C:\inetpub\repos\dj24.net\public\images\factions\hip-hop-mafia\model-sheets\nadia-silk-sheet.png"
    },
    @{
        src = "C:\Users\Administrator\.gemini\antigravity\brain\1052c192-e38f-4fb0-ae13-389abf809381\chrome_turnaround_sheet_1789853695873.jpg"
        dst = "C:\inetpub\repos\dj24.net\public\images\factions\hip-hop-mafia\model-sheets\dae-sun-chrome-sheet.png"
    }
)

foreach ($item in $sheets) {
    $img = [System.Drawing.Image]::FromFile($item.src)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $img.Dispose()
    $bmp.Save($item.dst, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host ("Saved model sheet: " + $item.dst)
}
