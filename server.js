var five = require("johnny-five");
var board = new five.Board();
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var motioncount=0
var longmotionCount=0
var shortmotionCount=0
var timsMotionSensorTurnedOn=0
var tmp="True" //creating the flag



app.get('/', function (req, res) {
   res.sendfile( 'control_panel.html' );
});


//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');


setInterval(function(){
    io.emit('news', motioncount);
    io.emit('long', longmotionCount);
    io.emit('short', shortmotionCount);
}, 100);



  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

});



board.on("ready", function() {
  led = new five.Led(13);
});

// For turning on the led
app.post('/process_get', function (req, res) {
    console.log("A client wants to turn on the led")
   // Prepare output in JSON format
        if(board.isReady){led.on();}
});




//For turning off the led
app.post('/turnoff', function (req, res) {
    console.log("A client wants to turn off the led")
   // Prepare output in JSON format
        if(board.isReady){led.off();}
});







// Turn on the motion sensor, if it's turned back on we change the tmp from false to true r
app.post('/motionon', function (req, res) {

     console.log("A client wants to turn on the motion sensor");

    timsMotionSensorTurnedOn+=1
    if (timsMotionSensorTurnedOn>1){
        tmp="True"

    }else{



    motion = new five.Motion(2);




  //calibration at the beginning
    motion.on("calibrated", function () {

        if (tmp=="True"){

            console.log("calibrated");

              }

        });


    var start=0
    var end=0


        motion.on("motionstart", function () {
            if (tmp=="True") {


                console.log("Detected");
                start = new Date()
                motioncount += 1

                var led = new five.Led(13); //pin 13 for led
                // led is turned on when motion is detected
                led.blink()
                setTimeout(function () {
                    led.stop() && led.off();
                }, 2000);
// LED blinks for 2sec and stops blinking
            }
        });


        motion.on("motionend", function () {

            if (tmp=="True"){


            console.log("End");
            end = (new Date() - start) / 1000

// if motion lasts more than 6 second than its considered as a long motion, other wise its a short motion
            if (end >= 6 && end < 100000) {
                console.info("It's a long motion and motion lasts: %ds", end);
                longmotionCount += 1
            } else if (end < 6) {
                console.info("It's a short motion and motion lasts: %ds", end)
                shortmotionCount += 1
            }
                                    }

                                                                 });


            }


});





// Turn off the motion sensor
app.post('/motionoff', function (req, res) {
    console.log("A client wants to turn off the motion sensor");
    tmp="False"
});



http.listen(8081, function(){
  console.log('listening on * :8081');
});


//Reference: Motion detection with Passive Infrared sensor. Retrieved from http://johnny-five.io/examples/motion/
