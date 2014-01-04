define(function(){
  /**
   * Logs messages in the console of the browser.
   * If IE8 or minus are not in dev mode, it will not fire
   * 
   * @class Logger
   * You have to explicitly call {@link Logger#method-setLevel setLevel} to display anything
   * test 
   */
  
  var _Logger = {
    /**
     * @cfg {Number} [_level=0] The level of the logger 
     * @private
     */
    _level : 0
    /**
     * @property {Array} _levelsName Contains all levels used
     * @private
     */
  , _levelsName : [
      'NONE'
    , 'DEBUG'
    , 'INFO'
    , 'NOTICE'
    , 'WARNING'
    , 'ERROR'
    , 'CRITICAL'
    , 'ALERT'
    , 'EMERGENCY'
    ]
    /**
     * @property {Object} _levelsNumber Map the level name to its number
     * @private
     */
  , _levelsNumber : {
      NONE : 0
    , DEBUG : 1
    , INFO : 2
    , NOTICE : 3
    , WARN : 4
    , ERROR : 5
    , CRITICAL : 6
    , ALERT : 7
    , EMERGENCY : 8
    }
    /**
     * @cfg {String} [_prefix=null] Text to set before each call of the Logger instance
     * @private
     */
  , _prefix : null
    /**
     * @cfg {String} [_mode="console"] The mode of delivery of the message
     * @private
     */
  , _transporter : 'console'
    /**
     * @property {Array} _transporters The possible transporters
     * @private
     */
  , _transporters : ['console', 'window', 'documentWrite', 'alert']
    /**
     * Build the message with all parameters
     * @param {Object} params
     * @param {String} msg Message to be send
     * @param {Number} level Level of the message to be sent
     */
  , _buildMessage : function(params) {
      var
        o = params || {}
      , msg = o.msg || null
      , level = typeof(o.level) === 'number' ? o.level : 0
      ;
      if(this.getLevel() === 0) return;
      if(level === 0) return;
      if(level < this.getLevel()) return;
      if(msg === null) return;
      var
        levelName = this._levelsName[level]
      , prefix = this.getPrefix()
      , msgConcat = []
      ;
      if(prefix) {
        msgConcat.push('[' + prefix + ']');
      }
      msgConcat.push('[' + levelName + ']:');
      msgConcat.push(msg);
      return msgConcat;
      return msgConcat.join(' ');
    }
    /**
     * Sends a message to the right transporter
     * @private
     * @return {Boolean} True if succeed, undefined if not
     */
  , _send : function() {
      var
        args = arguments[0]
      , transporter = this.getTransporter()
      ;
      if(transporter === 'console') {
        //if console does not exist in the browser (IE) or in headless browser environement
        if(typeof(window.console) === 'undefined' && typeof(console) === 'undefined') return;
        if(typeof(window.console.log) !== 'function') return;
        console.log.apply(console, args);
        return true;
      }
      if(transporter === 'documentWrite') {
        if(typeof(document) === 'undefined') return;
        document.write(args.join(' '));
        return true;
      }
      if(transporter === 'alert') {
        if(typeof(window) === 'undefined') return;
        window.alert(args.join(' '));
        return true;
      }
    }
    /**
     * Sends an alert message
     * @param {String} The message to be sent
     * @return {Boolean} If the message has been sent successfully
     */
  , alert : function(msg) {
      var
        level = 7
      , logMsg = this._buildMessage({
          msg : msg
        , level : level
        })
      ;
      return this._send(logMsg);
    }
    /**
     * Sends a critical message
     * @param {String} The message to be sent
     * @return {Boolean} If the message has been sent successfully
     */
  , critical : function(msg) {
      var
        level = 6
      , logMsg = this._buildMessage({
          msg : msg
        , level : level
        })
      ;
      return this._send(logMsg);
    }
    /**
     * Sends a debug message to the defined transporter
     * @param {String} msg Message to be sent
     */
  , debug : function(msg) {
      var
        level = 1
      , logMsg = this._buildMessage({
          msg : msg
        , level : level
        })
      ;
      return this._send(logMsg);
    }
    /**
     * Sends an emergency message
     * @param {String} The message to be sent
     * @return {Boolean} If the message has been sent successfully
     */
  , emergency : function(msg) {
      var
        level = 8
      , logMsg = this._buildMessage({
          msg : msg
        , level : level
        })
      ;
      return this._send(logMsg);
    }
    /**
     * Sends an error message
     * @param {String} The message to be sent
     * @return {Boolean} If the message has been sent successfully
     */
  , error : function(msg) {
      var
        level = 5
      , logMsg = this._buildMessage({
          msg : msg
        , level : level
        })
      ;
      return this._send(logMsg);
    }
    /**
     * Returns the current prefix of the logger
     * @return {Number} The level of the logger
     */
  , getLevel : function() {
      return this._level;
    }
    /**
     * Returns the current prefix of the logger
     * @return {String} The prefix used for this logger
     */
  , getPrefix : function() {
      return this._prefix;
    }
    /**
     * Gets the current transporter type
     * @return {String} Name of the transporter
     */
  , getTransporter : function() {
      return this._transporter;
    }
    /**
     * Sends an info message
     * @param {String} The message to be sent
     * @return {Boolean} If the message has been sent successfully
     */
  , info : function(msg) {
      var
        level = 2
      , logMsg = this._buildMessage({
          msg : msg
        , level : level
        })
      ;
      return this._send(logMsg);
    }
    /**
     * Sends a notice message
     * @param {String} The message to be sent
     * @return {Boolean} If the message has been sent successfully
     */
  , notice : function(msg) {
      var
        level = 3
      , logMsg = this._buildMessage({
          msg : msg
        , level : level
        })
      ;
      return this._send(logMsg);
    }
    /**
     * Sets the level of the logger
     * @param {Object} params
     * @param {Number} params.level The level by its number
     */
  , setLevel : function(params) {
      var
        o = params || {}
      , level = typeof(o.level) === 'number' ? o.level : null 
      ;
      if(level === null) return;
      if(level >= this._levelsName.length) return;
      this._level = level;
    }
    /**
     * Sets the prefix of the logger
     * @param {Object} params
     * @param {String} params.prefix The prefix displayed on all message
     */
  , setPrefix : function(params) {
      var
        o = params || {}
      , prefix = o.prefix
      ;
      if(typeof(o.prefix) === 'undefined') return;
      this._prefix = prefix;
    }
    /**
     * Sets the delivery mode of the logger
     * Possible values are: console, documentWrite, window
     * @param {Object} params
     * @param {String} params.transporter The name of the transporter
     */
  , setTransporter : function(params) {
      var
        o = params || {}
      , transporter = o.transporter || null
      ;
      if(transporter === null) return;
      if(this._transporters.indexOf(transporter) === -1) return;
      this._transporter = transporter;
    }
    /**
     * Sends a warning message
     * @param {String} The message to be sent
     * @return {Boolean} If the message has been sent successfully
     */
  , warn : function(msg) {
      var
        level = 4
      , logMsg = this._buildMessage({
          msg : msg
        , level : level
        })
      ;
      return this._send(logMsg);
    }
  };
  
  return function() {
    this._levelsName = _Logger._levelsName;
    this._levelsNumber = _Logger._levelsNumber;
    this._transporter = _Logger._transporter;
    this._transporters = _Logger._transporters;
    
    this._buildMessage = _Logger._buildMessage;
    this._send = _Logger._send;
    this.alert = _Logger.alert;
    this.critical = _Logger.critical;
    this.debug = _Logger.debug;
    this.emergency = _Logger.emergency;
    this.error = _Logger.error;
    this.getLevel = _Logger.getLevel;
    this.getPrefix = _Logger.getPrefix;
    this.getTransporter = _Logger.getTransporter;
    this.info = _Logger.info;
    this.notice = _Logger.notice;
    this.setLevel = _Logger.setLevel;
    this.setPrefix = _Logger.setPrefix;
    this.setTransporter = _Logger.setTransporter;
    this.warn = _Logger.warn;
    
    this.setLevel({ level : _Logger._level });
    this.setPrefix({ prefix : _Logger._prefix });
    this.setTransporter({ transporter : _Logger._transporter });
  };
});
