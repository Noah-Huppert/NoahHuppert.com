module.exports = (grunt) ->
  serveInBackground = grunt.option("background") or grunt.option("serve")

  grunt.initConfig
    #Install Bower dependencies
    bower:
      install:
        options:
          copy: false

    #Compile Scss
    sass:
      compile:
        files: [
          expand: true
          cwd: "Site/styles/scss"
          src: ["*.scss"]
          dest: "Site/styles/css"
          ext: ".css"
        ]

    #Compile Typescript
    typescript:
      compile:
        src: ["Site/scripts/typescript/**/*.ts"]
        dest: "Site/scripts/javascript/main.js"
        options:
          target: "ES5"
          sourceMap: true
          references: ["Site/_references.ts"]

    #Manifest Sync
    manifestSync:
      main:
        options:
          primaryManifest: "manifest.json"

    #Clean directories
    clean:
      css: ["Site/styles/css"]
      javascript: ["Site/scripts/javascript"]

    #Serve files
    "http-server":
      main:
        root: "Site"
        port: 9000
        host: "127.0.0.1"
        runInBackground: serveInBackground

    #Watch files
    watch:
      bower:
        files: "Site/bower.json"
        tasks: ["installBower"]
      sass:
        files: "Site/styles/scss/**/*"
        tasks: ["buildSass"]
      manifests:
        files: "manifest.json"
        tasks: ["buildManifests"]
      typescript:
        files: "Site/scripts/typescript/**/*"
        tasks: ["buildTypescript"]
      gruntfile:
        files: "Gruntfile.coffee"
        options:
          reload: true


  #Load Grunt tasks
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-bower-task"
  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-manifest-sync"
  grunt.loadNpmTasks "grunt-typescript"
  grunt.loadNpmTasks "grunt-http-server"

  #Register Grunt tasks
  grunt.registerTask "build", ["installBower", "buildSass", "buildManifests", "buildTypescript"]
  grunt.registerTask "serve", ["http-server:main"]

  wTaskTasks = []
  if serveInBackground
    wTaskTasks.push "serve"
  wTaskTasks.push "watch"
  grunt.registerTask "w", wTaskTasks

  grunt.registerTask "installBower", ["bower:install"]
  grunt.registerTask "buildScss", ["clean:css", "sass:compile"]
  grunt.registerTask "buildManifests", ["manifestSync:main"]
  grunt.registerTask "buildTypescript", ["clean:javascript", "typescript:compile"]
