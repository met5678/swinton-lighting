var SerialPort = require('serialport').SerialPort;

var serialPort = new SerialPort("/dev/tty.usbmodem610421", {
  baudrate: 115200
});

var ledsPerStrip = 234;
var strips = 4;
var pixels = ledsPerStrip*strips;
var fps = 60;
var whiteLevel = 0xff;

var leds = [];

for(var a=0; a<pixels*3; a++) {
	leds.push(Math.floor(Math.random()*256));
}

var buffer = new Buffer(leds);

var getRandomColor = function() {
	return [
		Math.floor(Math.random()*256),
		Math.floor(Math.random()*256),
		Math.floor(Math.random()*256)
	];
};

var onFrames = 1;
var offFrames = 5;
var curFrame = 0;

var curColor = getRandomColor();
var startMillis = Date.now();

var doFrame = function() {
	buffer = new Buffer(pixels*3);

	if(curFrame < onFrames)
		buffer.fill(whiteLevel);

	else
		buffer.fill(0x00);

	curFrame = (curFrame+1)%(onFrames+offFrames);
}

var noop = function() {};

var doLoop = function() {
	doFrame();
	serialPort.write(buffer, noop);
};

serialPort.on("open", function () {
  console.log('open');
  /*serialPort.on('data', function(data) {
    console.log(data);
  });*/
	setInterval(doLoop,1000/fps | 0);
});