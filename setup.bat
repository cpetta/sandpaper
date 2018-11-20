@echo off
SETLOCAL ENABLEEXTENSIONS

ECHO Checking to see if Chocolatey is installed...
where choco >nul 2>nul
IF %ERRORLEVEL% NEQ 0 ECHO Chocolatey isn't installed, attempting to install. 
IF %ERRORLEVEL% NEQ 0 call "%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

ECHO Checking to see if choco can be run...
where choco >nul 2>nul
IF %ERRORLEVEL% NEQ 0 Chocolatey still isn't installed correctly, terminating...
IF %ERRORLEVEL% NEQ 0 PAUSE
IF %ERRORLEVEL% NEQ 0 EXIT
IF %ERRORLEVEL% EQU 0 ECHO Chocolatey is good, running commands...
IF %ERRORLEVEL% EQU 0 call choco install notepadplusplus bitnami-xampp firefox googlechrome git nodejs filezilla -y
::IF %ERRORLEVEL% EQU 0 call choco install vivaldi vscode -y

ECHO Checking to see if npm is installed...
where npm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 ECHO npm wasn't found in path, adding.
IF %ERRORLEVEL% NEQ 0 SET "PATH=%PATH%;C:\Program Files\nodejs"

ECHO Checking to see if npm can be run...
where npm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 npm still isn't installed correctly, terminating...
IF %ERRORLEVEL% NEQ 0 PAUSE
IF %ERRORLEVEL% NEQ 0 EXIT

IF %ERRORLEVEL% EQU 0 ECHO npm is good, running commands...

IF %ERRORLEVEL% EQU 0 mkdir C:\xampp\htdocs\gulpdev
IF %ERRORLEVEL% EQU 0 cd C:\xampp\htdocs\gulpdev

IF %ERRORLEVEL% EQU 0 call npm --silent install  npm@latest -g

IF %ERRORLEVEL% EQU 0 ECHO updating NPM...
IF %ERRORLEVEL% EQU 0 call npm --silent install  npm@latest -g

IF %ERRORLEVEL% EQU 0 ECHO Updating Node...
IF %ERRORLEVEL% EQU 0 call npm --silent cache clean -f
IF %ERRORLEVEL% EQU 0 call npm --silent install node@latest -g --scripts-prepend-node-path

IF %ERRORLEVEL% EQU 0 ECHO initializing project...
IF %ERRORLEVEL% EQU 0 call npm --silent init -f

IF %ERRORLEVEL% EQU 0 ECHO installing required packages...
IF %ERRORLEVEL% EQU 0 call npm --silent rm --global gulp
IF %ERRORLEVEL% EQU 0 call npm --silent install gulp-cli -g
IF %ERRORLEVEL% EQU 0 call npm --silent install gulp -D
IF %ERRORLEVEL% EQU 0 call npm --silent install make-dir
IF %ERRORLEVEL% EQU 0 call npm --silent install del
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev del
IF %ERRORLEVEL% EQU 0 call npm --silent install gulp@next
IF %ERRORLEVEL% EQU 0 call npm --silent install gulp-include
IF %ERRORLEVEL% EQU 0 call npm --silent install pump
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-if
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-changed
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-sourcemaps
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-include
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-concat
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-autoprefixer
::IF %ERRORLEVEL% EQU 0 ::call npm --silent install --save-dev gulp-csso
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-htmlmin
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-uglify
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-babel babel-core babel-preset-env
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-typescript typescript
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-tslint tslint
IF %ERRORLEVEL% EQU 0 call npm --silent install -g tslint typescript
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-csslint 
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-stylelint stylelint
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-jshint jshint
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-htmlhint
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-imagemin
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-cache
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-inline-source
IF %ERRORLEVEL% EQU 0 call npm --silent install -g browser-sync
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev browser-sync
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-postcss
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev postcss-syntax@0.10.0
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev postcss-preset-env
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev postcss-unprefix
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev autoprefixer
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev css-mqpacker
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev cssnano
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev stylelint
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev stylelint-config-recommended
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev stylelint-config-standard
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev stylelint-order
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-html-postcss
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev imagemin-pngout
IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-zip
::IF %ERRORLEVEL% EQU 0 call npm --silent install --save-dev gulp-pug

IF %ERRORLEVEL% EQU 0 call npm tslint --init
IF %ERRORLEVEL% EQU 0 call npm --silent audit fix

ECHO Checking to see if git is in path...
where git >nul 2>nul
IF %ERRORLEVEL% NEQ 0 ECHO git wasn't found in path, adding.
IF %ERRORLEVEL% NEQ 0 SET "PATH=%PATH%;C:\Program Files\Git\cmd"

ECHO Checking to see if git can be run...
where git >nul 2>nul
IF %ERRORLEVEL% NEQ 0 git can't be run, terminating...
IF %ERRORLEVEL% NEQ 0 PAUSE
IF %ERRORLEVEL% NEQ 0 EXIT

IF %ERRORLEVEL% EQU 0 call git init
IF %ERRORLEVEL% EQU 0 call git remote add gulpdev https://github.com/cpetta/GulpDev.git
IF %ERRORLEVEL% EQU 0 call git fetch
IF %ERRORLEVEL% EQU 0 call git pull gulpdev master

IF %ERRORLEVEL% EQU 0 start C:\xampp\htdocs\gulpdev\dev\index.html

pause