// Banner info
new Splide( '#banner_info', {
    arrows : false,
    pagination: false,
    lazyLoad: 'nearby',
    perPage: 4,
    autoplay: true,
    interval: 2500,

    breakpoints: {
        '1024': {
            perPage: 4,
        },
        '768': {
            type: 'loop',
            perPage: 3,
        },

        '425': {
            type: 'loop',
            perPage: 2,
        },

        '280': {
            type: 'loop',
            perPage: 1,
        },
    }
} ).mount();

// Categorias
new Splide( '#secao_categorias', {
    type   : 'loop',
    pagination: false,
    arrows: false,
    autoplay: true,
    interval: 2000,
    lazyLoad: 'nearby',
    perPage: 3,
    padding: {
        right: '5vw',
        left : '5vw',
    },

    breakpoints: {
        '1023': {
            perPage: 2,

            padding: {
                right: '5rem',
                left : '4.8vw',
            },
        },

        '630': {
            perPage: 1,
            pagination: true,
        }
    }
} ).mount();