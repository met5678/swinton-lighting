var SerialPort = require('serialport').SerialPort;

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

var curPixel = 0;
var startMillis = Date.now();

var doFrame = function() {
	buffer = new Buffer(pixels*3);
	buffer.fill(0x00);

	if(curPixel < ledsPerStrip) {
		var curPixelIndex = curPixel;
		buffer[curPixel*3] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+1] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+2] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		curPixel += 1;
		buffer[curPixel*3] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+1] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+2] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		curPixel += 1;
		buffer[curPixel*3] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+1] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+2] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		curPixel -= 2;

		curPixel += ledsPerStrip;

		buffer[curPixel*3] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+1] = 0;//Math.random()*256 | 0;
		buffer[curPixel*3+2] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		curPixel += 1;
		buffer[curPixel*3] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+1] = 0;//Math.random()*256 | 0;
		buffer[curPixel*3+2] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		curPixel += 1;
		buffer[curPixel*3] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+1] = 0;//Math.random()*256 | 0;
		buffer[curPixel*3+2] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		curPixel -= 2;

		curPixel += ledsPerStrip;

		buffer[curPixel*3] = 0;//Math.random()*256 | 0;
		buffer[curPixel*3+1] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+2] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		curPixel += 1;
		buffer[curPixel*3] = 0;//Math.random()*256 | 0;
		buffer[curPixel*3+1] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+2] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		curPixel += 1;
		buffer[curPixel*3] = 0;//Math.random()*256 | 0;
		buffer[curPixel*3+1] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+2] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		curPixel -= 2;

		curPixel += ledsPerStrip;

		buffer[curPixel*3] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+1] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+2] = 0;//Math.random()*256 | 0;
		curPixel += 1;
		buffer[curPixel*3] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+1] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+2] = 0;//Math.random()*256 | 0;
		curPixel += 1;
		buffer[curPixel*3] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+1] = Math.abs(80 - curPixelIndex);//Math.random()*256 | 0;
		buffer[curPixel*3+2] = 0;//Math.random()*256 | 0;
		curPixel -= 2;

		curPixel -= ledsPerStrip*3;
	}

	if(Date.now() >= startMillis + 1000) {
		startMillis = Date.now();
		curPixel = 0;
	}
	else {
		curPixel++;
	}

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