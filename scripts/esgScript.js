$(".sustaCarousel").owlCarousel({
    nav: false,
    dots: false,
    autoplay: false,
    responsiveClass: true,
    items: 3,
    responsive: {
      0: {
        margin: 20,
        stagePadding: 70,
        dots: false,
        items: 1,
        dots: true,
      },
      1000: {
        margin: 30,
        stagePadding: 0,
        items: 3,
      },
    },
  });