/**
 * Getting started test using Jasmine
 * Quick overview of what's possible
 * Use http://pivotal.github.io/jasmine/ for a complete picture
 */
define(
  ['SKZ/Logger'],
  function(Logger) {
    
    describe('Logger', function(){
      describe('Class', function(){
        it('is defined', function(){
          var
            logger = new Logger()
          ;
          expect(logger).not.toBeUndefined();
        });
        it('has independant instances (!singleton)', function(){
          var
            logger1 = new Logger()
          , logger2 = new Logger()
          , valueToTest1 = 3
          , valueToTest2 = 5
          ;
          logger1.setLevel({ level : valueToTest1 });
          logger2.setLevel({ level : valueToTest2 });
          
          expect(logger1.getLevel()).toEqual(valueToTest1);
          expect(logger2.getLevel()).toEqual(valueToTest2);
        });
        it('has independant prefixes', function(){
          var
            logger1 = new Logger()
          , logger2 = new Logger()
          ;
          
          logger1.setPrefix({ prefix : 'logger1' });
          logger2.setPrefix({ prefix : 'logger2' });
          
          logger1.setLevel({ level : 1 });
          logger2.setLevel({ level : 1 });
          
          var
            res1 = logger1._buildMessage({ msg : 'msg1', level : 1 })
          , res2 = logger2._buildMessage({ msg : 'msg2', level : 1 })
          ;
          
          expect(res1).toEqual(['[logger1]', '[DEBUG]:', 'msg1']);
          expect(res2).toEqual(['[logger2]', '[DEBUG]:', 'msg2']);
        });
      });
      describe('level', function(){
        it('level is 0 by default', function(){
          var
            logger = new Logger()
          ;
          expect(logger.getLevel()).toEqual(0);
        });
        it('getter/setter for level are working', function(){
          var
            logger = new Logger()
          , valueToTest = 2
          ;
          logger.setLevel({ level : valueToTest });
          
          expect(logger.getLevel()).toEqual(valueToTest);
        });
        it('cannot be set to a value higher than the possible levels', function(){
          var
            logger = new Logger()
          , valueToTest = 0
          ;
          logger.setLevel({level : valueToTest });
          logger.setLevel({level : 14 });
          
          expect(logger.getLevel()).toEqual(valueToTest);
        });
      });
      describe('prefix', function(){
        it('is null by default', function(){
          var
            logger = new Logger()
          ;
          expect(logger.getPrefix()).toBeNull();
        });
        it('is set as string', function(){
          var
            logger = new Logger()
          , valueToTest = 'Prefix'
          ;
          logger.setPrefix({ prefix : valueToTest });
          expect(logger.getPrefix()).toEqual(valueToTest);
        });
      });
      describe('#_buildMessage', function(){
        it('returns null if level is not set', function(){
          var
            logger = new Logger()
          ;
          expect(logger._buildMessage('message to build')).toBeUndefined();
        });
        it('builds a debug message', function(){
          var
            logger = new Logger()
          ;
          
          logger.setLevel({ level : 1 });
          
          var res = logger._buildMessage({
            msg : 'message to build'
          , level : 1
          });
          
          expect(res).toEqual(['[DEBUG]:', 'message to build']);
        });
        it('displays debug message with prefix', function(){
          var
            logger = new Logger()
          ;
          
          logger.setLevel({ level : 1 });
          logger.setPrefix({ prefix : 'test/unit/Core/LoggerTest' });
          
          var
            res = logger._buildMessage({ msg : 'message to build', level : 1 })
          ;
          
          expect(res).toEqual(['[test/unit/Core/LoggerTest]', '[DEBUG]:', 'message to build']);
        });
        it('displays an info message', function(){
          var
            logger = new Logger()
          ;
          logger.setLevel({ level : 1 });
          var res = logger._buildMessage({
            msg : 'message to build'
          , level : 2
          });
          expect(res).toEqual(['[INFO]:', 'message to build']);
        });
        it('displays a notice message', function(){
          var
            logger = new Logger()
          ;
          logger.setLevel({ level : 1 });
          var res = logger._buildMessage({
            msg : 'message to build'
          , level : 3
          });
          expect(res).toEqual(['[NOTICE]:', 'message to build']);
        });
        it('displays a warning message', function(){
          var
            logger = new Logger()
          ;
          logger.setLevel({ level : 1 });
          var res = logger._buildMessage({
            msg : 'message to build'
          , level : 4
          });
          expect(res).toEqual(['[WARNING]:', 'message to build']);
        });
        it('displays an error message', function(){
          var
            logger = new Logger()
          ;
          logger.setLevel({ level : 1 });
          var res = logger._buildMessage({
            msg : 'message to build'
          , level : 5
          });
          expect(res).toEqual(['[ERROR]:', 'message to build']);
        });
        it('displays a critical message', function(){
          var
            logger = new Logger()
          ;
          logger.setLevel({ level : 1 });
          var res = logger._buildMessage({
            msg : 'message to build'
          , level : 6
          });
          expect(res).toEqual(['[CRITICAL]:', 'message to build']);
        });
        it('displays an alert message', function(){
          var
            logger = new Logger()
          ;
          logger.setLevel({ level : 1 });
          var res = logger._buildMessage({
            msg : 'message to build'
          , level : 7
          });
          expect(res).toEqual(['[ALERT]:', 'message to build']);
        });
        it('displays an emergency message', function(){
          var
            logger = new Logger()
          ;
          logger.setLevel({ level : 1 });
          var res = logger._buildMessage({
            msg : 'message to build'
          , level : 8
          });
          expect(res).toEqual(['[EMERGENCY]:', 'message to build']);
        });
      });
      describe('transporter', function(){
        it('sets to console by default', function(){
          var
            logger = new Logger()
          ;
          expect(logger.getTransporter()).toEqual('console');
        });
        it('getter/setter1 work', function(){
          var
            logger = new Logger()
          ;
          logger.setTransporter({ transporter : 'window' });
          expect(logger.getTransporter()).toEqual('window');
        });
        it('cannot be set to a value different from _transporters', function(){
          var
            logger = new Logger()
          ;
          logger.setTransporter({ transporter : 'weirdValue' });
          expect(logger.getTransporter()).toEqual('console');
        });
        describe('console ', function(){
          it('sends a debug message', function(){
            var
              logger = new Logger()
            ;
            logger.setLevel({ level : 1 });
            expect(logger.debug('msg')).toBe(true);
          });
          it('sends an info message', function(){
            var
              logger = new Logger()
            ;
            logger.setLevel({ level : 1 });
            expect(logger.info('msg')).toBe(true);
          });
          it('sends a notice message', function(){
            var
              logger = new Logger()
            ;
            logger.setLevel({ level : 1 });
            expect(logger.notice('msg')).toBe(true);
          });
          
          it('sends a warning message', function(){
            var
              logger = new Logger()
            ;
            logger.setLevel({ level : 1 });
            expect(logger.warn('msg')).toBe(true);
          });
          
          it('sends an error message', function(){
            var
              logger = new Logger()
            ;
            logger.setLevel({ level : 1 });
            expect(logger.error('msg')).toBe(true);
          });
          
          it('sends an critical message', function(){
            var
              logger = new Logger()
            ;
            logger.setLevel({ level : 1 });
            expect(logger.critical('msg')).toBe(true);
          });
          
          it('sends an alert message', function(){
            var
              logger = new Logger()
            ;
            logger.setLevel({ level : 1 });
            expect(logger.alert('msg')).toBe(true);
          });
          
          it('sends an emergency message', function(){
            var
              logger = new Logger()
            ;
            logger.setLevel({ level : 1 });
            expect(logger.emergency('msg')).toBe(true);
          });
        });
        describe('alert', function(){
          
        });
      });
    });
    
  }
);

