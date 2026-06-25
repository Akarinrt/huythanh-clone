@echo off
cd /d "%~dp0"
echo === Checking git status ===
git status

echo.
echo === Adding all changes ===
git add -A

echo.
echo === Committing ===
git commit -m "fix: add admin API auth, remove auto-create admin, fix JWT secret, XSS email, Zustand mutation, upload type check"

echo.
echo === Setting remote (if needed) ===
git remote remove origin 2>nul
git remote add origin git@github.com:Akarinrt/BaonhienLX.git

echo.
echo === Pushing to GitHub ===
git push -u origin main

echo.
echo === Done! ===
pause
