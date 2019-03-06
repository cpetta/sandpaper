# reference https://chocolatey.org/packages for all available packages
$Applications = @(
#	"bitnami-xampp"
#	"filezilla"
#	"firefox"
	"git"
#	"googlechrome"
	"nodejs"
#	"notepadplusplus"
#	"vivaldi"
#	"vscode"
	"yarn"
)

# https://www.npmjs.com/
$npmGlobalPackages = @(
	"gulp-cli"
	"typescript"
)

$yarnPackages = @(
	"autoprefixer"
	"browser-sync"
	"css-mqpacker"
	"cssnano"
	"del"
	"eslint-config-xo"
	"gulp-cache"
	"gulp-changed"
	"gulp-eslint"
	"gulp-html-postcss"
	"gulp-htmlhint"
	"gulp-htmlmin"
	"gulp-if"
	"gulp-imagemin"
	"gulp-jshint"
	"gulp-postcss"
	"gulp-sourcemaps"
	"gulp-stylelint"
	"gulp-tslint"
	"gulp-typescript"
	"gulp-uglify"
	"gulp-zip"
	"gulp"
	"htmlhint-stylish"
	"jshint-more-stylish"
	"jshint"
	"postcss-preset-env"
	"postcss-reporter"
	"postcss-unprefix"
	"pump"
	"stylelint-config-recommended"
	"stylelint-config-standard"
	"stylelint-order"
	"stylelint"
	"tslint"
	"typescript"
	"uglify-js"
)

$yarnDevPackages = @(
	"coveralls"
	"mocha"
	"xo"
)

$NPMPath = "C:\Program Files\nodejs"
$YarnPath = "C:\Program Files (x86)\Yarn\bin"
$GITPath = "C:\Program Files\Git\cmd"
$scriptname = $MyInvocation.MyCommand.Name
# Determine if updating or setting up for the first time.
	if($scriptname -eq "setup.ps1") { $SettingUp = "true" }
	if($scriptname -eq "update.ps1") { $Updating = "true" }
	if(($SettingUp -ne "true") -and ($Updating -ne "true"))
	{
		Write-Output "$scriptname" 
		Write-Output "Unable to detirmine if updating or setting up. Please make sure this powershell script is named update.ps1 or setup.ps1"
		return
	}

# Install/Update Chocolatey
function runChocolatey {
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
}

# Download most uptodate files from github and initialize git.
function runGit {
	$path = Get-Location
	if(-not ((Get-Command git -errorAction SilentlyContinue))) {
		$Env:Path = "$Env:Path;$GITPath"
	}

	if (Get-Command git -errorAction SilentlyContinue) {
		if($SettingUp -eq "true")
		{
			git init
			git remote add gulpdev https://github.com/cpetta/GulpDev.git
		}

		git fetch -f
		Remove-Item "$path\setup.ps1" -errorAction SilentlyContinue
		git pull gulpdev master
	}
	else {
		Write-Output "GIT command wasn't found, there may have been a problem during installation, try running this script again."
		return
	}
}

# Install/Update npm packages and initialize project.
function runNpm{
	if(-not ((Get-Command npm -errorAction SilentlyContinue))) {
		$Env:Path = "$Env:Path;$NPMPath"
	}

	if (-not ((Get-Command yarn -errorAction SilentlyContinue))) {
		$Env:Path = "$Env:Path;$YarnPath"
	}

	if (Get-Command npm -errorAction SilentlyContinue) {
		Write-Output "Installing NPM packages..."

	#	PreOP
		npm install  npm@latest -g
		npm install node@latest -g --scripts-prepend-node-path
		if ($SettingUp -eq "true")
		{
			#npm --silent init -f
			npm rm --global gulp
			npm cache clean -f
		}

	#	install/update packages
		npm install -g $npmGlobalPackages
		yarn add $yarnPackages
		yarn add $yarnDevPackages --dev

	#	PostOP
		if($SettingUp -eq "true")
		{
			RefreshEnv
			$path = Get-Location
			node "$path\node_modules\tslint\lib\tslintCli.js" --init
			
		}
	}
	else {
		Write-Output "NPM command wasn't found, there may have been a problem during installation, try running this script again."
		return
	}
}

# Finalization
function finalizeSetup{

	$path = Get-Location

	if($SettingUp -eq "true")
	{
		copy-item "$path\setup.ps1" -Destination "$path\update.ps1"
		New-Item -ItemType Directory -Force -Path "$path\dev"
	}
	
	Remove-Item "$path\setup.ps1" -errorAction SilentlyContinue

	Write-Output "Finished with installation, you will need to close and reload the console before running any gulp tasks."
}

runChocolatey
runGit
runNpm
finalizeSetup