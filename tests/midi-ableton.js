var midi = require('midi');

var input = new midi.input();

var BEATS_PER_PHRASE = 16;
var PULSES_PER_BEAT = 24;

var ppm = 96;
var ppb = 24;
var curPulse = 0;
var curBeat = 0;
var curMeasure = 0;
var curPhrase = 0;
var bpm = 0;

var parsePosition = function(lsb,msb) {
	curBeat = (lsb >> 2) % 16;
	curPulse = (lsb % 4) * 6;
	logPosition();
};

var incrementBeat = function() {
	curBeat++;
	if(curBeat >= BEATS_PER_PHRASE) {
		curBeat = 0;
		// Emit phrase
	}

	logPosition();
	// Emit beat
};

var logPosition = function() {
	//console.log("P" + curPhrase + " B" + curBeat + " M" + curMeasure);
	console.log("Beat " + curBeat, "Pulse " + curPulse);
};

var onPulse = function() {
	curPulse++;
	if(curPulse >= PULSES_PER_BEAT) {
		incrementBeat();
		curPulse = 0;
	}
};

input.on('message', function(deltaTime, message) {
	if(message[0] === 248) {
		onPulse();
		return;
	}

	switch(message[0]) {
		case 242:
			parsePosition(message[1],message[2]);
			break;
		case 176:
			// Emit message
			break;
		case 252:
			console.log("Stop");
			break;
		case 251:
			console.log("Continue");
			break;
		case 250:
			console.log("Start");
			break;
		default:
			console.log("Unhandled",message);
			break;
	}
	//console.log(message);



    //console.log('m:' + message + ' d:' + deltaTime);
});

// Create a virtual input port.
input.ignoreTypes(true,false,true);
input.openVirtualPort("Test Input");
