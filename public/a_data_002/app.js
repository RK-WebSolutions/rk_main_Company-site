(function(window, document, $, undefined) {
    'use strict';

    var axilInit = {
        i: function(e) {
            axilInit.s();
            axilInit.methods();
        },

        s: function(e) {
            this._window = $(window),
                this._document = $(document),
                this._body = $('body'),
                this._html = $('html')
        },

        methods: function(e) {
            axilInit.w();
            axilInit.axilBackToTop();
            axilInit.stickyHeaderMenu();
            axilInit.salActivation();
            axilInit.counterUp();
            axilInit.axilSlickActivation();
            axilInit.onePageNav();
            axilInit.axilHover();
            axilInit.marqueImages();
            axilInit.axilMasonary();
           
        },

        w: function(e) {
            this._window.on('load', axilInit.l).on('scroll', axilInit.res)
        },

       

        axilBackToTop: function() {
            var btn = $('#backto-top');
            $(window).on('scroll', function() {
                if ($(window).scrollTop() > 300) {
                    btn.addClass('show');
                } else {
                    btn.removeClass('show');
                }
            });
            btn.on('click', function(e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: 0
                }, '300');
            });
        },

        marqueImages: function() {
            $('.marque-images').each(function() {
                var t = 0;
                var i = 1;
                var $this = $(this);
                setInterval(function() {
                    t += i;
                    $this.css('background-position-x', -t + 'px');
                }, 10);
            });
        },

        stickyHeaderMenu: function() {

            $(window).on('scroll', function() {
                // Sticky Class Add
                if ($('body').hasClass('sticky-header')) {
                    var stickyPlaceHolder = $('#axil-sticky-placeholder'),
                        menu = $('.axil-mainmenu'),
                        menuH = menu.outerHeight(),
                        topHeaderH = $('.axil-header-top').outerHeight() || 0,
                        targrtScroll = topHeaderH + 200;
                    if ($(window).scrollTop() > targrtScroll) {
                        menu.addClass('axil-sticky');
                        stickyPlaceHolder.height(menuH);
                    } else {
                        menu.removeClass('axil-sticky');
                        stickyPlaceHolder.height(0);
                    }
                }
            });
        },

        salActivation: function() {
            sal({
                threshold: 0.1,
                once: true
            });
        },

        counterUp: function () {
			var _counter = $('.count');
			if (_counter.length) {
				_counter.counterUp({
					delay: 10,
					time: 1000,
					triggerOnce: true
				});
			}
        },

        axilSlickActivation: function(e) {
            $('.slick-slider').slick();
        },

        axilMasonary: function () {
            $('.axil-isotope-wrapper').imagesLoaded(function () {
                // filter items on button click
                $('.isotope-button').on('click', 'button', function () {
                    var filterValue = $(this).attr('data-filter');
                    $grid.isotope({
                        filter: filterValue
                    });
                });
                
                // init Isotope
                var $grid = $('.isotope-list').isotope({
                    itemSelector: '.project',
                    percentPosition: true,
                    transitionDuration: '0.7s',
                    layoutMode: 'fitRows',
                    masonry: {
                        // use outer width of grid-sizer for columnWidth
                        columnWidth: 1,
                    }
                });
            });
        
            $('.isotope-button button').on('click', function (event) {
                $(this).siblings('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
                event.preventDefault();
            });

            // Masonry
            var galleryIsoContainer = $('#no-equal-gallery');
            if (galleryIsoContainer.length) {
                var blogGallerIso = galleryIsoContainer.imagesLoaded(function () {
                    blogGallerIso.isotope({
                        itemSelector: '.no-equal-item',
                        masonry: {
                            columnWidth: '.no-equal-item'
                        }
                    });
                });
            }
        },


        onePageNav: function () {
            $('#onepagenav').onePageNav({
                currentClass: 'current',
                changeHash: false,
                scrollSpeed: 500,
                scrollThreshold: 0.2,
                filter: '',
                easing: 'swing',
            });
        },

        axilHover : function () {
            $('.services-grid, .counterup-progress, .testimonial-grid, .pricing-table, .brand-grid, .blog-list, .about-quality, .team-grid, .splash-hover-control').mouseenter(function() {
                var self = this;
                setTimeout(function() {
                    $('.services-grid.active, .counterup-progress.active, .testimonial-grid.active, .pricing-table.active, .brand-grid.active, .blog-list.active, .about-quality.active, .team-grid.active, .splash-hover-control.active').removeClass('active');
                    $(self).addClass('active');
                }, 0);
                
            });
        },
    }
    axilInit.i();

})(window, document, jQuery);