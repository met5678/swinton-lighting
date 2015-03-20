var util = require('util');
var Emitter = require('events').EventEmitter;
var midi = require('midi');
var config = require('./config');

var BEATS_PER_PHRASE = config.BEATS_PER_PHRASE;
var PULSES_PER_BEAT = config.PULSES_PER_BEAT;

var AbletonMidi = function() {
	this.curPulse = 0;
	this.curBeat = 0;
	this.bpm = 0;
	var ee = this;

	var parsePosition = function(lsb,msb) {
		this.curBeat = (lsb >> 2) % 16;
		this.curPulse = (lsb % 4) * 6;
	};

	var incrementBeat = function() {
		this.curBeat++;
		if(curBeat >= BEATS_PER_PHRASE) {
			this.curBeat = 0;
			ee.emit('phrase');
		}
		ee.emit('beat',this.curBeat);
	};

	var logPosition = function() {
		console.log("Beat " + curBeat, "Pulse " + curPulse);
	};

	var onPulse = function() {
		this.curPulse++;
		if(curPulse >= PULSES_PER_BEAT) {
			incrementBeat();
			this.curPulse = 0;
		}
	};

	var parseMidiInput = function(deltaTime, message) {
		if(message[0] === 248) {
			onPulse();
			return;
		}

		switch(message[0]) {
			case 242:
				parsePosition(message[1],message[2]);
				break;
			case 176:
				ee.emit('channel1',message[1],message[2]);
				break;
			case 252:
				ee.emit('stop');
				break;
			case 251:
			case 250:
				ee.emit('start');
				break;
			default:
				console.log("Unhandled",message);
				break;
		}
	};

	var init = function() {
		var input = new midi.input();
		input.on('message',parseMidiInput);
		input.ignoreTypes(true,false,true);
		input.openVirtualPort("tilda-ableton");
	};

	init();
};

util.inherits(AbletonMidi, Emitter);

module.exports = AbletonMidi;
