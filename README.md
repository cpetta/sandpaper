# Cpetta's GulpDev

## Primary Project Goals
* Improve the experience of writting vanilla HTML, CSS, and JavaScript.
* Improve maintainability of code produced by developers.
* Improve performance of webpages.
* Automate the development enviroment setup process.
* Automate common development tasks.

## Secondary Project Purposes
* Enable the use of additional languages such as typescript, scss, sass, etc.

For your own safety and security, it is **highly recommended** that you review any scripts before running them.
When setup.ps1 is run it will install chocolaty.
Chocolaty will install a whole bunch of software
* NotepadPlusPlus
* bitnami-xampp
* Firefox
* Google Chrome
* Git
* NodeJS
* FileZilla

In my experience, reinstalling applications through chocolaty has not caused any settings or customization loss, but there's no guarantee that you will have the same results.
Feedback and suggestions for improvments are welcome.

# Installation
1. Download setup.ps1
2. Review the code in setup.ps1
3. Place setup.ps1 in the directory that you would like to install GulpDev
2. Launch Powershell as an administrator in the same folder as setup.ps1
4. run the following command `Set-ExecutionPolicy Bypass -Scope Process -Force; .\setup.ps1`

# Basic Workflow
1. Develop a website.
2. Copy the website and all files/folders into the dev folder
3. Open command prompt in this location using the steps outlined above.
4. Run one of the tasks outlined below by typing "gulp [taskname]" replacing [taskname] with the task you want to run.

# Workflow for Development
1. Create and edit all your .html, .css, and .js files in the dev folder.
	* Files can be in any number of sub-folders and can be organized in any way.
2. When you begin editing code, run "gulp sync"
3. On each save [gulp] should run and update your page in the browser.

# Workflow for Release
1. Create and edit all your .html, .css, and .js files in the dev folder
	* Files can be in any number of sub-folders and can be organized in any way.
2. When your done editing code, run "gulp rel"
3. Upload the files from the rel folder to your webserver.
	
# Using this gulpfile with other projects
1. Copy the following files into your new project. 
	* gulpfile.js
	* setup.bat
	* stylelint.config.js
	* tslint.json
2. Create a dev folder
3. Run setup.bat

## This gulpfile has the following tasks available
1. default
2. rel
3. lint
4. clean
5. watch
6. watchlint
7. sync

## 1. gulp (default)
This task 
* Sets the sourcemap flag
* Processes CSS
* Processes HTML
* Processes JavaScript
* Processes Typescript
* Optimizes Images (.svg, .png, .jpg, .gif)
* Copies any remaining files to the 'stage' folder
* Lints HTML
* Lints CSS
* Lints JavaScript
* Lints Typescript

## 2. gulp rel
This task
* Deletes the rel folder
* Sets the release flag
* Processes CSS
* Processes HTML
* Processes JavaScript
* Processes Typescript
* Optimizes Images (.svg, .png, .jpg, .gif)
* Copies any remaining files to the 'rel' folder
* Lints HTML
* Lints CSS
* Lints JavaScript
* Lints Typescript
		
## 3. gulp lint
This task
* Lints HTML
* Lints CSS
* Lints JavaScript
* Lints Typescript
		
## 4. gulp clean
This task deletes the 'stage' folder.
	
## 5. gulp watch
This task will run indefinitely until the command prompt is ether closed or the user presses ctrl + c.
When a file is changed between the 'dev' folder and the 'stage' folder, it will process it.
for instance if I make a change to a css file, and hit save, that change will be carried over to the 'stage' folder.
		
## 6. gulp watchlint
This task will watch for files changing just like 'gulp watch', but instead of processing them, it will output a lint report.
		
## 7. gulp sync
This task is the same as gulp watch, but in addition, it runs a webserver on port 3000.
You can open up your website in the browser, if a file in the 'dev' folder changes, it will be processed, and the browser will reload or update with the change.
Additionally, if multiple browsers/devices load your webpage, scrolling, clicking, and typing are all duplicated across instances.
		
		
# Note for windows users
To run a gulp task, run cmd or PowerShell, and navigate to the folder that this file is located in. (using cd [folder name])
Alternatively, on windows, you can hold shift, and right click in the blank space of the folder that contains this file.
The context menu should have the option [open command window here]
