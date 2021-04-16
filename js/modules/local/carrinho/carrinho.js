// Lógica dos botões dos cards de produtos  ( | comprar | + | - | )
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

// Pegar informações do carrinho de compras
function syncCart() {
    var dataSession = $("html").attr("data-session");

    jQuery.ajax({
        method: "GET",
        url: "/web_api/cart/"+dataSession
    }).done(function( response, textStatus, jqXHR ) {
        // console.log(response);

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

        jQuery('#carrinhoRetratil').addClass('open');
        jQuery('body').css('overflow-y', 'hidden');

        swipeToDelete();

    }).fail(function( jqXHR, status, errorThrown ){
        var response = jQuery.parseJSON( jqXHR.responseText );
        console.log(response);
    });
}

// Function fecharCarrinho
jQuery('#fechar_carrinho').on('click', function() {
    jQuery('#carrinhoRetratil').removeClass('open');
    jQuery('body').css('overflow-y', 'auto');
});

function addCart(dataProductId, preco, qtd){
  var dataSession = jQuery("html").attr("data-session");
  qtd = parseInt(qtd);
  jQuery.ajax({
    method: "POST",
    url: "/web_api/cart/",
    contentType: "application/json; charset=utf-8",
    data: '{"Cart":{"session_id":"'+dataSession+'","product_id":"'+dataProductId+'","quantity":'+qtd+'}}'
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
