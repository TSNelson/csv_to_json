// convert_csv_to_json.js

const fs = require('fs');
const path = require('path');

function convert(filePath) {
  let folderPath = path.dirname(filePath);
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.log("error on readFile:" + filePath);
      console.error(error);
      throw error;
    } else {
      let customers = createCustomerArray(data),
          jsonData = JSON.stringify(customers);
      
      const newFilePath = path.join(folderPath, "customer-data.json");
      fs.writeFile(newFilePath, jsonData, 'utf-8', (error) => {
        if (error) {
          console.log("error on writeFile:" + newFilePath);
          console.error(error);
          throw error;
        } else {
          console.log("File created: " + newFilePath);
        }
      });
    }
  });
}

function createCustomerArray(data) {
  const lines = data.split('\r\n'),
        keys = convertLine(lines[0]);
  // remove first and last lines from file
  lines.shift(); 
  lines.pop();
  
  let customers = [],
      customerData;
      
  lines.forEach((line, index) => {
    customerData = convertLine(line);
    let customer = makeObject(keys, customerData);
    customers.push(customer);
  });
  
  return customers;
}

// String -> [String Array]
function convertLine(line) {
  return line.split(",");
}

// [String Array], [String Array] -> {Object Literal}
function makeObject(keys, values) {
  let newObject = {};
  keys.forEach((key, index) => {
    newObject[key] = values[index];
  });
  return newObject;
}


console.log("attempting to convert customer data: " + process.argv[2]);
convert(process.argv[2]);