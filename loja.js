const removeProdutosButtons = document.getElementsByClassName("remove-product-buttons");
console.log(removeProdutosButtons);
for (var i = 0; i < removeProdutosButtons.length; i++) {
    removeProdutosButtons[i].addEventListener('click', function(event) {
        // Remove o elemento pai do produto no carrinho
        event.target.parentElement.parentElement.remove();
    });
}

// Função para buscar produtos no carrinho e acessar seus preços e quantidades
const cartProducts = document.getElementsByClassName("cart-product");
for (var i = 0; i < cartProducts.length; i++) {
    console.log(cartProducts[i]);

    // Corrigido: busque elementos pela classe correta como string
    const productPrice = cartProducts[i].getElementsByClassName("product-price")[0];
    const productQuantity = cartProducts[i].getElementsByClassName("product-quantity")[0];

    // Verifique se os elementos foram encontrados corretamente
    console.log("Preço do produto: ", productPrice);
    console.log("Quantidade do produto: ", productQuantity);
}
