'use strict';

/**
 * Get and display all interfaces and their IP
 */
console.info('Interface list:');
var os = require('os');
var ifaces = os.networkInterfaces();
var availableIP = [];
for (var dev in ifaces) {
  var alias=0;
  ifaces[dev].forEach(function(details){
    if (details.family === 'IPv4') {
      availableIP[dev] = details.address;
console.info('----- '+dev+(alias?':'+alias:''), details.address);
      ++alias;
    }
  });
}

/**
 * General IP to use
 */
var myIP = availableIP.en0;

/**
 * GRUNTFILE
 */
module.exports = function (grunt) {

  /**
  * Load grunt tasks automatically
  * Read the dependencies/devDependencies/peerDependencies in the package.json
  * and load grunt tasks that match the provided patterns.
  */
  require('load-grunt-tasks')(grunt, {
    // pattern: 'grunt-*',
    config: 'package.json',
    scope: ['dependencies', 'devDependencies']
  });

  /**
   * Time how long tasks take.
   * Can help when optimizing build times
   */
  require('time-grunt')(grunt);

  /**
   * Define the configuration for all the tasks
   */
  grunt.initConfig({

    /**
     * Watces files for changes and runs tasks based on the changed files
     */
    watch: {
      options: {
          nospawn: true, // Will be 'spawn: false' in v6.x
          livereload: true
      },
      js: {
        files: ['app/js/**/*.{js,hbs}'],
        tasks: [],
        option: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: 'app/scss/**/*.scss',
        tasks: ['sass:dist']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>' // Reference to the Grunt server settings
        },
        files: [
          'app/**/*.html',
          'app/js/**/*.hbs',
          'app/images/**/*.{ico,gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    },

    /**
     * Grunt server settings
     */
    connect: {
      options: {
        hostname: myIP,
        livereload: 35729,
        port: 9000,
        protocol: 'http' // Protocol used
      },
      livereload: {
        options: {
          open: true,
          base: 'app'
        }
      },
      dist: {
        options: {
          open: true,
          base: 'dist',
          livereload: false
        }
      },
      tests: {
        options: {
          port: 9001,
          open: false,
          base: '',
          livereload: false
        }
      }
    },

    /**
     * Empties folders to start fresh
     */
     clean: {
       dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    /**
     * C LIBSASS
     * Compiles Sass to CSS and generates necessary files if requested
     */
     sass: {
      options: {
        includePaths: [
          'app/bower_components/normalize-scss/'
        ],
        outputStyle: 'compressed', // 'nested' (default), 'compressed'
        sourceMap: true
      },
      dist: {
        files: {
          'app/css/main.css': 'app/scss/main.scss'
        }
      }
    },


    /**
     * Remove unnecessary bytes of PNG and JPG
     * using Yahoo Smushit
     * @type {Object}
     */
    smushit: {
      app: {
        src: 'app/images/'
      },
      dist: {
        src: 'dist/images/'
      }
    },

    /**
     * USEMIN PREPARE
     * @type {Object}
     */
    useminPrepare: {
      html: 'app/index.html',
      options: {
        staging: '.tmp',
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/**/*.html'],
      css: ['dist/css/**/*.css'],
      options: {
        dirs: ['dist']
      }
    },

     /**
     * Copies remaining files to places other tasks can use
     * dist: simple frontend distribution
     * laravel: dispach all nessecary files in their right location
     * 					into the laravel folder
     */
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',    // From
          dest: 'dist',  // To
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/**/*.{ico,png,txt,webp}',
            '{,*/}*.html',
            '*.html',
            // 'js/{,*/}*.*', // No need, all Angular app will be wrapped in app.js
            'css/{,*/}*.*',
            'fonts/{,*/}*.*'
          ]
        }]
      }
    },

    /**
     * jshint
     * Check the integrity design of code
     */
     jshint: {
      options: {
        ignores: 'app/bower_components/',
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'app/js/**/*.js'
      ]
    },

    /**
     * Tests with Jasmine
     * Coverage with Istanbul
     */
    jasmine: {
      app: {
        options: {
          specs: 'app/tests/**/*.js',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'coverage/data.json',
            report: 'coverage'
          },
          vendor: [
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/bootstrap/dist/js/bootstrap.js'
          ]
        },
        src: 'app/js/angular/**/*.js'
      }
    }


  });// END grunt.initConfig

  /**
   * SERVE TASK
   * Initializing the watch, copying styles and start compass.
   * Lunch the local server and open the app in the browser.
   */
  grunt.registerTask('server', function (target) {

    // $ grunt server:dist
    if(target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'connect:livereload',
      'watch'
    ]);
  });

  /**
   * BUILD TASK
   */
  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist',
    'useminPrepare',
    'usemin',
    'smushit:dist',
    'clean:server'
  ]);

  /**
   * SCAN-JS
   * Scan the js with JSHINT
   */
  grunt.registerTask('scan-js', ['jshint']);

  /**
   * TEST
   * Test the js with JASMINE
   */
  grunt.registerTask('tests', 'Start web server for jasmine tests in browser', function(){
    grunt.task.run(['jasmine:app']);
  });

};
