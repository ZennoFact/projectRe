var CSV = require("comma-separated-values");
var fs = require('fs');

var data = '\
title,path,tag1,tag2,tag3\r\n\
html,./html.md,web,front,markup\r\n\
PHP,./php.md,web,serverside,\r\n\
js,./js.md,web,front,program\r\n\
';

var result = new CSV(data, { header: true }).parse();
console.log(result);

fs.writeFile('data.json', JSON.stringify(result, null, '  '));
