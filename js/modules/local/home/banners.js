// Hero
new Splide( '#slide_hero', {
    rewind: true,
    arrows: true,
    pagination: false,
    perPage: 1,
    // autoplay: true,
    interval: 3500,

    breakpoints: {
        '769': {
            type   : 'loop',
            arrows : false,
        },
    }
} ).mount();

// Banner info
new Splide( '#banner_info', {
    arrows : false,
    pagination: false,
    lazyLoad: 'nearby',
    perPage: 5,
    // autoplay: true,
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
    type   : 'slide',
    pagination: false,
    arrows: false,
    autoplay: true,
    interval: 2000,
    lazyLoad: 'nearby',
    perPage: 3,
    gap: '2em',

    breakpoints: {
        '1023': {
            type   : 'loop',
            perPage: 2,
        },

        '630': {
            type   : 'loop',
            perPage: 1,
            pagination: true,
        }
    }
} ).mount();

// Linhas de produtos
new Splide( '#secao_linhas', {
    type   : 'slide',
    pagination: false,
    arrows: false,
    autoplay: true,
    interval: 2000,
    lazyLoad: 'nearby',
    perPage: 3,
    gap: '2em',

    breakpoints: {
        '1023': {
            type   : 'loop',
            perPage: 2,
        },

        '630': {
            type   : 'loop',
            perPage: 1,
            pagination: true,
        }
    }
} ).mount();