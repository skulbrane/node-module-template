'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cfg: grunt.file.readJSON('app-config.json'),
        traceur: {
            options: {
                includeRuntime: true,
                traceurOptions: '<%= cfg.traceur.options.traceurOptions %>'
            },
            src: {
                files: {
                    "<%= cfg.traceur.src.output %>": ["<%= cfg.traceur.src.input %>"]
                }
            },
            arrow_func: {
                files: {
                    'dist/arrow_func.trcr.js': ['src/arrow_func.js']
                }
            }
        },
        clean: {
            safe: {
                options: {
                    "force": false,
                    "no-write": true
                },
                src: ["dist/*.js"]
            },
            live: {
                options: {
                    "force": false,
                    "no-write": false
                },
                src: ["dist/*.js"]
            },
            force: {
                options: {
                    "force": true,
                    "no-write": false
                },
                src: ["dist/*.js"]
            }
        },
        shell: {
            make_dir: {
                command: function(dir) {
                    // TODO: Path validation?
                    return 'mkdir ' + dir;
                }
            }
        },
        jsonlint: {
            verify_json: {
                src: ['*.json']
            }
        },
        jshint: {
            options: {
                "jshintrc": ".jshintrc",
                "extensions": "es6",
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', 'main.js', '<%= cfg.src_all_js %>', '<%= cfg.lib_all_js %>'],
            src: ['<%= cfg.src_all_js %>'],
            lib: ['<%= cfg.lib_all_js %>'],
            with_overrides: {
                options: {
                    reporter: require('jshint-stylish'),
                    esnext: false,
                    browser: true,
                    globals: {
                        jQuery: true
                    },
                },
                files: {
                    src: ['Gruntfile.js', 'main.js', '<%= cfg.src_all_js %>', '<%= cfg.lib_all_js %>']
                }
            }
        }
    });


    var cfg = grunt.file.readJSON('app-config.json');

    grunt.loadNpmTasks("grunt-traceur-simple");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-jsonlint");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTask("default", ["jsonlint:verify_json", "jshint:all", "traceur:src"]);

    // grunt-traceur-simple
    grunt.registerTask("build", ["traceur:src"]);

    // grunt-contrib-clean
    grunt.registerTask('build-clean', ['clean:live']);

    // grunt-shell
    var testdir = cfg.shell.make_dir.test_dir;
    grunt.registerTask('make-dirs', ['shell:make_dir:'+testdir]);

    // grunt-jsonlint
    grunt.registerTask('lint-json', ['jsonlint:verify_json']);

    // grunt-contrib-jshint
    grunt.registerTask('lint-js', ['jshint:all']);



};
