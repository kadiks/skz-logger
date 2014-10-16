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
  });
});