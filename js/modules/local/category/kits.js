jQuery("#select_products").on('click', function() {
    if (!jQuery(this).hasClass('selected')) {
        jQuery(this).addClass('selected');
        jQuery("#select_kits").removeClass('selected');

        jQuery("#showcase_products").removeClass('hidden');
        jQuery("#showcase_kits").addClass('hidden');
    }
});

jQuery("#select_kits").on('click', function() {
    if (!jQuery(this).hasClass('selected')) {
        jQuery(this).addClass('selected');
        jQuery("#select_products").removeClass('selected');

        jQuery("#showcase_kits").removeClass('hidden');
        jQuery("#showcase_products").addClass('hidden');
    }
});