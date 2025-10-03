// Product loader agora usa o banco de dados db.js
// Certifique-se de que db.js foi carregado antes deste script

// Função para obter parâmetro da URL
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Função para carregar dados do produto
function loadProductData() {
  const productId = getURLParameter('id');
  
  // Verifica se o banco de dados está disponível
  if (typeof DB === 'undefined' || typeof productsDB === 'undefined') {
    console.error('Banco de dados não carregado. Certifique-se de que db.js foi incluído antes deste script.');
    return;
  }
  
  // Busca o produto no banco de dados
  const product = DB.getProductById(productId);
  
  if (product) {
    updateProductDisplay(product);
  } else {
    // Produto padrão caso não encontre o ID
    const defaultProduct = DB.getProductById('oculos-sol-esportivo');
    if (defaultProduct) {
      updateProductDisplay(defaultProduct);
    }
  }
}

// Função para atualizar a exibição do produto
function updateProductDisplay(product) {
  // Atualizar título da página
  document.title = `${product.name} - Ótica Online`;
  
  // Atualizar nome do produto
  const productTitle = document.querySelector('h1');
  if (productTitle) {
    productTitle.textContent = product.name;
  }
  
  // Atualizar preços
  const currentPrice = document.querySelector('.current-price');
  if (currentPrice) {
    currentPrice.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
  }
  
  const originalPrice = document.querySelector('.original-price');
  if (originalPrice && product.originalPrice) {
    originalPrice.textContent = `R$ ${product.originalPrice.toFixed(2).replace('.', ',')}`;
    originalPrice.style.display = 'inline';
  } else if (originalPrice) {
    originalPrice.style.display = 'none';
  }
  
  // Atualizar desconto
  const discountBadge = document.querySelector('.discount-badge');
  if (discountBadge && product.discount) {
    discountBadge.textContent = `-${product.discount}%`;
    discountBadge.style.display = 'inline-block';
  } else if (discountBadge) {
    discountBadge.style.display = 'none';
  }
  
  // Atualizar imagem principal
  const mainImage = document.querySelector('.main-image img');
  if (mainImage && product.images && product.images.main) {
    mainImage.src = product.images.main;
    mainImage.alt = product.name;
  }
  
  // Atualizar galeria de imagens
  if (product.images && product.images.gallery) {
    const thumbnails = document.querySelectorAll('.thumbnail-list img');
    product.images.gallery.forEach((imageSrc, index) => {
      if (thumbnails[index]) {
        thumbnails[index].src = imageSrc;
        thumbnails[index].alt = `${product.name} - Imagem ${index + 1}`;
      }
    });
  }
  
  // Atualizar descrição
  const description = document.querySelector('.product-description p');
  if (description) {
    description.textContent = product.description;
  }
  
  // Atualizar características/features
  if (product.features) {
    const featuresList = document.querySelector('.features-list');
    if (featuresList) {
      featuresList.innerHTML = '';
      product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
      });
    }
  }
  
  // Atualizar avaliação
  updateStarRating(product.rating);
  
  // Atualizar número de reviews
  const reviewCount = document.querySelector('.review-count');
  if (reviewCount && product.reviews) {
    reviewCount.textContent = `(${product.reviews} avaliações)`;
  }
  
  // Atualizar status de estoque
  const stockStatus = document.querySelector('.stock-status');
  if (stockStatus) {
    if (product.inStock && product.stockQuantity > 0) {
      stockStatus.textContent = `Em estoque (${product.stockQuantity} unidades)`;
      stockStatus.className = 'stock-status in-stock';
    } else {
      stockStatus.textContent = 'Fora de estoque';
      stockStatus.className = 'stock-status out-of-stock';
    }
  }
}

// Função para atualizar as estrelas de avaliação
function updateStarRating(rating) {
  const stars = document.querySelectorAll('.rating-stars ion-icon');
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  stars.forEach((star, index) => {
    if (index < fullStars) {
      star.setAttribute('name', 'star');
    } else if (index === fullStars && hasHalfStar) {
      star.setAttribute('name', 'star-half');
    } else {
      star.setAttribute('name', 'star-outline');
    }
  });
}

// Função para criar card de produto relacionado
function createRelatedProductCard(product) {
  const discountPercentage = product.discount || 0;
  const hasDiscount = discountPercentage > 0;
  
  return `
    <div class="showcase" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
      <div class="showcase-banner">
        <img src="${product.images.main}" alt="${product.name}" width="300" class="product-img default">
        <img src="${product.images.gallery[1] || product.images.main}" alt="${product.name}" width="300" class="product-img hover">
        
        ${hasDiscount ? `<p class="showcase-badge angle pink">-${discountPercentage}%</p>` : ''}
        
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
        <a href="product.html?id=${product.id}" class="showcase-category" onclick="event.stopPropagation();">${product.category}</a>
        <a href="product.html?id=${product.id}" onclick="event.stopPropagation();">
          <h3 class="showcase-title">${product.name}</h3>
        </a>
        <div class="showcase-rating">
          ${generateStarRating(product.rating)}
        </div>
        <div class="price-box">
          ${hasDiscount ? `<del>R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</del>` : ''}
          <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>
    </div>
  `;
}

// Função para gerar avaliação em estrelas
function generateStarRating(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<ion-icon name="star"></ion-icon>';
  }
  
  if (hasHalfStar) {
    stars += '<ion-icon name="star-half"></ion-icon>';
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<ion-icon name="star-outline"></ion-icon>';
  }
  
  return stars;
}

// Função para carregar produtos relacionados
function loadRelatedProducts() {
  // Verifica se o banco de dados está disponível
  if (typeof DB === 'undefined' || typeof productsDB === 'undefined') {
    console.error('Banco de dados não carregado.');
    return;
  }
  
  const currentProductId = getURLParameter('id');
  const currentProduct = DB.getProductById(currentProductId);
  
  let relatedProducts = [];
  
  if (currentProduct) {
    // Buscar produtos da mesma categoria
    relatedProducts = DB.getProductsByCategory(currentProduct.category)
      .filter(product => product.id !== currentProductId)
      .slice(0, 3);
    
    // Se não houver produtos suficientes da mesma categoria, adicionar produtos aleatórios
    if (relatedProducts.length < 3) {
      const additionalProducts = DB.getAllProducts()
        .filter(product => product.id !== currentProductId && 
                !relatedProducts.some(rp => rp.id === product.id))
        .slice(0, 3 - relatedProducts.length);
      
      relatedProducts = [...relatedProducts, ...additionalProducts];
    }
  } else {
    // Se não encontrar o produto atual, mostrar produtos aleatórios
    relatedProducts = DB.getAllProducts().slice(0, 3);
  }
  
  // Atualizar a seção de produtos relacionados
  const relatedGrid = document.querySelector('.related-grid');
  if (relatedGrid && relatedProducts.length > 0) {
    relatedGrid.innerHTML = '';
    relatedProducts.forEach(product => {
      relatedGrid.innerHTML += createRelatedProductCard(product);
    });
  }
}

// Carregar dados do produto quando a página estiver pronta
document.addEventListener('DOMContentLoaded', function() {
  loadProductData();
  // Aguardar um pouco para garantir que o produto principal foi carregado
  setTimeout(loadRelatedProducts, 100);
});