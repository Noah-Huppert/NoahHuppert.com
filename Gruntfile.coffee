module.exports = (grunt) =>
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
          src: ["**/*"]
          dest: "Site/styles/css"
          ext: ".css"
        ]

    #Compile Typescript
    typescript:
      compile:
        src: ["Site/scripts/typescript/**/*"]
        dest: "Site/scripts/javascript/main.js"
        options:
          target: "ES5"
          sourceMap: true

    #Manifest Sync
    manifestSync:
      main:
        options:
          primaryManifest: "manifest.json"

    #Clean directories
    clean:
      css: ["Site/styles/css"]
      javascript: ["Site/scripts/javascript"]

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

    #Load Grunt Tasks
    grunt.loadNpmTasks "grunt-contrib-clean"
    grunt.loadNpmTasks "grunt-bower-task"
    grunt.loadNpmTasks "grunt-contrib-sass"
    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-manifest-sync"
    grunt.loadNpmTasks "grunt-typescript"

    grunt.registerTask "installBower", ["bower:install"]
    grunt.registerTask "buildSass", ["clean:css", "sass:compile"]
    grunt.registerTask "buildManifests", ["manifestSync:main"]
    grunt.reigsterTask "buildTypescript", ["clean:javascript", "typescript:compile"]
