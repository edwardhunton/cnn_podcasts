/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      js: ['./src/javascripts/main.js']
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
        src: ['./src/javascripts/*.js'],
        dest: './dist/javascripts/app/main.js',
      },
      src: {
        src: ['./src/javascripts/*.js'],
        dest: './src/javascripts/app/main.js',
      }

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
          src: '././stylesheets/css/main.css',
          dest: './dist',
          ext: '.css'
        }]
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
    },
    watch: {
      scripts: {
        files: ['./src/javascripts/*.js'],
        tasks: ['clean','concat'],
        options: {
          spawn: true,
          livereload: true
        }
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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Default task.
  grunt.registerTask('default', [ 'clean', 'concat', 'uglify', 'cssmin','htmlmin', 'copy', 'watch']);

};
