/**
 * Taken from: https://github.com/ariya/phantomjs/blob/master/examples/run-jasmine.js
 */
var system = require('system');
var fs = require('fs'); //PhantomJS fs module, not Node -- Added by kadiks
/**
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param onReady what to do when testFx condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3001, //< Default Max Timeout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 100); //< repeat check every 100ms
};

//Start - Added by kadiks
function writeTo(content) {
  //console.log('#writeTo');
  var
    fs = require('fs')
  , rootPath = fs.workingDirectory
  , reportFilePath = [rootPath,'dump', 'unittest.json'].join(fs.separator)
  , testSuiteName = content.suites[0].description;
  ;
  try {
   //console.log(reportFilePath);
   fs.write(reportFilePath, JSON.stringify(content, undefined, 2), 'w');
   console.log(testSuiteName + ' test suite report saved in ' + reportFilePath);
 } catch(e) {
   console.log('#writeTo File write error:', e);
 }
}
//End - Added by kadiks


if (system.args.length !== 2) {
    console.log('Usage: run-jasmine.js URL');
    phantom.exit(1);
}

var page = require('webpage').create();

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open(system.args[1], function(status){
    if (status !== "success") {
        console.log("Unable to access network");
        phantom.exit();
    } else {
        waitFor(function(){
            return page.evaluate(function(){
                return document.body.querySelector('.symbolSummary .pending') === null
            });
        }, function(){
            var exitCode = page.evaluate(function(){
                console.log('');
                console.log(document.body.querySelector('.description').innerText);
                var list = document.body.querySelectorAll('.results > #details > .specDetail.failed');
                if (list && list.length > 0) {
                  console.log('');
                  console.log(list.length + ' test(s) FAILED:');
                  for (i = 0; i < list.length; ++i) {
                      var el = list[i],
                          desc = el.querySelector('.description'),
                          msg = el.querySelector('.resultMessage.fail');
                      console.log('');
                      console.log(desc.innerText);
                      console.log(msg.innerText);
                      console.log('');
                  }
                } else {
                  console.log(document.body.querySelector('.alert > .passingAlert.bar').innerText);
                }
              return jasmine.getJSReport(); //From the added library jasmine-reporter.js
            });
            //Start - Added by kadiks
           //Get the report as JSON and save it to file
           writeTo(exitCode); 
           //End - Added by kadiks
            phantom.exit();
        });
    }
});