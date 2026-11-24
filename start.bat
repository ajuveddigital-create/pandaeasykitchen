@echo off
set "PATH=%~dp0.tools\nodejs;%PATH%"
echo ===================================================
echo   Starting Panda Easy Kitchen Fullstack Server...
echo ===================================================
echo Server starting at http://localhost:3001
echo Press Ctrl+C anytime to stop.
echo.
node server\index.js
pause

