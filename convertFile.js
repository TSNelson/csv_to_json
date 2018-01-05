// convertFile.js

const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");


function convert(file) {
    console.log("Attempting to convert " + file + " to JSON.");
    fs.readFile(file, (error, data) => {
        if(error) {
            console.log("encounterd and error reading " + file);
            console.error(error);
            throw error;
        } else {
            dataToObjects(data);
        }
    });
}

function dataToObjects(data) {
    let output = [];
    csv().fromString(data)
         .on('json', (rowObj) => {
             //console.log(rowObj);
             output.push(rowObj);
         })
         .on('done', () => {
             console.log("File converted to JSON using csvtojson.");
             writeToFile(output);
         });
}

function writeToFile(obj) {
    const jsonData = JSON.stringify(obj, null, 2);
    const outputFile = path.join(__dirname, "customer-data.json");
    fs.writeFile(outputFile,
                 jsonData, 
                 "utf-8",
                 (error) => {
                    if (error) {
                        console.log("error on writing file " + outputFile);
                        console.error(error);
                        throw error;
                    } else {
                        console.log("File conversion complete.");
                    }
                 });
}

convert(process.argv[2]);