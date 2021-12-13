window.saveDataAcrossSessions = true
// array to store webgazer data
// init with headers
let dataArr = [["X", "Y"]];
let csv1;
let csv2;
let csv3;
let counter = 0;
// array to store csv files
//let csvArr = [csv1, csv2, csv3];
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
  //export data
  //do array here!
  console.log("after run")
  csvArr.push(csv1, csv2);

  

  console.log(csvArr.length);
  console.log(csv1.length);
  console.log(csv2.length);
  //console.log(csv3.length);
  // console.log(csvArr.length);
  // console.log(csvArr[0]);

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

// function sendData(){
//   var nodemailer = require('nodemailer');
//   let transport = nodemailer.createTransport({
//     service: "Gmail",
//     port: 465,
//     secure: true,
//     auth:{
//       user: "plnueyetracker@gmail.com",
//       pass: "webgazerintegration",
//     }
//   });

//   let email = {
//     from: "plnueyetracker@gmail.com",
//     to: "yacomctaco@gmail.com",
//     subject: "test",
//     text: "did this work",
//     html: "<b>HELLLLOOOOO</b>",
//   };

//   transport.sendMail(email, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("email sent " + info.response);
//     }
//   });

//   console.log("message sent: %s", email.messageId)
// }
// sendData();

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
    // counter = counter + 1;
    // console.log("data 1");
    // console.log(csvArr[0]);

    setTimeout(function () {
      console.log("Image 1");
      webGazeListen();
      counter = counter + 1;
      console.log("data 2");
      //console.log(csvContent[1]);

      setTimeout(function () {
        console.log("Image 2");
        webGazeListen();
        counter = counter + 1;
        console.log("data 3");
        //console.log(csvContent[2]);

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

    console.log("counter at " +counter);

    switch (counter) {
      case 0:
        csv1 = "data:text/csv;charset=utf-8,"
          + dataArr.map(e => e.join(",")).join("\n");
          console.log("csv1 undefined " + (csv1 == undefined));
        //csvArr.push(csv1);
        break;
      case 1:
        csv2 = "data:text/csv;charset=utf-8,"
          + dataArr.map(e => e.join(",")).join("\n");
          console.log("csv2 undefined " + (csv2 == undefined));
        //csvArr.push(csv2);
        break;
      case 2:
        csv3 = "data:text/csv;charset=utf-8,"
          + dataArr.map(e => e.join(",")).join("\n");
          console.log("csv3 undefined " + (csv3 == undefined));
        //csvArr.push(csv3);
        break;
    }
    //format to csv and store in csvContent variable for export
    // let csvContent = "data:text/csv;charset=utf-8,"
    //   + dataArr.map(e => e.join(",")).join("\n");

    //replace console.log with SMTP
    //console.log(csvContent);


  }).begin()

}
//----------------------------------------------

//Start tracking
console.log("STARTING");
run();


//while pictures are present
//callback gaze listener
//pause listener on image transitions

//wrap listener in timeout function
//on dom content loaded, start timer
// after 30 seconds, pause data collection