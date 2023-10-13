# Start-Process powershell -ArgumentList "-NoExit", "-Command .\scripts\run-emulators.ps1"
# Start-Process powershell -ArgumentList "-NoExit", "-Command .\scripts\run-react.ps1"
# Start-Process powershell -ArgumentList "-NoExit", "-Command .\scripts\run-functions.ps1"
wt --window 0 -p "Windows Powershell" -d . powershell -noExit ".\scripts\run-emulators.ps1"`; split-pane --vertical -p "Windows Powershell" -d . powershell -noExit "./scripts/run-react.ps1"`; split-pane --vertical -p "Windows Powershell" -d . powershell -noExit "./scripts/run-functions.ps1"
