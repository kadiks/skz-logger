/**
 * Require JS loader config that will be used for building
 */
"use strict;";

var
  cfg = {
    baseUrl : '../../../../../src', //Path from the HTML to the "src" folder
    paths : {},
    shim : {},
    urlArgs : 'bust=' +  (new Date()).getTime()
  }
, launcherFilePath = '../cfg/launcher/bms' //Path from the "src" to the launcher file
;


/* start-unittest */
cfg.baseUrl = '../../src';
cfg.paths.jasmine = '../lib/jasmine/1.3.1/jasmine';
cfg.paths.domReady = '../lib/requirejs/2.1.9/domReady';
cfg.shim.jasmine = {
  deps : []
, exports : 'jasmine'
};
launcherFilePath = null;
/* end-unittest */


requirejs.config(cfg);
if(launcherFilePath) {
  define([launcherFilePath]);
}
