/**
 * Documentation needed and used:
 * 
 * Grunt: http://gruntjs.com/
 * Run Grunt, PhantomJS, requireJS and jasmine separately: http://hdnrnzk.me/2013/01/10/backbone-requirejs-jasmine-phantomjs-and-grunt/
 */

module.exports = function(grunt) {
  
  var
    _APP_CONFIG_PATH_ = 'config/app.json'
  , appConfig = grunt.file.readJSON(_APP_CONFIG_PATH_)
  ;
  
  var
    spawn = require("child_process").spawn
  , serverProcess = null //Initialized in "grunt:initServer"
  ;
  
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json')
  , connect : {
      server: {
        options : {
          port: 8000,
          base: '.'
        }
      }
    }
  , jasmine : {
      all : {
        src : ['src/*.js']
      , options : {
          specs : ['test/unit/spec/*Test.js']
        }
      }
    }
  , requirejs : {
      options : {
        baseUrl : './src'
      , generateSourceMaps : false
      , name : 'SKZ/Logger'
      //, namespace : 'SKZ'
      //, mainConfigFile : 'config/build/auto_main.js' //Generated automatically by strip_code:unittest
      , optimize : 'uglify2'
      , preserveLicenseComments : false
      , uglify2 : {
          output : {
            beautify : true
          }
        , mangle : false
        }
      , useSourceUrl : false
      , useStrict : true
      }
    , dev_web : {
        options : {
          out : 'dist/skz.logger-<%= pkg.version %>.js'
        }
      }
    , prod_web : {
        options : {
          uglify2 : {
            output : {
              beautify : false
            }
          }
        , out : 'dist/skz.logger-<%= pkg.version %>.min.js'
        }
      }
    }
  , shell : {
      generateDoc : {
        command : 'jsduck --config=./config/doc/config.json'
      , options : {
          stdout : true
        }
      }
    , testweb : { //TODO Put host and port in config/app.json
        command : './node_modules/phantomjs/bin/phantomjs ./lib/phantomjs/run-jasmine.js http://localhost:8000/test/unit/main.html'
      , options : {
          stdout : true
        }
      }
    , copyreadme : {
        command : 'cp config/doc/pages/guides/getting_started/README.md README.md'
      , options : {
          stdout : true
        }
      }
    , gitadd : {
        command : 'git add .'
      , options : {
          stdout : true
        }
      }
    , gitcommit : {
        command : 'git commit -m "Auto commit <%= appConfig.revision %>"'
      , options : {
          stdout : true
        }
      }
    , gitpush : {
        command : 'git push -u origin master'
      , options : {
          stdout : true
        }
      }
    }
  , strip_code : {
      //unittest : {
        options : {
          start_comment : 'start-unittest'
        , end_comment : 'end-unittest'
        }
      , files : { src : 'config/build/main.js', dest : 'config/build/auto_main.js' }
      //}
    }
  , usebanner : {
      web : {
        options : {
          position : 'top'
        , banner : "/**\n" +
                   " * <%= pkg.name %> v<%= pkg.version %> [<%= grunt.template.today('dd/mm/yyyy') %> r<%= appConfig.revision %>]\n *\n" +
                   " * <%= pkg.description %>\n *\n" +
                   " * © 2013-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %> - <%= pkg.author.url %>\n" +
                   " */"
        }
      , files : { src : 'dist/*.js' }
      }
    }
  , watch : {
      unittest : {
        files : ['src/**/*.js', 'test/unit/spec/*Test.js']
      , tasks : ['testweb']
      , options : {
          interrupt : true //stops the previous process and start a new one
        , spawn : false //Put to false, otherwise, concurrent tasks are proned to fail
        }
      }
    }
  });
  
  //Load tasks
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-strip-code');
  grunt.loadNpmTasks('grunt-template-jasmine-istanbul');
  
  //Register tasks available to the cli
  grunt.registerTask('default', ['connect:server', 'watch']); //Will run with no argument after
  grunt.registerTask('testweb', ['shell:testweb', 'checkToBeDist']);
  grunt.registerTask('checkToBeDist', 'Check if all tests are passed to compile', function() {
    
    //Reads "dump/unittest.txt" and see if it has passed, then run "requirejs:compile" task
    var
      unitTestReport = grunt.file.readJSON('dump/unittest.json')
    , testSuiteName = unitTestReport.suites[0].description
    ;
    
    if(unitTestReport.passed === true) {
      grunt.log.ok(testSuiteName + ' test suite has passed');
      incrementRevisionNumber();
      //grunt.log.ok(grunt);
      grunt.config.set('appConfig', grunt.file.readJSON(_APP_CONFIG_PATH_));
      grunt.task.run('build');
    } else {
      grunt.log.ok(testSuiteName + ' test suite has failed');
    }
  });
  grunt.registerTask('deleteBuildFiles', 'Delete all generated files', function() {
    var
      filesToBeDeleted = []
    , filesLength = 0
    ;
    //List all "auto_*.js" files
    grunt.file.recurse('./config/build/', function(abspath, rootdir, subdir, filename) {
      if(filename.match(/^auto_/i)) {
        filesToBeDeleted.push(rootdir + filename);
      }
    });
    
    //List all dump files
    grunt.file.recurse('./dump/', function(abspath, rootdir, subdir, filename) {
      filesToBeDeleted.push(rootdir + filename);
    });
    
    filesLength = filesToBeDeleted.length;
    
    for(var i = 0; i < filesLength; i++) {
      grunt.file.delete(filesToBeDeleted[i]);
    }
  });
  grunt.registerTask('build', ['strip_code', 'requirejs:dev_web', 'requirejs:prod_web', 'usebanner:web', 'shell:generateDoc', 'shell:copyreadme', 'deleteBuildFiles', 'autoCommit']);
  grunt.registerTask('autoCommit', 'Auto commit to SCM', function(){
    grunt.config.set('appConfig', grunt.file.readJSON(_APP_CONFIG_PATH_));
    grunt.task.run('shell:gitadd');
    grunt.task.run('shell:gitcommit');
    grunt.task.run('shell:gitpush');
  });
  
  //Specific function for SKZ builder
  function incrementRevisionNumber() {
    var
      curRev = null
    , rev = null
    , appConfig = grunt.file.readJSON(_APP_CONFIG_PATH_)
    ;
    grunt.log.ok(JSON.stringify(appConfig));
    curRev = appConfig.revision;
    rev = curRev + 1;
    
    appConfig.revision = rev;
    
    grunt.file.write(_APP_CONFIG_PATH_, JSON.stringify(appConfig));
    
  }
  
  function updateAppConfig() {
    return grunt.file.readJSON(_APP_CONFIG_PATH_);
  }
  
};
