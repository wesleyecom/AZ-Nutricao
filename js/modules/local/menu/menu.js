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
    jQuery('tray-login').fadeIn();
});

// Open subcategory inside hamburger menu
// MR - Menu Retrátil
let ulCategoriasMR = jQuery('#categorias_header-m');
let botaoToggleSubcategoriaMR = jQuery('#categorias_header-m > li.father > button');
let subcategoriasMR = jQuery('#categorias_header-m > li.father > div.children');

subcategoriasMR.slideUp();

botaoToggleSubcategoriaMR.on('click', function(e) {
    jQuery(e.target).parent().find('div.children').slideToggle();
    jQuery(this).text('-')
});