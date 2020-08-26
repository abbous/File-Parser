var exporter = require('csv-to-mysql');
exporter('localhost','csvparser','root','',".//files/.csv");

