var tilda = angular.module('tilda',[]);

tilda.controller('EffectSelectCtrl', function($scope) {
	$scope.effects = [
		{
			'name':'sweep',
			'params': [
				{
					'name':'lineThickness',
					'type':'float',
					'min':0,
					'max':50
				}
			]
		},
		{
			'name':'solid'
		},
		{
			'name':'magnetic'
		}
	];
});

