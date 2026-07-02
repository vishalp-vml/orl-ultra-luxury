$('.ultra-residances .item-icons a').on('click', function (e) {
    e.preventDefault();

    const $this = $(this);
    const $wrapper = $this.closest('.ultra-residances');
    const $item = $this.closest('.item');

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


(function ($) {
    var $flagship = $('.flagship-int');

    // tag original items with a stable slide index
    $flagship.find('.item').each(function (i) {
        $(this).attr('data-slide', i + 1);
    });

    $flagship.owlCarousel({
        items: 1,
        nav: false,
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
                margin: 60,
                stagePadding: 120,
                dots: false,
                nav: false,
            },
        }
    });

    if ($(window).width() >= 768) {

    function applySlideState($activeItem) {
        var slideNum = $activeItem.data('slide') || 1;
        var $section = $('.our-projects-section');
        $section.removeClass('slide1 slide2').addClass('slide' + slideNum);
        // remove animation, delay and reset opacity to 0 for all items
        $flagship.find('.project-ctnt').each(function () {
            $(this).css({'animation-delay': '0s', 'opacity': '0'}).removeClass('fadeInRight');
        });
        // add delay then animation to the active project's content (reflow to restart)
        var $activeCt = $activeItem.find('.project-ctnt');
        $activeCt.css({'animation-delay': '.5s', 'opacity': '1'});
        if ($activeCt[0]) { void $activeCt[0].offsetWidth; }
        $activeCt.addClass('fadeInRight'); 
    }

    // initial state: don't animate until section is visible
    var $initialActive = $flagship.find('.owl-item.active .item').first();
    if (!$initialActive.length) {
        $initialActive = $flagship.find('.item').first();
    }

    var sectionSeen = false;
    function onSectionVisible() {
        if (sectionSeen) return;
        sectionSeen = true;
        applySlideState($initialActive);
        if (observer) { observer.disconnect(); }
    }

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

    // update on slide translate start
    $flagship.on('translate.owl.carousel', function (event) {
        $flagship.find('.project-ctnt').css({'opacity': '0', 'animation-delay': '0s'}).removeClass('fadeInRight');
    });

    // update on slide translated
    $flagship.on('translated.owl.carousel', function (event) {
        var $activeItem = $(event.target).find('.owl-item.active .item').first();
        if (!$activeItem.length) {
            $activeItem = $(event.target).find('.item').eq(event.item.index).first();
        }
        // only animate on translated if section has been seen
        if (sectionSeen) {
            applySlideState($activeItem);
        }
    });

    }

})(jQuery);

const box = document.querySelector('.ultra-intro.pdp');

if (box) {
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        box.style.setProperty('--x', `${5 + x * 20}%`);
        box.style.setProperty('--y', `${-60 + y * 40}%`);
    });
}
