# Cpetta's GulpDev
The purpose of this project is to automate the setup and updating of gulp, npm, and other tools which are helpful in the development process

For your own safety and security it is **highly recomended** that you review any scripts before running them.
Feedback on things that don't work correctly or un
When setup.bat is run it will install chocolaty. Chocolaty will 

# Installation
	1. run setup.bat (double click, or from commandline)

# Basic Workflow.
	1. develop a website.
	2. copy the website and all files/folders into the dev folder
	3. Open command prompt in this location using the steps outlined above.
	4. Run one of the tasks outlined below by typing "gulp [taskname]" replacing [taskname] with the task you want to run.

# Workflow for Development.
	1. Create and edit all your .html, .css, and .js files in the dev folder
		a. They can be in any number of sub-folders and it can be organized in any way.
	2. When you begin editing code, run the [gulp sync]
	3. On each save [gulp] should run and update your page in the browser.

# Workflow for Release.
	1. Create and edit all your .html, .css, and .js files in the dev folder
		a. They can be in any number of sub-folders and it can be organized in any way.
	2. When your done editing your code, run [gulp rel]
	3. Upload the files from the rel folder to your webserver.
	
# Using this gulpfile with other projects.
	1. Copy the following files into your new project.
		a. gulpfile.js
		b. setup.bat
		c. stylelint.config.js
		d. tslint.json
	2. create a dev folder
	3. run setup.bat

## This gulpfile has the following tasks available.

	1. default
	2. rel
	3. lint
	4. clean
	5. watch
	6. watchlint
	7. sync

## 1.	gulp (default)
	This task 
		Sets the sourcemap flag
		Processes CSS
		Processes HTML
		Processes Javascript
		Processes Typescript
		Optamizes Images (.svg, .png, .jpg, .gif)
		Copies any remaining files to the 'stage' folder
		Lints HTML
		Lints CSS
		Lints Javascript
		Lints Typescript

## 2.	gulp rel
	This task
		Deletes the rel folder
		Sets the release flag
		Processes CSS
		Processes HTML
		Processes Javascript
		Processes Typescript
		Optamizes Images (.svg, .png, .jpg, .gif)
		Copies any remaining files to the 'rel' folder
		Lints HTML
		Lints CSS
		Lints Javascript
		Lints Typescript
		
## 3.	gulp lint
	this task
		Lints HTML
		Lints CSS
		Lints Javascript
		Lints Typescript
		
## 4.	gulp clean
		this task deletes the 'stage' folder.
	
## 5.	gulp watch
		This task will run indefinately until the command promt is ether closed or the users presses ctrl + c.
		when a file is changed between the 'dev' folder and the 'stage' folder, it will process it.
		for instance if I make a change to a css file, and hit save, that change will be carried over to the 'stage' folder.
		
## 6.	gulp watchlint
		this task will watch for files changing just like 'gulp watch', but instead of processing them, it will output a lint report.
		
## 7.	gulp sync
		this task is the same as gulp watch, but in addition it runs a webserver on port 3000.
		you can open up your website in the browser, if a file in the 'dev' folder changes, it will be processed, and the browser will reload or update with the change.
		additionally, if multiple browsers/devices load your webpage, scrolling, clicking, and typing are all duplicated across instances.
		
		
# Note for windows users
	To run a gulp task, run cmd or powershell, and navigate to the folder that this file is located in. ( using cd [foldername] )
	Alternatively,  on windows, you can hold shift, and right click in the blank space of the folder that contains this file.
	The context menu should have the option [open command window here]