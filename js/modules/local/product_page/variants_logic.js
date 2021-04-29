// Aplica o disable no botão de compra se necessário (load da página)
jQuery(document).ready(function() {
    if (jQuery('#variation_first_select').val() === "") {
        jQuery('button.btn_add_carrinho').prop('disabled', true);
    }
});

// Alteração de variação de produto (select)
jQuery('#variation_first_select').change(function() {
    if (jQuery(this).val() !== "") {
        jQuery('button.btn_add_carrinho').prop('disabled', false);

        selecionaVariacao(jQuery('#variation_first_select').val());
    }
    else {
        jQuery('button.btn_add_carrinho').prop('disabled', true);
    }
});