var BeatManager = require('./beat-manager');
var ColorManager = require('./color-manager');
var EffectManager = require('./effect-manager');
var AlphaEffectManager = require('./alpha-effect-manager');
var MIDI_MAPPINGS = require('./config').MIDI_MAPPINGS;

function Layer() {
	this.layerParams = {
		enabled: 1,
		brightness: 127,

		beatNumber:

		color0:
		color1:
		color2:
		color3:
		colorSpread:
		colorInterpolate:

		effect:
		effectArg1:
		effectArg2:
		effectArg3:
		effectBeatMulti:
		effectBeatEase:

		alpha:
		alphaBeatMulti:
		alphaBeatEase:
	};

	var layerState = {
		color0:
		color1:
		color2:
		color3:
		effectBeatProgress:
		effectBeatBang:
		alphaBeatProgress:
		alphaBeatBang:		
	};

	var effectBeatManager = new BeatManager();
	var colorBeatManager = new ColorBeatManager();
	var colorManager = new ColorManager();
	var alphaManager = new AlphaManager();
	var effectManager = new EffectManager();

	this.processMidiCtrlMessage = function(property,value) {
		this.layerParams[MIDI_MAPPINGS[property]] = value;
	};

	this.processMidiNote = function(note,velocity) {

	};

	this.active = false;
	this.editing = false;
	this.brightness = false;
	this.midiChannel = null;

	this.alphaEffect = null;
	this.effect = null;

	this.render = function(globalState,ctx) {
		var newEffectBeatProgress = beatManager.getBeatProgress(globalState.beatProgress,globalState.beatNumber);
		if(newEffectBeatProgress == 0 || newEffectBeatProgress < layerState.effectBeatProgress)
			layerState.effectBeatBang = true;
		else
			layerState.effectBeatBang = false;

		layerState.effectBeatProgress = newEffectBeatProgress;

		colorManager.getColors(this.layerParams,layerState);
		alphaManager.adjustColors(this.layerParams,layerState);
		effectManager.render(this.layerParms,layerState,ctx);
	}
}

module.exports = Layer;