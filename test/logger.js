var
  should = require('should')
;

describe('Logger', function(){
  describe('Class', function(){
    it('should be defined', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.should.be.ok;
    });
    it('has independant instances (!singleton)', function(){
      var
        Logger = require('../skz-logger')
      , logger1 = new Logger()
      , logger2 = new Logger()
      , valueToTest1 = 3
      , valueToTest2 = 5
      ;
      logger1.setLevel({ level : valueToTest1 });
      logger2.setLevel({ level : valueToTest2 });
      
      logger1.getLevel().should.eql(valueToTest1);
      logger2.getLevel().should.eql(valueToTest2);
    });
    it('has independant prefixes', function(){
      var
        Logger = require('../skz-logger')
      , logger1 = new Logger()
      , logger2 = new Logger()
      ;
      
      logger1.setPrefix({ prefix : 'logger1' });
      logger2.setPrefix({ prefix : 'logger2' });
      
      logger1.setLevel({ level : 1 });
      logger2.setLevel({ level : 1 });
      
      var
        res1 = logger1._buildMessage({ msg : ['msg1'], level : 1 })
      , res2 = logger2._buildMessage({ msg : ['msg2'], level : 1 })
      ;
      
      res1.should.eql(['[logger1]', '[DEBUG]:', 'msg1']);
      res2.should.eql(['[logger2]', '[DEBUG]:', 'msg2']);
    });
  });
  describe('level', function(){
    it('level is 0 by default', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.getLevel().should.eql(0);
    });
    it('getter/setter for level are working', function(){
      var
       Logger = require('../skz-logger')
      , logger = new Logger()
      , valueToTest = 2
      ;
      logger.setLevel({ level : valueToTest });
      
      logger.getLevel().should.eql(valueToTest);
    });
    it('cannot be set to a value higher than the possible levels', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      , valueToTest = 0
      ;
      logger.setLevel({level : valueToTest });
      logger.setLevel({level : 14 });
      
      logger.getLevel().should.eql(valueToTest);
    });
    it('cannot be set to a wrong value', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      , valueToTest = 0
      ;
      logger.setLevel();
      
      logger.getLevel().should.eql(0);
    });
  });
  describe('prefix', function(){
    it('is null by default', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      
      (logger.getPrefix() === null).should.be.true;
    });
    it('is set as string', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      , valueToTest = 'Prefix'
      ;
      logger.setPrefix({ prefix : valueToTest });
      
      logger.getPrefix().should.eql(valueToTest);
    });
    it('return null if not set the right way', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      , valueToTest = 'Prefix'
      ;
      logger.setPrefix();
      
      (logger.getPrefix() === null).should.be.true;
    });
  });
  describe('#_buildMessage', function(){
    it('returns null if level is not set', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      (logger._buildMessage('message to build') === undefined).should.be.true;
    });
    it('returns null if level is not set', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      (logger._buildMessage() === undefined).should.be.true;
    }); 
    it('builds a debug message', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      
      logger.setLevel({ level : 1 });
      
      var res = logger._buildMessage({
        msg : ['message to build']
      , level : 1
      });
      
      res.should.eql(['[DEBUG]:', 'message to build']);
    });
    it('displays debug message with prefix', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      
      logger.setLevel({ level : 1 });
      logger.setPrefix({ prefix : 'test/unit/Core/LoggerTest' });
      
      var
        res = logger._buildMessage({ msg : ['message to build'], level : 1 })
      ;
      
      res.should.eql(['[test/unit/Core/LoggerTest]', '[DEBUG]:', 'message to build']);
    });
    it('displays an info message', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.setLevel({ level : 1 });
      var res = logger._buildMessage({
        msg : ['message to build']
      , level : 2
      });
      res.should.eql(['[INFO]:', 'message to build']);
    });
    it('displays a notice message', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.setLevel({ level : 1 });
      var res = logger._buildMessage({
        msg : ['message to build']
      , level : 3
      });
      res.should.eql(['[NOTICE]:', 'message to build']);
    });
    it('displays a warning message', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.setLevel({ level : 1 });
      var res = logger._buildMessage({
        msg : ['message to build']
      , level : 4
      });
      res.should.eql(['[WARNING]:', 'message to build']);
    });
    it('displays an error message', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.setLevel({ level : 1 });
      var res = logger._buildMessage({
        msg : ['message to build']
      , level : 5
      });
      res.should.eql(['[ERROR]:', 'message to build']);
    });
    it('displays a critical message', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.setLevel({ level : 1 });
      var res = logger._buildMessage({
        msg : ['message to build']
      , level : 6
      });
      res.should.eql(['[CRITICAL]:', 'message to build']);
    });
    it('displays an alert message', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.setLevel({ level : 1 });
      var res = logger._buildMessage({
        msg : ['message to build']
      , level : 7
      });
      res.should.eql(['[ALERT]:', 'message to build']);
    });
    it('displays an emergency message', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.setLevel({ level : 1 });
      var res = logger._buildMessage({
        msg : ['message to build']
      , level : 8
      });
      res.should.eql(['[EMERGENCY]:', 'message to build']);
    });
  });
  describe('transporter', function(){
    it('sets to console by default', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.getTransporter().should.eql('console');
    });
    it('getter/setter1 work', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.setTransporter({ transporter : 'window' });
      logger.getTransporter().should.eql('window');
    });
    it('cannot be set to a value different from _transporters', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.setTransporter({ transporter : 'weirdValue' });
      logger.getTransporter().should.eql('console');
    });
    it('cannot be set to a value different from _transporters', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.setTransporter('weirdValue');
      logger.getTransporter().should.eql('console');
    });
    it('cannot be set to a value different from _transporters', function(){
      var
        Logger = require('../skz-logger')
      , logger = new Logger()
      ;
      logger.setTransporter();
      logger.getTransporter().should.eql('console');
    });
    describe('console ', function(){
      it('sends a debug message', function(){
        var
          Logger = require('../skz-logger')
        , logger = new Logger()
        ;
        logger.setLevel({ level : 1 });
        logger.debug('msg').should.be.true;
      });
      it('sends an info message', function(){
        var
          Logger = require('../skz-logger')
        , logger = new Logger()
        ;
        logger.setLevel({ level : 1 });
        logger.info('msg').should.be.true;
      });
      it('sends a notice message', function(){
        var
          Logger = require('../skz-logger')
        , logger = new Logger()
        ;
        logger.setLevel({ level : 1 });
        logger.notice('msg').should.be.true;
      });
      
      it('sends a warning message', function(){
        var
          Logger = require('../skz-logger')
        , logger = new Logger()
        ;
        logger.setLevel({ level : 1 });
        logger.warn('msg').should.be.true;
      });
      
      it('sends an error message', function(){
        var
          Logger = require('../skz-logger')
        , logger = new Logger()
        ;
        logger.setLevel({ level : 1 });
        logger.error('msg').should.be.true;
      });
      
      it('sends an critical message', function(){
        var
          Logger = require('../skz-logger')
        , logger = new Logger()
        ;
        logger.setLevel({ level : 1 });
        logger.critical('msg').should.be.true;
      });
      
      it('sends an alert message', function(){
        var
          Logger = require('../skz-logger')
        , logger = new Logger()
        ;
        logger.setLevel({ level : 1 });
        logger.alert('msg').should.be.true;
      });
      
      it('sends an emergency message', function(){
        var
          Logger = require('../skz-logger')
        , logger = new Logger()
        ;
        logger.setLevel({ level : 1 });
        logger.emergency('msg').should.be.true;
      });
    });
    describe('alert', function(){
      it('sends a debug messsage', function(){
        var
          Logger = require('../skz-logger')
        , logger = new Logger()
        ;
        logger.setLevel({ level : 1 });
        logger.setTransporter({ transporter : 'alert' });
        (logger.debug('msg') === undefined).should.be.true;
      });
    });
    describe('documentWrite', function(){
      it('sends a debug messsage', function(){
        var
          Logger = require('../skz-logger')
        , logger = new Logger()
        ;
        logger.setLevel({ level : 1 });
        logger.setTransporter({ transporter : 'documentWrite' });
        (logger.debug('msg') === undefined).should.be.true;
      });
    });
  });
});