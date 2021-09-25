new Splide( '#supercoffee', {
    arrows : false,
    autoplay: false,
    interval: 3000,
    lazyLoad: 'nearby',
    perPage: 5,
    gap: 30,
    pagination: false,

    breakpoints: {
        '1245': {
            type   : 'loop',
            perPage: 3,
            pagination: true,
        },
        '768': {
            type   : 'loop',
            perPage: 2,
            pagination: true,
        },
        '600': {
            type   : 'loop',
            perPage: 1,
            pagination: true,
            gap: 0,
        }
    }
}).mount();