var SerialPort = require('serialport').SerialPort;
var color = require('tinycolor2');

var serialPort = new SerialPort("/dev/tty.usbmodem610421", {
  baudrate: 115200
});

var ledsPerStrip = 234;
var strips = 4;
var pixels = ledsPerStrip*strips;
var fps = 100;

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

var curPixel = 0;
var curLevel = 0;
var levelStep = 0.125;
var curColor = getRandomColor();
var ledSpacing = 10;
var startMillis = Date.now();

var doFrame = function() {
	buffer = new Buffer(pixels*3);
	buffer.fill(0x00);

	var pixStrip = Math.floor(curLevel);

	if(curLevel % 1 == 0)
		curColor = getRandomColor();

	var brightFactor = Math.pow(1-2*Math.abs(curLevel % 1 - 0.5),2);

	var startLED = Math.round(ledSpacing*(curLevel%1));

	//console.log(brightFactor);

	var adjColor = [
		curColor[0]*brightFactor,
		curColor[1]*brightFactor,
		curColor[2]*brightFactor
	];

	for(var led=startLED+pixStrip*ledsPerStrip; led<(pixStrip+1)*ledsPerStrip; led+=ledSpacing) {
		var addr = led*3;
		buffer[addr] = adjColor[0];
		buffer[addr+1] = adjColor[1];
		buffer[addr+2] = adjColor[2];
		if(led < (pixStrip+1)*ledsPerStrip-1) {
			buffer[addr+3] = adjColor[0];
			buffer[addr+4] = adjColor[1];
			buffer[addr+5] = adjColor[2];
		}
		if(led < (pixStrip+1)*ledsPerStrip-2) {
			buffer[addr+6] = adjColor[0];
			buffer[addr+7] = adjColor[1];
			buffer[addr+8] = adjColor[2];
		}
	}

	if(curLevel >= 4)
		curLevel = 0;
	else
		curLevel += levelStep;

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