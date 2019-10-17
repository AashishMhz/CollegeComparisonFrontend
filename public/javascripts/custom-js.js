$(function ($) {

    
    $(window).on('load', function() {
		// Animate loader off screen
		$(".animate-bike").fadeOut(1000);
    });
    
    AOS.init({
    });
    $('.show-menu').click(function () {
        $('.header').addClass('show-menu');
        $(this).addClass('show-close');
        $('.close-menu').removeClass('.fixed-icon');
        $('.hamburger').addClass('show-cls');
    });

    $('.close-menu').click(function () {
        $('.header').removeClass('show-menu');
        $(this).addClass('fixed-icon');
        $('.hamburger').removeClass('show-cls');
    });


    $('.nav-item li,.scroller').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').animate({
            scrollTop: $($anchor.attr('href')).offset().top - $('.float-panel').height()
        }, 4500);
        event.preventDefault();
    });

    $('.slider-product').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        items: 1,
        autoplay: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 550
    })

    var searchShow = function () {
        // alert();
        var searchWrap = $('.search-wrap');
        $('.js-search-open').on('click', function (e) {
            e.preventDefault();
            searchWrap.addClass('active');
            setTimeout(function () {
                searchWrap.find('.form-control').focus();
            }, 300);
        });
        $('.js-search-close').on('click', function (e) {
            e.preventDefault();
            searchWrap.removeClass('active');
        })
    };
    searchShow();

    var slider = function () {
        $('.nonloop-block-3').owlCarousel({
            center: false,
            items: 1,
            loop: true,
            smartSpeed: 700,
            stagePadding: 15,
            margin: 20,
            autoplay: true,
            nav: true,
            responsive: {
                600: {
                    margin: 20,
                    items: 2
                },
                1000: {
                    margin: 20,
                    items: 3
                },
                1200: {
                    margin: 20,
                    items: 3
                }
            }
        });
    };
    slider();
});