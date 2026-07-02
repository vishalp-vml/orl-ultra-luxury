/*Browser detection script start*/
var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "Other";
    this.version =
      this.searchVersion(navigator.userAgent) ||
      this.searchVersion(navigator.appVersion) ||
      "Unknown";
  },
  searchString: function (data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      this.versionSearchString = data[i].subString;

      if (dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      }
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index === -1) {
      return;
    }

    var rv = dataString.indexOf("rv:");
    if (this.versionSearchString === "Trident" && rv !== -1) {
      return parseFloat(dataString.substring(rv + 3));
    } else {
      return parseFloat(
        dataString.substring(index + this.versionSearchString.length + 1)
      );
    }
  },

  dataBrowser: [{
    string: navigator.userAgent,
    subString: "Edge",
    identity: "ms-edge",
  },
  {
    string: navigator.userAgent,
    subString: "MSIE",
    identity: "explorer",
  },
  {
    string: navigator.userAgent,
    subString: "Trident",
    identity: "explorer",
  },
  {
    string: navigator.userAgent,
    subString: "Firefox",
    identity: "firefox",
  },
  {
    string: navigator.userAgent,
    subString: "Opera",
    identity: "opera",
  },
  {
    string: navigator.userAgent,
    subString: "OPR",
    identity: "opera",
  },

  {
    string: navigator.userAgent,
    subString: "Chrome",
    identity: "chrome",
  },
  {
    string: navigator.userAgent,
    subString: "Safari",
    identity: "safari",
  },
  ],
};

/* Waypoint script*/
$(function () {
  function onScrollInit(items, trigger) {
    items.each(function () {
      var osElement = $(this),
        osAnimationClass = osElement.attr("data-os-animation"),
        osAnimationDelay = osElement.attr("data-os-animation-delay");

      osElement.css({
        "-webkit-animation-delay": osAnimationDelay,
        "-moz-animation-delay": osAnimationDelay,
        "animation-delay": osAnimationDelay,
      });

      var osTrigger = trigger ? trigger : osElement;

      osTrigger.waypoint(
        function () {
          osElement.addClass("animated").addClass(osAnimationClass);
        }, {
        triggerOnce: true,
        offset: "90%",
      }
      );
    });
  }
  onScrollInit($(".os-animation"));
  onScrollInit($(".staggered-animation"), $(".staggered-animation-container"));
});

$(document).ready(function () {
  BrowserDetect.init();
  $("body").addClass(
    BrowserDetect.browser + " " + BrowserDetect.browser + BrowserDetect.version
  );

  $(".menu").click(function () {
    $(".expand-menu").slideDown();
    $(".expand-search").slideUp();
    $("body").addClass("ohidden");
    return false;
  });

  $(".serch-click").click(function () {
    console.log(111);
    $(".expand-search").slideDown();
    $(".expand-menu").slideUp();
    $("body").addClass("ohidden");
    return false;
  });

  $(".menu.close").click(function () {
    $(".expand-menu").slideUp();
    $("body").removeClass("ohidden");
    return false;
  });

  $(".search.close").click(function () {
    $(".expand-search").slideUp();
    $("body").removeClass("ohidden");
    return false;
  });

  $('#audio-control').click(function () {
    if ($("#myVideo").prop('muted')) {
      $("#myVideo").prop('muted', false);
      $('.icon-soundoff').addClass('act')
      //$(this).text('Mute');
      // or toggle class, style it with a volume icon sprite, change background-position
    } else {
      $("#myVideo").prop('muted', true);
      //$(this).text('Unmute');
      $('.icon-soundoff').removeClass('act')
    }
  });

  $(window).on("load", function () {
    /* Common Sticky secondary Nav start */
    if ($(".secondary-nav").length) {
      var offsethd = $(".secondary-nav").offset().top - 0;
      $(window).scroll(function () {
        if ($(this).scrollTop() > offsethd) {
          $(".secondary-nav").addClass("sticky");
        } else {
          $(".secondary-nav").removeClass("sticky");
          $(".secondary-nav").removeClass("push");

        }
      });
    }
    /* Common Sticky secondary Nav start */
  });
  var lastScrollTop = 0;
  $(window).scroll(function (e) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
      $(".header").removeClass("sticky");
      if ($(".secondary-nav").hasClass("sticky")) {
        $(".secondary-nav").removeClass("push");
      }
      //$(".secondary-nav").removeClass("push");
    } else if (st == 0) {
      $(".header").removeClass("sticky");
      if ($(".secondary-nav").hasClass("sticky")) {
        $(".secondary-nav").removeClass("push");
      }
      //$(".secondary-nav").removeClass("push");
    } else {
      $(".header").addClass("sticky");
      if ($(".secondary-nav").hasClass("sticky")) {
        $(".secondary-nav").addClass("push");
      }
      // $(".secondary-nav").addClass("push");
    }
    lastScrollTop = st;
  });

  /* Smoothscroll Secondary nav Start */
  var is_iPad = navigator.userAgent.match(/iPad/i) != null;
  var lastId,
    topMenu = $(".snav-wraper ul.nav"),
    topMenuHeight = topMenu.outerHeight() + 20,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });
  // For Ipad click issue
  if (is_iPad) {
    menuItems.on("touchstart", function (e) {
      var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
      $("html, body").stop().animate({
        scrollTop: offsetTop,
      },
        600
      );
      e.preventDefault();
    });
  } else {
    menuItems.on("click", function (e) {
      var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
      $("html, body").stop().animate({
        scrollTop: offsetTop,
      },
        600
      );
      e.preventDefault();
    });
  }

  $(window).scroll(function () {
    var fromTop = $(this).scrollTop() + topMenuHeight;
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop) return this;
    });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      menuItems
        .removeClass("active")
        .filter("[href='#" + id + "']")
        .addClass(function () {
          tabsWidthScroll();
          return "active";
        });
    }
  });

  /* For Mobile Scroll to nav
  function tabsWidthScroll() {
    var tstW = 0;
    setTimeout(function () {
      $(".secondary-nav ul li a.active, .secondary-nav .m-scroll ul li a.active")
        .parent()
        .prevAll()
        .each(function () {
          tstW += $(this).outerWidth(true);
        });
      $(".secondary-nav, .m-scroll").animate({
        scrollLeft: tstW,
      },
        500
      );
    }, 400);
  }*/

  if ($(window).width() < 900) {
    var ulWidth = 0;
    var ulWidth2 = 0;
    $(".secondary-nav .nav li").each(function () {
      ulWidth = ulWidth + 10 + $(this).outerWidth(true);
    });
    $(".secondary-nav .nav").width(ulWidth);
  }

  if ($(window).width() <= 900) {
    var ulWidth2 = 0;
    $(".listing-tabs-wrap .listing-tabs a").each(function () {
      ulWidth2 = ulWidth2 + 20 + $(this).outerWidth(true);
    });
    $(".listing-tabs-wrap .listing-tabs").width(ulWidth2);
  }


  $(".input-group-prepend .dropdown-menu a").click(function () {
    $(this).parent().prev(".dropdown-toggle:first-child").html($(this).html() + ' <span class="caret"></span>');
  });



  $(".view-all-dd a.dropdown-item").click(function () {
    $(".view-all .text-val").text($(this).text());
    return false
  });

  //accordian
  $(".tog_cont").hide();
  $(".trgr:eq(0)").addClass("act").next().show();
  $(".trgr").on("click", function () {
    if ($(this).next().is(":hidden")) {
      $(".trgr").removeClass("act").next().slideUp(500);
      $(this)
        .addClass("act")
        .next()
        .slideDown(400, function () {
          // scroll top When you expand other accordions
          $("html, body").animate({
            scrollTop: $(this).offset().top - 300,
          },
            700
          );
        });
    } else {
      $(this).removeClass("act").next().slideUp(500);
    }
  });

  $(".lp-carousel").owlCarousel({
    nav: true,
    dots: true,
    autoplay: false,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
    autoplaySpeed: 1500,
    smartSpeed: 1500,
    responsiveClass: true,
    items: 1,

    responsive: {
      0: {
        margin: 30,
        stagePadding: 0,
        dots: false,
        touchDrag: false,
      },
      1000: {
        margin: 0,
        stagePadding: 0,
        dots: true,
      },
    },
  });

  $(".main-map-box .nav-link").hover(function () {
    $(this).tab("show");
  });
  var $owlportfolio = $(".portfolio-carousel");
  $owlportfolio.children().each(function (index) {
    $(this).attr("data-position", index); // NB: .attr() instead of .data()
  });

  $owlportfolio.owlCarousel({
    center: true,
    loop: true,
    items: 5,
    //autoWidth:true,
    margin: 20,
    touchDrag: false,
    mouseDrag: false,
    responsive: {
      0: {
        dots: false,
        stagePadding: 50,
        margin: 15,
        items: 1,
        touchDrag: true,
        mouseDrag: true,
      },
      600: {
        items: 5,
        margin: 20,
        touchDrag: false,
        mouseDrag: false,
      },
    },
  });
  $(".portfolio .owl-carousel .owl-item.active.center")
    .prev()
    .addClass("prevCard");
  $(document).on("click", ".portfolio .owl-item>div", function () {
    var $speed = 300; // in ms
    $owlportfolio.trigger("to.owl.carousel", [
      $(this).data("position"),
      $speed,
    ]);
    $(".portfolio .owl-carousel .owl-item").removeClass("prevCard");
    $(".portfolio .owl-carousel .owl-item.active.center")
      .prev()
      .addClass("prevCard");
  });



  setTimeout(function () {
    $('.about-carousel video').trigger('pause');
    $('.about-carousel .owl-item.center video').trigger('play');
  }, 100);

  var abtCarousel = $('.about-carousel');
  abtCarousel.children().each(function (index) {
    $(this).attr('data-position', index); // NB: .attr() instead of .data()
  });
  abtCarousel.owlCarousel({
    nav: true,
    dots: false,
    margin: 30,
    responsiveClass: true,
    items: 1,
    center: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        margin: 10,
      },
      600: {
        items: 1,
        stagePadding: 150,
      },
      1000: {
        items: 1,
        stagePadding: 200,
        margin: 80,
        center: true,
      },
      1300: {
        items: 1,
        stagePadding: 300,
        margin: 130,
        center: true,
      },
      1600: {
        items: 1,
        stagePadding: 360,
        margin: 130,
        center: true,
      },
    },
  });

  abtCarousel.on('changed.owl.carousel', function (event) {
    setTimeout(function () {
      $('.about-carousel video').trigger('pause');
      $('.about-carousel .owl-item.center video').trigger('play');
    }, 100);
  })

  $(document).on('click', '.about-carousel .owl-item>div', function () {
    var $speed = 0; // in ms
    abtCarousel.trigger('to.owl.carousel', [$(this).data('position'), $speed]);
    $('.about-carousel .owl-item video').trigger('pause');
    $('.about-carousel .owl-item.center video').trigger('play');
  });




  setTimeout(function () {
    $('.de-carousel video').trigger('pause');
    $('.de-carousel .owl-item.center video').trigger('play');
  }, 100);

  var deCarousel = $('.de-carousel');
  deCarousel.children().each(function (index) {
    $(this).attr('data-position', index); // NB: .attr() instead of .data()
  });


  deCarousel.owlCarousel({
    nav: true,
    dots: true,
    margin: 65,
    smartSpeed: 0,
    responsiveClass: true,
    items: 1,
    stagePadding: 130,
    //animateOut: "fadeOut",
    animateIn: "fadeIn",
    center: true,
    loop: true,
    responsive: {
      0: {
        dots: false,
        stagePadding: 30,
        margin: 30,
        nav: false,
      },
      600: {
        items: 1,
      },
      1300: {
        items: 1,
        stagePadding: 200,
      },
      1600: {
        items: 1,
        stagePadding: 260,
        margin: 80,
      },
    },
  });

  deCarousel.on('changed.owl.carousel', function (event) {
    setTimeout(function () {
      $('.de-carousel .owl-item video').trigger('pause');
      $('.de-carousel .owl-item.center video').trigger('play');
    }, 100);
  })

  $(document).on('click', '.de-carousel .owl-item>div', function () {
    var $speed = 0; // in ms
    deCarousel.trigger('to.owl.carousel', [$(this).data('position'), $speed]);
    $('.de-carousel .owl-item video').trigger('pause');
    $('.de-carousel .owl-item.center video').trigger('play');
    return false
  });


  $('.de-carousel .owl-prev').click(function () {
    $('.de-carousel .owl-item video').trigger('pause');
    $('.de-carousel .owl-item.center video').trigger('play');

  });
  $('.de-carousel .owl-next').click(function () {
    $('.de-carousel .owl-item video').trigger('pause');
    $('.de-carousel .owl-item.center video').trigger('play');
  });





});

//MAde by Vishal
$(document).ready(function () {
  $(".ip-carousel").owlCarousel({
    nav: true,
    dots: true,
    responsiveClass: true,
    items: 1,
    responsive: {
      0: {
        nav: false,
        dots: false,
        stagePadding: 30,
        margin: 15,
      },
      600: {
        items: 1,
      },
    },
  });

  if ($(window).width() < 768) {
    $(".contact-us .hd2").on("click", function () {
      if ($(this).next().is(":hidden")) {
        $(this).addClass("act").next().slideDown(400);
      } else {
        $(this)
          .next()
          .slideUp(400, function () {
            $(this).prev().removeClass("act");
          });
      }
    });
  }

  // page Product

  $(".filter-list .dropdown-menu").on("click", function (event) {
    // The event won't be propagated up to the document NODE and
    // therefore delegated events won't be fired
    console.log("click");
    event.stopPropagation();
  });

  // $('#datetimepicker2').datetimepicker({
  //     // format: "dd MM yyyy"
  //     todayHighlight: true,
  //     format: "dd-mm-yyyy",
  //     autoclose: true
  //         // ,
  //         // viewMode: "months",
  //         // minViewMode: "months"
  // });

  $(function () {
    $(".cls-cnt a").click(function () {
      console.log("click");
      $(this).parents(".enqForm").fadeOut();
      $(".hero-banner").removeClass('formAdded');
    });

    $(".hero-banner .enquire-now").click(function () {
      $(".hero-banner .enqForm").fadeIn();
    });

  });

  $(".contact-us .requestBtn").click(function () {
    $(".footer-form .enqForm").fadeIn();
    $(this).hide();
  });

  $('.footer-form .cls-cnt').click(function () {
    $(".contact-us .requestBtn").show();
  })

  $('input[name="bookSiteRadio"]').click(function () {
    var inputValue = $(this).attr("value");
    if (inputValue == 'no') {
      $('.dateCntBookSite').hide()
      $(".dateCntBookSite input").prop('disabled', true);
    } else {
      $('.dateCntBookSite').show()
      $(".dateCntBookSite input").prop('disabled', false);
    }
  });

  $(".blog-carousel").owlCarousel({
    nav: true,
    dots: true,
    autoplay: false,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
    autoplaySpeed: 1500,
    smartSpeed: 1500,
    responsiveClass: true,
    items: 1,
    responsive: {
      0: {
        nav: false,
        dots: true,
      },
      600: {
        nav: true,
        dots: false,
      },
      1000: {
        nav: true,
        dots: false,
      }
    },
  });

  var blogDetails = $('.details-carousel');
  blogDetails.owlCarousel({
    nav: true,
    dots: true,
    autoplay: false,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
    smartSpeed: 1500,
    responsiveClass: true,
    items: 1,
    responsive: {
      0: {
        nav: false,
      },
      600: {
        nav: true,
      },
      1000: {
        nav: true,
      }
    },
  });



  // blogDetails.on('change.owl.carousel', function (property) {
  //     var current = property.item.index;
  //     var src = $(property.target).find(".owl-item").eq(current).find(".bgImg").attr('src');
  //     //console.log('Image current is ' + src);
  //     $('.details-img-box').css("background-image", "url(" + src + ")");
  // });

  var relatedStory = $('.related-carousel');
  relatedStory.owlCarousel({
    nav: true,
    dots: true,
    margin: 30,
    smartSpeed: 1500,
    responsiveClass: true,
    items: 2,
    loop: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        nav: false,
      },
      600: {
        items: 1,
      },
      1300: {
        items: 2,
      }
    },
  });


  $('.life-list li .hd3').hover(function () {
    $(this).next().removeClass('hide')
  }, function () {
    $(this).next().addClass('hide')
  });

  $(".list-cont").hide();
  $(".trgr-list:eq(0)").addClass("act").next().show();
  //$(".benefits .trgr-list:eq(0)").addClass("act").next().show();
  $('.trgr-list').click(function () {
    if ($(this).next().is(':hidden')) {
      $('.trgr-list').removeClass('act').next().slideUp('slow');
      $(this).addClass('act').next().slideDown('slow');
      return false
    } else {
      $(this).removeClass('act').next().slideUp('slow');
      return false
    }

  });

  $(".core-value-list a").hover(function () {
    $(this).tab("show");
  });


  var careerCarousel = $('.career-carousel');
  careerCarousel.children().each(function (index) {
    $(this).attr('data-position', index); // NB: .attr() instead of .data()
  });


  careerCarousel.owlCarousel({
    nav: true,
    dots: true,
    margin: 65,
    responsiveClass: true,
    items: 1,
    stagePadding: 130,
    //animateOut: "fadeOut",
    animateIn: "fadeIn",
    center: true,
    loop: true,
    responsive: {
      0: {
        dots: false,
        stagePadding: 30,
        margin: 30,
        nav: false,
      },
      600: {
        items: 1,
      },
      1300: {
        items: 1,
        stagePadding: 200,
      },
      1600: {
        items: 1,
        stagePadding: 260,
        margin: 80,
      },
    },
  });



  $(document).on('click', '.career-carousel .owl-item>div', function () {
    var $speed = 0; // in ms
    careerCarousel.trigger('to.owl.carousel', [$(this).data('position'), $speed]);
    return false
  });


  var aboutTicker = $('.ticker-carousel');
  aboutTicker.owlCarousel({
    nav: false,
    dots: true,
    margin: 30,
    smartSpeed: 2000,
    autoplay: true,
    responsiveClass: true,
    stagePadding: 120,
    loop: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        margin: 10,
      },
      600: {
        items: 2,
        stagePadding: 30,
        margin: 15,
      },
      1000: {
        items: 2,

      },
      1300: {
        items: 3,
      },
      1600: {
        items: 4,
      },
    },
  });



  var csrCarousel = $('.csr-carousel');
  csrCarousel.children().each(function (index) {
    $(this).attr('data-position', index); // NB: .attr() instead of .data()
  });
  csrCarousel.on('initialize.owl.carousel changed.owl.carousel', function (e) {
    if (!e.namespace) {
      return;
    }
    var carousel = e.relatedTarget;
    $('.slider-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
  })
  csrCarousel.owlCarousel({
    nav: true,
    dots: false,
    margin: 30,
    responsiveClass: true,
    items: 1,
    center: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        margin: 10,
      },
      600: {
        items: 1,
        stagePadding: 120,
      },
      1000: {
        items: 1,
        stagePadding: 150,
        margin: 80,
        center: true,
      },
      1300: {
        items: 1,
        stagePadding: 200,
        margin: 35,
        center: true,
      },
      1600: {
        items: 1,
        stagePadding: 260,
        margin: 35,
        center: true,
      },
    },
  });
  $(document).on('click', '.csr-carousel .owl-item>div', function () {
    var $speed = 0; // in ms
    csrCarousel.trigger('to.owl.carousel', [$(this).data('position'), $speed]);
  });


  var csrCarousel2 = $('.csr-carousel2');
  csrCarousel2.children().each(function (index) {
    $(this).attr('data-position', index); // NB: .attr() instead of .data()
  });
  csrCarousel2.on('initialize.owl.carousel changed.owl.carousel', function (e) {

    console.log($(this),'Arif')
    if (!e.namespace) {
      return;
    }
    var carousel2 = e.relatedTarget;
    $(this).next('.slider-counter').text(carousel2.relative(carousel2.current()) + 1 + '/' + carousel2.items().length);
  })
  csrCarousel2.owlCarousel({
    nav: true,
    dots: false,
    margin: 30,
    responsiveClass: true,
    items: 1,
    center: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        margin: 10,
      },
      600: {
        items: 1,
        stagePadding: 120,
      },
      1000: {
        items: 1,
        stagePadding: 150,
        margin: 80,
        center: true,
      },
      1300: {
        items: 1,
        stagePadding: 200,
        margin: 35,
        center: true,
      },
      1600: {
        items: 1,
        stagePadding: 260,
        margin: 35,
        center: true,
      },
    },
  });
  $(document).on('click', '.csr-carousel2 .owl-item>div', function () {
    var $speed = 0; // in ms
    csrCarousel2.trigger('to.owl.carousel', [$(this).data('position'), $speed]);
  });




  $('.bm-card a').click(function () {
    $('.bm-popup').addClass('open');

    $('.bm-carousel .member-info').each(function () {

      if ($(this).height() > 380) {
        $(this).addClass('active');
      }
      //console.log($(this).height(), 'hr');
    });

    return false
  });

  $('.bm-popup .close-button').click(function () {
    $('.bm-popup').removeClass('open')
    return false
  });

  var bmCarousel = $('.bm-carousel');
  bmCarousel.owlCarousel({
    nav: true,
    dots: false,
    items: 1,
    loop: false,
    margin: 10,
  });




  $('.bm-card a').click(function () {
    $('html, body').animate({
      scrollTop: $('#abt3').offset().top - 20 //#DIV_ID is an example. Use the id of your destination on the page
    }, 'slow');
    var slideNumber = $(this).data('id');
    setTimeout(function () {
      bmCarousel.trigger('to.owl.carousel', [slideNumber, 0, true]);
    }, 100)
  });


  var laTicker = $('.la-carousel');
  laTicker.owlCarousel({
    nav: true,
    dots: true,
    margin: 30,
    smartSpeed: 2000,
    autoplay: false,
    responsiveClass: true,
    stagePadding: 120,
    loop: false,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        margin: 10,
      },
      600: {
        items: 2,
        stagePadding: 40,
      },
      1000: {
        items: 3,
        stagePadding: 45,
      },
      1300: {
        items: 3,
        stagePadding: 130,
      },
      1400: {
        items: 3,
        stagePadding: 160,
      },
      1600: {
        items: 3,
        stagePadding: 190,
      },
      1800: {
        items: 3,
        stagePadding: 320,
      },
    },
  });

  if ($('.counter').length > 0) {
    $(".counter").countUp();
  }

  $("#homeForm").submit(function () {
    $('.screen1').hide();
    $('.screen2').removeClass('hide')
    return false;
    console.log(1111111)
  });

  $('.card-header.op1 .act').click(function () {
    $(this).removeClass('act')
  })
});



