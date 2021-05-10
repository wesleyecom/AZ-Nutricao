// Checar mobile
if (jQuery("#isMobile").attr('data-is-mobile') == 'true') {
    var mobile = true;
}
else {
    var mobile = false;
}

// Gerar galeia ao carregar a p�gina
function carregaGaleria() {
    if (mobile) {
        lightGallery(document.getElementById('ul-lightgallery'));
    }
    else {
        lightGallery(document.getElementById('galeria_supercoffee-d'));
    }
}

carregaGaleria();
                

new Splide( '#galeria_supercoffee', {
    type   : 'loop',
    arrows : false,
    pagination: true,
    autoplay: false,
    interval: 2000,
    lazyLoad: 'nearby',
    perPage: 1
}).mount();