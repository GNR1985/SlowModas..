let cartIcon = document.querySelector("#open");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close");

// Quando clicar no ícone de abrir o carrinho
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Quando clicar no botão de fechar o carrinho
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Verifica o estado do documento
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Função "ready" que registra os eventos de clique nos botões de remoção
function ready() {
    const removeCartButtons = document.getElementsByClassName('cart-remove');
    for (let button of removeCartButtons) {
        button.addEventListener('click', removeCartItem);
    }
    
    // Registra eventos de mudança para os inputs de quantidade
    const quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let input of quantityInputs) {
        input.addEventListener("change", quantityChanged);
    }

    // Adiciona eventos de clique a todos os botões "Adicionar"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const button = event.target; // O botão clicado
    const card = button.closest('.flip-card'); // Seleciona o card pai
    const priceElement = card.querySelector('.product-price'); // Seleciona o elemento de preço
    const productTitle = card.querySelector('.flip-card-image').alt; // Usa a imagem como título do produto

    const priceText = priceElement.innerText.replace("R$", "").trim().replace(",", "."); // Processa o preço
    const price = parseFloat(priceText); // Converte para número

    // Acesse o conteúdo do carrinho
    const cartContent = document.getElementsByClassName('cart-content')[0];

    // Verifica se o produto já existe no carrinho
    const existingCartBoxes = cartContent.getElementsByClassName('cart-box');
    for (let cartBox of existingCartBoxes) {
        const cartProductTitle = cartBox.getElementsByClassName('cart-product-title')[0].innerText;

        // Se o produto já existir, atualiza a quantidade
        if (cartProductTitle === productTitle) {
            const quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            quantityElement.value = parseInt(quantityElement.value) + 1; // Aumenta a quantidade
            updateTotal(); // Atualiza o total
            return; // Sai da função para evitar adicionar um novo item
        }
    }

    // Se o produto não existir, cria um novo elemento para o carrinho
    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');
    cartBox.innerHTML = `
        <img class="cart-img" src="${card.querySelector('.flip-card-image').src}" alt="${productTitle}">
        <div class="detail-box">
            <div class="cart-product-title">${productTitle}</div>
            <div class="cart-price">R$${price.toFixed(2).replace(".", ",")}</div> <!-- Formata o preço -->
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bi bi-trash3 cart-remove"></i> <!-- Ícone para remover o item -->
    `;

    // Adiciona o novo item ao carrinho
    cartContent.appendChild(cartBox);

    // Atualiza o total do carrinho
    updateTotal();

    // Adiciona o evento para remover o item do carrinho
    const removeButton = cartBox.querySelector('.cart-remove');
    removeButton.addEventListener('click', removeCartItem);
}

// Função que remove o item do carrinho ao clicar no botão
function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.remove(); // Remove o item do DOM
    updateTotal(); // Chama a função para atualizar o total
}

function quantityChanged(event) {
    const input = event.target;

    // Verifica se o valor não é um número ou é menor ou igual a zero
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1; // Define para 1 se não for um número ou <= 0
    }
    
    // Chama a função para atualizar o total após a mudança na quantidade
    updateTotal();
}

// Função para atualizar o total do carrinho
function updateTotal() {
    const cartContent = document.getElementsByClassName('cart-content')[0];
    const cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;

    for (let cartBox of cartBoxes) {
        const priceElement = cartBox.getElementsByClassName('cart-price')[0];
        const quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        
        // Extrai o preço, removendo "R$" e espaços
        const priceText = priceElement.innerText.replace("R$", "").trim().replace(",", "."); // Converte vírgula em ponto
        const price = parseFloat(priceText); // Converte o preço para número
        const quantity = parseInt(quantityElement.value); // Converte a quantidade para inteiro

        // Verifica se o preço e a quantidade são válidos
        if (!isNaN(price) && !isNaN(quantity)) {
            const itemTotal = price * quantity;
            total += itemTotal; // Atualiza o total com o novo preço
            console.log(`Item: ${priceText} x ${quantity} = ${itemTotal.toFixed(2)}`); // Log para cada item
        } else {
            console.error("Preço ou quantidade inválidos:", price, quantity); // Log de erro
        }
    }

    // Atualiza o total no DOM
    const formattedTotal = "R$" + total.toFixed(2).replace(".", ","); // Corrigido para formatar o total
    document.getElementsByClassName("total-price")[0].innerText = formattedTotal;

    console.log(`Total do Carrinho: ${formattedTotal}`); // Log do total final
}
let movingDiv = document.getElementsByClassName('run')[0];
let position = 0;
let direction = 1;

const speed = 0.10;

function moveDiv() {
    // Atualiza a posição da div
    position += direction * speed;
    movingDiv.style.left = position + "px";

    // Verifica se atingiu a borda da janela
    if (position + movingDiv.offsetWidth >= window.innerWidth || position <= 0) {
        direction *= -1; // Inverte a direção do movimento
    }

    // Solicita a próxima animação
    requestAnimationFrame(moveDiv);
}

// Inicia a animação
moveDiv();