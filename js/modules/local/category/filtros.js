// Sticky position when scroll

function changeFilterPosition(attributeValue) {
    if (attributeValue == "mini") {
        jQuery('#catalog_products').css('margin-top', '100px');
    }
    else {
        jQuery('#catalog_products').css('margin-top', '0');
    }
}

var $menu = $("header");

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.attributeName === "class") {
        var attributeValue = $(mutation.target).prop(mutation.attributeName);
        
        if (jQuery(window).width() >= 1024) {
          changeFilterPosition(attributeValue);
        }
    }
  });
});

observer.observe($menu[0], {
  attributes: true
});

// Função para renderizar variações de produtos
function achaVariacao(idProduto, button) {
  // Encontrar e renderizar variaï¿½ï¿½es do produto
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
              // console.log(variacao);

              ul.append(`
                  <li id="${variacao.Variant.id}" onclick="addCart(${idProduto}, ${produto.Product.price}, 1, ${variacao.Variant.id})">${variacao.Variant.Sku[0].value}</li>
              `);
  
          }).fail(function( jqXHR, status, errorThrown ){
              var response = jQuery.parseJSON( jqXHR.responseText );
              console.log(response);
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

// Filtrar produtos de acordo com o filtro de marcas lateral
function filtraProdutos(marca) {
  let params = {};

  params["query"] = marca;
  params["limit"] = "80";

  jQuery.ajax({
      // Search API
      method: "GET",
      url: "/web_api/search/",
      data: params
  }).done(function( response, textStatus, jqXHR ) {
      console.log(response);

      let produtos = jQuery('div.catalog_products > div.ct_showcase_products > ul');

      produtos.html("");

      alert("as");

      jQuery(response.Products).each(function() {
          console.log(this);
          
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
      });

  }).fail(function( jqXHR, status, errorThrown ){
      var response = $.parseJSON( jqXHR.responseText );
      console.log(response);
  });
}

// Expandir categorias laterais
function expandCategoriaLateral(elem) {
  let containerSubMarcas = jQuery(elem).parent().parent().find('div.submarcas_lateral');
  let button = jQuery(elem);

  console.log(containerSubMarcas);

  containerSubMarcas.toggleClass("show");
  button.text(button.text() == '+' ? '-' : '+');
}

// Click da categoria lateral (chama filtraProdutos())
function filtraCategoriaLateral(elem) {
  let categoria = jQuery(elem).text().trim();

  filtraProdutos(categoria);
}