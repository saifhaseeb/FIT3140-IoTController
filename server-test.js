var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  led = new five.Led(13);
});

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

        if(board.isReady){led.on();}
            console.log("ON")

})


//For turning off the led
app.post('/turnoff', function (req, res) {

    console.log("A client wants to turn off the led")
   // Prepare output in JSON format

        if(board.isReady){led.off();}
            console.log("OFF")


})









var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Server is running at http://%s:%s", host, port)

})