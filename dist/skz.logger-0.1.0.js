/**
 * SuitKZ Logger v0.1.0 [04/01/2014 r66]
 *
 * Suitcase logger for web and nodeJS
 *
 * © 2013-2014 Jénaïc Cambré - http://kadiks.net/
 */
define("SKZ/Logger", [], function() {
    var _Logger = {
        _level: 0,
        _levelsName: [ "NONE", "DEBUG", "INFO", "NOTICE", "WARNING", "ERROR", "CRITICAL", "ALERT", "EMERGENCY" ],
        _levelsNumber: {
            NONE: 0,
            DEBUG: 1,
            INFO: 2,
            NOTICE: 3,
            WARN: 4,
            ERROR: 5,
            CRITICAL: 6,
            ALERT: 7,
            EMERGENCY: 8
        },
        _prefix: null,
        _transporter: "console",
        _transporters: [ "console", "window", "documentWrite", "alert" ],
        _buildMessage: function(params) {
            var o = params || {}, msg = o.msg || null, level = "number" == typeof o.level ? o.level : 0;
            if (0 !== this.getLevel() && 0 !== level && !(level < this.getLevel()) && null !== msg) {
                var levelName = this._levelsName[level], prefix = this.getPrefix(), msgConcat = [];
                return prefix && msgConcat.push("[" + prefix + "]"), msgConcat.push("[" + levelName + "]:"), 
                msgConcat.push(msg), msgConcat;
            }
        },
        _send: function() {
            var args = arguments[0], transporter = this.getTransporter();
            if ("console" === transporter) {
                if ("undefined" == typeof window.console && "undefined" == typeof console) return;
                if ("function" != typeof window.console.log) return;
                return console.log.apply(console, args), !0;
            }
            if ("documentWrite" === transporter) {
                if ("undefined" == typeof document) return;
                return document.write(args.join(" ")), !0;
            }
            if ("alert" === transporter) {
                if ("undefined" == typeof window) return;
                return window.alert(args.join(" ")), !0;
            }
        },
        alert: function(msg) {
            var level = 7, logMsg = this._buildMessage({
                msg: msg,
                level: level
            });
            return this._send(logMsg);
        },
        critical: function(msg) {
            var level = 6, logMsg = this._buildMessage({
                msg: msg,
                level: level
            });
            return this._send(logMsg);
        },
        debug: function(msg) {
            var level = 1, logMsg = this._buildMessage({
                msg: msg,
                level: level
            });
            return this._send(logMsg);
        },
        emergency: function(msg) {
            var level = 8, logMsg = this._buildMessage({
                msg: msg,
                level: level
            });
            return this._send(logMsg);
        },
        error: function(msg) {
            var level = 5, logMsg = this._buildMessage({
                msg: msg,
                level: level
            });
            return this._send(logMsg);
        },
        getLevel: function() {
            return this._level;
        },
        getPrefix: function() {
            return this._prefix;
        },
        getTransporter: function() {
            return this._transporter;
        },
        info: function(msg) {
            var level = 2, logMsg = this._buildMessage({
                msg: msg,
                level: level
            });
            return this._send(logMsg);
        },
        notice: function(msg) {
            var level = 3, logMsg = this._buildMessage({
                msg: msg,
                level: level
            });
            return this._send(logMsg);
        },
        setLevel: function(params) {
            var o = params || {}, level = "number" == typeof o.level ? o.level : null;
            null !== level && (level >= this._levelsName.length || (this._level = level));
        },
        setPrefix: function(params) {
            var o = params || {}, prefix = o.prefix;
            "undefined" != typeof o.prefix && (this._prefix = prefix);
        },
        setTransporter: function(params) {
            var o = params || {}, transporter = o.transporter || null;
            null !== transporter && -1 !== this._transporters.indexOf(transporter) && (this._transporter = transporter);
        },
        warn: function(msg) {
            var level = 4, logMsg = this._buildMessage({
                msg: msg,
                level: level
            });
            return this._send(logMsg);
        }
    };
    return function() {
        this._levelsName = _Logger._levelsName, this._levelsNumber = _Logger._levelsNumber, 
        this._transporter = _Logger._transporter, this._transporters = _Logger._transporters, 
        this._buildMessage = _Logger._buildMessage, this._send = _Logger._send, this.alert = _Logger.alert, 
        this.critical = _Logger.critical, this.debug = _Logger.debug, this.emergency = _Logger.emergency, 
        this.error = _Logger.error, this.getLevel = _Logger.getLevel, this.getPrefix = _Logger.getPrefix, 
        this.getTransporter = _Logger.getTransporter, this.info = _Logger.info, this.notice = _Logger.notice, 
        this.setLevel = _Logger.setLevel, this.setPrefix = _Logger.setPrefix, this.setTransporter = _Logger.setTransporter, 
        this.warn = _Logger.warn, this.setLevel({
            level: _Logger._level
        }), this.setPrefix({
            prefix: _Logger._prefix
        }), this.setTransporter({
            transporter: _Logger._transporter
        });
    };
});