$(function() {
    var timerd = null;
    var pIndex = 0;
    //创建小点点运动
    var lis =[];
    for (var i = 0; i < 51; i++) {
        var li =document.createElement('li');
        lis[i]='<li><span class="point"></span></li>';
        document.querySelector('#user_point').innerHTML=lis.join("");
    }
    calc();
    //规划-划过动作
    var processLis =$('.process_bg .dates li');
    for(var i=0;i<processLis.length;i++){
        var icogh = processLis.eq(i).find('.icogh');
        icogh.mouseover(function(){
            var plan = $('.item_date .plan');
            for(var i=0;i<plan.length;i++){
                plan.eq(i).hide();
            }
            $(this).parent().find('.plan').fadeIn(300);

            clearTimeout(timerd);
            timerd =null;
        });
        icogh.mouseout(function(){
            $(this).parent().find('.plan').hide();
            calc();
        });
    }

    function calc(){
        var sli = $('#user_point li');
        for(var i=0;i<sli.length;i++){
            sli.eq(i).find('span').removeClass('active')
        }
        if(pIndex<51){
            $('#user_point').find('li').eq(pIndex).find('span').addClass(' active');
            pIndex++;
            if(pIndex=='4'){
                $('.plan').hide();
                $('.plan.gh01').fadeIn(300);
            }
            if(pIndex=='10'){
                $('.plan').hide();
                $('.plan.gh02').fadeIn(300);
            }
            if(pIndex=='16'){
                $('.plan').hide();
                $('.plan.gh03').fadeIn(300);
            }
            if(pIndex=='22'){
                $('.plan').hide();
                $('.plan.gh04').fadeIn(300);
            }
            if(pIndex=='28'){
                $('.plan').hide();
                $('.plan.gh05').fadeIn(300);
            }
            if(pIndex=='34'){
                $('.plan').hide();
                $('.plan.gh06').fadeIn(300);
            }
            if(pIndex=='40'){
                $('.plan').hide();
                $('.plan.gh07').fadeIn(300);
            }
            if(pIndex=='46'){
                $('.plan').hide();
                $('.plan.gh08').fadeIn(300);
            }
        }else {
            pIndex=0;
        }
        timerd = setTimeout(calc,500);
    }


})
