$(function(){
    var $circle =  $('.process .circle');
    var $banImg = $('.process_circle');
    var $prev = 0, $index = 0;
    $circle.mouseover(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $(this).siblings().attr('src','images/next2.png');
        $index = $(this).data('num');
        if($index == 0){
            $(this).next().attr('src','images/next1.png');
        }else if($index == 5){
            $(this).siblings().attr('src','images/next2.png');
            $(this).prev().attr('src','images/next1.png');
        }else {
            $(this).next().attr('src','images/next1.png');
            $(this).prev().attr('src','images/next1.png');
        }
        change();
    })
    function change(){
        if( $index > $prev ){
            $banImg.eq($prev).css({
                "left" : '39px'
            }).animate({'left':'-599px'} , 300);

            $banImg.eq($index).css({
                "left" : "722px"
            }).animate({
                "left" : '39px'
            },300);
        }else if($index < $prev){
            $banImg.eq($prev).css({
                "left" : '39px'
            }).animate({'left':'722px'} , 300);

            $banImg.eq($index).css({
                "left" : "-599px"
            }).animate({
                "left" : '39px'
            },300);
        }
        $prev = $index;
    }
})

