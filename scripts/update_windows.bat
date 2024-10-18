@echo off

:: Navigate to the root directory
cd ..

:: Define backup directory with timestamp
set TIMESTAMP=%date:~10,4%%date:~4,2%%date:~7,2%%time:~0,2%%time:~3,2%%time:~6,2%
set BACKUP_DIR=prismaBackups\backup_%TIMESTAMP%_prisma

:: Create the backup directory if it doesn't exist
if not exist prismaBackups mkdir prismaBackups
if not exist %BACKUP_DIR% mkdir %BACKUP_DIR%

:: Backup the entire prisma folder
xcopy prisma %BACKUP_DIR%\prisma /E /I

:: Pull the latest changes from GitHub
git pull origin main

:: Install any new dependencies
npm install

:: Run Prisma migrations
npx prisma migrate deploy

:: Build the project
npm run build

:: Notify that the update was successful
echo Update successful! Backup created at %BACKUP_DIR%
pause
