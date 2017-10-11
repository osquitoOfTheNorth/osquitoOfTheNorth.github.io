//onload start the gallery
$(document).ready(function(){ startGallery(); })

//global child index to determine where we are in the slideshow
var nextChild;
//number of children elements 
var numchildren;

var browserheight;
var browserwidth;

function startGallery(){

	//all elements except the first child are rendered invisible to the user
	//and are placed on top of each other within the div
	numchildren = $(".gallery").children().length;
	$(".gallery").children().hide();
	//starting at index 0
	browserheight = $(window).height();
	browserwidth = $(window).width();
	moveSlidesWithInterval(0);

}


function moveSlidesWithInterval(index){
	$(".gallery").children().hide();

	nextChild = index+1;
	var clsName = $(".gallery").children()[index].className;
	var selector = "." + clsName;
	var itemWidth = $(selector).width();
	var itemHeight = $(selector).height();
	var leftOffset = (browserwidth/2) - (itemWidth/2);
	var topOffset  = (browserheight/2) - (itemHeight/2);

	$(selector).css({"position":"absolute","top":topOffset, "left":leftOffset});
	$(selector).show( "slide", {direction: "right" }, 1000 );
	window.setTimeout(function(){moveSlidesWithInterval(nextChild%numchildren);}, 4000);

}


