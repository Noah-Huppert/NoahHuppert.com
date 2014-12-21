[ ![Codeship Status for Noah-Huppert/NoahHuppert.com](https://codeship.com/projects/d6c1cde0-6a97-0132-bb19-123b90e6e43d/status?branch=master)](https://codeship.com/projects/53754)
![Dev dependencies](https://david-dm.org/Noah-Huppert/NoahHuppert.com/dev-status.svg?style=flat)
#Building
####Prerequisits
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
To serve files and watch them just add the `--watch` flag onto the `serve` command
```bash
grunt serve --watch
```


#Testing
####Prerequisit
To run tests for NoahHuppert.com you must have Grunt and Karma installed. If you do not have either of these installed follow their respective installation guides([Grunt guide](http://gruntjs.com/getting-started) or [Karma Guide](http://karma-runner.github.io/0.12/intro/installation.html)).  

###Running Tests
To run the tests simply run the following command
```bash
npm test
```
