window.saveDataAcrossSessions = true
// array to store webgazer data
// init with headers
let dataArr = [["X", "Y"]];

//while pictures are present
//callback gaze listener
//pause listener on image transitions

//wrap listener in timeout function
//on dom content loaded, start timer
// after 30 seconds, pause data collection

webgazer.setGazeListener((data) => {

  if(data == null){
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

webgazer.pause();