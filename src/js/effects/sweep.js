/*
Arg 1: Line direction (0 right, 1 left)
Arg 2: Line thickness
*/

module.exports = function(state,ctx) {
	var bp = state.beatProgress;

	ctx.strokeStyle = state.color1;
	ctx.lineWidth = state.arg2;
	if(state.arg1) {
		var curX = (1-bp)*state.width;
	}
	else {
		var curX = bp*state.width;
	}
	
	ctx.drawLine(curX,-1,curX,state.height);
};