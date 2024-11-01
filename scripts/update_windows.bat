@echo off

:: Navigate to the root directory
cd ..

:: Define backup directory with formatted timestamp
for /f "tokens=1-7 delims=/:. " %%A in ("%date% %time%") do (
    set TIMESTAMP=%%A_%%B_%%C_%%D_%%E_%%F_%%G
)
set BACKUP_DIR=prismaBackups\backup_%TIMESTAMP%_prisma

:: Create the backup directory if it doesn't exist
if not exist prismaBackups mkdir prismaBackups
if not exist %BACKUP_DIR% mkdir %BACKUP_DIR%

:: Backup the entire prisma folder
xcopy prisma %BACKUP_DIR%\prisma /E /I

:: Pull the latest changes from GitHub
call git pull origin main

:: Install any new dependencies
call npm install

:: Run Prisma migrations
call npx prisma migrate deploy

:: Generate Prisma Client 
call npx prisma generate

:: Build the project
call npm run build

:: Notify that the update was successful with green text
echo --------------------------------------------------
echo Update successful! Backup created at %BACKUP_DIR%
pause
