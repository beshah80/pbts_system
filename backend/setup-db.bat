@echo off
echo Setting up PBTS System Database...
echo.

echo Installing dependencies...
npm install

echo.
echo Generating Prisma client...
npx prisma generate

echo.
echo Pushing database schema...
npx prisma db push

echo.
echo Initializing database with real Ethiopian data...
node init-real-database.js

echo.
echo Database setup completed!
echo.
echo Login credentials:
echo Super Admin: superadmin@pbts.com / superadmin123
echo Admin: admin@pbts.com / admin123
echo Driver 1: abebe@pbts.com / driver123
echo Driver 2: tigist@pbts.com / driver123
echo.
pause