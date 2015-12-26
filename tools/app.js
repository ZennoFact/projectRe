var CSV = require("comma-separated-values");
var fs = require('fs');

var buffer = fs.readFileSync('./database.csv');

var data = buffer.toString();

var result = new CSV(data, { header: true }).parse();
console.log(result);

fs.writeFile('../data.json', JSON.stringify(result, null, '  '));
