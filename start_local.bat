@echo off
echo ========================================
echo   Starting with Local Database
echo ========================================

echo Killing any existing processes on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /f /pid %%a 2>nul

echo.
echo Starting server with in-memory database...
echo This will bypass MongoDB Atlas connection issues.
echo.

set NODE_ENV=development
node server.js

pause