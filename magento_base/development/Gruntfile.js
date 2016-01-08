
 module.exports = function (grunt) {
  'use strict';

  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');
  var glob = require('glob');
  var npmShrinkwrap = require('npm-shrinkwrap');
  var mq4HoverShim = require('mq4-hover-shim');

  var configBridge = grunt.file.readJSON('grunt/scss/configBridge.json', { encoding: 'utf8' });
  
  grunt.loadNpmTasks('grunt-sass-import');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Project configuration.
  grunt.initConfig({


    pkg: grunt.file.readJSON('package.json'),

    //Clean
    clean: {
      css: 'modules/_base/css',
      scss: 'project_temp.scss',
      js:'modules/_base/javascript/project.js',
      jsConcat:'modules/_base/javascript/concat.js'

    },

    jade:{
      compile:{
        pretty: true,
        files:[{
      
          src: "modules/blocks/*/jade/*.jade",
          expand: true,
          ext: '.html'  
        }]
      }
    },

    concat:{
      dist:{
        src:['modules/_base/javascript/build/PageConfig.js','modules/blocks/**/javascript/*','modules/_base/javascript/build/utilities/*','modules/_base/javascript/build/main.js'],
        dest:'modules/_base/javascript/concat.js'
      }
    },

    //Javascript
    babel:{
      dist:{
        files:{
          'modules/_base/javascript/project.js':'modules/_base/javascript/concat.js'
        }
      }
    },
    //SCSS
    sass_import: {
      dist: {
        files: {
          'project_temp.scss': ['modules/_base/scss/_bootstrap.scss','modules/blocks/**/scss/*','modules/blocks/**/scss/modifiers/*']
        }
      },
    },

    sass: {
      options: {

      },
      dist: {
        files: {                        
          'modules/_base/css/project.css': 'project_temp.scss'     
        }
      }
    },

    compass: {
      options: {

      },
      dist: {
        files: {                        
          'modules/_base/css/project.css': 'project_temp.scss'     
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [mq4HoverShim.postprocessorFor({ hoverSelectorPrefix: '.bs-true-hover ' })]
      },
      core: {
        src: 'modules/_base/css/*.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 35',
        'Firefox >= 31',
        'Explorer >= 9',
        'iOS >= 7',
        'Opera >= 12',
        'Safari >= 7.1'
        ]
      },
      core: {
        options: {
          map: true
        },
        src: 'modules/_base/css/*.css'
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        sourceMap: true,
        noAdvanced: true
      },
      core: {
        files: [
        {
          expand: true,
          cwd: 'modules/_base/css',
          src: ['*.css', '!*.min.css'],
          dest: 'modules/_base/css',
          ext: '.min.css'
        }
        ]
      }
    },
    csscomb: {
      options: {
        config: 'grunt/scss/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'modules/_base/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'modules/_base/css/'
      }
    },

    watch: {
      sass: {
        files: 'modules/**/*.scss',
        tasks: 'compile-css'
      },
      js: {
        files: ['modules/**/*.js','!modules/_base/javascript/project.js'],
        tasks: 'compile-js'
      },
      jade:{
        files:'modules/**/*.jade',
        tasks: 'compile-jade'
      }

    },

  });

  require('load-grunt-tasks')(grunt);

  //SCSS Task
  grunt.registerTask('compile-css', ['clean:css','sass_import','sass', 'postcss:core', 'autoprefixer:core', 'csscomb:dist', 'cssmin:core']);
  //Javascript Task
  grunt.registerTask('compile-js', ['clean:js','concat','babel','clean:jsConcat']);
  //Jade task.
  grunt.registerTask('compile-jade', 'jade' );
  //Compile all
  grunt.registerTask('compile', ['compile-css','compile-js','compile-jade']);

};
