////////////////////////////////////////////////////////////////////////////////
//   This script creates a ScreenHandler class, inheriting from DataHandler,
//   and overrides the updateScreen() method. An object is created when the
//   page loads and is made available to the HTML.
//   To use this code:
//    1) import this script on the HTML page
//    2) define the TAGS string array here in the script
//    3) write the updateScreen() function
////////////////////////////////////////////////////////////////////////////////

// Convert long to timeStamp
export const convertTimestamp = (timestamp, dateSeparator = "/",timeSeparator=":") => {
    let d = new Date(timestamp);
    let yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = d.getHours(),
    min = ('0' + d.getMinutes()).slice(-2),
    sec = ('0' + d.getSeconds()).slice(-2),

    time = `${dd}${dateSeparator}${mm}${dateSeparator}${yyyy} ${hh}${timeSeparator}${min}${timeSeparator}${sec}`;

    return time;
};



// Import the DataHandler class from dataHandler.js
import { DataHandler } from './dataHandler.js';


//////////////////////////////////////////////////////////
//     Dashboard TAG Definitions:                       //
//////////////////////////////////////////////////////////
const DATASOURCES = ['Temperature', 'Pressure'];





class ScreenHandler extends DataHandler {
  constructor(dataSourceNames = []) {
    super(dataSourceNames); // Calls the parent class (DataHandler) constructor
    console.log(`Registered Data Sources: '${DATASOURCES}'`);
    console.log("ScreenHandler: Instance created and ready to manage screen updates.");
  }

  updateScreen() {
    console.log("ScreenHandler: Updating the screen with new data...");

    //////////////////////////////////////////////////////////
    //     This is an Example. Replace with your Code.      //
    //////////////////////////////////////////////////////////

    var output = "";
    this._dataSourceNames.forEach(name => {
      const dataItem = this.getDataByDataSourceName(name); // Uses the new method from the parent class
      if (dataItem) {
        output += `
            Data Source: ${dataItem.dataSourceName},
            Value: ${dataItem.value},
            Alarm: ${dataItem.alarm},
            Timestamp: ${convertTimestamp(dataItem.timestamp)},
            Type: ${dataItem.type},
            Unit: ${dataItem.unit},
            Precision Digits: ${dataItem.precisionDigits} \r\n`;

      } else {
        output += `Data Source: ${name} not found. \n`;
      }
      outputParagraph.textContent = output;
      // Ensure outputParagraph is accessible in this scope if it's not global
      // For this example, assuming it's available from the HTML document.

    });
  }
}


export let myScreenHandler;

document.addEventListener('DOMContentLoaded', () => {
  const initialTags = DATASOURCES;
  myScreenHandler = new ScreenHandler(initialTags);
  console.log("ScreenHandler instantiated upon page load.");

  // EXPOSE TO GLOBAL SCOPE HERE
  window.myScreenHandler = myScreenHandler;
});