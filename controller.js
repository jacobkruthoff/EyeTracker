window.saveDataAcrossSessions = true
// array to store webgazer data
// init with headers
let dataArr = [["X", "Y"]];
let csv1;
let csv2;
let csv3;
let pics = 3;

for(let i = 0; i < pics; i++){
  setTimeout(run, 30000);
}



//while pictures are present
//callback gaze listener
//pause listener on image transitions

//wrap listener in timeout function
//on dom content loaded, start timer
// after 30 seconds, pause data collection

function run() {

  webGazeListen();
  webgazer.pause();
  //export data
  //do array here!
  
  
}

function webGazeListen() {
  webgazer.setGazeListener((data) => {

    if (data == null) {
      return;
    }
    //push x and y coordinates to array
    dataArr.push([data.x, data.y]);
    //format to csv and store in csvContent variable for export
    let csvContent = "data:text/csv;charset=utf-8,"
      + dataArr.map(e => e.join(",")).join("\n");

    //replace console.log with SMTP
    console.log(csvContent);

  }).begin()
}



webgazer.pause();
