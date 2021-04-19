// Hamburger menu
let iconeHamburger = jQuery('#svg_hamburger');
let menuRetratil = jQuery('#header-m');
let btnFechaMenuRetratil = jQuery('#toggle_menu-m');

iconeHamburger.on('click', function() {
    menuRetratil.addClass('open');
});

btnFechaMenuRetratil.on('click', function() {
    menuRetratil.removeClass('open');
});

// Login fire action
jQuery('#login-button').click(function(event) {
    event.preventDefault();
    jQuery('tray-login').show();
});

// Open subcategory inside hamburger menu
// MR - Menu Retrátil
let ulCategoriasMR = jQuery('#categorias_header-m');
let botaoToggleSubcategoriaMR = jQuery('#categorias_header-m > li.father > button');
let botaoToggleSubcategoria_2MR = jQuery('#categorias_header-m > li.father > div.children > div.ct_child > button');
let subcategoriasMR = jQuery('#categorias_header-m > li.father > div.children');
let subcategorias_2MR = jQuery('#categorias_header-m > li.father > div.children > div.ct_child > div.children_child');

subcategoriasMR.slideUp();
subcategorias_2MR.slideUp();

botaoToggleSubcategoriaMR.on('click', function(e) {
    // jQuery(e.target).parent().find('div.children').slideToggle("fast", "swing");

    if(jQuery(this).hasClass('open')) {
        jQuery(this).text('+');
        jQuery(this).removeClass('open');
        jQuery(e.target).parent().find('div.children').slideUp("fast", "swing");
    }
    else {
        subcategoriasMR.slideUp();
        botaoToggleSubcategoriaMR.removeClass('open');
        botaoToggleSubcategoriaMR.text('+');

        subcategorias_2MR.slideUp();
        botaoToggleSubcategoria_2MR.removeClass('open');
        botaoToggleSubcategoria_2MR.text('+');

        jQuery(this).text('-');
        jQuery(this).addClass('open');
        jQuery(e.target).parent().find('div.children').slideDown("fast", "swing");
    }
});

botaoToggleSubcategoria_2MR.on('click', function(e) {
    // jQuery(e.target).parent().find('div.children_child').slideToggle("fast", "swing");

    if(jQuery(this).hasClass('open')) {
        jQuery(this).text('+');
        jQuery(this).removeClass('open');
        jQuery(e.target).parent().find('div.children_child').slideUp("fast", "swing");
    }
    else {
        subcategorias_2MR.slideUp();
        botaoToggleSubcategoria_2MR.removeClass('open');
        botaoToggleSubcategoria_2MR.text('+');

        jQuery(this).text('-');
        jQuery(this).addClass('open');
        jQuery(e.target).parent().find('div.children_child').slideDown("fast", "swing");
    }
});

// Suggestion search
jQuery('header > div.baixo > form > input[type=text]').on('focusout', function() {
    jQuery(this).val('');
});