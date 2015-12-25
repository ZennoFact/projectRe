var CSV = require("comma-separated-values");

var data = '\
year,age,name\r\n\
1980,34,taro\r\n\
1979,35,hanako\r\n\
';

var result = new CSV(data, { header: true }).parse();
console.log(result);
