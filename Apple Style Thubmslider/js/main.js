$(document).ready(function(){
    //declare variables
    var totalWidth = 0;
    var positions = new Array();

    $('#slides .slides').each(function(i){
        //get slider width
        positions[i] = totalWidth;
        totalWidth += $(this).width();

        //check width
        if(!$(this).width()){
            alert('Please add a width to your images');
            return false;
        }
    });

    //set width
    $('#slides').width(totalWidth);

    //menu item click handler
    $('#menu ul li a').click(function(e, keepScroll){
        //remove active class add inactive
        $('li.product').removeClass('active').addClass('inactive');

        //add active class to parent 
        $(this).parent().addClass('active');
    
        var pos = $(this).parent().prevAll('.product').length;
    
        $('#slides').stop().animate({marginLeft:-positions[pos]+'px'}, 450);
        //prevent default
        e.preventDefault();
    
        //step autoscroll
        if(!autoScroll) clearInterval(itvl);
    });

    $('#menu ul li.product:first').addClass('active').siblings().addClass('inactive');

    var current = 1;
    function autoScroll(){
        if(current == -1) return false;
        $('#menu ul li a').eq(current%$('#menu ul li a').length).trigger('click', [true]);
        current++;
    }

var duration = 10;
var itvl = setInterval(function(){autoScroll()}, duration*1000);
});