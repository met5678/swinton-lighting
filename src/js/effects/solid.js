module.exports = function(state,ctx) {
	ctx.fillStyle = state.color1;
	ctx.fillRect(0,0,state.width,state.height);
};