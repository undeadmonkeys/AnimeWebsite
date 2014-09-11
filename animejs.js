// adds box with image and info of anime
function addinfo(element){
	var $section = element.parent().prop('id').charAt(5);
	var $anime = element.text();
	var image ='<img class="info-image" src="{imagePath}"></img>';
	var info = '<p class="info">{description}</p>';
	var myHtml='<div class="info-container"><h3 class="info-title">{title}</h3>';
	for (i in anime){
		if ($section == anime[i].section){
			for (h in anime[i].list){
				if ($anime == anime[i].list[h].title){
					myHtml = myHtml.replace(/{title}/g,anime[i].list[h].title);
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
