// Aplica o disable no bot�o de compra se necess�rio (load da p�gina)
jQuery(document).ready(function() {
    if (jQuery('#variation_first_select').val() === "") {
        jQuery('button.btn_add_carrinho').prop('disabled', true);
    }
});

// Altera��o de varia��o de produto (select)
jQuery('#variation_first_select').change(function() {
    if (jQuery(this).val() !== "") {
        jQuery('button.btn_add_carrinho').prop('disabled', false);

        selecionaVariacao(jQuery('#variation_first_select').val());
    }
    else {
        jQuery('button.btn_add_carrinho').prop('disabled', true);
    }
});