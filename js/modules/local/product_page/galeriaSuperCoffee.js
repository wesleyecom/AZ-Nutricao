// Gerar galeia ao carregar a p�gina
function carregaGaleria() {
    lightGallery(document.getElementById('ul-lightgallery'));
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