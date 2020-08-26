var jsonexport = require('jsonexport');
var fs = require('fs');
const csvjson = require('csvjson');

fs.readFile('.//files/data.json', 'utf8', function(err, contents) {
    const data = JSON.parse(contents)
    var results=[]
   var dot=Object.keys(data);
   var lan=Object.values(data);

    results.push(lan);
  // results.shift(); 
    console.log('its lan',results);
   // console.log(results);

    jsonexport(results,function(err, csv){
        if(err) return console.log(err);    
    fs.writeFile(".//files/file.csv", csv ,function(err, result) {
        if(err) 
        console.log('error', err);
    })
})
})


   /*  readFile('.//files/data.json', 'utf-8', (err, fileContent) => {
        if (err) {
            console.log(err); // Do something to handle the error or just throw it
            throw new Error(err);
        }
        const csvData = csvjson.toCSV(fileContent, {
            headers: 'key'
        });
        writeFile('.//files/generated.csv', csvData, (err) => {
            if(err) {
                console.log(err); // Do something to handle the error or just throw it
                throw new Error(err);
            }
            console.log('Success!');
        });
    })  */