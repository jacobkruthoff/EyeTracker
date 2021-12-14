window.saveDataAcrossSessions = true
// array to store webgazer data
// init with headers
let dataArr = [["X", "Y"]];
let csv1;
let csv2;
let csv3;
let counter = 0;
// array to store csv files
let csvArr = [];
//change depending on the amount of images
let pics = 3;
//time for each question
//29.5 seconds on webgazer for 30 second questions worked best just for when transitioning
let time = 29500;

//FUNCTIONS-----------------------------------
function pausing() {
  console.log("pausing");
  webgazer.pause();
  console.log("after run")
  csvArr.push(csv1, csv2);

}

function exportData(){
  console.log("in export data");
  for (let i = 0; i < csvArr.length; i++) {

    var encodedURI = encodeURI(csvArr[i]);
    let str = "Image_" + i + ".csv";
    let link = document.createElement('a');
    link.setAttribute("href", encodedURI);
    link.setAttribute("download", str);
    document.body.appendChild(link);

    link.click();
  }
}

function run() {
  //this is just webgazer running, not storing data in CSV format
  //Used for calibrting Webgazer
  webgazer.setGazeListener((data) => {
    console.log(data);
  }).begin()

  //timeouts got confused when just one after another
  //nesting them in one another garantees that the first one has to execute before the next one
  setTimeout(function () {
    console.log("Default");
    webGazeListen();
  
    setTimeout(function () {
      console.log("Image 1");
      webGazeListen();

      setTimeout(function () {
        console.log("Image 2");
        webGazeListen();

        setTimeout(function () {  //stops running after 3 images. If you wish to add more images, copy pattern above
          pausing();
        }, time) //times for each question
      }, time)
    }, time);
  }, 60000) //time to calibrate
}

function webGazeListen() {

  webgazer.setGazeListener((data) => {

    if (data == null) {
      return;
    }
    //push x and y coordinates to array
    dataArr.push([data.x, data.y]);

    switch (counter) {
      case 0:
        csv1 = "data:text/csv;charset=utf-8,"
          + dataArr.map(e => e.join(",")).join("\n");
        break;
      case 1:
        csv2 = "data:text/csv;charset=utf-8,"
          + dataArr.map(e => e.join(",")).join("\n");
        break;
      case 2:
        csv3 = "data:text/csv;charset=utf-8,"
          + dataArr.map(e => e.join(",")).join("\n");
        break;
    }
  }).begin()

}
//----------------------------------------------

//Start tracking
console.log("STARTING");
run();