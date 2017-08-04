/*
* grunt-cli
* http://gruntjs.com/
*
* Copyright (c) 2016 Tyler Kellen, contributors
* Licensed under the MIT license.
* https://github.com/gruntjs/grunt-init/blob/master/LICENSE-MIT
*/

'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            my_target: {
                files: {
                    'web/js/general.min.js': ['build/js/**/*.js']
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'web/css/general.min.css': ['build/css/**/*.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('css', ['cssmin']);
    grunt.registerTask('js', ['uglify']);
};
