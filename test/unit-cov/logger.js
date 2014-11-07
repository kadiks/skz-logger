
// instrument by jscoverage, do not modifly this file
(function (file, lines, conds, source) {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (BASE._$jscoverage) {
    BASE._$jscmd(file, 'init', lines, conds, source);
    return;
  }
  var cov = {};
  /**
   * jsc(file, 'init', lines, condtions)
   * jsc(file, 'line', lineNum)
   * jsc(file, 'cond', lineNum, expr, start, offset)
   */
  function jscmd(file, type, line, express, start, offset) {
    var storage;
    switch (type) {
      case 'init':
        if(cov[file]){
          storage = cov[file];
        } else {
          storage = [];
          for (var i = 0; i < line.length; i ++) {
            storage[line[i]] = 0;
          }
          var condition = express;
          var source = start;
          storage.condition = condition;
          storage.source = source;
        }
        cov[file] = storage;
        break;
      case 'line':
        storage = cov[file];
        storage[line] ++;
        break;
      case 'cond':
        storage = cov[file];
        storage.condition[line] ++;
        return express;
    }
  }

  BASE._$jscoverage = cov;
  BASE._$jscmd = jscmd;
  jscmd(file, 'init', lines, conds, source);
})('../../test/unit/logger.js', [1,4,5,63,105,134,146,158,348,6,12,29,7,10,13,19,22,26,27,30,35,38,42,45,49,59,60,64,70,81,95,65,68,71,75,79,82,86,89,93,96,100,102,106,113,124,107,111,114,118,122,125,129,131,135,136,140,143,147,148,152,155,159,165,171,187,207,230,256,269,282,295,308,321,334,160,163,166,169,172,176,180,185,188,192,195,199,205,208,212,215,218,222,228,231,235,238,241,244,248,254,257,260,263,267,270,273,276,280,283,286,289,293,296,299,302,306,309,312,315,319,322,325,328,332,335,338,341,345,349,355,364,373,382,389,396,475,489,503,350,353,356,359,362,365,368,371,374,377,380,383,386,387,390,393,394,397,406,415,425,435,445,455,465,398,401,404,407,410,413,416,419,422,426,429,432,436,439,442,446,449,452,456,459,462,466,469,472,476,477,480,483,486,490,491,494,497,500,504], {"111_13_18":0,"131_13_18":0,"163_13_40":0,"163_58_9":0,"169_13_22":0,"169_40_9":0,"486_17_19":0,"486_41_9":0,"500_17_19":0,"500_41_9":0}, ["var","    should = require('should');","","describe('Logger', function() {","    describe('Class', function() {","        it('should be defined', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.should.be.ok;","        });","        it('has independant instances (!singleton)', function() {","            var","                Logger = require('../../src/logger'),","                logger1 = new Logger(),","                logger2 = new Logger(),","                valueToTest1 = 3,","                valueToTest2 = 5;","            logger1.setLevel({","                level: valueToTest1","            });","            logger2.setLevel({","                level: valueToTest2","            });","","            logger1.getLevel().should.eql(valueToTest1);","            logger2.getLevel().should.eql(valueToTest2);","        });","        it('has independant prefixes', function() {","            var","                Logger = require('../../src/logger'),","                logger1 = new Logger(),","                logger2 = new Logger();","","            logger1.setPrefix({","                prefix: 'logger1'","            });","            logger2.setPrefix({","                prefix: 'logger2'","            });","","            logger1.setLevel({","                level: 1","            });","            logger2.setLevel({","                level: 1","            });","","            var","                res1 = logger1._buildMessage({","                    msg: ['msg1'],","                    level: 1","                }),","                res2 = logger2._buildMessage({","                    msg: ['msg2'],","                    level: 1","                });","","            res1.should.eql(['[logger1]', '[DEBUG]:', 'msg1']);","            res2.should.eql(['[logger2]', '[DEBUG]:', 'msg2']);","        });","    });","    describe('level', function() {","        it('level is 0 by default', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.getLevel().should.eql(0);","        });","        it('getter/setter for level are working', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger(),","                valueToTest = 2;","            logger.setLevel({","                level: valueToTest","            });","","            logger.getLevel().should.eql(valueToTest);","        });","        it('cannot be set to a value higher than the possible levels', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger(),","                valueToTest = 0;","            logger.setLevel({","                level: valueToTest","            });","            logger.setLevel({","                level: 14","            });","","            logger.getLevel().should.eql(valueToTest);","        });","        it('cannot be set to a wrong value', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger(),","                valueToTest = 0;","            logger.setLevel();","","            logger.getLevel().should.eql(0);","        });","    });","    describe('prefix', function() {","        it('is null by default', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","","            (logger.getPrefix() === null).should.be.true;","        });","        it('is set as string', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger(),","                valueToTest = 'Prefix';","            logger.setPrefix({","                prefix: valueToTest","            });","","            logger.getPrefix().should.eql(valueToTest);","        });","        it('return null if not set the right way', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger(),","                valueToTest = 'Prefix';","            logger.setPrefix();","","            (logger.getPrefix() === null).should.be.true;","        });","    });","    describe('#get/setAppId', function() {","        it('sets the app ID', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger(),","                valueToTest = 'APPNAME';","            logger.setAppId({","                appId: valueToTest","            });","            logger.getAppId().should.eql(valueToTest);","        });","    });","    describe('#get/setUID', function() {","        it('sets the UID', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger(),","                valueToTest = 'ID-123456';","            logger.setUID({","                uid: valueToTest","            });","            logger.getUID().should.eql(valueToTest);","        });","    });","    describe('#_buildMessage', function() {","        it('returns null if level is not set', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            (logger._buildMessage('message to build') === undefined).should.be.true;","        });","        it('returns null if level is not set', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            (logger._buildMessage() === undefined).should.be.true;","        });","        it('builds a debug message', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","","            logger.setLevel({","                level: 1","            });","","            var res = logger._buildMessage({","                msg: ['message to build'],","                level: 1","            });","","            res.should.eql(['[DEBUG]:', 'message to build']);","        });","        it('displays debug message with prefix', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","","            logger.setLevel({","                level: 1","            });","            logger.setPrefix({","                prefix: 'test/unit/Core/LoggerTest'","            });","","            var","                res = logger._buildMessage({","                    msg: ['message to build'],","                    level: 1","                });","","            res.should.eql(['[test/unit/Core/LoggerTest]', '[DEBUG]:', 'message to build']);","        });","        it('displays debug message with the prefix and app id', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","","            logger.setLevel({","                level: 1","            });","            logger.setPrefix({","                prefix: 'test/unit/Core/LoggerTest'","            });","            logger.setAppId({","                appId: 'APPNAME'","            });","","            var","                res = logger._buildMessage({","                    msg: ['message to build'],","                    level: 1","                });","","            res.should.eql(['[APPNAME]', '[test/unit/Core/LoggerTest]', '[DEBUG]:', 'message to build']);","        });","        it('displays debug message with the prefix, uid and app id', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","","            logger.setLevel({","                level: 1","            });","            logger.setPrefix({","                prefix: 'test/unit/Core/LoggerTest'","            });","            logger.setAppId({","                appId: 'APPNAME'","            });","            logger.setUID({","                uid: 'ID-123456'","            });","","            var","                res = logger._buildMessage({","                    msg: ['message to build'],","                    level: 1","                });","","            res.should.eql(['[APPNAME]', '[ID-123456]', '[test/unit/Core/LoggerTest]', '[DEBUG]:', 'message to build']);","        });","        it('displays an info message', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.setLevel({","                level: 1","            });","            var res = logger._buildMessage({","                msg: ['message to build'],","                level: 2","            });","            res.should.eql(['[INFO]:', 'message to build']);","        });","        it('displays a notice message', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.setLevel({","                level: 1","            });","            var res = logger._buildMessage({","                msg: ['message to build'],","                level: 3","            });","            res.should.eql(['[NOTICE]:', 'message to build']);","        });","        it('displays a warning message', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.setLevel({","                level: 1","            });","            var res = logger._buildMessage({","                msg: ['message to build'],","                level: 4","            });","            res.should.eql(['[WARNING]:', 'message to build']);","        });","        it('displays an error message', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.setLevel({","                level: 1","            });","            var res = logger._buildMessage({","                msg: ['message to build'],","                level: 5","            });","            res.should.eql(['[ERROR]:', 'message to build']);","        });","        it('displays a critical message', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.setLevel({","                level: 1","            });","            var res = logger._buildMessage({","                msg: ['message to build'],","                level: 6","            });","            res.should.eql(['[CRITICAL]:', 'message to build']);","        });","        it('displays an alert message', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.setLevel({","                level: 1","            });","            var res = logger._buildMessage({","                msg: ['message to build'],","                level: 7","            });","            res.should.eql(['[ALERT]:', 'message to build']);","        });","        it('displays an emergency message', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.setLevel({","                level: 1","            });","            var res = logger._buildMessage({","                msg: ['message to build'],","                level: 8","            });","            res.should.eql(['[EMERGENCY]:', 'message to build']);","        });","    });","    describe('transporter', function() {","        it('sets to console by default', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.getTransporter().should.eql('console');","        });","        it('getter/setter1 work', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.setTransporter({","                transporter: 'window'","            });","            logger.getTransporter().should.eql('window');","        });","        it('sets ajax transporter', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.setTransporter({","                transporter: 'ajax'","            });","            logger.getTransporter().should.eql('ajax');","        });","        it('cannot be set to a value different from _transporters', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.setTransporter({","                transporter: 'weirdValue'","            });","            logger.getTransporter().should.eql('console');","        });","        it('cannot be set to a value different from _transporters', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.setTransporter('weirdValue');","            logger.getTransporter().should.eql('console');","        });","        it('cannot be set to a value different from _transporters', function() {","            var","                Logger = require('../../src/logger'),","                logger = new Logger();","            logger.setTransporter();","            logger.getTransporter().should.eql('console');","        });","        describe('console ', function() {","            it('sends a debug message', function() {","                var","                    Logger = require('../../src/logger'),","                    logger = new Logger();","                logger.setLevel({","                    level: 1","                });","                logger.debug('msg').should.be.true;","            });","            it('sends an info message', function() {","                var","                    Logger = require('../../src/logger'),","                    logger = new Logger();","                logger.setLevel({","                    level: 1","                });","                logger.info('msg').should.be.true;","            });","            it('sends a notice message', function() {","                var","                    Logger = require('../../src/logger'),","                    logger = new Logger();","                logger.setLevel({","                    level: 1","                });","                logger.notice('msg').should.be.true;","            });","","            it('sends a warning message', function() {","                var","                    Logger = require('../../src/logger'),","                    logger = new Logger();","                logger.setLevel({","                    level: 1","                });","                logger.warn('msg').should.be.true;","            });","","            it('sends an error message', function() {","                var","                    Logger = require('../../src/logger'),","                    logger = new Logger();","                logger.setLevel({","                    level: 1","                });","                logger.error('msg').should.be.true;","            });","","            it('sends an critical message', function() {","                var","                    Logger = require('../../src/logger'),","                    logger = new Logger();","                logger.setLevel({","                    level: 1","                });","                logger.critical('msg').should.be.true;","            });","","            it('sends an alert message', function() {","                var","                    Logger = require('../../src/logger'),","                    logger = new Logger();","                logger.setLevel({","                    level: 1","                });","                logger.alert('msg').should.be.true;","            });","","            it('sends an emergency message', function() {","                var","                    Logger = require('../../src/logger'),","                    logger = new Logger();","                logger.setLevel({","                    level: 1","                });","                logger.emergency('msg').should.be.true;","            });","        });","        describe('alert', function() {","            it('sends a debug messsage', function() {","                var","                    Logger = require('../../src/logger'),","                    logger = new Logger();","                logger.setLevel({","                    level: 1","                });","                logger.setTransporter({","                    transporter: 'alert'","                });","                (logger.debug('msg') === undefined).should.be.true;","            });","        });","        describe('documentWrite', function() {","            it('sends a debug messsage', function() {","                var","                    Logger = require('../../src/logger'),","                    logger = new Logger();","                logger.setLevel({","                    level: 1","                });","                logger.setTransporter({","                    transporter: 'documentWrite'","                });","                (logger.debug('msg') === undefined).should.be.true;","            });","        });","        describe('ajax', function() {","            it('does not send without setting server', function() {","","            });","        });","    });","});",""]);
_$jscmd("../../test/unit/logger.js", "line", 1);

var should = require("should");

_$jscmd("../../test/unit/logger.js", "line", 4);

describe("Logger", function() {
    _$jscmd("../../test/unit/logger.js", "line", 5);
    describe("Class", function() {
        _$jscmd("../../test/unit/logger.js", "line", 6);
        it("should be defined", function() {
            _$jscmd("../../test/unit/logger.js", "line", 7);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 10);
            logger.should.be.ok;
        });
        _$jscmd("../../test/unit/logger.js", "line", 12);
        it("has independant instances (!singleton)", function() {
            _$jscmd("../../test/unit/logger.js", "line", 13);
            var Logger = require("../../src/logger"), logger1 = new Logger(), logger2 = new Logger(), valueToTest1 = 3, valueToTest2 = 5;
            _$jscmd("../../test/unit/logger.js", "line", 19);
            logger1.setLevel({
                level: valueToTest1
            });
            _$jscmd("../../test/unit/logger.js", "line", 22);
            logger2.setLevel({
                level: valueToTest2
            });
            _$jscmd("../../test/unit/logger.js", "line", 26);
            logger1.getLevel().should.eql(valueToTest1);
            _$jscmd("../../test/unit/logger.js", "line", 27);
            logger2.getLevel().should.eql(valueToTest2);
        });
        _$jscmd("../../test/unit/logger.js", "line", 29);
        it("has independant prefixes", function() {
            _$jscmd("../../test/unit/logger.js", "line", 30);
            var Logger = require("../../src/logger"), logger1 = new Logger(), logger2 = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 35);
            logger1.setPrefix({
                prefix: "logger1"
            });
            _$jscmd("../../test/unit/logger.js", "line", 38);
            logger2.setPrefix({
                prefix: "logger2"
            });
            _$jscmd("../../test/unit/logger.js", "line", 42);
            logger1.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 45);
            logger2.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 49);
            var res1 = logger1._buildMessage({
                msg: [ "msg1" ],
                level: 1
            }), res2 = logger2._buildMessage({
                msg: [ "msg2" ],
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 59);
            res1.should.eql([ "[logger1]", "[DEBUG]:", "msg1" ]);
            _$jscmd("../../test/unit/logger.js", "line", 60);
            res2.should.eql([ "[logger2]", "[DEBUG]:", "msg2" ]);
        });
    });
    _$jscmd("../../test/unit/logger.js", "line", 63);
    describe("level", function() {
        _$jscmd("../../test/unit/logger.js", "line", 64);
        it("level is 0 by default", function() {
            _$jscmd("../../test/unit/logger.js", "line", 65);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 68);
            logger.getLevel().should.eql(0);
        });
        _$jscmd("../../test/unit/logger.js", "line", 70);
        it("getter/setter for level are working", function() {
            _$jscmd("../../test/unit/logger.js", "line", 71);
            var Logger = require("../../src/logger"), logger = new Logger(), valueToTest = 2;
            _$jscmd("../../test/unit/logger.js", "line", 75);
            logger.setLevel({
                level: valueToTest
            });
            _$jscmd("../../test/unit/logger.js", "line", 79);
            logger.getLevel().should.eql(valueToTest);
        });
        _$jscmd("../../test/unit/logger.js", "line", 81);
        it("cannot be set to a value higher than the possible levels", function() {
            _$jscmd("../../test/unit/logger.js", "line", 82);
            var Logger = require("../../src/logger"), logger = new Logger(), valueToTest = 0;
            _$jscmd("../../test/unit/logger.js", "line", 86);
            logger.setLevel({
                level: valueToTest
            });
            _$jscmd("../../test/unit/logger.js", "line", 89);
            logger.setLevel({
                level: 14
            });
            _$jscmd("../../test/unit/logger.js", "line", 93);
            logger.getLevel().should.eql(valueToTest);
        });
        _$jscmd("../../test/unit/logger.js", "line", 95);
        it("cannot be set to a wrong value", function() {
            _$jscmd("../../test/unit/logger.js", "line", 96);
            var Logger = require("../../src/logger"), logger = new Logger(), valueToTest = 0;
            _$jscmd("../../test/unit/logger.js", "line", 100);
            logger.setLevel();
            _$jscmd("../../test/unit/logger.js", "line", 102);
            logger.getLevel().should.eql(0);
        });
    });
    _$jscmd("../../test/unit/logger.js", "line", 105);
    describe("prefix", function() {
        _$jscmd("../../test/unit/logger.js", "line", 106);
        it("is null by default", function() {
            _$jscmd("../../test/unit/logger.js", "line", 107);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 111);
            (_$jscmd("../../test/unit/logger.js", "cond", "111_13_18", logger.getPrefix()) === null).should.be.true;
        });
        _$jscmd("../../test/unit/logger.js", "line", 113);
        it("is set as string", function() {
            _$jscmd("../../test/unit/logger.js", "line", 114);
            var Logger = require("../../src/logger"), logger = new Logger(), valueToTest = "Prefix";
            _$jscmd("../../test/unit/logger.js", "line", 118);
            logger.setPrefix({
                prefix: valueToTest
            });
            _$jscmd("../../test/unit/logger.js", "line", 122);
            logger.getPrefix().should.eql(valueToTest);
        });
        _$jscmd("../../test/unit/logger.js", "line", 124);
        it("return null if not set the right way", function() {
            _$jscmd("../../test/unit/logger.js", "line", 125);
            var Logger = require("../../src/logger"), logger = new Logger(), valueToTest = "Prefix";
            _$jscmd("../../test/unit/logger.js", "line", 129);
            logger.setPrefix();
            _$jscmd("../../test/unit/logger.js", "line", 131);
            (_$jscmd("../../test/unit/logger.js", "cond", "131_13_18", logger.getPrefix()) === null).should.be.true;
        });
    });
    _$jscmd("../../test/unit/logger.js", "line", 134);
    describe("#get/setAppId", function() {
        _$jscmd("../../test/unit/logger.js", "line", 135);
        it("sets the app ID", function() {
            _$jscmd("../../test/unit/logger.js", "line", 136);
            var Logger = require("../../src/logger"), logger = new Logger(), valueToTest = "APPNAME";
            _$jscmd("../../test/unit/logger.js", "line", 140);
            logger.setAppId({
                appId: valueToTest
            });
            _$jscmd("../../test/unit/logger.js", "line", 143);
            logger.getAppId().should.eql(valueToTest);
        });
    });
    _$jscmd("../../test/unit/logger.js", "line", 146);
    describe("#get/setUID", function() {
        _$jscmd("../../test/unit/logger.js", "line", 147);
        it("sets the UID", function() {
            _$jscmd("../../test/unit/logger.js", "line", 148);
            var Logger = require("../../src/logger"), logger = new Logger(), valueToTest = "ID-123456";
            _$jscmd("../../test/unit/logger.js", "line", 152);
            logger.setUID({
                uid: valueToTest
            });
            _$jscmd("../../test/unit/logger.js", "line", 155);
            logger.getUID().should.eql(valueToTest);
        });
    });
    _$jscmd("../../test/unit/logger.js", "line", 158);
    describe("#_buildMessage", function() {
        _$jscmd("../../test/unit/logger.js", "line", 159);
        it("returns null if level is not set", function() {
            _$jscmd("../../test/unit/logger.js", "line", 160);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 163);
            (_$jscmd("../../test/unit/logger.js", "cond", "163_13_40", logger._buildMessage("message to build")) === _$jscmd("../../test/unit/logger.js", "cond", "163_58_9", undefined)).should.be.true;
        });
        _$jscmd("../../test/unit/logger.js", "line", 165);
        it("returns null if level is not set", function() {
            _$jscmd("../../test/unit/logger.js", "line", 166);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 169);
            (_$jscmd("../../test/unit/logger.js", "cond", "169_13_22", logger._buildMessage()) === _$jscmd("../../test/unit/logger.js", "cond", "169_40_9", undefined)).should.be.true;
        });
        _$jscmd("../../test/unit/logger.js", "line", 171);
        it("builds a debug message", function() {
            _$jscmd("../../test/unit/logger.js", "line", 172);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 176);
            logger.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 180);
            var res = logger._buildMessage({
                msg: [ "message to build" ],
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 185);
            res.should.eql([ "[DEBUG]:", "message to build" ]);
        });
        _$jscmd("../../test/unit/logger.js", "line", 187);
        it("displays debug message with prefix", function() {
            _$jscmd("../../test/unit/logger.js", "line", 188);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 192);
            logger.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 195);
            logger.setPrefix({
                prefix: "test/unit/Core/LoggerTest"
            });
            _$jscmd("../../test/unit/logger.js", "line", 199);
            var res = logger._buildMessage({
                msg: [ "message to build" ],
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 205);
            res.should.eql([ "[test/unit/Core/LoggerTest]", "[DEBUG]:", "message to build" ]);
        });
        _$jscmd("../../test/unit/logger.js", "line", 207);
        it("displays debug message with the prefix and app id", function() {
            _$jscmd("../../test/unit/logger.js", "line", 208);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 212);
            logger.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 215);
            logger.setPrefix({
                prefix: "test/unit/Core/LoggerTest"
            });
            _$jscmd("../../test/unit/logger.js", "line", 218);
            logger.setAppId({
                appId: "APPNAME"
            });
            _$jscmd("../../test/unit/logger.js", "line", 222);
            var res = logger._buildMessage({
                msg: [ "message to build" ],
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 228);
            res.should.eql([ "[APPNAME]", "[test/unit/Core/LoggerTest]", "[DEBUG]:", "message to build" ]);
        });
        _$jscmd("../../test/unit/logger.js", "line", 230);
        it("displays debug message with the prefix, uid and app id", function() {
            _$jscmd("../../test/unit/logger.js", "line", 231);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 235);
            logger.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 238);
            logger.setPrefix({
                prefix: "test/unit/Core/LoggerTest"
            });
            _$jscmd("../../test/unit/logger.js", "line", 241);
            logger.setAppId({
                appId: "APPNAME"
            });
            _$jscmd("../../test/unit/logger.js", "line", 244);
            logger.setUID({
                uid: "ID-123456"
            });
            _$jscmd("../../test/unit/logger.js", "line", 248);
            var res = logger._buildMessage({
                msg: [ "message to build" ],
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 254);
            res.should.eql([ "[APPNAME]", "[ID-123456]", "[test/unit/Core/LoggerTest]", "[DEBUG]:", "message to build" ]);
        });
        _$jscmd("../../test/unit/logger.js", "line", 256);
        it("displays an info message", function() {
            _$jscmd("../../test/unit/logger.js", "line", 257);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 260);
            logger.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 263);
            var res = logger._buildMessage({
                msg: [ "message to build" ],
                level: 2
            });
            _$jscmd("../../test/unit/logger.js", "line", 267);
            res.should.eql([ "[INFO]:", "message to build" ]);
        });
        _$jscmd("../../test/unit/logger.js", "line", 269);
        it("displays a notice message", function() {
            _$jscmd("../../test/unit/logger.js", "line", 270);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 273);
            logger.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 276);
            var res = logger._buildMessage({
                msg: [ "message to build" ],
                level: 3
            });
            _$jscmd("../../test/unit/logger.js", "line", 280);
            res.should.eql([ "[NOTICE]:", "message to build" ]);
        });
        _$jscmd("../../test/unit/logger.js", "line", 282);
        it("displays a warning message", function() {
            _$jscmd("../../test/unit/logger.js", "line", 283);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 286);
            logger.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 289);
            var res = logger._buildMessage({
                msg: [ "message to build" ],
                level: 4
            });
            _$jscmd("../../test/unit/logger.js", "line", 293);
            res.should.eql([ "[WARNING]:", "message to build" ]);
        });
        _$jscmd("../../test/unit/logger.js", "line", 295);
        it("displays an error message", function() {
            _$jscmd("../../test/unit/logger.js", "line", 296);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 299);
            logger.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 302);
            var res = logger._buildMessage({
                msg: [ "message to build" ],
                level: 5
            });
            _$jscmd("../../test/unit/logger.js", "line", 306);
            res.should.eql([ "[ERROR]:", "message to build" ]);
        });
        _$jscmd("../../test/unit/logger.js", "line", 308);
        it("displays a critical message", function() {
            _$jscmd("../../test/unit/logger.js", "line", 309);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 312);
            logger.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 315);
            var res = logger._buildMessage({
                msg: [ "message to build" ],
                level: 6
            });
            _$jscmd("../../test/unit/logger.js", "line", 319);
            res.should.eql([ "[CRITICAL]:", "message to build" ]);
        });
        _$jscmd("../../test/unit/logger.js", "line", 321);
        it("displays an alert message", function() {
            _$jscmd("../../test/unit/logger.js", "line", 322);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 325);
            logger.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 328);
            var res = logger._buildMessage({
                msg: [ "message to build" ],
                level: 7
            });
            _$jscmd("../../test/unit/logger.js", "line", 332);
            res.should.eql([ "[ALERT]:", "message to build" ]);
        });
        _$jscmd("../../test/unit/logger.js", "line", 334);
        it("displays an emergency message", function() {
            _$jscmd("../../test/unit/logger.js", "line", 335);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 338);
            logger.setLevel({
                level: 1
            });
            _$jscmd("../../test/unit/logger.js", "line", 341);
            var res = logger._buildMessage({
                msg: [ "message to build" ],
                level: 8
            });
            _$jscmd("../../test/unit/logger.js", "line", 345);
            res.should.eql([ "[EMERGENCY]:", "message to build" ]);
        });
    });
    _$jscmd("../../test/unit/logger.js", "line", 348);
    describe("transporter", function() {
        _$jscmd("../../test/unit/logger.js", "line", 349);
        it("sets to console by default", function() {
            _$jscmd("../../test/unit/logger.js", "line", 350);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 353);
            logger.getTransporter().should.eql("console");
        });
        _$jscmd("../../test/unit/logger.js", "line", 355);
        it("getter/setter1 work", function() {
            _$jscmd("../../test/unit/logger.js", "line", 356);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 359);
            logger.setTransporter({
                transporter: "window"
            });
            _$jscmd("../../test/unit/logger.js", "line", 362);
            logger.getTransporter().should.eql("window");
        });
        _$jscmd("../../test/unit/logger.js", "line", 364);
        it("sets ajax transporter", function() {
            _$jscmd("../../test/unit/logger.js", "line", 365);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 368);
            logger.setTransporter({
                transporter: "ajax"
            });
            _$jscmd("../../test/unit/logger.js", "line", 371);
            logger.getTransporter().should.eql("ajax");
        });
        _$jscmd("../../test/unit/logger.js", "line", 373);
        it("cannot be set to a value different from _transporters", function() {
            _$jscmd("../../test/unit/logger.js", "line", 374);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 377);
            logger.setTransporter({
                transporter: "weirdValue"
            });
            _$jscmd("../../test/unit/logger.js", "line", 380);
            logger.getTransporter().should.eql("console");
        });
        _$jscmd("../../test/unit/logger.js", "line", 382);
        it("cannot be set to a value different from _transporters", function() {
            _$jscmd("../../test/unit/logger.js", "line", 383);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 386);
            logger.setTransporter("weirdValue");
            _$jscmd("../../test/unit/logger.js", "line", 387);
            logger.getTransporter().should.eql("console");
        });
        _$jscmd("../../test/unit/logger.js", "line", 389);
        it("cannot be set to a value different from _transporters", function() {
            _$jscmd("../../test/unit/logger.js", "line", 390);
            var Logger = require("../../src/logger"), logger = new Logger();
            _$jscmd("../../test/unit/logger.js", "line", 393);
            logger.setTransporter();
            _$jscmd("../../test/unit/logger.js", "line", 394);
            logger.getTransporter().should.eql("console");
        });
        _$jscmd("../../test/unit/logger.js", "line", 396);
        describe("console ", function() {
            _$jscmd("../../test/unit/logger.js", "line", 397);
            it("sends a debug message", function() {
                _$jscmd("../../test/unit/logger.js", "line", 398);
                var Logger = require("../../src/logger"), logger = new Logger();
                _$jscmd("../../test/unit/logger.js", "line", 401);
                logger.setLevel({
                    level: 1
                });
                _$jscmd("../../test/unit/logger.js", "line", 404);
                logger.debug("msg").should.be.true;
            });
            _$jscmd("../../test/unit/logger.js", "line", 406);
            it("sends an info message", function() {
                _$jscmd("../../test/unit/logger.js", "line", 407);
                var Logger = require("../../src/logger"), logger = new Logger();
                _$jscmd("../../test/unit/logger.js", "line", 410);
                logger.setLevel({
                    level: 1
                });
                _$jscmd("../../test/unit/logger.js", "line", 413);
                logger.info("msg").should.be.true;
            });
            _$jscmd("../../test/unit/logger.js", "line", 415);
            it("sends a notice message", function() {
                _$jscmd("../../test/unit/logger.js", "line", 416);
                var Logger = require("../../src/logger"), logger = new Logger();
                _$jscmd("../../test/unit/logger.js", "line", 419);
                logger.setLevel({
                    level: 1
                });
                _$jscmd("../../test/unit/logger.js", "line", 422);
                logger.notice("msg").should.be.true;
            });
            _$jscmd("../../test/unit/logger.js", "line", 425);
            it("sends a warning message", function() {
                _$jscmd("../../test/unit/logger.js", "line", 426);
                var Logger = require("../../src/logger"), logger = new Logger();
                _$jscmd("../../test/unit/logger.js", "line", 429);
                logger.setLevel({
                    level: 1
                });
                _$jscmd("../../test/unit/logger.js", "line", 432);
                logger.warn("msg").should.be.true;
            });
            _$jscmd("../../test/unit/logger.js", "line", 435);
            it("sends an error message", function() {
                _$jscmd("../../test/unit/logger.js", "line", 436);
                var Logger = require("../../src/logger"), logger = new Logger();
                _$jscmd("../../test/unit/logger.js", "line", 439);
                logger.setLevel({
                    level: 1
                });
                _$jscmd("../../test/unit/logger.js", "line", 442);
                logger.error("msg").should.be.true;
            });
            _$jscmd("../../test/unit/logger.js", "line", 445);
            it("sends an critical message", function() {
                _$jscmd("../../test/unit/logger.js", "line", 446);
                var Logger = require("../../src/logger"), logger = new Logger();
                _$jscmd("../../test/unit/logger.js", "line", 449);
                logger.setLevel({
                    level: 1
                });
                _$jscmd("../../test/unit/logger.js", "line", 452);
                logger.critical("msg").should.be.true;
            });
            _$jscmd("../../test/unit/logger.js", "line", 455);
            it("sends an alert message", function() {
                _$jscmd("../../test/unit/logger.js", "line", 456);
                var Logger = require("../../src/logger"), logger = new Logger();
                _$jscmd("../../test/unit/logger.js", "line", 459);
                logger.setLevel({
                    level: 1
                });
                _$jscmd("../../test/unit/logger.js", "line", 462);
                logger.alert("msg").should.be.true;
            });
            _$jscmd("../../test/unit/logger.js", "line", 465);
            it("sends an emergency message", function() {
                _$jscmd("../../test/unit/logger.js", "line", 466);
                var Logger = require("../../src/logger"), logger = new Logger();
                _$jscmd("../../test/unit/logger.js", "line", 469);
                logger.setLevel({
                    level: 1
                });
                _$jscmd("../../test/unit/logger.js", "line", 472);
                logger.emergency("msg").should.be.true;
            });
        });
        _$jscmd("../../test/unit/logger.js", "line", 475);
        describe("alert", function() {
            _$jscmd("../../test/unit/logger.js", "line", 476);
            it("sends a debug messsage", function() {
                _$jscmd("../../test/unit/logger.js", "line", 477);
                var Logger = require("../../src/logger"), logger = new Logger();
                _$jscmd("../../test/unit/logger.js", "line", 480);
                logger.setLevel({
                    level: 1
                });
                _$jscmd("../../test/unit/logger.js", "line", 483);
                logger.setTransporter({
                    transporter: "alert"
                });
                _$jscmd("../../test/unit/logger.js", "line", 486);
                (_$jscmd("../../test/unit/logger.js", "cond", "486_17_19", logger.debug("msg")) === _$jscmd("../../test/unit/logger.js", "cond", "486_41_9", undefined)).should.be.true;
            });
        });
        _$jscmd("../../test/unit/logger.js", "line", 489);
        describe("documentWrite", function() {
            _$jscmd("../../test/unit/logger.js", "line", 490);
            it("sends a debug messsage", function() {
                _$jscmd("../../test/unit/logger.js", "line", 491);
                var Logger = require("../../src/logger"), logger = new Logger();
                _$jscmd("../../test/unit/logger.js", "line", 494);
                logger.setLevel({
                    level: 1
                });
                _$jscmd("../../test/unit/logger.js", "line", 497);
                logger.setTransporter({
                    transporter: "documentWrite"
                });
                _$jscmd("../../test/unit/logger.js", "line", 500);
                (_$jscmd("../../test/unit/logger.js", "cond", "500_17_19", logger.debug("msg")) === _$jscmd("../../test/unit/logger.js", "cond", "500_41_9", undefined)).should.be.true;
            });
        });
        _$jscmd("../../test/unit/logger.js", "line", 503);
        describe("ajax", function() {
            _$jscmd("../../test/unit/logger.js", "line", 504);
            it("does not send without setting server", function() {});
        });
    });
});