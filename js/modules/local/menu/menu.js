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
jQuery('#login-button-d, #login-button-m').click(function(event) {
    event.preventDefault();
    jQuery('tray-login').show();
});

// Open subcategory inside hamburger menu
// MR - Menu Retratil
let ulCategoriasMR = jQuery('#categorias_header-m');
let botaoToggleSubcategoriaMR = jQuery('#categorias_header-m > li.father > button');
let botaoToggleSubcategoria_2MR = jQuery('#categorias_header-m > li.father > div.children > div.ct_child > button');
let subcategoriasMR = jQuery('#categorias_header-m > li.father > div.children');
let subcategorias_2MR = jQuery('#categorias_header-m > li.father > div.children > div.ct_child > div.children_child');

subcategoriasMR.slideUp();
subcategorias_2MR.slideUp();

botaoToggleSubcategoriaMR.on('click', function(e) {
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

// Order tracking button
let btnRastreio = jQuery('#btn_rastreio_not_logged');

btnRastreio.on('click', function(event) {
    event.preventDefault();
    jQuery('tray-login').show();
});

// Expand categories (desktop version)
function subcategoriesMenu(element) {
    if (jQuery(element).hasClass('closed')) {
        // Open subcategories menu
        let clicked_button = jQuery(element);
        let div_sublinks = jQuery(element).closest('div.subLinks');
        let ul_sublinks = jQuery(element).closest('ul.ul_subLinks');
        let li_clicked = jQuery(element).closest('li.child');
        let container_subcategories = jQuery(element).closest('ul.ul_subLinks').find('div.subCategoryContainer');

        // Get subcategories
        let categoryId =  jQuery(element).attr('class');
        categoryId = categoryId.replace('categoria_', '');
        categoryId = categoryId.replace(' closed', '');

        console.log(categoryId);
            
        jQuery.ajax({
            method: "GET",
            url: "/web_api/categories/tree/"+categoryId
        }).done(function( response, textStatus, jqXHR ) {
            container_subcategories.html('');

            jQuery(response.Category[0].Category.children).each(function() {
                container_subcategories.append(`
                    <a href="${this.Category.link.https}">${this.Category.name}</a>
                `);
            });

            // change div sublinks display
            div_sublinks.addClass('selected');

            // remove all li itens
            ul_sublinks.children('li').each(function() {
                jQuery(this).hide();
            });

            // Show select li again and apply css
            li_clicked.show();

            // Change button
            clicked_button.removeClass('closed');
            clicked_button.addClass('opened');
            clicked_button.html('-');

            container_subcategories.show();

        }).fail(function( jqXHR, status, errorThrown ){
            var response = $.parseJSON( jqXHR.responseText );
            console.log(response);
        });
    }
    else {
        // Close subcategories menu
        let clicked_button = jQuery(element);
        let div_sublinks = jQuery(element).closest('div.subLinks');
        let ul_sublinks = jQuery(element).closest('ul.ul_subLinks');
        let container_subcategories = jQuery(element).closest('ul.ul_subLinks').find('div.subCategoryContainer');

        // Change button
        clicked_button.html('+');
        clicked_button.addClass('closed');
        clicked_button.removeClass('opened');

        // change div sublinks display
        div_sublinks.removeClass('selected');

        // replace all li itens
        ul_sublinks.children('li').each(function() {
            jQuery(this).show();
        });

        container_subcategories.hide();
    }
}

function leaveCategoryMenu(element) {
    if (jQuery(element).hasClass("selected")) {
        let div_sublinks = jQuery(element);
        let ul_sublinks = jQuery(element).children('ul.ul_subLinks');
        let container_subcategories = ul_sublinks.children('div.subCategoryContainer');

        div_sublinks.removeClass("selected");

        ul_sublinks.children('li').each(function() {
            jQuery(this).show();

            jQuery(this).children('span').html("+");
            jQuery(this).children('span').removeClass("opened");
            jQuery(this).children('span').addClass("closed");
        });

        container_subcategories.hide();
    }
}