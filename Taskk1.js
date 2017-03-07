
// load johnny-five modules
var five = require("johnny-five");
//create  built-in object type
var board = new five.Board();

board.on("ready", function() {
  var motion = new five.Motion(3);
  //calibration at the beginning
  motion.on("calibrated", function() {
    console.log("calibrated");
  });


  motion.on("motionstart", function() {
    console.log("Detected");
    var led=new five.Led(13); //pin 13 for led
    // led is turned on when motion is detected

    led.blink()
    setTimeout(function(){ led.stop() && led.off(); }, 2000);
// LED blinks for 2sec and stops blinking
  });

  motion.on("motionend", function() {
    console.log("End");
     var led2 = new five.Led(13);// pin 13 for led
//led is turned off when motion ends

    led2.off()
  });

});

//Reference: Motion detection with Passive Infrared sensor. Retrieved from http://johnny-five.io/examples/motion/


