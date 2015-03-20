var tinycolor = require('tinycolor2');

var ColorManager = function() {
	var _inColor1 = COLORS[1],
			_inColor2 = COLORS[0],
			_inColor3 = COLORS[0],
			_inColor4 = COLORS[0],
			_spread = 0;
			_interpolate = 0;

	this.colorMidiChange = function(property,value) {
		switch(property) {
			case 9:
				_inColor1 = colors[value];
				break;
			case 10:
				_inColor2 = colors[value];
				break;
			case 11:
				_inColor3 = colors[value];
				break;
			case 12:
				_inColor4 = colors[value];
				break;
			case 13:
				_spread = value;
				break;
			case 14:
				_interpolate = value;
				break;
		}
	};

	this.populateState = function(layerState) {
		layerState.color1 = _color1;
		layerState.color2 = _color2;
		layerState.color3 = _color3;
		layerState.color4 = _color4;
	};
};

module.exports = ColorManager;