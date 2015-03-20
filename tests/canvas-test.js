var SerialPort = require('serialport').SerialPort;
var color = require('tinycolor2');

var serialPort = new SerialPort("/dev/tty.usbmodem610421", {
  baudrate: 115200
});

var ledsPerStrip = 270;
var strips = 4;
var pixels = ledsPerStrip*strips;
var fps = 60;

var Canvas = require('canvas');

var canvas = new Canvas(ledsPerStrip,4),
		ctx = canvas.getContext('2d');


var buf = new Buffer(pixels*3);

var y=0;

var doFrame = function() {
	var start = process.hrtime()[1];
	var A = process.hrtime()[1];

	ctx.clearRect(0,0,ledsPerStrip,4);
	var B = process.hrtime()[1];
	ctx.strokeStyle = '#aa0000';
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(y,-1);
	ctx.lineTo(y+10,4);
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = '#aa0044';
	ctx.moveTo(y+50,-1);
	ctx.lineTo(y+60,4);
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = '#660066';
	ctx.moveTo(y+100,-1);
	ctx.lineTo(y+110,4)
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = '#990022';
	ctx.moveTo(y+150,-1);
	ctx.lineTo(y+160,4)
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = '#aa0000';
	ctx.moveTo(y+200,-1);
	ctx.lineTo(y+210,4)
	ctx.stroke();
	var C = process.hrtime()[1];

	pixelData = ctx.getImageData(0,0,ledsPerStrip,4).data;
	var D = process.hrtime()[1];

	for(var pixelIndex=0, bufIndex = 0; pixelIndex<pixelData.length; pixelIndex++) {
		if(pixelIndex%4 == 3)
			continue;

		buf[bufIndex] = pixelData[pixelIndex];
		bufIndex++;
	}
	var E = process.hrtime()[1];

	/*console.log(Math.round((A-start)/1000),
							Math.round((B-A)/1000),
							Math.round((C-B)/1000),
							Math.round((D-C)/1000),
							Math.round((E-D)/1000));
*/
	if(y > 50)
		y = 0;
	else
		y+= 1;

}

var noop = function() {};

var doLoop = function() {
	doFrame();
	serialPort.write(buf, noop);
};

serialPort.on("open", function () {
  console.log('open');
  /*serialPort.on('data', function(data) {
    console.log(data);
  });*/
	setInterval(doLoop,1000/fps | 0);
});