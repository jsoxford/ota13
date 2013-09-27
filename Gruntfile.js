module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    clean: {
      pre:  ['collector-dist'],
      post: ['collector-dist/index.css','collector-dist/*.index.js','collector-dist/*.lib.js'],
    },

    copy: {
      main: {
        src: 'collector/*',
        dest: 'collector-dist/',
        flatten: true,
        expand: true
      },
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'collector-dist/',
        src: ['*.css', '!*.min.css'],
        dest: 'collector-dist/',
        // ext: '.min.css'
      }
    },

    replacer: {
        index: {
            options : {
                replace: {
                    '<link rel="stylesheet" type="text/css" href="index.css">' : '<style type="text/css"><%= grunt.file.read("collector-dist/index.css") %></style>',
                    '<script ' : '<script async="true" '
                }
            },
            files : [
                {src: ['collector-dist/index.html'], dest: 'collector-dist/index.html'}
            ]
        }
    },

    useminPrepare: {
      html: 'collector-dist/index.html'
    },

    usemin:{
      html: 'collector-dist/index.html',
      css: 'collector-dist/index.css',
    },

    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      assets: {
        files: [{
          src: [
            'collector-dist/*.{jpg,jpeg,gif,png,js}',
            'collector-dist/*.{eot,svg,ttf,woff}'
          ]
        }]
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-replacer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-rev');

  // Default task(s).
  grunt.registerTask('default', 'clean:pre copy cssmin useminPrepare concat uglify rev usemin replacer clean:post'.split(' '));

};