// Gerar galeia ao carregar a p�gina
function carregaGaleria() {
    lightGallery(document.getElementById('ul-lightgallery'));
}

carregaGaleria();
                
// Galeria do produto selecionado
// Thumbnails
var thumbnails = new Splide( '#thumbnail_galeria_produto', {
    fixedWidth : '80px',
    height     : '80px',
    gap        : 5,
    rewind     : true,
    cover      : true,
    pagination : false,
    arrows: false,
    focus       : 'center',
    isNavigation: true,
    breakpoints: {
        '1': {
            fixedWidth : '25vw',
            height     : '18vw',
            gap        : 10,
            rewind     : true,
            cover      : true,
            pagination : false,
            isNavigation: true,
            focus       : 'center',
        }
    }
} ).mount();

var galeriaProduto = new Splide( '#galeria_produto', {
    type   : 'loop',
    arrows : false,
    pagination: false,
    autoplay: false,
    interval: 2000,
    lazyLoad: 'nearby',
    gap: 10,

    breakpoints: {
        '769': {
            gap: 0,
            perPage: 1,
            padding: {
                right: '0',
                left : '0'
            },
        },

        '460': {
            padding: {
                right: '5rem',
                left : '5rem'
            },
        },
    }
} );

galeriaProduto.sync( thumbnails ).mount();


// Atualizar galeria conforme sele��o de varia��o de produto
var idProduto = jQuery('#secao_produto').attr('data-product-id');

function trocaGaleria(variacao, galeria, thumbnail) {
    galeria.html('');
    
    if (thumbnail) {
        jQuery(variacao.Variant.VariantImage).each(function( index ){
            galeria.append(`
                <li class="splide__slide">
                    <img src="${ variacao.Variant.VariantImage[index].https }" alt="Thumbnail produto">
                </li>
            `);
        });

        thumbnails.refresh();
    }
    else {
        jQuery(variacao.Variant.VariantImage).each(function( index ){
            galeria.append(`
                <li class="splide__slide" data-src="${ variacao.Variant.VariantImage[index].https }">
                    <img src="${ variacao.Variant.VariantImage[index].https }" alt="Foto produto">
                </li>
            `);
        });

        galeriaProduto.refresh();
        carregaGaleria();
    }
}

function selecionaVariacao(variantID) {
    var params = {};
    params["attrs"] = "Variant.VariantImage";

    jQuery.ajax({
        method: "GET",
        url: "/web_api/variants/" + variantID,
        data: params
    }).done(function( response, textStatus, jqXHR ) {
        trocaGaleria(response, jQuery('#ul-lightgallery'), false);
        trocaGaleria(response, jQuery('#thumbnailsGaleria'), true);
    }).fail(function( jqXHR, status, errorThrown ){
        var response = jQuery.parseJSON( jqXHR.responseText );
        console.log(response);
    });
}