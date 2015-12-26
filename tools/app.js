"use strict"

var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var path = require('path');
// var csvToJson = require('./lib/csvToJson');


require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  Menu.setApplicationMenu(menu);
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

// Menu Template
var template = [
  {
    label: 'CtoJ',
    submenu: [
      {label: 'Quit', accelerator: 'Alt+F4', click: function () {app.quit();}}
    ]
  }, {
    label: 'File',
    submenu: [
      {label: 'Open', accelerator: 'Ctrl+O', click: function() {
        require('dialog').showOpenDialog({ properties: ['openFile']}, function (filePath){
          if (path.extname(filePath) === ".csv") {
            console.log(filePath);
            // document.getElementById("system-message").innerHTML = filePath;
          } else {
            // file is not .csv
          }
        });
      }}
    ]
  }, {
    label: 'View',
    submenu: [
      { label: 'Reload', accelerator: 'Ctrl+R', click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); } },
      { label: 'Toggle DevTools', accelerator: 'F12', click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); } }
    ]
  }
];

var menu = Menu.buildFromTemplate(template);
