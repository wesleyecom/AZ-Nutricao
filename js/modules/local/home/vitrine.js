function chamaVitrine(item_id) {
    new Splide( item_id, {
        type   : 'loop',
        arrows : false,
        autoplay: false,
        interval: 2500,
        lazyLoad: 'nearby',
        perPage: 5,
        pagination: false,

        gap: 11,

        padding: {
            right: '2rem',
            left: '2rem'
        },

        breakpoints: {
            '1023': {
                type: 'loop',
                perPage: 3,

                padding: {
                    right: '2rem',
                    left: '2px'
                },
            },

            '550': {
                perPage: 2,
                pagination: true,

                gap: 8,

                padding: {
                    right: '1.5rem',
                    left: '2px'
                },
            },

            '360': {
                perPage: 1,

                gap: 15,

                padding: {
                    right: '5rem',
                    left: '2px'
                },
            },
        }
    } ).mount();

    console.log(item_id + ' carregada.');
}

jQuery('.vitrine').each(function(index) {
    criaWaypoint(this);
});

function criaWaypoint(elemento) {
    var wp = new Waypoint({
        element: jQuery(elemento)[0],
        handler: function() {
            var elementoLocal = jQuery(this)[0].element;

            chamaVitrine('#'+jQuery(elementoLocal).children('.ct_vitrine').attr('id'));
            jQuery(elemento).children('div.ct_vitrine').addClass('shown');
            wp.destroy();
        },
        offset: '180%'
    })  
};