// convertFile.js

const fs = require("fs");
const path = require("path");


function convert(file) {
    console.log("Attempting to convert " + file + " to JSON.");
    fs.readFile(file, (error, data) => {
        if(error) {
            console.log("encounterd and error reading " + file);
            console.error(error);
            throw error;
        } else {
            // convert file with json
            const jsonData = ""; // add call to library
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
    });
}

convert(process.argv[2]);