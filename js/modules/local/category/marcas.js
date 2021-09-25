// Gerar slide marcas
jQuery(document).ready(function() {
    new Splide( '.slideMarcas', {
        perPage: 6,
        rewind : true,
        pagination: false,

        breakpoints: {
            '900': {
                type: 'loop',
                perPage: 4,
            },

            '768': {
                arrows: 'false',
                perPage: 4,
                pagination: true,
            },

            '500': {
                perPage: 3,
                pagination: true,
            },
        }
    } ).mount();
});


ul_marcas = jQuery('ul#ulMarcas');

// Função para renderizar variações de produtos
function achaVariacao(idProduto, button) {
    // Encontrar e renderizar varia��es do produto
    var ul = jQuery(button).parent().parent().children("ul#variacoes_card_produto");
    var a  = jQuery(button).parent().parent().children("a");
    var btn_add_carrinho = jQuery(button).parent().parent().children("div.add_carrinho");

    jQuery("ul#variacoes_card_produto").removeClass('show');
    jQuery("a#link_card_produto").removeClass('hide');
    jQuery("div#btn_add_carrinho").removeClass('hide');

    jQuery.ajax({
        method: "GET",
        url: "/web_api/products/"+idProduto
    }).done(function( produto, textStatus, jqXHR ) {
        // console.log(produto);
        ul.html("");

        ul.append("<strong>Escolha uma varia&ccedil;&atilde;o</strong>");

        jQuery(produto.Product.Variant).each(function(el) {
            var variantId = this.id;

            jQuery.ajax({
                method: "GET",
                url: "/web_api/variants/" + variantId
            }).done(function( variacao, textStatus, jqXHR ) {

                ul.append(`
                    <li id="${variacao.Variant.id}" onclick="addCart(${idProduto}, ${produto.Product.price}, 1, ${variacao.Variant.id})">${variacao.Variant.Sku[0].value}</li>
                `);
    
            }).fail(function( jqXHR, status, errorThrown ){
                var response = jQuery.parseJSON( jqXHR.responseText );
                // console.log(response);
            });
        });

        ul.append('<button onclick="escondeVariacao(this)">X</button>')
        ul.addClass('show');
        a.addClass('hide');
        btn_add_carrinho.addClass('hide');

    }).fail(function( jqXHR, status, errorThrown ){
        var response = $.parseJSON( jqXHR.responseText );
        console.log(response);
    });
}

function filtraProdutos(dataMarca) {
    let marca = dataMarca;

    let params = {};

    params["query"] = marca;
    params["limit"] = "80";

    jQuery.ajax({
        // Search API
        method: "GET",
        url: "/web_api/search/",
        data: params
    }).done(function( response, textStatus, jqXHR ) {
        // console.log(response);

        let produtos = jQuery('div#showcase_products > ul');

        produtos.html("");

        jQuery(response.Products).each(function() {
            // console.log(this);
            
            let urlProduto = this.Product.url.https;
            let nomeProduto = this.Product.name;
            let precoProduto = this.Product.price.replace(".", ",");

            if(this.Product.has_variation == "1") {
                produtos.append(`
                    <li class="card_produto">
                        <ul id="variacoes_card_produto">
                        </ul>
                        
                        <a id="link_card_produto" href="${urlProduto}">
                            <div class="foto_produto">
                                <img src="https://images.tcdn.com.br/files/773127/themes/67/img/load.gif?c26b25a104ccbd6c740041eea842332e1626374517" data-srcset="${this.Product.ProductImage[0].https}" alt="Foto produto" class="lazy" srcset="${this.Product.ProductImage[0].https}">
                            </div>
                            
                            <div class="info_produto">
                                <span class="nome_produto">${nomeProduto}</span>
                                
                                <span class="preco_produto">R$ ${precoProduto}</span>
                            </div>
                        </a>
            
                        <div id="btn_add_carrinho" class="add_carrinho">
                            <div class="qtd">
                                <button class="btn_minus" onClick="logicaSubtrair(this)">-</button>
                                <input type="text" value="1" minlength="1">
                                <button class="btn_plus" onClick="logicaSomar(this)">+</button>
                            </div>
                            <button class="btn_add_carrinho" onclick="achaVariacao(${this.Product.id}, this)">Adicionar ao carrinho</button>
                        </div>
                    </li>
                `);
            }
            else {
                produtos.append(`
                    <li class="card_produto">
                        <a id="link_card_produto" href="${urlProduto}">
                            <div class="foto_produto">
                                <img src="https://images.tcdn.com.br/files/773127/themes/67/img/load.gif?c26b25a104ccbd6c740041eea842332e1626374517" data-srcset="${this.Product.ProductImage[0].https}" alt="Foto produto" class="lazy" srcset="${this.Product.ProductImage[0].https}">
                            </div>
                            
                            <div class="info_produto">
                                <span class="nome_produto">${nomeProduto}</span>
                                
                                <span class="preco_produto">R$ ${precoProduto}</span>
                            </div>
                        </a>
            
                        <div id="btn_add_carrinho" class="add_carrinho">
                            <div class="qtd">
                                <button class="btn_minus" onClick="logicaSubtrair(this)">-</button>
                                <input type="text" value="1" minlength="1">
                                <button class="btn_plus" onClick="logicaSomar(this)">+</button>
                            </div>
                            <button class="btn_add_carrinho"  onclick="addCart(${this.Product.id}, ${this.Product.price}, jQuery(this).siblings('div.qtd').children('input').val(), '')">Adicionar ao carrinho</button>
                        </div>
                    </li>
                `);
            }
        })

    }).fail(function( jqXHR, status, errorThrown ){
        var response = $.parseJSON( jqXHR.responseText );
        console.log(response);
    });
}

ul_marcas.children('li').on('click', function() {
    if (!jQuery(this).hasClass('selected')) {
        ul_marcas.children('li.selected').removeClass('selected');
        jQuery(this).addClass('selected');

        filtraProdutos(jQuery(this).data('marca'));
    }
});