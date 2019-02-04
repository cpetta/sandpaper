# reference https://chocolatey.org/packages for all available packages
$Applications = @(
	"notepadplusplus"
#	"bitnami-xampp"
	"firefox"
	"googlechrome"
	"git"
	"nodejs"
	"filezilla"
#	"vivaldi"
#	"vscode"
)

# https://www.npmjs.com/
$npmGlobalPackages = @(
	"gulp-cli"
#	"gulp"
	"make-dir"
#	"del"
#	"gulp@next"
	"gulp-include"
	"pump"
	"tslint"
	"typescript"
	"browser-sync"
)

$npmSaveDevPackages = @(
	"gulp"
	"del"
	"gulp-csslint"
	"gulp-stylelint"
	"stylelint"
	"gulp-jshint"
	"jshint"
	"gulp-htmlhint"
	"gulp-imagemin"
	"gulp-cache"
	"gulp-inline-source"
	"browser-sync"
	"gulp-postcss"
	"gulp-typescript"
	"typescript"
	"tslint"
	"gulp-tslint"
#	"postcss-syntax@0.10.0"
	"postcss-syntax"
	"postcss-preset-env"
	"postcss-unprefix"
	"autoprefixer"
	"css-mqpacker"
	"cssnano"
	"stylelint"
	"stylelint-config-recommended"
	"stylelint-config-standard"
	"stylelint-order"
	"gulp-html-postcss"
	"imagemin-pngout"
	"gulp-zip"
#	"gulp-pug"
)

Write-Output "Checking to see if Chocolatey is installed..."

if (Get-Command choco -errorAction SilentlyContinue) {
	Write-Output "Chocolatey is already installed"
	choco.exe upgrade chocolatey -y
	
	Write-Output "Attempting to update apps using chocolatey"
	choco.exe upgrade $Applications -y
}
else {
	Write-Output "Chocolatey isn't installed, attempting to install. "
	Set-ExecutionPolicy Bypass -Scope Process -Force; Invok-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

	Write-Output "Attempting to install apps with chocolatey"
	choco install $Applications -y
}

Write-Output "Checking to see if npm is installed..."

if (Get-Command npm -errorAction SilentlyContinue) {
	Write-Output "Installing NPM packages..."

#	PreOP
	npm --silent install  npm@latest -g
	npm --silent cache clean -f
	npm --silent install node@latest -g --scripts-prepend-node-path
	npm --silent init -f
	npm --silent rm --global gulp

#	Actually install packages
	npm --silent install -g $npmGlobalPackages
	npm --silent install -save-dev $npmSaveDevPackages

#	PostOP
	tslint --init
	npm --silent audit fix
	remove-item package.json
}
else {
	Write-Output "NPM command wasn't found, there may have been a problem during installation, try running this script again."
}

if (Get-Command git -errorAction SilentlyContinue) {
	git init
	git remote add gulpdev https://github.com/cpetta/GulpDev.git
	git fetch
	git pull gulpdev master
	Set-Location dev
	Start-Process index.html
}
else {
	Write-Output "GIT command wasn't found, there may have been a problem during installation, try running this script again."
}