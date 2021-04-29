// Utils
// Checar mobile
var isMobile = jQuery('#isMobile').data('isMobile');

// L�gica dos bot�es dos cards de produtos  ( | comprar | + | - | )
let btn_subtrair  = jQuery('.btn_minus');
let btn_somar     = jQuery('.btn_plus');

btn_subtrair.on('click', function(e) {
    if (parseInt(jQuery(this).siblings('input').val()) > 1) {
        let val = parseInt(jQuery(this).siblings('input').val());
        jQuery(this).siblings('input').val(val-1);
    }
});

btn_somar.on('click', function(e) {
    let val = parseInt(jQuery(this).siblings('input').val());
    jQuery(this).siblings('input').val(val+1);
});

// Pegar informa��es do carrinho de compras
function syncCart() {
    var dataSession = jQuery("html").attr("data-session");

    jQuery.ajax({
        method: "GET",
        url: "/web_api/cart/"+dataSession
    }).done(function( response, textStatus, jqXHR ) {
        console.log(response);

        jQuery('ul#listaProdutos').html("");

        jQuery(response).each(function(index) {
            // console.log(response[index]);

            var id_produto = response[index].Cart.product_id;
            var link_produto = response[index].Cart.product_url.https;
            var foto_produto = response[index].Cart.product_image.http;
            var nome_produto = response[index].Cart.product_name;

            var preco_produto = response[index].Cart.price;
            preco_produto = preco_produto.replace('.', ',');

            var qtd = response[index].Cart.quantity;

            var li = `
                        <li>
                            <div class="backdrop">
                                X
                            </div>
                            <div class="ct_produto" id="${id_produto}">
                                <a href="${link_produto}">
                                </a>
                                <div class="foto_produto">
                                    <img src="${foto_produto}">
                                </div>

                                <div class="esquerda">
                                    <span class="nome_produto">${nome_produto}</span>
                                    <span class="preco_produto">R$ ${preco_produto}</span>
                                </div>

                                <div class="direita">
                                    <span class="quantidade_produto">
                                        Qtd: ${qtd}
                                    </span>
                                </div>
                            </div>
                        </li>
                     `;
            jQuery('ul#listaProdutos').append(li);
        });

        swipeToDelete();

    }).fail(function( jqXHR, status, errorThrown ){
        var response = jQuery.parseJSON( jqXHR.responseText );
        jQuery('ul#listaProdutos').html(`
            <span class="emptyCart">
                <svg height="512pt"
                        viewBox="0 -12 512.00032 512"
                        width="512pt"
                >
                    <path d="m279 90.0625-179.132812 98.363281 156.132812 85.734375 179.132812-98.363281zm0 0" fill="#383838"/>
                    <path d="m105.070312 393.699219 151.039063 82.9375v-202.480469l-151.039063-82.9375zm0 0" fill="#8a8a8a"/>
                    <path d="m440.929688 375.699219v-191.472657l-108.929688 147.148438-38-18.5.109375 143.445312zm0 0" fill="#8a8a8a"/>
                    <g fill="#c7c7c7"><path d="m285 261.15625 59.183594 59.179688 157.816406-86.65625-59.183594-59.179688zm0 0"/>
                        <path d="m36.667969 247.011719 159.109375 87.367187 60.222656-60.222656-159.109375-87.367188zm0 0"/>
                        <path d="m440.929688 172.613281 60.667968-60.660156-156.527344-85.953125-60.667968 60.667969zm0 0"/>
                        <path d="m43 98.546875 57.765625 57.761719 155.234375-85.238282-57.765625-57.761718zm0 0"/>
                    </g>
                    <path fill="#2f2f2f" d="m455.074219 172.613281 53.996093-53.996093c2.226563-2.222657 3.273438-5.367188 2.828126-8.480469-.441407-3.113281-2.328126-5.839844-5.085938-7.355469l-64.914062-35.644531c-4.839844-2.65625-10.917969-.886719-13.578126 3.953125-2.65625 4.84375-.890624 10.921875 3.953126 13.578125l53.234374 29.230469-46.339843 46.335937-166.667969-91.519531 46.335938-46.335938 46.839843 25.722656c4.839844 2.65625 10.921875.890626 13.578125-3.953124 2.660156-4.839844.890625-10.921876-3.953125-13.578126l-53.417969-29.335937c-3.898437-2.140625-8.742187-1.449219-11.882812 1.695313l-54 54-54-54c-3.144531-3.144532-7.988281-3.832032-11.882812-1.695313l-184.929688 101.546875c-2.757812 1.515625-4.644531 4.238281-5.085938 7.355469-.445312 3.113281.601563 6.257812 2.828126 8.480469l53.996093 53.996093-53.996093 53.992188c-2.226563 2.226562-3.273438 5.367187-2.828126 8.484375.441407 3.113281 2.328126 5.839844 5.085938 7.351562l55.882812 30.6875v102.570313c0 3.652343 1.988282 7.011719 5.1875 8.769531l184.929688 101.542969c1.5.824219 3.15625 1.234375 4.8125 1.234375s3.3125-.410156 4.8125-1.234375l184.929688-101.542969c3.199218-1.757812 5.1875-5.117188 5.1875-8.769531v-102.570313l55.882812-30.683594c2.757812-1.515624 4.644531-4.242187 5.085938-7.355468.445312-3.113282-.601563-6.257813-2.828126-8.480469zm-199.074219 90.132813-164.152344-90.136719 164.152344-90.140625 164.152344 90.140625zm-62.832031-240.367188 46.332031 46.335938-166.667969 91.519531-46.335937-46.335937zm-120.328125 162.609375 166.667968 91.519531-46.339843 46.339844-166.671875-91.519531zm358.089844 184.796875-164.929688 90.5625v-102.222656c0-5.523438-4.476562-10-10-10s-10 4.476562-10 10v102.222656l-164.929688-90.5625v-85.671875l109.046876 59.878907c1.511718.828124 3.167968 1.234374 4.808593 1.234374 2.589844 0 5.152344-1.007812 7.074219-2.929687l54-54 54 54c1.921875 1.925781 4.484375 2.929687 7.074219 2.929687 1.640625 0 3.296875-.40625 4.808593-1.234374l109.046876-59.878907zm-112.09375-46.9375-46.339844-46.34375 166.667968-91.515625 46.34375 46.335938zm0 0"/>
                    <path d="m404.800781 68.175781c2.628907 0 5.199219-1.070312 7.070313-2.933593 1.859375-1.859376 2.929687-4.4375 2.929687-7.066407 0-2.632812-1.070312-5.210937-2.929687-7.070312-1.859375-1.863281-4.441406-2.929688-7.070313-2.929688-2.640625 0-5.210937 1.066407-7.070312 2.929688-1.871094 1.859375-2.929688 4.4375-2.929688 7.070312 0 2.628907 1.058594 5.207031 2.929688 7.066407 1.859375 1.863281 4.441406 2.933593 7.070312 2.933593zm0 0"/>
                    <path d="m256 314.925781c-2.628906 0-5.210938 1.066407-7.070312 2.929688-1.859376 1.867187-2.929688 4.4375-2.929688 7.070312 0 2.636719 1.070312 5.207031 2.929688 7.078125 1.859374 1.859375 4.441406 2.921875 7.070312 2.921875s5.210938-1.0625 7.070312-2.921875c1.859376-1.871094 2.929688-4.441406 2.929688-7.078125 0-2.632812-1.070312-5.203125-2.929688-7.070312-1.859374-1.863281-4.441406-2.929688-7.070312-2.929688zm0 0"/>
                </svg>
            </span>
        `);
    });

    jQuery('#carrinhoRetratil').addClass('open');

    if (isMobile == true) {
        jQuery('body').css('overflow-y', 'hidden');
    }
}

// Function fecharCarrinho
jQuery('#fechar_carrinho').on('click', function() {
    jQuery('#carrinhoRetratil').removeClass('open');
    jQuery('body').css('overflow-y', 'auto');
});

function addCart(dataProductId, preco, qtd, variantID){
  var dataSession = jQuery("html").attr("data-session");
  qtd = parseInt(qtd);
  jQuery.ajax({
    method: "POST",
    url: "/web_api/cart/",
    contentType: "application/json; charset=utf-8",
    data: '{"Cart":{"session_id":"'+dataSession+'","product_id":"'+dataProductId+'","quantity":"'+qtd+'","variant_id":"'+variantID+'"}}'
  }).done(function( response, textStatus, jqXHR ) {
    // console.log(response);

    var qtdCart = parseInt(jQuery("span[data-cart=amount]").html());
    jQuery("span[data-cart=amount]").html(qtdCart + (1 * qtd));

    var totalCart = jQuery("span[data-cart=price]").html()
    totalCart = totalCart.replace(',', '.');
    totalCart = parseFloat(totalCart).toFixed(2);
    totalCart = (parseFloat(totalCart) + (preco * qtd)).toFixed(2);

    jQuery("span[data-cart=price]").html(totalCart);

    syncCart();
  }).fail(function( jqXHR, status, errorThrown ){
    var response = $.parseJSON( jqXHR.responseText );
    console.log(response);
  });

  if (variantID != '') {
    jQuery('ul#variacoes_card_produto').removeClass('show');
    jQuery("a#link_card_produto").removeClass('hide');
    jQuery("div#btn_add_carrinho").removeClass('hide');
  }
}

function deleteProduct(productId, preco, qtd) {
    var dataSession =  jQuery("html").attr("data-session");
    var productID = productId;
    
    return jQuery.ajax({
      method: "DELETE",
      url: "/web_api/carts/"+dataSession+"/"+productID
    }).done(function( response, textStatus, jqXHR ) {
        console.log(response);

        var qtdCart = parseInt(jQuery("span[data-cart=amount]").html());
        qtd = parseInt(qtd.replace('Qtd: ', ''));

        jQuery("span[data-cart=amount]").html(qtdCart - (1 * qtd));

        var totalCart = parseFloat(jQuery("span[data-cart=price]").html()).toFixed(2);

        preco = preco.replace('R$ ', '');
        preco = preco.replace(',', '.');
        preco = parseFloat(preco).toFixed(2);

        var totalFinal = (totalCart - (preco * qtd)).toFixed(2);

        if (totalFinal < 0)
            totalFinal = '0.00';

        jQuery("span[data-cart=price]").html(totalFinal);
    }).fail(function( jqXHR, status, errorThrown ){
          var response = jQuery.parseJSON( jqXHR.responseText );
          console.log(response);
    });
}

function swipeToDelete() {
    var swipedDelete = Swiped.init({
        query: '.listaProdutos li .ct_produto',
        list: true,
        right: 400,
        onOpen: function() {
            var li = jQuery(this.elem).parent();
            var ctProduto = this;
            var precoProduto = ctProduto.elem.children[2].children[1].innerText;
            var qtdProduto = ctProduto.elem.children[3].children[0].innerText;

            var response = deleteProduct(this.elem.id, precoProduto, qtdProduto);
            // console.log(jQuery(this.elem).parent());

            response.success(function (data) {
                if (data.message == 'Deleted') {
                    ctProduto.destroy(true);
                    li.remove();
                }
            });
        }
    });
}

function cleanCart() {
    var dataSession =  $("html").attr("data-session");

    jQuery.ajax({
      method: "DELETE",
      url: "/web_api/carts/"+dataSession
    }).done(function( response, textStatus, jqXHR ) {
        jQuery("span[data-cart=price]").html("0.00");
        jQuery("span[data-cart=amount]").html("0");
    }).fail(function( jqXHR, status, errorThrown ){
      var response = jQuery.parseJSON( jqXHR.responseText );
      console.log(response);
    });
}

jQuery('button#limparCarrinho').on('click', function() {
    cleanCart();

    jQuery('ul#listaProdutos').html(`
        <span class="emptyCart">
            <svg height="512pt"
                    viewBox="0 -12 512.00032 512"
                    width="512pt"
            >
                <path d="m279 90.0625-179.132812 98.363281 156.132812 85.734375 179.132812-98.363281zm0 0" fill="#383838"/>
                <path d="m105.070312 393.699219 151.039063 82.9375v-202.480469l-151.039063-82.9375zm0 0" fill="#8a8a8a"/>
                <path d="m440.929688 375.699219v-191.472657l-108.929688 147.148438-38-18.5.109375 143.445312zm0 0" fill="#8a8a8a"/>
                <g fill="#c7c7c7"><path d="m285 261.15625 59.183594 59.179688 157.816406-86.65625-59.183594-59.179688zm0 0"/>
                    <path d="m36.667969 247.011719 159.109375 87.367187 60.222656-60.222656-159.109375-87.367188zm0 0"/>
                    <path d="m440.929688 172.613281 60.667968-60.660156-156.527344-85.953125-60.667968 60.667969zm0 0"/>
                    <path d="m43 98.546875 57.765625 57.761719 155.234375-85.238282-57.765625-57.761718zm0 0"/>
                </g>
                <path fill="#2f2f2f" d="m455.074219 172.613281 53.996093-53.996093c2.226563-2.222657 3.273438-5.367188 2.828126-8.480469-.441407-3.113281-2.328126-5.839844-5.085938-7.355469l-64.914062-35.644531c-4.839844-2.65625-10.917969-.886719-13.578126 3.953125-2.65625 4.84375-.890624 10.921875 3.953126 13.578125l53.234374 29.230469-46.339843 46.335937-166.667969-91.519531 46.335938-46.335938 46.839843 25.722656c4.839844 2.65625 10.921875.890626 13.578125-3.953124 2.660156-4.839844.890625-10.921876-3.953125-13.578126l-53.417969-29.335937c-3.898437-2.140625-8.742187-1.449219-11.882812 1.695313l-54 54-54-54c-3.144531-3.144532-7.988281-3.832032-11.882812-1.695313l-184.929688 101.546875c-2.757812 1.515625-4.644531 4.238281-5.085938 7.355469-.445312 3.113281.601563 6.257812 2.828126 8.480469l53.996093 53.996093-53.996093 53.992188c-2.226563 2.226562-3.273438 5.367187-2.828126 8.484375.441407 3.113281 2.328126 5.839844 5.085938 7.351562l55.882812 30.6875v102.570313c0 3.652343 1.988282 7.011719 5.1875 8.769531l184.929688 101.542969c1.5.824219 3.15625 1.234375 4.8125 1.234375s3.3125-.410156 4.8125-1.234375l184.929688-101.542969c3.199218-1.757812 5.1875-5.117188 5.1875-8.769531v-102.570313l55.882812-30.683594c2.757812-1.515624 4.644531-4.242187 5.085938-7.355468.445312-3.113282-.601563-6.257813-2.828126-8.480469zm-199.074219 90.132813-164.152344-90.136719 164.152344-90.140625 164.152344 90.140625zm-62.832031-240.367188 46.332031 46.335938-166.667969 91.519531-46.335937-46.335937zm-120.328125 162.609375 166.667968 91.519531-46.339843 46.339844-166.671875-91.519531zm358.089844 184.796875-164.929688 90.5625v-102.222656c0-5.523438-4.476562-10-10-10s-10 4.476562-10 10v102.222656l-164.929688-90.5625v-85.671875l109.046876 59.878907c1.511718.828124 3.167968 1.234374 4.808593 1.234374 2.589844 0 5.152344-1.007812 7.074219-2.929687l54-54 54 54c1.921875 1.925781 4.484375 2.929687 7.074219 2.929687 1.640625 0 3.296875-.40625 4.808593-1.234374l109.046876-59.878907zm-112.09375-46.9375-46.339844-46.34375 166.667968-91.515625 46.34375 46.335938zm0 0"/>
                <path d="m404.800781 68.175781c2.628907 0 5.199219-1.070312 7.070313-2.933593 1.859375-1.859376 2.929687-4.4375 2.929687-7.066407 0-2.632812-1.070312-5.210937-2.929687-7.070312-1.859375-1.863281-4.441406-2.929688-7.070313-2.929688-2.640625 0-5.210937 1.066407-7.070312 2.929688-1.871094 1.859375-2.929688 4.4375-2.929688 7.070312 0 2.628907 1.058594 5.207031 2.929688 7.066407 1.859375 1.863281 4.441406 2.933593 7.070312 2.933593zm0 0"/>
                <path d="m256 314.925781c-2.628906 0-5.210938 1.066407-7.070312 2.929688-1.859376 1.867187-2.929688 4.4375-2.929688 7.070312 0 2.636719 1.070312 5.207031 2.929688 7.078125 1.859374 1.859375 4.441406 2.921875 7.070312 2.921875s5.210938-1.0625 7.070312-2.921875c1.859376-1.871094 2.929688-4.441406 2.929688-7.078125 0-2.632812-1.070312-5.203125-2.929688-7.070312-1.859374-1.863281-4.441406-2.929688-7.070312-2.929688zm0 0"/>
            </svg>
        </span>
    `);
});

// Varia��es de produtos (card produto)
function mostraVariacao(button) {
    var ul = jQuery(button).parent().parent().children("ul#variacoes_card_produto");
    var a  = jQuery(button).parent().parent().children("a");
    var btn_add_carrinho = jQuery(button).parent().parent().children("div.add_carrinho");

    jQuery("ul#variacoes_card_produto").removeClass('show');
    jQuery("a#link_card_produto").removeClass('hide');
    jQuery("div#btn_add_carrinho").removeClass('hide');

    ul.children('li').each(function() {
        var variantId = this.id;
        var params = {};
        params["attrs"] = "Variant.Sku";

        var li = jQuery(this);

        jQuery.ajax({
            method: "GET",
            url: "/web_api/variants/" + variantId,
            data: params
        }).done(function( response, textStatus, jqXHR ) {
            console.log(response);
            li.html(response.Variant.Sku[0].value);

        }).fail(function( jqXHR, status, errorThrown ){
            var response = jQuery.parseJSON( jqXHR.responseText );
            console.log(response);
        });
    });

    ul.addClass('show');
    a.addClass('hide');
    btn_add_carrinho.addClass('hide');
}

function escondeVariacao(button) {
    var ul = jQuery(button).parent();
    var a  = jQuery(button).parent().parent().children("a");
    var btn_add_carrinho = jQuery(button).parent().parent().children("div.add_carrinho");

    ul.removeClass('show');
    a.removeClass('hide');
    btn_add_carrinho.removeClass('hide');
}