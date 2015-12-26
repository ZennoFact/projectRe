'use strict';

var remote = require('remote');
var csvToJson = remote.require('./lib/csvToJson');

csvToJson.readCSV();
