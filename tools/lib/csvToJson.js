'use strict';

var fs = require('fs')
var CSV = require("comma-separated-values");

var csvToJson = {
  readCSV: function (path) {
    var buffer = fs.readFileSync(path);

    var data = buffer.toString();
    this.outputJson(data);
  },
  outputJson: function (data) {
    var result = new CSV(data, { header: true }).parse();

    fs.writeFile('../data.json', JSON.stringify(result, null, '  '));
    return;
  }
};

module.exports = csvToJson;
