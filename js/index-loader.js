// Script para carregar produtos dinamicamente no index.html
// Certifique-se de que db.js foi carregado antes deste script

// Script para carregar produtos dinamicamente no index.html
// Certifique-se de que db.js foi carregado antes deste script

// Função para criar um card de produto para a sidebar (mais vendidos)
function createSidebarProductCard(product) {
  return `
    <div class="showcase" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
      <a href="product.html?id=${product.id}" class="showcase-img-box" onclick="event.stopPropagation();">
        <img src="${product.images.main}" alt="${product.name}" width="75" height="75" class="showcase-img">
      </a>
      
      <div class="showcase-content">
        <a href="product.html?id=${product.id}" onclick="event.stopPropagation();">
          <h4 class="showcase-title">${product.name}</h4>
        </a>
        
        <div class="showcase-rating">
          ${generateStarRating(product.rating)}
        </div>
        
        <div class="price-box">
          ${product.originalPrice ? `<del>R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</del>` : ''}
          <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>
    </div>
  `;
}

// Função para criar um card de produto principal
function createMainProductCard(product) {
  const discountPercentage = product.discount || 0;
  const hasDiscount = discountPercentage > 0;
  
  return `
    <div class="showcase" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
      <div class="showcase-banner">
        <img src="${product.images.main}" alt="${product.name}" width="300" class="product-img default">
        <img src="${product.images.gallery[1] || product.images.main}" alt="${product.name}" width="300" class="product-img hover">
        
        ${hasDiscount ? `<p class="showcase-badge">${discountPercentage}%</p>` : ''}
        
        <div class="showcase-actions" onclick="event.stopPropagation();">
          <button class="btn-action">
            <ion-icon name="eye-outline"></ion-icon>
          </button>
          <button class="btn-action">
            <ion-icon name="repeat-outline"></ion-icon>
          </button>
          <button class="btn-action">
            <ion-icon name="bag-add-outline"></ion-icon>
          </button>
        </div>
      </div>
      
      <div class="showcase-content">
        <a href="product.html?id=${product.id}" class="showcase-category" onclick="event.stopPropagation();">${categories[product.category]?.name || product.category}</a>
        
        <a href="product.html?id=${product.id}" onclick="event.stopPropagation();">
          <h3 class="showcase-title">${product.name}</h3>
        </a>
        
        <div class="showcase-rating">
          ${generateStarRating(product.rating)}
        </div>
        
        <div class="price-box">
          ${hasDiscount ? `<p class="price-old">R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</p>` : ''}
          <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>
    </div>
  `;
}

// Função para gerar estrelas de avaliação
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let starsHtml = '';
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += '<ion-icon name="star"></ion-icon>';
    } else if (i === fullStars && hasHalfStar) {
      starsHtml += '<ion-icon name="star-half"></ion-icon>';
    } else {
      starsHtml += '<ion-icon name="star-outline"></ion-icon>';
    }
  }
  
  return starsHtml;
}

// Função para carregar produtos na sidebar (mais vendidos)
function loadSidebarProducts() {
  if (typeof DB === 'undefined') return;
  
  const bestSellingProducts = DB.getBestSellingProducts(4);
  const sidebarContainer = document.querySelector('.showcase-container');
  
  if (sidebarContainer) {
    sidebarContainer.innerHTML = '';
    bestSellingProducts.forEach(product => {
      sidebarContainer.innerHTML += createSidebarProductCard(product);
    });
  }
}

// Função para carregar produtos em uma seção específica
function loadProductsInSection(sectionSelector, products) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;
  
  const container = section.querySelector('.product-container') || section.querySelector('.product-grid');
  if (!container) return;
  
  // Limpar conteúdo existente
  container.innerHTML = '';
  
  // Adicionar produtos
  products.forEach(product => {
    const productCard = createMainProductCard(product);
    container.innerHTML += productCard;
  });
}

// Função para carregar produtos na seção "Novos Produtos"
function loadNewProducts() {
  if (typeof DB === 'undefined') return;
  
  const newProducts = DB.getAllProducts().slice(0, 8); // Primeiros 8 produtos
  loadProductsInSection('.product-new', newProducts);
}

// Função para carregar produtos em promoção
function loadDiscountedProducts() {
  if (typeof DB === 'undefined') return;
  
  const discountedProducts = DB.getDiscountedProducts().slice(0, 8);
  loadProductsInSection('.product-featured', discountedProducts);
}

// Função para carregar produtos mais bem avaliados
function loadTopRatedProducts() {
  if (typeof DB === 'undefined') return;
  
  const topRatedProducts = DB.getTopRatedProducts(8);
  loadProductsInSection('.product-grid', topRatedProducts);
}

// Função para carregar produtos por categoria
function loadProductsByCategory(category, sectionSelector, limit = 8) {
  if (typeof DB === 'undefined') return;
  
  const categoryProducts = DB.getProductsByCategory(category).slice(0, limit);
  loadProductsInSection(sectionSelector, categoryProducts);
}

// Função principal para carregar todos os produtos
function loadAllProducts() {
  // Verificar se o banco de dados está disponível
  if (typeof DB === 'undefined' || typeof productsDB === 'undefined') {
    console.error('Banco de dados não carregado. Certifique-se de que db.js foi incluído antes deste script.');
    return;
  }
  
  // Carregar produtos na sidebar
  loadSidebarProducts();
  
  // Carregar diferentes seções principais
  loadNewProducts();
  loadDiscountedProducts();
  loadTopRatedProducts();
  
  // Carregar produtos por categoria em seções específicas
  loadProductsByCategory('oculos-sol', '.sunglasses-section', 6);
  loadProductsByCategory('oculos-grau', '.glasses-section', 6);
  loadProductsByCategory('lentes-contato', '.contacts-section', 4);
}

// Função para atualizar links de produtos existentes
function updateExistingProductLinks() {
  const productLinks = document.querySelectorAll('a[href*="product.html"]');
  
  productLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === 'product.html') {
      // Se o link não tem ID, adicionar um ID padrão
      link.setAttribute('href', 'product.html?id=oculos-sol-esportivo');
    }
  });
}

// Carregar produtos quando a página estiver pronta
document.addEventListener('DOMContentLoaded', function() {
  // Aguardar um pouco para garantir que db.js foi carregado
  setTimeout(() => {
    loadAllProducts();
    updateExistingProductLinks();
  }, 100);
});

// Exportar funções para uso global se necessário
if (typeof window !== 'undefined') {
  window.IndexLoader = {
    loadAllProducts,
    loadSidebarProducts,
    loadNewProducts,
    loadDiscountedProducts,
    loadTopRatedProducts,
    loadProductsByCategory,
    createMainProductCard,
    createSidebarProductCard
  };
}