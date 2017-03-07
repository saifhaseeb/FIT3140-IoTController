var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/control_panel.html', function (req, res) {
   res.sendFile( __dirname + "/" + "control_panel.html" );
})


// For turning on the led
app.post('/process_get', function (req, res) {

    console.log("A client wants to turn on the led")
   // Prepare output in JSON format
var exec = require('child_process').exec,
    child;

child = exec('node turnon.js {{args}}',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
})


//For turning off the led
app.post('/turnoff', function (req, res) {

    console.log("A client wants to turn off the led")
   // Prepare output in JSON format
var exec = require('child_process').exec,
    child;

child = exec('node turnoff.js {{args}}',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
})









var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Server is running at http://%s:%s", host, port)

})