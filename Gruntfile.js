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
        }
    });


    var cfg = grunt.file.readJSON('app-config.json');

    grunt.loadNpmTasks("grunt-traceur-simple");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-jsonlint");

    grunt.registerTask("default", ["traceur:src", "jsonlint:verify_json"]);

    // grunt-traceur-simple
    grunt.registerTask("build", ["traceur:src"]);

    // grunt-contrib-clean
    grunt.registerTask('build-clean', ['clean:live']);

    // grunt-shell
    var testdir = cfg.shell.make_dir.test_dir;
    grunt.registerTask('make-dirs', ['shell:make_dir:'+testdir]);

    // grunt-jsonlint

};
