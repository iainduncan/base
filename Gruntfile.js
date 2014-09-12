module.exports = function(grunt) {

    // All configuration goes here 
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Minify JS files

        uglify: {
            production: {
              files: {
                'src/js/main.min.js': ['src/js/main.js' ]
              }
            }
        },

        // Concatanate files

        concat: {
            html5respond: {
                src: [
                    'src/js/vendor/html5shiv.min.js', 
                    'src/js/vendor/respond.min.js'
                ],
                dest: 'public/js/html5-respond.min.js',
            },
            production: { 
                src: [
                    'src/js/vendor/jquery-1.11.1.min.js',
                    'src/js/vendor/bootstrap/bootstrap.min.js',
                    'src/js/vendor/jquery.tinysort-1.5.6.min.js',
                    'src/js/main.min.js',
                ],
                dest: 'public/js/production.min.js',
            }
        },


        // Process CSS to LESS and minify
        
        less: {
          production: {
            options: {
                paths: ['public/css'],
                cleancss: true, // minify using cleancss plugin
            },
            files: {
              // target.css file: source.less file
              'public/css/styles.css': 'src/less/styles.less'
            }
          }
        },

        // Insert includes & buid HTML to pubic directory

         includes: {
          build: {
            files: [{ 
              expand: true,     // Enable dynamic expansion.
              cwd: 'src/html/',      // Src matches are relative to this path.
              src: ['*.html', '**/*.html'], // Actual pattern(s) to match.
              dest: 'public/' 
            }],
            options: {
              includePath: 'src/html/includes',
            }
          }
        },

        // Minify images, only runs via a Newer Watch task or manually 

        imagemin: {
            dynamic: {
              files: [{
                expand: true,
                cwd: 'src/img/',
                src: ['*.{png,jpg,gif}', '**/*.{png,jpg,gif}'],
                dest: 'public/img/'
              }]
            }
        },

        htmlmin: {                                     // Task
          dist: {                                      // Target
            options: {                                 // Target options
              removeComments: true,
              collapseWhitespace: true,
            },
            files: [
              {expand: true, cwd: 'public', src: ['*.html','**/*.html'], dest: 'public/'},
            ]
          }
        },

        // Delete unwanted build directories

        clean: ['public/includes'],

        // Watch tasks

        watch: {
          uglify: {
            files: ['src/js/main.js'], // which files to watch
            tasks: ['uglify'],
            options: {
              spawn: false,
            },
          },
          // concat: {
          //   files: ['src/js/main.min.js'], // which files to watch
          //   tasks: ['newer:concat'],
          //   options: {
          //     spawn: false,
          //   },
          // },
          styles: {
            files: ['src/less/*.less', 'src/less/**/*.less'], // which files to watch
            tasks: ['less'],
            options: {
              livereload: true,
              spawn: false,
            },
          },
          imagemin: {
            files: ['src/img/*.{png,jpg,gif}', 'src/img/**/*.{png,jpg,gif}', 'src/img/**/**/*.{png,jpg,gif}'], // which files to watch
            tasks: ['newer:imagemin:dynamic'], // Newer plugin only applies compression to new files to save build time
            options: {
              spawn: false,
            },
          },
          includes: {
              files: ['src/html/*.html', 'src/html/**/*.html'], // which files to watch
              tasks: ['includes'],
              options: {
                livereload: true,
                spawn: false,
              },
            },
          htmlmin: {
              files: ['src/html/*.html', 'src/html/**/*.html'], // which files to watch
              tasks: ['htmlmin'],
              options: {
                livereload: true,
                spawn: false,
              },
            },
          clean: {
            files: ['src/html/*.html', 'src/html/**/*.html'], // which files to watch
            tasks: ['clean'],
            options: {
              spawn: false,
            },
          }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-uglify'); // add below if you want to run this task
      grunt.loadNpmTasks('grunt-contrib-less');
      grunt.loadNpmTasks('grunt-includes');
      grunt.loadNpmTasks('grunt-contrib-htmlmin');
      grunt.loadNpmTasks('grunt-contrib-imagemin');
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-newer');


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['uglify', 'concat', 'less', 'includes', 'htmlmin', 'clean', 'watch']);

};