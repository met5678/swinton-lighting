var TraktorF1 = require('node-traktor-f1').TraktorF1;
var midiManager = require('./ableton-midi');

try {
	var f1 = new TraktorF1();
}
catch(e) {
	var f1 = {
		setLED: function() {}
	};
}



var midi = new midiManager();

midi.on('beat', function(beat) {
	console.log("Beat " + beat);
});

midi.on('channel1', function(property,value) {
	console.log("Received",property,value);
})

var state = {
	beatProgress: 0,
	beatBang: 0,
	phraseProgress: 0,
	phraseBang: 0,
	bpm: 128
};

var layers = [];

f1.setLED('size',1);