module.exports = function(grunt) {

    // load tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // setup init config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        originals_dir: 'originals',
        tmp_dir: '.tmp',
        output_dir_templates: 'templates',
        output_dir_resources: 'resources',
        output_dir_grunticons: 'icons',
        output_dir_fonts: 'fonts',

        clean: {
            ready: [
                '<%= output_dir_templates %>', 
                '<%= output_dir_resources %>', 
                '<%= output_dir_grunticons %>', 
                '<%= output_dir_fonts %>', 
                '<%= tmp_dir %>'
            ]
        }, copy: {
            ready: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= originals_dir %>/css',
                    dest: '<%= tmp_dir %>/css',
                    src: [ '*.css' ],
                    filter: 'isFile'
                },{
                    expand: true,
                    dot: true,
                    cwd: '<%= originals_dir %>/js',
                    dest: '<%= tmp_dir %>/js',
                    src: [ '*.js' ],
                    filter: 'isFile'
                },{
                    expand: true,
                    dot: true,
                    cwd: '<%= originals_dir %>/templates',
                    dest: '<%= output_dir_templates %>',
                    src: [ '*' ],
                    filter: 'isFile'
                },{
                    expand: true,
                    dot: true,
                    cwd: '<%= originals_dir %>/fonts',
                    dest: '<%= output_dir_fonts %>',
                    src: [ '*' ],
                    filter: 'isFile'
                }]
            }
        }, less: {
            css: {
                files: {
                    "<%= tmp_dir %>/css/*.css": "<%= originals_dir %>/less/*.less"
                }
            }
        }, coffee: {
            glob_to_multiple: {
                expand: true,
                cwd: '<%= originals_dir %>/coffee',
                src: ['*.coffee'],
                dest: '<%= tmp_dir %>/js',
                ext: '.js'
            }
        }, uglify: {
            '<%= output_dir_resources %>/local.min.js': ['<%= tmp_dir %>/js/*.js']
        }, cssmin: {
            '<%= output_dir_resources %>/local.min.css': ['<%= tmp_dir %>/css/*.css']
        }, rev: {
            assets: {files: [{src: ['<%= output_dir_resources %>/*'] }] }
        }, usemin: {
            html: ['<%= output_dir_templates %>/*.html']
        }, grunticon: {
            svgs: {
                options: {
                    src: '<%= originals_dir %>/svg+png',
                    dest: '<%= output_dir_grunticons %>'
                }
            }
        }, combine:{
            multiple:{
                input: ['<%= output_dir_templates %>/html.html'],
                output: '<%= output_dir_templates %>/',
                tokens:[{
                    token: '##grunticons_loader##',
                    file: '<%= output_dir_grunticons %>/grunticon.loader.txt'
                }]
            }
        },
    });

    grunt.registerTask('default', [
      'clean', 'copy',
      'grunticon',
      'less', 'cssmin',
      'coffee', 'uglify',
      'rev', 'usemin',
      'combine'
    ]);
};
