$(document).ready(function () {

    $('#oficial').on('click', function () {

        $('html, body').animate({
            scrollTop: $("#div1").offset().top - 110
        }, 1000);

    });
    $('#sanctional').on('click', function () {

        $('html, body').animate({
            scrollTop: $("#div2").offset().top - 110
        }, 1000);
    });;

    $('#spartanrace').on('click', function () {

        $('html, body').animate({
            scrollTop: $("#div3").offset().top - 110
        }, 1000);
    });


    $('.go-top').on('click', function () {

        $("html, body").animate({
            scrollTop: 0
        }, 600);

    });

})
window.onscroll = () => {

    if (window.pageYOffset >= 500) {

        //Nos sale
        $('.go-top').css('display', 'block');
    } else {
        //se oculta
        $('.go-top').css('display', 'none');
    }

}