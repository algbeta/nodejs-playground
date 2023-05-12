const UNIX_TOP_COMMAND = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
const WINDOWS_TOP_COMMAND =
  "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"";

module.exports = {
  UNIX_TOP_COMMAND,
  WINDOWS_TOP_COMMAND,
};
