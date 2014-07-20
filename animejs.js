//function that hides list items and heading in center area
function hiding(){
	var $toHide1 = $('input[name=searchBar]').val().toLowerCase();

	$(".center-area li:not(:contains('"+ $toHide1 +"'))").hide();
	$(".center-area li:contains('"+ $toHide1 +"')").show();

	$(".center-area div").each(function(){
		var $element1 = "."+$(this).prop("class");
		$($element1+" ul").each(function(){
			var $element1 = "#section-"+$(this).prop("id").charAt(5);
			if ($(this).children().is(":visible")){
				$($element1).show();
			}
			else {
				$($element1).hide();
			};
		});
		
	});
};
//scrolls down to the headings
function scroll2(button){
	if ($("#section-"+button.prop("id").charAt(9)).is(":visible")) {
		var lPosition = $("#section-"+button.prop("id").charAt(9)).offset();
		$('html, body, .page-content, .center-area').animate({scrollTop: lPosition.top}, "slow");
	};
};
//populates page with list of anime
function populatePage(){
	var headings = '<h1 id="section-{heading}">{heading}</h1>';
	var uList = '<ul id="list-{section}">';
	var listItems = '<li>{name}</li>';
	var myHtml = '<div class="center-area-left">';
	$.each(anime, function(key, value){

	if (key==12){
				myHtml+='</div><div class="center-area-right">';
			}
			// headings
			myHtml += headings.replace(/{heading}/g,value.section);
			//list items
			myHtml += uList.replace(/{section}/g,value.section);
			$.each(anime[key].list, function(key2, value2){
				myHtml += listItems.replace(/{name}/g,value2.anime);
			});
			myHtml += '</ul>';	
	});
	myHtml+='</div>';
	$('.center-area').html(myHtml);
};
// adds box with image and info of anime
function addinfo(element){
	var $section = element.parent().prop('id').charAt(5);
	var $anime = element.text();
	var image ='<img class="info-image" src="{imagePath}"/>';
	var info = '<div class="info">{description}</div>';
	var myHtml='<div class="info-container"><h2 class="info-title">{title}</h2>';
	for (i in anime){
		if ($section == anime[i].section){
			for (h in anime[i].list){
				if ($anime == anime[i].list[h].anime){
					myHtml = myHtml.replace(/{title}/g,anime[i].list[h].anime);
					myHtml += image.replace(/{imagePath}/g,anime[i].list[h].image);
					myHtml += info.replace(/{description}/g,anime[i].list[h].describer);
				}
			}
		}
	}
	myHtml += '</div>';
	$('.page-content').append(myHtml);
	if(event.screenY < 500){
		$('.info-container').css({
			'top': event.pageY-20,
			'left': event.pageX+20
		});
	}
	else{
		$('.info-container').css({
			'top': event.pageY-260,
			'left': event.pageX+20
		});
	}
};
$(document).ready(function(){
	populatePage();
	// click letter buttons on the top
	$(".links h3").click(function(){
		scroll2($(this));
	});
	//click search button
	$('button').click(function(){
		hiding();
	});
	//hit enter key in search bar
	$("input[name=searchBar]").keyup(function(key){
		if ($("input[name=searchBar]:focus") && (key.keyCode === 13)){
			hiding();
		};
	});
	//hover over anime titles
	var hovering = false;
	$(".center-area li").hover(function(){
		$('.info-container').remove();
		addinfo($(this));
		hovering = true;
	},
	function(){
		hovering = false;
		if (!hovering){
			setTimeout(function(){
				if (!hovering){
					$('.info-container').remove();
				}
			},500);
		}
		$('.info-container').hover(function(){
			hovering = true;
		},
		function(){
			hovering = false;
			$('.info-container').remove();
		});
	});
});
