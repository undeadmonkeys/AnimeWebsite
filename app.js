(function(){
	var app = angular.module('JakesAnimeList', []);

	app.controller('AnimeListController', ['$http',function($http){
	    var shows = this;
    	shows.animes = [];

	    $http.get('/anime-data.json').success(function(data){
	            shows.animes = data;
	    });

	    this.hiding = function() {
	    	var element;
	    	setTimeout(function(){
		    	$(".center-area div").each(function(){
		    		element = "."+$(this).prop("class");
		    		$(element+" ul").each(function(){
			    		element = "#section-"+$(this).prop("id").charAt(5);
						if ($(this).children().length != 0){
							$(element).show();
						}
						else {
							$(element).hide();
						};
					});
		    	});
	    	},50);
	    };
	}]);

	app.controller('AnimeNavController', function(){
		this.nav = function(letter){
	    	if ($("#section-"+letter).is(":visible")) {
				var lPosition = $("#section-"+letter).offset();
				$('html, body').animate({scrollTop: lPosition.top}, "slow");
			};
	    };

	});
	
	app.directive('animeNav', function(){
		return {
			// required: '^AnimeNavController',
			restrict: 'E',
			// scope: {
			// 	mySection: '='
			// },
			templateUrl: 'app-templates/anime-nav.html',
			// link: function(scope, element, attrs, controller){
			// }
		};
	});

	app.directive('animeList', function(){
		return {
			restrict: 'E',
			templateUrl: 'app-templates/anime-list.html'
		};
	});
})();		
