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

$NPMPath = "C:\Program Files\nodejs"
$GITPath = "C:\Program Files\Git\cmd"

#Determine if updating or setting up for the first time.
{
	$scriptname = $MyInvocation.MyCommand.Name;
	if($scriptname -eq "setup.ps1") { $SettingUp = "true" }
	if($scriptname -eq "update.ps1") { $Updating = "true" }
	if(($SettingUp -ne "true") -and ($Updating -ne "true"))
	{
		Write-Output "Unable to detirmine if updating or setting up. Please make sure this powershell script is named update.ps1 or setup.ps1"
		return
	}
}

Write-Output "Checking to see if Chocolatey is installed..."

if (Get-Command choco -errorAction SilentlyContinue) {
	Write-Output "Chocolatey is already installed"
	choco.exe upgrade chocolatey -y
	
	Write-Output "Attempting to update apps using chocolatey"
	choco.exe upgrade $Applications -y
}
else {
	Write-Output "Chocolatey isn't installed, attempting to install. "
	Set-ExecutionPolicy Bypass -Scope Process -Force; Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

	Write-Output "Attempting to install apps with chocolatey"
	choco install $Applications -y
}

if(-not ((Get-Command npm -errorAction SilentlyContinue))) {
	$Env:Path = "$Env:Path;$NPMPath"
}

if (Get-Command npm -errorAction SilentlyContinue) {
	Write-Output "Installing NPM packages..."

#	PreOP
	npm --silent install  npm@latest -g
	npm --silent install node@latest -g --scripts-prepend-node-path
	if ($SettingUp -eq "true")
	{
		npm --silent init -f
		npm --silent rm --global gulp
		npm --silent cache clean -f
	}

#	install/update packages
	npm --silent install -g $npmGlobalPackages
	npm --silent install -save-dev $npmSaveDevPackages

#	PostOP
	npm --silent audit fix	
	
	if($SettingUp -eq "true")
	{
		tslint --init
	}
}
else {
	Write-Output "NPM command wasn't found, there may have been a problem during installation, try running this script again."
	return
}

if(-not ((Get-Command git -errorAction SilentlyContinue))) {
	$Env:Path = "$Env:Path;$GITPath"
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
	return
}

if($SettingUp -eq "true")
{
	Set-Location ..
	try { rename-item "setup.ps1" "update.ps1" } catch {}
}