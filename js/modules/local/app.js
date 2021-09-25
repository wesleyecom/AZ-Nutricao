// Assets
window.theme_id = "87";
window.img = "https://images.tcdn.com.br/files/773127/themes/"+window.theme_id+"/img";
window.js  = "https://images.tcdn.com.br/files/773127/themes/"+window.theme_id+"/js";
window.css = "https://images.tcdn.com.br/files/773127/themes/"+window.theme_id+"/css";

// inline url
// https://images.tcdn.com.br/files/773127/themes/87/css/

// Hide splash screen on page load
jQuery(document).ready(function() {
    // setTimeout(jQuery('#loader').fadeOut(), 5000);
    setTimeout(function(){ 
        jQuery('#loader').fadeOut();
     }, 800);
});

// Checar mobile
function isMobile() {
    return(jQuery('#isMobile').data('isMobile'));
}

// Checar página atual
function page() {
    return(jQuery('#currentPage').data('currentPage'));
}

// Categorias -----------------------------------------------------------------------
// pegar todas as categorias
window.categorias = "";
window.marcas = [];
window.submarcas = [];
var submarca = [];

function sortArray(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function setCategorias() {
    jQuery.ajax({
        method: "GET",
        async: false,
        url: "/web_api/categories/tree/"
    }).done(function( response ) {
        let arrayCategorias = [];
    
        jQuery.each(response.Category, function(index, el) {
            arrayCategorias.unshift(el.Category);
        });

        categoriasOrdenadas = sortArray(arrayCategorias, "small_description");

        sessionStorage.setItem('categorias', JSON.stringify(categoriasOrdenadas));
    });
}

function checaCategorias() {
    if (!sessionStorage["categorias"]) {
        setCategorias();
    }
}

function getCategorias() {
    checaCategorias();
    return JSON.parse(sessionStorage.getItem('categorias'));
}

window.categorias = getCategorias();
// console.log("Categorias: ");
// console.log(window.categorias);

function setMarcas() {
    checaCategorias();
    arrayMarcas = [];
    
    jQuery(window.categorias).each(function(index, el) {
        if(el.id == "103") {
            arrayMarcas = el;
        }
    });

    arrayMarcas = arrayMarcas.children;

    marcasOrdenadas = arrayMarcas.sort((a, b) => a.Category.slug > b.Category.slug && 1 || -1);

    window.marcas = marcasOrdenadas;
}
setMarcas();

function setSubMarcas() {
    arraySubMarcas = [];

    jQuery(window.marcas).each(function(index, el) {
        if (el.Category.children != null) {
            jQuery(el.Category.children).each(function(index, submarca) {
                arraySubMarcas.unshift(submarca);
            });
        }
    });

    window.submarcas = arraySubMarcas.sort((a, b) => a.Category.slug > b.Category.slug && 1 || -1);
}
setSubMarcas();

// console.log("Marcas: ");
// console.log(window.marcas);

// console.log("Submarcas: ");
// console.log(window.submarcas);

function getSubmarca(id) {
    jQuery(window.marcas[id].Category.children).each(function(index, el) {
        submarca.unshift(el);
    });

    return submarca;
}
// Fecha Categorias -----------------------------------------------------------------------