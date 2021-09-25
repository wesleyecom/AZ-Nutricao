function chamaVitrine(item_id) {
    var splide = new Splide( item_id, {
        type   : 'slide',
        arrows : true,
        autoplay: false,
        interval: 2500,
        lazyLoad: 'nearby',
        perPage: 5,
        pagination: false,
        padding: {
            left : '8px',
            right: '8px',
        },
        lazyLoad: 'nearby',

        gap: '3em',

        breakpoints: {
            '1023': {
                type: 'loop',
                perPage: 3,
            },

            '550': {
                type   : 'loop',
                perPage: 2,
                pagination: true,
                gap: '15px',
                padding: {
                    left : '8px',
                    right: '25px',
                },
            },

            '360': {
                type   : 'loop',
                perPage: 1,
            },
        }
    } ).mount();

    var vitrine = jQuery(item_id);
    var isMobile = jQuery('#isMobile').data('isMobile');

    splide.on( 'moved', function () {
        if ( splide.index > 0 ) {
            if (splide.index >= 5) {
                vitrine.children('div.splide__arrows').children('button.splide__arrow--next').css("display", "none");
            }
            else {
                vitrine.children('div.splide__arrows').children('button.splide__arrow--next').css("display", "block");
            }

            jQuery(splide.Components.Elements.arrows.prev).css("display", "block");
            vitrine.children('div.splide__arrows').children('button.splide__arrow--prev').css("display", "block");
        }
        else {
            vitrine.children('div.splide__arrows').children('button.splide__arrow--prev').css("display", "none");
            vitrine.children('div.splide__arrows').children('button.splide__arrow--next').css("display", "block");
        }
    } );
}

jQuery('.vitrine').each(function(index) {
    chamaVitrine('#'+jQuery(this).children('.ct_vitrine').attr('id'));
});