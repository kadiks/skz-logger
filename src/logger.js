//UMD template based on this: https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
(function(root, factory) {
  if (typeof(define) === 'function' && define.amd) {
    define([], function() {
      return (root.skzLogger = factory());
    });
  } else if (typeof(exports) === 'object') {
    module.exports = factory();
  } else {
    root.skzLogger = factory(root.b);
  }
}(this, function(b) {

  /**
   * Logs messages in the console of the browser.
   * If IE8 or minus are not in dev mode, it will not fire
   *
   * @class Logger
   * You have to explicitly call {@link Logger#method-setLevel setLevel} to display anything
   *
   */

  /**
   * Example:
   *
   *     @example preview small frame
   *     var logger = new skzLogger();
   *     logger.setLevel({ level : 1 });
   *     logger.setTransporter({ transporter : 'alert' });
   *     logger.setPrefix({ prefix : 'Documentation' });
   *     logger.debug('Message logged successfully');
   */

  /**
   * See the example:
   *
   *     @example preview small frame
   *     console.log('test2', skzLogger);
   */


  var Logger = function() {};

  /**
   * @cfg {Number} [_level=0] The level of the logger
   * @private
   */
  Logger.prototype._level = 0;

  /**
   * @property {Array} _levelsName Contains all levels used
   * @private
   */
  Logger.prototype._levelsName = [
    'NONE', 'DEBUG', 'INFO', 'NOTICE', 'WARNING', 'ERROR', 'CRITICAL', 'ALERT', 'EMERGENCY'
  ];

  /**
   * @property {Object} _levelsNumber Map the level name to its number
   * @private
   */
  Logger.prototype._levelsNumber = {
    NONE: 0,
    DEBUG: 1,
    INFO: 2,
    NOTICE: 3,
    WARN: 4,
    ERROR: 5,
    CRITICAL: 6,
    ALERT: 7,
    EMERGENCY: 8
  };

  /**
   * @property {String} [_appId=null] The application id
   * @private
   */
  Logger.prototype._appId = null;

  /**
   * @cfg {String} [_prefix=null] Text to set before each call of the Logger instance
   * @private
   */
  Logger.prototype._prefix = null;
  /**
   * @cfg {String} [_transporter="console"] The mode of delivery of the message
   * @private
   */
  Logger.prototype._transporter = 'console';
  /**
   * @property {Array} _transporters The possible transporters
   * @private
   */
  Logger.prototype._transporters = ['console', 'window', 'documentWrite', 'alert', 'ajax'];

  /**
   * @property {String} [_uid=null] The unique ID of the session
   * @private
   */
  Logger.prototype._uid = null;

  /**
   * Build the message with all parameters
   * @private
   *
   * @param {Object} params
   * @param {String} msg Message to be send
   * @param {Number} level Level of the message to be sent
   */
  Logger.prototype._buildMessage = function(params) {
    var
      o = params || {},
      msg = o.msg || [],
      level = typeof(o.level) === 'number' ? o.level : 0;

    msg = Array.prototype.slice.call(msg, 0);

    if (this.getLevel() === 0) return;
    if (level === 0) return;
    if (level < this.getLevel()) return;
    if (msg.length === 0) return;

    var
      levelName = this._levelsName[level],
      prefix = this.getPrefix(),
      uid = this.getUID(),
      appId = this.getAppId(),
      msgConcat = msg;
    msgConcat.unshift('[' + levelName + ']:');
    if (prefix) {
      msgConcat.unshift('[' + prefix + ']');
    }
    if (uid) {
      msgConcat.unshift('[' + uid + ']');
    }
    if (appId) {
      msgConcat.unshift('[' + appId + ']');
    }

    return msgConcat;
  };

  /**
   * Sends a message to the right transporter
   * @private
   *
   * @return {Boolean} True if succeed, undefined if not
   */
  Logger.prototype._send = function() {
    var
      args = arguments[0],
      transporter = this.getTransporter();
    if (args === undefined) {
      return true;
    }
    if (transporter === 'console') {
      //if console does not exist in the browser (IE) or in headless browser environement
      if (typeof(window) === 'undefined' && typeof(console) === 'undefined') return;
      if (typeof(console.log) !== 'function') return;
      console.log.apply(console, args);
      return true;
    }
    if (transporter === 'documentWrite') {
      if (typeof(document) === 'undefined') return;
      document.write(args.join(' '));
      return true;
    }
    if (transporter === 'alert') {
      if (typeof(window) === 'undefined') return;
      window.alert(args.join(' '));
      return true;
    }
  };

  /**
   * Sends an alert message
   * @param {String} The message to be sent
   * @return {Boolean} If the message has been sent successfully
   */
  Logger.prototype.alert = function() {
    var
      level = 7,
      logMsg = this._buildMessage({
        msg: arguments,
        level: level
      });
    return this._send(logMsg);
  };

  /**
   * Sends a critical message
   * @param {String} The message to be sent
   *
   * @return {Boolean} If the message has been sent successfully
   */
  Logger.prototype.critical = function() {
    var
      level = 6,
      logMsg = this._buildMessage({
        msg: arguments,
        level: level
      });
    return this._send(logMsg);
  };

  /**
   * Sends a debug message to the defined transporter
   * @param {String} args Message to be sent
   *
   * @return {Boolean} If the message has been sent successfully
   */
  Logger.prototype.debug = function() {
    var
      level = 1,
      logMsg = this._buildMessage({
        msg: arguments,
        level: level
      });
    return this._send(logMsg);
  };

  /**
   * Sends an emergency message
   * @param {String} The message to be sent
   *
   * @return {Boolean} If the message has been sent successfully
   */
  Logger.prototype.emergency = function() {
    var
      level = 8,
      logMsg = this._buildMessage({
        msg: arguments,
        level: level
      });
    return this._send(logMsg);
  };

  /**
   * Sends an error message
   * @param {String} The message to be sent
   *
   * @return {Boolean} If the message has been sent successfully
   */
  Logger.prototype.error = function() {
    var
      level = 5,
      logMsg = this._buildMessage({
        msg: arguments,
        level: level
      });
    return this._send(logMsg);
  };

  /**
   * Get the app Id
   *
   * @return {String} App Id
   */
  Logger.prototype.getAppId = function() {
    return this._appId;
  };

  /**
   * Returns the current prefix of the logger
   * @return {Number} The level of the logger
   */
  Logger.prototype.getLevel = function() {
    return this._level;
  };

  /**
   * Returns the current prefix of the logger
   *
   * @return {String} The prefix used for this logger
   */
  Logger.prototype.getPrefix = function() {
    return this._prefix;
  };

  /**
   * Gets the current transporter type
   *
   * @return {String} Name of the transporter
   */
  Logger.prototype.getTransporter = function() {
    return this._transporter;
  };

  /**
   * Get the unique ID
   *
   * @return {String} Unique ID
   */
  Logger.prototype.getUID = function() {
    return this._uid;
  };

  /**
   * Sends an info message
   * @param {String} args The message to be sent
   *
   * @return {Boolean} If the message has been sent successfully
   */
  Logger.prototype.info = function() {
    var
      level = 2,
      logMsg = this._buildMessage({
        msg: arguments,
        level: level
      });
    return this._send(logMsg);
  };
  /**
   * Sends a notice message
   * @param {String} The message to be sent
   *
   * @return {Boolean} If the message has been sent successfully
   */
  Logger.prototype.notice = function() {
    var
      level = 3,
      logMsg = this._buildMessage({
        msg: arguments,
        level: level
      });
    return this._send(logMsg);
  };
  /**
   * Sets the application id
   * @param {Object} params
   * @param {String} params.appId The app id
   */
  Logger.prototype.setAppId = function(params) {
    var
      o = params || {},
      appId = o.appId;
    if (typeof(appId) === 'undefined') {
      return;
    }
    this._appId = appId;
  };
  /**
   * Sets the level of the logger
   * @param {Object} params
   * @param {Number} params.level The level by its number
   */
  Logger.prototype.setLevel = function(params) {
    var
      o = params || {},
      level = typeof(o.level) === 'number' ? o.level : null;
    if (level === null) {
      return;
    }
    if (level >= this._levelsName.length) {
      return;
    }
    this._level = level;
  };

  /**
   * Sets the prefix of the logger
   * @param {Object} params
   * @param {String} params.prefix The prefix displayed on all message
   */
  Logger.prototype.setPrefix = function(params) {
    var
      o = params || {},
      prefix = o.prefix;
    if (typeof(o.prefix) === 'undefined') {
      return;
    }
    this._prefix = prefix;
  };

  /**
   * Sets the delivery mode of the logger
   * Possible values are: console, documentWrite, window, alert
   * @param {Object} params
   * @param {String} params.transporter The name of the transporter
   */
  Logger.prototype.setTransporter = function(params) {
    var
      o = params || {},
      transporter = o.transporter || null;
    if (transporter === null) {
      return;
    }
    if (this._transporters.indexOf(transporter) === -1) {
      return;
    }
    this._transporter = transporter;
  };

  /**
   * Set the Unique ID for this session
   *
   * @param {Object} params
   * @param {String} params.uid Unique ID of this session
   */
  Logger.prototype.setUID = function(params) {
    var
      o = params || {},
      uid = o.uid || null;
    if (uid === null) {
      return;
    }
    this._uid = uid;
  };
  /**
   * Sends a warning message
   * @param {String} The message to be sent
   *
   * @return {Boolean} If the message has been sent successfully
   */
  Logger.prototype.warn = function() {
    var
      level = 4,
      logMsg = this._buildMessage({
        msg: arguments,
        level: level
      });
    return this._send(logMsg);
  };

  return Logger;

}));
