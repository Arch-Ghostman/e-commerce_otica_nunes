// Sistema de Carrinho de Compras
class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createCartHTML();
    this.updateCartCount();
    this.attachEventListeners();
  }

  createCartHTML() {
    // Verificar se o carrinho já existe
    if (document.getElementById('shopping-cart')) {
      return;
    }

    const cartHTML = `
      <div id="shopping-cart" class="shopping-cart">
        <div class="cart-overlay" onclick="cart.closeCart()"></div>
        <div class="cart-container">
          <div class="cart-header">
            <h2>Carrinho de Compras</h2>
            <button class="cart-close-btn" onclick="cart.closeCart()">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          
          <div class="cart-content">
            <div class="cart-items" id="cart-items">
              <!-- Items serão inseridos aqui dinamicamente -->
            </div>
            
            <div class="cart-empty" id="cart-empty" style="display: none;">
              <ion-icon name="bag-outline"></ion-icon>
              <p>Seu carrinho está vazio</p>
              <button class="continue-shopping-btn" onclick="cart.closeCart()">
                Continuar Comprando
              </button>
            </div>
          </div>
          
          <div class="cart-footer">
            <div class="cart-total">
              <div class="total-row">
                <span>Subtotal:</span>
                <span id="cart-subtotal">R$ 0,00</span>
              </div>
              <div class="total-row">
                <span>Frete:</span>
                <span id="cart-shipping">Grátis</span>
              </div>
              <div class="total-row total-final">
                <span>Total:</span>
                <span id="cart-total">R$ 0,00</span>
              </div>
            </div>
            
            <div class="cart-actions">
              <button class="clear-cart-btn" onclick="cart.clearCart()">
                Limpar Carrinho
              </button>
              <button class="checkout-btn" onclick="cart.proceedToCheckout()">
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', cartHTML);
  }

  attachEventListeners() {
    // Listener para o botão do carrinho no header
    const cartBtn = document.querySelector('.header-user-actions .action-btn');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => this.toggleCart());
    }

    // Listener para tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeCart();
      }
    });
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    this.saveToStorage();
    this.updateCartDisplay();
    this.updateCartCount();
    this.showAddedNotification(product.name);
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveToStorage();
    this.updateCartDisplay();
    this.updateCartCount();
  }

  updateQuantity(productId, newQuantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (newQuantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = newQuantity;
        this.saveToStorage();
        this.updateCartDisplay();
        this.updateCartCount();
      }
    }
  }

  clearCart() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
      this.items = [];
      this.saveToStorage();
      this.updateCartDisplay();
      this.updateCartCount();
    }
  }

  updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    
    if (this.items.length === 0) {
      cartItemsContainer.style.display = 'none';
      cartEmpty.style.display = 'flex';
    } else {
      cartItemsContainer.style.display = 'block';
      cartEmpty.style.display = 'none';
      
      cartItemsContainer.innerHTML = this.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <div class="item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="item-details">
            <h4>${item.name}</h4>
            <p class="item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
          </div>
          <div class="item-controls">
            <div class="quantity-controls">
              <button class="qty-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">
                <ion-icon name="remove-outline"></ion-icon>
              </button>
              <span class="quantity">${item.quantity}</span>
              <button class="qty-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">
                <ion-icon name="add-outline"></ion-icon>
              </button>
            </div>
            <button class="remove-btn" onclick="cart.removeItem('${item.id}')">
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
        </div>
      `).join('');
    }
    
    this.updateCartTotals();
  }

  updateCartTotals() {
    const subtotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 200 ? 0 : 15; // Frete grátis acima de R$ 200
    const total = subtotal + shipping;
    
    document.getElementById('cart-subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('cart-shipping').textContent = shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`;
    document.getElementById('cart-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  updateCartCount() {
    const count = this.items.reduce((total, item) => total + item.quantity, 0);
    
    // Atualizar contador do header desktop
    const countElement = document.querySelector('.header-user-actions .count');
    if (countElement) {
      countElement.textContent = count;
    }
    
    // Atualizar contador do menu mobile (carrinho)
    const mobileCartCount = document.querySelector('.mobile-bottom-navigation .action-btn:nth-child(2) .count');
    if (mobileCartCount) {
      mobileCartCount.textContent = count;
    }
  }

  toggleCart() {
    if (this.isOpen) {
      this.closeCart();
    } else {
      this.openCart();
    }
  }

  openCart() {
    this.updateCartDisplay();
    const cartElement = document.getElementById('shopping-cart');
    cartElement.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
  }

  closeCart() {
    const cartElement = document.getElementById('shopping-cart');
    cartElement.classList.remove('active');
    document.body.style.overflow = '';
    this.isOpen = false;
  }

  showAddedNotification(productName) {
    // Criar notificação temporária
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <ion-icon name="checkmark-circle-outline"></ion-icon>
        <span>${productName} adicionado ao carrinho!</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  proceedToCheckout() {
    if (this.items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    
    // Redirecionar para a página de checkout
    window.location.href = 'checkout.html';
  }

  saveToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  // Método para adicionar produto a partir dos botões existentes
  addProductFromButton(productElement) {
    const product = {
      id: Date.now().toString(), // ID temporário
      name: productElement.querySelector('.showcase-title')?.textContent || 'Produto',
      price: this.extractPrice(productElement.querySelector('.price')?.textContent || 'R$ 0,00'),
      image: productElement.querySelector('.product-img')?.src || 'https://via.placeholder.com/300x300'
    };
    
    this.addItem(product);
  }

  extractPrice(priceText) {
    // Extrair número do texto do preço (ex: "R$ 189,90" -> 189.90)
    return parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  }
}

// Inicializar carrinho quando o DOM estiver carregado
let cart;

document.addEventListener('DOMContentLoaded', function() {
  cart = new ShoppingCart();
  
  // Adicionar event listeners aos botões de adicionar ao carrinho existentes
  document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-action ion-icon[name="bag-add-outline"]')) {
      e.preventDefault();
      const productCard = e.target.closest('.showcase');
      if (productCard) {
        cart.addProductFromButton(productCard);
      }
    }
  });
});

// Função global para adicionar ao carrinho (compatibilidade com botões existentes)
function addToCart(productData) {
  if (cart) {
    if (productData) {
      cart.addItem(productData);
    } else {
      // Se não há dados específicos, tentar extrair da página atual
      const product = {
        id: 'current-product',
        name: document.querySelector('.product-title')?.textContent || 'Produto Atual',
        price: cart.extractPrice(document.querySelector('.price')?.textContent || 'R$ 0,00'),
        image: document.querySelector('.product-img')?.src || 'https://via.placeholder.com/300x300'
      };
      cart.addItem(product);
    }
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.ShoppingCart = ShoppingCart;
  window.addToCart = addToCart;
}