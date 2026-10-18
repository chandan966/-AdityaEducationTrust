@echo off
cd /d "%~dp0backend"
if not exist .env (
  copy .env.example .env
  echo Created backend\.env. Edit DATABASE_URL and JWT_SECRET before continuing.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing backend dependencies...
  call npm install
  if errorlevel 1 pause & exit /b 1
)
call npm run dev
pause
