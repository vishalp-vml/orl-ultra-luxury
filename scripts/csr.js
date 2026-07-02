window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const content = document.getElementById('main-content');

    setTimeout(() => {
        loader?.classList.add('slide-out');
        content?.classList.add('show');

        setTimeout(() => loader?.remove(), 1200);
    }, 5000); // 10 sec
});

// HEro banner Music Control
const bgMusic = document.getElementById('bg-music');
const heroBanner = document.querySelector('.music-on');
const muteBtn = document.getElementById('mute-btn');
const muteIcon = muteBtn.querySelector('span');
bgMusic.pause();
bgMusic.muted = true;
muteIcon.classList.remove('act');
muteBtn.setAttribute('aria-pressed', 'false');
function updateBtnUI(isUnmuted) {
    muteIcon.classList.toggle('act', isUnmuted);
    muteBtn.setAttribute('aria-pressed', String(isUnmuted));
}
muteBtn.addEventListener('click', async (e) => {
    const currentlyMuted = bgMusic.muted;
    if (currentlyMuted) {
        bgMusic.muted = false;
        try {
            await bgMusic.play();
        } catch (err) {
            console.warn('Play blocked:', err);
            bgMusic.muted = true;
        }
        updateBtnUI(!bgMusic.muted && !bgMusic.paused);
    } else {
        bgMusic.muted = true;
        updateBtnUI(false);
    }
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            if (!bgMusic.paused && !bgMusic.muted) {
                bgMusic.muted = true;
                updateBtnUI(false);
            }
        } else {
        }
    });
}, { threshold: 0.1 });
observer.observe(heroBanner);
// HEro banner Music Control end

$('.normal-tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
// console.log(e)
    $('.owl-carousel').trigger('refresh.owl.carousel');
});

var $owl = $('.our-esg-disclosures');

$owl.children().each(function (index) {
    $(this).attr('data-position', index);
});

$owl.owlCarousel({
    center: true,
    loop: false,
    items: 3,
    responsive: {
        0: {
            dots: true,
            items: 1,
            stagePadding: 40,
        },
        1000: {
            items: 3,
            dots: true,
            nav: true,
            mouseDrag: false
        },
    }
});
var $owlr = $('.our-esg-disclosures-1');

$owlr.children().each(function (index) {
    $(this).attr('data-position', index);
});

$owlr.owlCarousel({
    center: true,
    loop: true,
    items: 3,
    responsive: {
        0: {
            dots: true,
            items: 1,
            stagePadding: 40,
        },
        1000: {
            items: 3,
            dots: true,
            nav: true,
            mouseDrag: false
        },
    }
});

$(document).on('click', '.owl-item>div', function () {
    var $speed = 300;  // in ms
    $owl.trigger('to.owl.carousel', [$(this).data('position'), $speed]);
});

$('.policies').owlCarousel({
    //center: true,
    //loop: true,
    items: 4,
    margin: 20,
    responsive: {
        0: {
            dots: true,
            items: 1,
            stagePadding: 50,
            margin: 16
        },
        1000: {
            items: 4,
            margin: 20,
            dots: false,
        },
    }
});
$('.impact-owl').owlCarousel({
    items: 4,
    margin: 20,
    responsive: {
        0: {
            dots: true,
            items: 1,
            stagePadding: 50,
            margin: 16
        },
        1000: {
            items: 4,
            margin: 30,
            dots: false,
            nav: true,
        },
    }
});
$('.flagship-int').owlCarousel({
    items: 1,
    responsive: {
        0: {
            dots: true,
            nav: false,
            items: 1,
            stagePadding: 40,
            margin: 20
        },
        1000: {
            items: 1,
            margin: 40,
            stagePadding: 120,
            dots: false,
            nav: true,
        },
    }
});

$(document).ready(function () {
    $('.owl-accolades_ltr').owlCarousel({
        loop: true,
        autoplayHoverPause: true,
        margin: 24,
        autoplay: true,
        autoplayTimeout: 8000, // 3 seconds
        autoplaySpeed: 8000, // smooth speed
        smartSpeed: 8000,     // smooth slide transition
        rtl: false, // 👈 Ensures left-to-right scroll
        responsive: {
            0: {
                items: 1,
                margin: 24,
                stagePadding: 50
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });

    $('.owl-accolades_rtl').owlCarousel({
        loop: true,
        dots: false,
        autoplayHoverPause: true,
        margin: 24,
        autoplay: true,
        autoplayTimeout: 8000, // 3 seconds
        autoplaySpeed: 8000, // smooth speed
        smartSpeed: 8000,     // smooth slide transition
        rtl: true, // 👈 Ensures left-to-right scroll
        responsive: {
            0: {
                items: 1,
                margin: 24,
                stagePadding: 50
            },
            576: {
                items: 2,
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });

    $('.owl-accolades_ltr1').owlCarousel({
        loop: false,
        autoplayHoverPause: true,
        margin: 24,
        autoplay: true,
        autoplayTimeout: 8000, // 3 seconds
        autoplaySpeed: 8000, // smooth speed
        smartSpeed: 8000,     // smooth slide transition
        rtl: false, // 👈 Ensures left-to-right scroll
        responsive: {
            0: {
                items: 1,
                margin: 24,
                stagePadding: 50
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });

    // Certified Carousel

    $(".certified_car").owlCarousel({
        nav: true,
        dots: true,
        responsiveClass: true,
        items: 2,
        loop: false,
        margin: 40,
        responsive: {
            0: {
                nav: true,
                dots: true,
                merge: true,
                items: 1,
                margin: 24,
                stagePadding: 50,
            },
            600: {
                items: 2,
                nav: true,
                dots: true,
                loop: false,
                merge: true,
            },
        },
    });


    $(".owl-vision-carousel").owlCarousel({
        nav: true,
        dots: true,
        items: 1,
        margin: 16,
        responsive: {
            0: {
                nav: false,
                dots: true,
                items: 1,
                margin: 16,
                stagePadding: 20,
            },
            1000: {
                items: 1,
                nav: true,
                dots: false,
                stagePadding: 100,
            },
        },
    });

    $(".our-focus-carousel").owlCarousel({
        nav: true,
        dots: true,
        items: 1,
        margin: 16,
        responsive: {
            0: {
                nav: false,
                dots: true,
                items: 1,
                margin: 24,
                stagePadding: 30,
            },
            1000: {
                items: 3,
                nav: false,
                dots: false,
                margin: 40,
                mouseDrag: false
            },
        },
    });

    // Accordion JS 

    $('.offerItemTitle').click(function () {
        $(this).parents('.offerslide').children('.offerItem').removeClass('active');
        $(this).parents('.offerslide').children('.offerItem').children('.offerItemTitle').removeClass('hide');
        $(this).parent('.offerItem').addClass('active');
        $(this).addClass('hide');
    });

});

function toggleCarousel() {
    const $slider = $('.my-slider');
    const isMobile = $(window).width() < 768;

    if (isMobile) {
        if (!$slider.hasClass('owl-carousel')) {
            $slider.addClass('owl-carousel');

            // Initialize Owl Carousel
            $slider.owlCarousel({
                items: 1,
                margin: 16,
                stagePadding: 30,
                dots: true,
                nav: false,
            });
        }
    } else {
        if ($slider.hasClass('owl-carousel')) {
            // Destroy Owl Carousel
            $slider.trigger('destroy.owl.carousel');
            $slider.removeClass('owl-carousel owl-loaded');
            $slider.find('.owl-stage-outer').children().unwrap(); // unwrap stage
            $slider.find('.owl-stage').children().unwrap(); // unwrap stage-inner
        }
    }
}

// Run on load and resize
$(document).ready(toggleCarousel);
$(window).on('resize', function () {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(toggleCarousel, 200);
});

$(document).ready(function () {
    $('.flagship-box .view-more a').on('click', function () {
        const isOpen = $(this).parents('.flagship-box').hasClass('txt-open');
        if (!isOpen) {
          $(this).parents('.flagship-box').addClass('txt-open');
          this.innerHTML = 'READ LESS <span class="icon-cta-icon"></span>';
        } else {
          $(this).parents('.flagship-box').removeClass('txt-open');
          this.innerHTML = 'READ MORE <span class="icon-cta-icon"></span>';
        }
    });
})

