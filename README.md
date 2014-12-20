![Dev dependencies](https://david-dm.org/Noah-Huppert/NoahHuppert.com/dev-status.svg?style=flat)
#Building
####Prerequisit
To build NoahHuppert.com you must have [Grunt](http://gruntjs.com/) installed. If you do not have Grunt installed see this [Grunt guide](http://gruntjs.com/getting-started).  
Once you have Grunt installed run
```bash
npm install
```
This will install all the build script's dependencies

###Simple Build
To simply build NoahHuppert.com run  
```bash
grunt build
```
This will install Bower dependencies, compile the Scss to Css and compile the Typescript to Javascript.  


###Watch
To compile the Scss and Typescript files as you change then run
```bash
grunt watch
```
This will recompile the appropriate files as they change


###Serve
To serve the website files so you can test them run
```bash
grunt serve
```
The website will then be accessible at [127.0.0.1:9000](127.0.0.1:9000)


###Serve and Watch
To serve files and watch them just add the `--watch` flag onto `serve`
```bash
grunt serve --watch
```


#Testing
Currently there is only testing for the Typescript. This is done with [Jasmine](http://jasmine.github.io/) and [Karma](http://karma-runner.github.io/). To run tests  
TODO: FIGURE OUT HOW TO RUN TESTS WITH KARMA
