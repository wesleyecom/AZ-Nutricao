new Splide( '#supercoffee', {
    arrows : false,
    autoplay: false,
    interval: 3000,
    lazyLoad: 'nearby',
    perPage: 4,
    pagination: false,

    breakpoints: {
        '1024': {
            type   : 'loop',
            perPage: 2,
            pagination: true,
        },

        '600': {
            type   : 'loop',
            perPage: 1,
            pagination: true,
        }
    }
}).mount();