/**
 * Created by michael on 23.08.15.
 */
var util = require('util'),
    log = util.log,
    _ = require('lodash'),
    Promise = require('bluebird'),
    fs = require("fs"),
    moment = require('moment');

var deepLogger = function (object, options, timestamp, type) {
    this.defaults = {
        showHidden: true,
        depth: 25
    };
    if (!isNaN(options)) {
        options.depth = options
    }else {
        options = _.extend(this.defaults, options);
    }
    var output = function() {
        return util.inspect(object, options);
    };
    return Promise.try(function () {
        if (object && typeof object != 'object') {
            return !timestamp ? log(object) : console.log(object)
        }
        return log(output());
    }).then(function () {
        type = type || 'Info';
        var toLog = "\n" + '[' + moment().format('DD.MM. - HH:mm:ss') + '] ' + type + ': ' + (typeof object == 'object' ? output(object,{showHidden:true,depth:99}) : object);
        fs.appendFile("log_" + moment().format('DD_MM_YY') + ".log", toLog, function () {
        });
    }).done();
};

deepLogger.error = function (object, options, timestamp) {
    return deepLogger(object, options, timestamp, 'Error')
};

module.exports = {
    deepLogger: deepLogger
};

