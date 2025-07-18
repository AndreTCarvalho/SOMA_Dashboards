////////////////////////////////////////////////////////////////////////////////
//   This script creates a ScreenHandler class, inheriting from DataHandler,
//   and overrides the updateScreen() method. An object is created when the
//   page loads and is made available to the HTML.
//   To use this code:
//    1) import this script on the HTML page
//    2) define the DATASOURCES string array here in the script
//    3) write the updateScreen() function
////////////////////////////////////////////////////////////////////////////////

// Convert long to timeStamp
export const convertTimestamp = (timestamp, dateSeparator = "/", timeSeparator = ":") => {
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
//     Dashboard Data Source Definitions:               //
//////////////////////////////////////////////////////////
const DATASOURCES = ['Temperature', 'Pressure'];



class ScreenHandler extends DataHandler {
  constructor(dataSourceNames = []) {
    super(dataSourceNames); // Calls the parent class (DataHandler) constructor
    console.log(`Datasource Names: '${DATASOURCES}' `);


    this.plotlyData = [
        {
            type: "indicator",
            value: null,
            delta: { reference: 0 },
            gauge: {
            axis: {
                visible: false,
                range: [0, 100]
            },
            bar: { color: "orange" }
            },
            domain: { row: 0, column: 0 }
        },
        {
            type: "indicator",
            value: null,
            delta: { reference: 0 },
            gauge: {
            // shape: "bullet",
            axis: {
                visible: false,
                range: [0, 100]
            },
            bar: { color: "darkblue" } // Color for the first gauge
            },
            domain: { row: 0, column: 1 }
        }

        ];

    this.plotlyLayout = {
    width: 600,
    height: 400,
    margin: { t: 25, b: 25, l: 25, r: 25 },
    grid: { rows: 1, columns: 2, pattern: "independent" },
    template: {
        data: {
        indicator: [
            {
            title: { text: "Temperatura [°C]" },
            mode: "number+gauge",
            },
            {
            title: { text: "Pressão [bar]" },
            mode: "number+gauge",
            }
        ]
        }
    }
    };
    Plotly.newPlot('dashboard', this.plotlyData, this.plotlyLayout);
  }


  updateScreen() {

    console.log("ScreenHandler: Updating the screen with new data...");
    this._dataSourceNames.forEach(name => {
      const dataItem = this.getDataByDataSourceName(name); // Uses the new method from the parent class
      if (!dataItem) return (false); // Ensures the data item exists

      switch (dataItem.dataSourceName) {

      case 'Temperature': {
        this.plotlyData[0].value = dataItem.data;
        if (dataItem.data >= 80){
            this.plotlyData[0].gauge.bar.color = 'red';
        }
        else {
             this.plotlyData[0].gauge.bar.color = 'orange';
        }
        break;
      }
      case 'Pressure': {
        this.plotlyData[1].value = dataItem.data;
        break;
      }

      default:
        console.log( `TAG: ${name} -> Data source not found. `);

      }


    });
     Plotly.react('dashboard', this.plotlyData, this.plotlyLayout);


  }

}

export let myScreenHandler;

document.addEventListener('DOMContentLoaded', () => {
  // You can pass initial data sources if desired, or an empty list
  const initialTags = DATASOURCES;
  myScreenHandler = new ScreenHandler(initialTags);
  console.log("ScreenHandler instantiated upon page load.");

   // EXPOSE TO GLOBAL SCOPE HERE
  window.myScreenHandler = myScreenHandler; //
});