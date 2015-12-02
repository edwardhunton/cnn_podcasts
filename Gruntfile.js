/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

remove: {

  fileList: ['./src/javascripts/main.js'],

},

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },


      },
      beforeconcat: ['./src/javascripts/*.js'],
      gruntfile: {
        src: 'Gruntfile.js',

      },

    },
    concat: {

      dist: {
        src: ['./src/javascripts/*'],
        dest: './dist/javascripts/main.js',
      },
      dist: {
        src: ['./src/javascripts/*'],
        dest: './src/javascripts/main.js',
      },
    },
    uglify: {
      my_target: {
        files: {
          './dist/javascripts/main.js': ['././dist/javascripts/main.js']
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ['stylesheets/css/main.css'],
          dest: './dist',
          ext: '.css'
        }]
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          './dist/index.html': './src/index.html'
        }
      }
    }, copy: {
      main: {
        files: [
          // includes files within path


          {expand: true, src: ['proxy.php'], dest: './dist', filter: 'isFile'},

        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-remove');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Default task.
  grunt.registerTask('default', [ 'remove', 'concat', 'uglify', 'cssmin','htmlmin', 'copy','jshint']);

};
