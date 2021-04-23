jQuery('section#secao_produto > div.ct_avaliacoes_produto > div#comentario_cliente > form > div.rateBlock > ul > li.starn').on('click', function() {    
    jQuery(this).addClass('star-on');
    jQuery(this).prevUntil().addClass('star-on');
    jQuery(this).nextUntil().removeClass('star-on');
});

jQuery('#form-comments').append(`
    <button class="btn_enviar_comentario">
        Enviar
    </button>
`);

jQuery('#form-comments > button.btn_enviar_comentario').on('click', function() {
    jQuery('img#bt-submit-comments').click();
});

jQuery('div#comentario_cliente > a').on('click', function(e) {
    e.preventDefault();
    jQuery('tray-login').show();
});