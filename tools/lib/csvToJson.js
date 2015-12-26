'use strict';

// TODO: Is it use?
var glob = require('glob');
var fs = require('fs')
var CSV = require("comma-separated-values");

var fileUtil = {
  fetchReadmeList: function (cb) {
    glob('./database.csv', function (err, matches) {
      if(err) {
        cb(err, null);
        return;
      }
      cb(null, matches);
    });
  },
  readCSV: function () {
    var fs = require('fs');
    var buffer = fs.readFileSync('./database.csv');

    var data = buffer.toString();
    this.outputCSV(data);
  },
  outputCSV: function (data) {
    var result = new CSV(data, { header: true }).parse();
    console.log(result);

    fs.writeFile('../data.json', JSON.stringify(result, null, '  '));
  }
};

module.exports = fileUtil;
