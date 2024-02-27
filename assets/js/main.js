  jQuery.noConflict()(function ($) {

  'use strict';

  var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iPhone: function () {
    return navigator.userAgent.match(/iPhone/i);
  },
  iPad: function () {
    return navigator.userAgent.match(/iPad/i);
  },
  iPod: function () {
    return navigator.userAgent.match(/iPod/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
  };


  /* ================================= */
  /* :::::::::: 1. Loading ::::::::::: */
  /* ================================= */

  $(document).ready(function () {

    mt_loading();
    mt_mobile_menu();
    mt_texteffect();
    mt_portfolio();
    mt_lightCase();
    mt_wow();
    mt_parallax();
    mt_flexslider();
  });


  // re-call functions for cube portfolio
  $(document).on('onAfterLoadMore.cbp', function(event) {
    mt_lightCase();
  });

  function mt_loading() {
      $(".text-loader").delay(700).fadeOut();
      $(".page-loader").delay(900).fadeOut("fast");
  } 


  /* ================================= */
  /* ::::::: 2. Mobile Menu :::::::::: */
  /* ================================= */

  function mt_mobile_menu() {

  $("#rex_menu").slicknav({
    prependTo: 'header .col-md-12',
    allowParentLinks: false
  });
  }

  /* ================================= */
  /* :::::: 3. Text animation :::::::: */
  /* ================================= */

  function mt_texteffect() {
    $(function () {
      $('.info h2').textillate();
    });
  }


  /* ================================= */
  /* :::::::: 7. LightCase ::::::::::: */
  /* ================================= */

  function mt_lightCase() {
    $('a.showcase').lightcase({
      transition: 'scrollVertical',
      speedIn: 400,
      speedOut: 300,
    });
  }


  /* ================================= */
  /* ::::::::: 9. Portfolio :::::::::: */
  /* ================================= */

  function mt_portfolio() {
  $('#grid-creative').cubeportfolio({
      filters: '.portfolioFilter',
      layoutMode: 'masonry',
      sortByDimension: true,
      mediaQueries: [{
        width: 1500,
        cols: 5,
      }, {
        width: 1100,
        cols: 5,
      }, {
        width: 800,
        cols: 4,
      }, {
        width: 480,
        cols: 2,
        options: {
          caption: '',
          gapHorizontal: 0,
          gapVertical: 0,
        }
      }],
      defaultFilter: '*',
      animationType: 'quicksand',
      gapHorizontal: 0,
      gapVertical: 0,
      gridAdjustment: 'responsive',
      caption: 'zoom',
      displayType: 'sequentially',
      displayTypeSpeed: 100,

      plugins: {
        loadMore: {
          element: '.load-more',
          action: 'click',
          loadItems: 3,
        }
      },
    });
  }


  /* ================================= */
  /* :::::::::::: 10. Wow :::::::::::: */
  /* ================================= */

  function mt_wow() {
  new WOW().init();
  }

  /* ================================= */
  /* :::::::: 11. Parallax ::::::::::: */
  /* ================================= */

  function mt_parallax() {
  $('.parallax').jarallax({
    speed: 0.5,
    noAndroid: true
  });
  }


  /* ================================= */
  /* ::::::: 12. Flex Slider ::::::::: */
  /* ================================= */

  function mt_flexslider() {
  $('.flexslider').flexslider({
    controlNav: false,
    prevText: '<i class="fa fa-angle-left"></i>',
    nextText: '<i class="fa fa-angle-right"></i>',
    slideshowSpeed: '3000',
    pauseOnHover: true
  });
  }
});