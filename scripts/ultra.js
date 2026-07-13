$('.ultra-residances .item-icons a').not('.volume-ic').on('click', function (e) {
    e.preventDefault();

    const $this = $(this);
    const $wrapper = $this.closest('.ultra-residances');
    const $item = $this.closest('.item');

    $wrapper.find('.item .set').removeClass('act').siblings('a').addClass('act');
    // Toggle active class on links
    $this.addClass('act')
        .siblings('a')
        .removeClass('act');

    

    if ($this.hasClass('set')) {
        $wrapper.addClass('act');

        $item.find('.img-sunrise').addClass('hide');
        $item.find('.img-sunset').removeClass('hide');
    } else {
        $wrapper.removeClass('act');

        $item.find('.img-sunrise').removeClass('hide');
        $item.find('.img-sunset').addClass('hide');
    }
});

$('.tab').on('click', function (e) {
    e.preventDefault();

    const tab = $(this).data('tab');

    $('.tab').removeClass('act');
    $(this).addClass('act');

    $('.content').removeClass('act');
    $('.content[data-tab="' + tab + '"]').addClass('act');
});

const viewLink = document.querySelector('.view-link');
const viewBox = document.querySelector('.ultra-view-box');
const popup = document.querySelector('.iframe-view');
const closeBtn = document.querySelector('.close-iframe'); 

if (viewLink){
    viewLink.addEventListener('click', function(e) {
    e.preventDefault();
    viewBox.classList.add('act'); // Zooms out the image
    popup.classList.add('act');   // Zooms in the popup
    });

    closeBtn.addEventListener('click', function() {
    viewBox.classList.remove('act'); // Zooms image back to 100%
    popup.classList.remove('act');   // Zooms out popup and hides it
    });
}

(function ($) {
    var $flagship = $('.flagship-int');

    if (!$flagship.length || typeof Swiper === 'undefined') {
        return;
    }

    // tag slides with a stable slide index
    $flagship.find('.swiper-slide').each(function (i) {
        $(this).attr('data-slide', i + 1);
    });

    var swiper = new Swiper('.flagship-int', {
        cssMode: true,
        slidesPerView: 1.05,
        spaceBetween: 20,
        slidesOffsetBefore: 30,
        slidesOffsetAfter: 30,
        simulateTouch: true,
        grabCursor: true,
        breakpoints: {
            768: {
                slidesPerView: 1.05,
                spaceBetween: 20,
                slidesOffsetBefore: 30,
                slidesOffsetAfter: 30,
            },
            1024: {
                slidesPerView: 1.05,
                spaceBetween: 80,
                slidesOffsetBefore: 120,
                slidesOffsetAfter: 120,
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        },
        mousewheel: true,
        keyboard: true,
        slideToClickedSlide: true,
    });

    function getActiveSlide() {
        return $(swiper.slides[swiper.activeIndex]);
    }

    function resetProjectContent() {
        $flagship.find('.project-ctnt')
            .css({ 'opacity': '0', 'animation-delay': '0s' })
            .removeClass('fadeInRight fadeInLeft');
    }

    function applySlideState($activeSlide) {
        var slideNum = $activeSlide.data('slide') || 1;
        var $section = $('.our-projects-section');
        $section.removeClass('slide1 slide2').addClass('slide' + slideNum);

        if ($(window).width() < 768) {
            $flagship.find('.project-ctnt').css({ 'opacity': '1', 'animation-delay': '0s' });
            return;
        }

        resetProjectContent();

        // add delay then animation to the active project's content (reflow to restart)
        var $activeCt = $activeSlide.find('.project-ctnt');
        $activeCt.css({ 'animation-delay': '.5s', 'opacity': '1' });
        if ($activeCt[0]) { void $activeCt[0].offsetWidth; }
        $activeCt.addClass('fadeInRight');
    }

    var $initialActive = getActiveSlide();

    var sectionSeen = false;
    function onSectionVisible() {
        if (sectionSeen) return;
        sectionSeen = true;
        applySlideState(getActiveSlide());
        if (observer) { observer.disconnect(); }
    }

    if ($(window).width() >= 768) {
        // IntersectionObserver to trigger the first slide animation when section enters viewport
        var sectionEl = document.querySelector('.our-projects-section');
        var observer = null;
        if (sectionEl && 'IntersectionObserver' in window) {
            observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        onSectionVisible();
                    }
                });
            }, { threshold: 0.25 });
            observer.observe(sectionEl);
        } else {
            // fallback: trigger immediately
            onSectionVisible();
        }
    } else {
        applySlideState($initialActive);
    }

    swiper.on('slideChangeTransitionStart', function () {
        if ($(window).width() < 768) {
            return;
        }
        resetProjectContent();
    });

    function onSwiperSlideChange() {
        var $activeSlide = getActiveSlide();
        if ($(window).width() >= 768) {
            // only animate on translated if section has been seen
            if (sectionSeen) {
                applySlideState($activeSlide);
            }
        } else {
            applySlideState($activeSlide);
        }
    }

    swiper.on('slideChange', onSwiperSlideChange);

})(jQuery);


(function () {
    var audio = document.getElementById('beep-one');
    var hoverItems = document.querySelectorAll('.gallery .item');
    var toggleButtons = document.querySelectorAll('.item-icons.music-ic .volume-ic');

    if (!audio) return;

    var hoverActive = false;
    var togglePaused = false;

    function setVolumeIconState(isPlaying) {
        toggleButtons.forEach(function (button) {
            button.classList.toggle('is-playing', isPlaying);
        });
    }

    setVolumeIconState(!togglePaused);

    function playAudio() {
        if (togglePaused) return;
        audio.currentTime = 0;
        audio.play().catch(function () { });
    }

    function stopAudio(resetTime) {
        audio.pause();
        if (resetTime !== false) {
            audio.currentTime = 0;
        }
    }

    hoverItems.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            hoverActive = true;
            playAudio();
        });

        item.addEventListener('mouseleave', function () {
            hoverActive = false;
            if (!togglePaused) {
                stopAudio();
            }
        });
    });

    toggleButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            togglePaused = !togglePaused;

            if (togglePaused) {
                setVolumeIconState(false);
                stopAudio(false);
            } else {
                setVolumeIconState(true);
                if (hoverActive) {
                    playAudio();
                }
            }
        });
    });
})();

$(document).ready(function () {

    $('a[data-toggle="tab"]').on('shown.bs.tab', function () {

        var $section = $(this).closest('.ultra-tabs');

        $section.find('.ultra-sub-title')
            .hide()
            .text($(this).data('title'))
            .fadeIn(200);

    });

});
// const box = document.querySelector('.ultra-intro.pdp');

// if (box) {
//     box.addEventListener('mousemove', (e) => {
//         const rect = box.getBoundingClientRect();

//         const x = (e.clientX - rect.left) / rect.width;
//         const y = (e.clientY - rect.top) / rect.height;

//         box.style.setProperty('--x', `${5 + x * 20}%`);
//         box.style.setProperty('--y', `${-60 + y * 40}%`);
//     });
// }
