/*
 * Author: ArtStyles (ArtTemplate)
 * Template Name: vCard
 * Version: 1.0.3
 */

$(document).ready(function() {


    particlesJS('particles-js',

        {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#b61924",
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        }

    );

    fetchBlogs();

    'use strict';

    /*-----------------------------------------------------------------
      Detect device mobile
    -------------------------------------------------------------------*/

    var isMobile = false;
    if (/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('html').addClass('touch');
        isMobile = true;
    } else {
        $('html').addClass('no-touch');
        isMobile = false;
    }


    /*-----------------------------------------------------------------
      Loaded
    -------------------------------------------------------------------*/

    anime({
        targets: 'body',
        opacity: 1,
        delay: 400,
        complete: function(anim) {
            progressBar(); //Init progress bar
        }
    });

    $('body, .js-img-load').imagesLoaded({ background: !0 }).always(function(instance) {
        preloader(); //Init preloader
    });

    function preloader() {
        var tl = anime.timeline({});
        tl
            .add({
                targets: '.preloader',
                duration: 1,
                opacity: 1
            })
            .add({
                targets: '.circle-pulse',
                duration: 300,
                //delay: 500,
                opacity: 1,
                zIndex: '-1',
                easing: 'easeInOutQuart'
            }, '+=500')
            .add({
                targets: '.preloader__progress span',
                duration: 500,
                width: '100%',
                easing: 'easeInOutQuart'
            }, '-=500')
            .add({
                targets: '.preloader',
                duration: 500,
                opacity: 0,
                zIndex: '-1',
                easing: 'easeInOutQuart'
            });
    };


    /*-----------------------------------------------------------------
      Hamburger
    -------------------------------------------------------------------*/

    $('.hamburger').on('click', function() {
        $(this).toggleClass('is-active');
        $('.inner-menu').toggleClass('is-active');
        $('body').toggleClass('open-menu');
    });


    /*-----------------------------------------------------------------
      Nav
    -------------------------------------------------------------------*/

    var sideNavOpen = $('.hamburger');
    var sideNavTl = anime.timeline({ autoplay: false });

    if (window.matchMedia("(max-width: 580px)").matches) {
        $('.js-menu').each(function(i) {
            sideNavTl
                .add({
                    targets: '.nav',
                    duration: 1000,
                    width: ['0', '100%'],
                    opacity: [0, 1],
                    easing: 'easeInOutBack'
                })
                .add({
                    targets: '.nav__item',
                    duration: 200,
                    delay: anime.stagger(50),
                    opacity: [0, 1],
                    translateX: [70, 0],
                    easing: 'easeInOutBack'
                }, '-=500');
        });
    } else {
        $('.js-menu').each(function(i) {
            sideNavTl
                .add({
                    targets: '.nav',
                    duration: 1000,
                    width: ['0', '100%'],
                    easing: 'easeInOutBack'
                })
                .add({
                    targets: '.nav__item',
                    duration: 200,
                    delay: anime.stagger(50),
                    opacity: [0, 1],
                    translateX: [70, 0],
                    easing: 'easeInOutBack'
                }, '-=500');
        });
    }

    $(sideNavOpen).on('click', function(e) {
        e.preventDefault();
        if (sideNavTl.began) {
            sideNavTl.reverse()
            sideNavTl.completed = false;
        }
        if (sideNavTl.paused) {
            sideNavTl.play()
        }
    });


    /*-----------------------------------------------------------------
      Carousel
    -------------------------------------------------------------------*/

    // Testimonials
    $('.js-carousel-review').each(function() {
        var carousel = new Swiper('.js-carousel-review', {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 300,
            grabCursor: true,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                580: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                991: {
                    slidesPerView: 1
                }
            }
        });
    });

    // Clients
    $('.js-carousel-clients').each(function() {
        var carousel = new Swiper('.js-carousel-clients', {
            slidesPerView: 4,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            autoplay: {
                delay: 4000,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                580: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                991: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    });


    /*-----------------------------------------------------------------
      Sticky sidebar
    -------------------------------------------------------------------*/

    function activeStickyKit() {
        $('.sticky-column').stick_in_parent({
            parent: '.sticky-parent'
        });

        // bootstrap col position
        $('.sticky-column')
            .on('sticky_kit:bottom', function(e) {
                $(this).parent().css('position', 'static');
            })
            .on('sticky_kit:unbottom', function(e) {
                $(this).parent().css('position', 'relative');
            });
    };
    activeStickyKit();

    function detachStickyKit() {
        $('.sticky-column').trigger("sticky_kit:detach");
    };

    //  stop sticky kit
    //  based on your window width

    var screen = 1200;

    var windowHeight, windowWidth;
    windowWidth = $(window).width();
    if ((windowWidth < screen)) {
        detachStickyKit();
    } else {
        activeStickyKit();
    }

    // windowSize
    // window resize
    function windowSize() {
        windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
        windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    }
    windowSize();

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    $(window).resize(debounce(function() {
        windowSize();
        $(document.body).trigger("sticky_kit:recalc");
        if (windowWidth < screen) {
            detachStickyKit();
        } else {
            activeStickyKit();
        }
    }, 250));


    /*-----------------------------------------------------------------
      Progress bar
    -------------------------------------------------------------------*/

    function progressBar() {
        $('.progress').each(function() {
            var ctrl = new ScrollMagic.Controller();
            new ScrollMagic.Scene({
                    triggerElement: '.progress',
                    triggerHook: 'onEnter',
                    duration: 300
                })
                .addTo(ctrl)
                .on("enter", function(e) {
                    var progressBar = $('.progress-bar');
                    progressBar.each(function(indx) {
                        $(this).css({ 'width': $(this).attr('aria-valuenow') + '%', 'z-index': '2' });
                    });
                });
        });
    }


    /*-----------------------------------------------------------------
      Scroll indicator
    -------------------------------------------------------------------*/

    function scrollIndicator() {
        $(window).on('scroll', function() {
            var wintop = $(window).scrollTop(),
                docheight =
                $(document).height(),
                winheight = $(window).height();
            var scrolled = (wintop / (docheight - winheight)) * 100;
            $('.scroll-line').css('width', (scrolled + '%'));
        });
    }

    scrollIndicator(); //Init


    /*-----------------------------------------------------------------
      ScrollTo
    -------------------------------------------------------------------*/

    function scrollToTop() {
        var $backToTop = $('.back-to-top'),
            $showBackTotop = $(window).height();

        $backToTop.hide();


        $(window).scroll(function() {
            var windowScrollTop = $(window).scrollTop();
            if (windowScrollTop > $showBackTotop) {
                $backToTop.fadeIn('slow');
            } else {
                $backToTop.fadeOut('slow');
            }
        });

        $backToTop.on('click', function(e) {
            e.preventDefault();
            $(' body, html ').animate({ scrollTop: 0 }, 'slow');
        });
    }

    scrollToTop(); //Init


    /*-----------------------------------------------------------------
      Style background image
    -------------------------------------------------------------------*/

    $('.js-image').each(function() {
        var dataImage = $(this).attr('data-image');
        $(this).css('background-image', 'url(' + dataImage + ')');
    });


    /*-----------------------------------------------------------------
      Autoresize textarea
    -------------------------------------------------------------------*/

    $('textarea').each(function() {
        autosize(this);
    });


    /*-----------------------------------------------------------------
	  Tabs
    -------------------------------------------------------------------*/

    $('.js-tabs').each(function() {
        $('.content .tabcontent').hide();
        $('.content .tabcontent:first').show();
        $('.nav .nav__item a').on('click', function() {
            $('.nav .nav__item a').removeClass('active');
            $(this).addClass('active');
            var currentTab = $(this).attr('href');
            $('.content .tabcontent').hide();
            $(currentTab).show();
            $portfolioMasonry.isotope({
                columnWidth: '.gallery-grid__item',
                gutter: '.gutter-sizer',
                isAnimated: true
            });
            $('.js-scroll').getNiceScroll().resize()
            return false;
        });

        // Mobile close menu
        var screenMobile = 580;

        windowWidth = $(window).width();
        if ((windowWidth < screenMobile)) {
            $('.nav .nav__item a').on('click', function(e) {
                e.preventDefault();
                $('.hamburger').removeClass('is-active');
                $('.inner-menu').removeClass('is-active');
                $('body').removeClass('open-menu');

                if (sideNavTl.began) {
                    sideNavTl.reverse()
                    sideNavTl.completed = false;
                }
                if (sideNavTl.paused) {
                    sideNavTl.play()
                }
            });

            // autoscroll to content
            $(".nav__item a").click(function(e) {
                e.preventDefault();
                var offset = -35;

                $('html, body').animate({
                    scrollTop: $("#content").offset().top + offset
                }, 0);
            });
        } else {

        }
    });


    /*-----------------------------------------------------------------
      Tooltip
    -------------------------------------------------------------------*/

    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    });


    /*-----------------------------------------------------------------
      Switch categories & Filter mobile
    -------------------------------------------------------------------*/

    $('.select').on('click', '.placeholder', function() {
        var parent = $(this).closest('.select');
        if (!parent.hasClass('is-open')) {
            parent.addClass('is-open');
            $('.select.is-open').not(parent).removeClass('is-open');
        } else {
            parent.removeClass('is-open');
        }
    }).on('click', 'ul>li', function() {
        var parent = $(this).closest('.select');
        parent.removeClass('is-open').find('.placeholder').text($(this).text());
        parent.find('input[type=hidden]').attr('value', $(this).attr('data-value'));

        $('.filter__item').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');

        $('.js-filter-container').isotope({
            filter: selector
        });
        return false;
    });


    /*-----------------------------------------------------------------
      Masonry
    -------------------------------------------------------------------*/

    // Portfolio
    var $portfolioMasonry = $('.js-masonry').isotope({
        itemSelector: '.gallery-grid__item',
        layoutMode: 'fitRows',
        percentPosition: true,
        transitionDuration: '0.5s',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.001)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        },
        fitRows: {
            gutter: '.gutter-sizer'
        },
        masonry: {
            columnWidth: '.gallery-grid__item',
            gutter: '.gutter-sizer',
            isAnimated: true
        }
    });

    $portfolioMasonry.imagesLoaded().progress(function() {
        $portfolioMasonry.isotope({
            columnWidth: '.gallery-grid__item',
            gutter: '.gutter-sizer',
            isAnimated: true,
            layoutMode: 'fitRows',
            fitRows: {
                gutter: '.gutter-sizer'
            }
        });
    });


    /*-----------------------------------------------------------------
      niceScroll
    -------------------------------------------------------------------*/

    $('textarea').niceScroll({
        horizrailenabled: false
    });


    /*-----------------------------------------------------------------
      emoji add in textarea
    -------------------------------------------------------------------*/

    $(function() {
        $('.emoji-wrap img').on('click', function() {
            var emoji = $(this).attr('title');
            $('#commentForm').val($('#commentForm').val() + " " + emoji + " ");
        });
    });


    /*-----------------------------------------------------------------
	  mediumZoom
    -------------------------------------------------------------------*/

    // mediumZoom('[data-zoom]', {
    //     margin: 30
    // });


    /*-----------------------------------------------------------------
      Lazyload
    -------------------------------------------------------------------*/

    lazySizes.init();


    /*-----------------------------------------------------------------
      Polyfill object-fit
    -------------------------------------------------------------------*/

    var $someImages = $('img.cover');
    objectFitImages($someImages);


    /*-----------------------------------------------------------------
      Contacts form
    -------------------------------------------------------------------*/

    $(".contact-form").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Please fill in the form...");
        } else {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        var name = $("#nameContact").val(),
            email = $("#emailContact").val(),
            message = $("#messageContact").val();

        var url = `https://api.whatsapp.com/send?phone=919557746458&text=*Name*%20${name}%0D%0A*Email*%20${email}%0D%0A*Message*%20${message}%0D%0A`;
        window.location.replace(url);

        // $.ajax({
        //     type: "POST",
        //     url: url,
        //     data: "name=" + name + "&email=" + email + "&message=" + message,
        //     success : function(text){
        //         if (text == "success"){
        //             formSuccess();
        //         } else {
        //             formError();
        //             submitMSG(false,text);
        //         }
        //     }
        // });
    }

    function formSuccess() {
        $(".contact-form")[0].reset();
        submitMSG(true, "Thanks! Your message has been sent.");
    }

    function formError() {
        $(".contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg) {
        var msgClasses;
        if (valid) {
            msgClasses = "validation-success";
        } else {
            msgClasses = "validation-danger";
        }
        $("#validator-contact").removeClass().addClass(msgClasses).text(msg);
    }

    function zoom() {
        document.body.style.zoom = "90%"
    }

    function fetchBlogs() {
        fetch('https://iliyaskhan.com/wp-json/wp/v2/posts/?_embed')
            .then(response => response.json())
            .then(blogs => insertInPage(blogs))
    }

    function insertInPage(blogs) {
        $('.blog-placeholder').hide()
        blogs.map(blog => {
            let featuredimg = blog._embedded['wp:featuredmedia']['0'].source_url;
            let apiDate = blog.date
            let blogDate = new Date(apiDate.substring(0, apiDate.length - 9));
            let removeTime = blogDate.toDateString();

            let articleHtml = `<article class="news-item box">
                                        <div class="news-item__image-wrap overlay overlay--45">
                                            <div class="news-item__date">${removeTime}</div>
                                            <a class="news-item__link" target="_blank" href="${blog.link}"></a>
                                            <img class="cover lazyload" src="${featuredimg}" alt="" />
                                        </div>
                                        <div class="news-item__caption">
                                            <h2 class="title title--h4">${blog.title.rendered}</h2>
                                            <p>${blog.excerpt.rendered}</p>
                                        </div>
                                    </article>`;
            let blogGrid = jQuery('.news-grid').html();
            jQuery('.news-grid').html(blogGrid + articleHtml)
        })
    }
    // back top 
    mybutton = document.getElementById("myBtn");
    window.onscroll = function() { scrollFunction() };
    
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
    $(window).on('load', function() {
    
        handlePreloader();
    
    });



});
