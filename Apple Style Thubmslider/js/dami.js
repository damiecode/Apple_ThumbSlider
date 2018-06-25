$(document).ready(function(){
	// We start by declaring some variables
	var totalWidth = 0;
	var positions = new Array();
	
	$('#slides .slides').each(function(i){
		// This will get the slider widths
		positions[i] = totalWidth;
		totalWidth += $(this).width();
		
		// This will check widths
		if(!$(this).width()){
			alert('Please add a width to your images');
			return false;
		}
	});
	
	// Here we set width
	$('#slides').width(totalWidth);
	
	// This will take care of the menu item click handler
	$('#menu ul li a').click(function(e, keepScroll){
		// Here we remove active class and add inactive
		$('li.product').removeClass('active').addClass('inactive');
		// Here we add active class to parent
		$(this).parent().addClass('active');
		
		var pos  = $(this).parent().prevAll('.product').length;
		
		$('#slides').stop().animate({marginLeft:-positions[pos]+'px'}, 450);
		
		// Now we prevent default
		e.preventDefault();
		
		// And here we stop autoscroll
		if(!autoScroll) clearInterval(itvl);
	});
	
	// Now here we make first image active
	$('#menu ul li.product:first').addClass('active').siblings().addClass('inactive');
	
	// Here we auto scroll
	var current= 1;
	function autoScroll(){
		if(current == -1) return false;
		
		$('#menu ul li a').eq(current%$('#menu ul li a').length).trigger('click',[true]);
		current++;
	}
	
	// Lastly this will take care of the duration for the auto scroll
	var duration = 10;
	var itvl = setInterval(function(){autoScroll()},duration*1000);
});