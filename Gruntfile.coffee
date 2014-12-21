﻿module.exports = (grunt) ->
  watchFiles = grunt.option "watch"
  serveInBg = grunt.option "background"

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
          cwd: "src/styles/scss"
          src: ["*.scss"]
          dest: "build/styles/css"
          ext: ".css"
        ]

    #Compile Typescript
    typescript:
      compile:
        src: ["src/scripts/typescript/**/*.ts"]
        dest: "build/scripts/javascript/main.js"
        options:
          target: "ES5"
          declaration: true
          references: ["src/_references.ts"]
      compileTests:
        src: ["test/typescript/**/*.ts"]
        dest: "test/tmp/"
        options:
          target: "ES5"
          sourceMap: false
          references: ["test/_references.ts"]

    #Manifest Sync
    manifestSync:
      main:
        options:
          primaryManifest: "manifest.json"

    #Clean directories
    clean:
      css: ["build/styles/css"]
      javascript: ["build/scripts/javascript"]
      testsJavascript: ["test/javascript"]
      testsTpm: ["test/tmp"]
      build: ["build"]

    #Copy files
    copy:
      styles:
        files: [
          expand: true
          cwd: "src/styles"
          src: ["**/*"]
          dest: "build/styles"
        ]
      libs:
        files: [
          expand: true
          cwd: "libs"
          src: ["**/*"]
          dest: "build/libs"
        ]
      views:
        files: [
          expand: true
          cwd: "src/views"
          src: ["**/*"]
          dest: "build"
        ]
      data:
        files: [
          expand: true
          cwd: "src/data"
          src: ["**/*"]
          dest: "build/data"
        ]
      img:
        files: [
          expand: true
          cwd: "src/img"
          src: ["**/*"]
          dest: "build/img"
        ]
      typescriptTests:
        files: [
          expand: true
          cwd: "test/tmp/test/typescript"
          src: ["**/*"]
          dest: "test/javascript"
        ]

    #Serve files
    "http-server":
      main:
        root: "build"
        port: 9000
        host: "127.0.0.1"
        runInBackground: watchFiles || serveInBg

    #Watch files
    watch:
      bower:
        files: "bower.json"
        tasks: ["installBower"]
      sass:
        files: "src/styles/scss/**/*"
        tasks: ["buildSass"]
      manifests:
        files: "manifest.json"
        tasks: ["buildManifests"]
      typescript:
        files: "src/scripts/typescript/**/*"
        tasks: ["buildTypescript"]
      typescriptTest:
        files: "test/typescript/**/*"
        tasks: ["buildTests"]
      data:
        files: "src/data/**/*"
        tasks: ["buildData"]
      views:
        files: "src/views/**/*"
        tasks: "buildViews"
      img:
        files: "src/img/**/*"
        tasks: "buildImages"
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
  grunt.loadNpmTasks "grunt-contrib-copy"

  #Register Grunt tasks
  grunt.registerTask "build", ["clean:build", "installBower", "buildScss", "buildManifests", "buildTypescript", "buildData", "buildImages", "buildViews", "buildTests"]
  grunt.registerTask "buildTests", ["clean:testsJavascript", "typescript:compileTests", "copy:typescriptTests", "clean:testsTpm"]

  serveTasks = ["http-server:main"]
  if watchFiles
    serveTasks.push "watch"
  grunt.registerTask "serve", serveTasks

  grunt.registerTask "installBower", ["bower:install", "copy:libs"]
  grunt.registerTask "buildScss", ["clean:css", "sass:compile"]
  grunt.registerTask "buildManifests", ["manifestSync:main"]
  grunt.registerTask "buildTypescript", ["clean:javascript", "typescript:compile"]
  grunt.registerTask "buildViews", ["copy:views"]
  grunt.registerTask "buildData", ["copy:data"]
  grunt.registerTask "buildImages", ["copy:img"]
