// Banco de Dados de Produtos - Ótica Online
const productsDB = {
  // Óculos de Sol
  'oculos-sol-esportivo': {
    id: 'oculos-sol-esportivo',
    name: 'Óculos de Sol Esportivo Masculino',
    category: 'oculos-sol',
    price: 189.90,
    originalPrice: 249.90,
    discount: 24,
    rating: 4.5,
    reviews: 128,
    description: 'Óculos de sol esportivo masculino com proteção UV400, ideal para atividades ao ar livre. Armação resistente e lentes polarizadas para máximo conforto e proteção.',
    features: [
      'Proteção UV400',
      'Lentes polarizadas',
      'Armação resistente',
      'Design esportivo',
      'Ajuste confortável'
    ],
    images: {
      main: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop&crop=center'
      ]
    },
    inStock: true,
    stockQuantity: 25
  },

  'oculos-sol-feminino-elegante': {
    id: 'oculos-sol-feminino-elegante',
    name: 'Óculos de Sol Feminino Elegante',
    category: 'oculos-sol',
    price: 159.90,
    originalPrice: 199.90,
    discount: 20,
    rating: 4.7,
    reviews: 95,
    description: 'Óculos de sol feminino com design elegante e sofisticado. Armação delicada com proteção UV completa, perfeito para o dia a dia.',
    features: [
      'Proteção UV400',
      'Design elegante',
      'Armação leve',
      'Lentes de qualidade',
      'Estilo feminino'
    ],
    images: {
      main: 'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=400&h=400&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=400&fit=crop&crop=center'
      ]
    },
    inStock: true,
    stockQuantity: 18
  },

  'oculos-sol-polarizado': {
    id: 'oculos-sol-polarizado',
    name: 'Óculos de Sol Polarizado',
    category: 'oculos-sol',
    price: 219.90,
    originalPrice: 289.90,
    discount: 24,
    rating: 4.8,
    reviews: 156,
    description: 'Óculos de sol com lentes polarizadas de alta qualidade. Reduz reflexos e oferece visão cristalina em qualquer condição de luz.',
    features: [
      'Lentes polarizadas premium',
      'Proteção UV400',
      'Redução de reflexos',
      'Visão cristalina',
      'Armação durável'
    ],
    images: {
      main: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=400&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center'
      ]
    },
    inStock: true,
    stockQuantity: 12
  },

  // Óculos de Grau
  'oculos-grau-feminino-elegante': {
    id: 'oculos-grau-feminino-elegante',
    name: 'Óculos de Grau Feminino Elegante',
    category: 'oculos-grau',
    price: 129.90,
    originalPrice: 179.90,
    discount: 28,
    rating: 4.6,
    reviews: 87,
    description: 'Óculos de grau feminino com design moderno e elegante. Armação confortável e resistente, ideal para uso diário.',
    features: [
      'Armação acetato',
      'Design moderno',
      'Conforto superior',
      'Resistente',
      'Estilo feminino'
    ],
    images: {
      main: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center'
      ]
    },
    inStock: true,
    stockQuantity: 22
  },

  'oculos-grau-feminino-moderno': {
    id: 'oculos-grau-feminino-moderno',
    name: 'Óculos de Grau Feminino Moderno',
    category: 'oculos-grau',
    price: 149.90,
    originalPrice: 199.90,
    discount: 25,
    rating: 4.4,
    reviews: 73,
    description: 'Óculos de grau com design contemporâneo e linhas modernas. Perfeito para mulheres que buscam estilo e funcionalidade.',
    features: [
      'Design contemporâneo',
      'Armação leve',
      'Ajuste perfeito',
      'Estilo moderno',
      'Qualidade premium'
    ],
    images: {
      main: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop&crop=center'
      ]
    },
    inStock: true,
    stockQuantity: 15
  },

  'oculos-grau-masculino-classico': {
    id: 'oculos-grau-masculino-classico',
    name: 'Óculos de Grau Masculino Clássico',
    category: 'oculos-grau',
    price: 139.90,
    originalPrice: 189.90,
    discount: 26,
    rating: 4.5,
    reviews: 102,
    description: 'Óculos de grau masculino com design clássico e atemporal. Armação robusta e confortável para uso prolongado.',
    features: [
      'Design clássico',
      'Armação robusta',
      'Conforto prolongado',
      'Estilo masculino',
      'Durabilidade'
    ],
    images: {
      main: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center'
      ]
    },
    inStock: true,
    stockQuantity: 19
  },

  // Armações
  'armacao-premium-titanium': {
    id: 'armacao-premium-titanium',
    name: 'Armação Premium Titanium',
    category: 'armacoes',
    price: 299.90,
    originalPrice: 399.90,
    discount: 25,
    rating: 4.9,
    reviews: 64,
    description: 'Armação premium em titânio, ultra leve e resistente. Design sofisticado para quem busca o melhor em qualidade e estilo.',
    features: [
      'Material titânio',
      'Ultra leve',
      'Resistente à corrosão',
      'Design premium',
      'Hipoalergênico'
    ],
    images: {
      main: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center'
      ]
    },
    inStock: true,
    stockQuantity: 8
  },

  // Lentes de Contato
  'lentes-contato-coloridas': {
    id: 'lentes-contato-coloridas',
    name: 'Lentes de Contato Coloridas',
    category: 'lentes-contato',
    price: 89.90,
    originalPrice: 119.90,
    discount: 25,
    rating: 4.3,
    reviews: 145,
    description: 'Lentes de contato coloridas para transformar seu visual. Disponíveis em diversas cores vibrantes e naturais.',
    features: [
      'Diversas cores',
      'Conforto superior',
      'Uso diário',
      'Material seguro',
      'Fácil aplicação'
    ],
    images: {
      main: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center'
      ]
    },
    inStock: true,
    stockQuantity: 35
  },

  'lentes-contato-multifocais': {
    id: 'lentes-contato-multifocais',
    name: 'Lentes de Contato Multifocais',
    category: 'lentes-contato',
    price: 159.90,
    originalPrice: 219.90,
    discount: 27,
    rating: 4.6,
    reviews: 89,
    description: 'Lentes de contato multifocais para correção de presbiopia. Visão nítida em todas as distâncias com máximo conforto.',
    features: [
      'Correção multifocal',
      'Visão nítida',
      'Conforto prolongado',
      'Tecnologia avançada',
      'Fácil adaptação'
    ],
    images: {
      main: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center'
      ]
    },
    inStock: true,
    stockQuantity: 16
  },

  // Acessórios
  'estojo-oculos-premium': {
    id: 'estojo-oculos-premium',
    name: 'Estojo para Óculos Premium',
    category: 'acessorios',
    price: 39.90,
    originalPrice: 59.90,
    discount: 33,
    rating: 4.4,
    reviews: 78,
    description: 'Estojo premium para proteção dos seus óculos. Material resistente e design elegante para levar seus óculos com segurança.',
    features: [
      'Material resistente',
      'Design elegante',
      'Proteção completa',
      'Compacto',
      'Fecho seguro'
    ],
    images: {
      main: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center'
      ]
    },
    inStock: true,
    stockQuantity: 42
  },

  'cordao-oculos-elegante': {
    id: 'cordao-oculos-elegante',
    name: 'Cordão para Óculos Elegante',
    category: 'acessorios',
    price: 24.90,
    originalPrice: 34.90,
    discount: 29,
    rating: 4.2,
    reviews: 56,
    description: 'Cordão elegante para óculos, prático e estiloso. Mantenha seus óculos sempre seguros e ao alcance das mãos.',
    features: [
      'Design elegante',
      'Material durável',
      'Ajuste universal',
      'Prático',
      'Estiloso'
    ],
    images: {
      main: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center'
      ]
    },
    inStock: true,
    stockQuantity: 28
  }
};

// Categorias de produtos
const categories = {
  'oculos-sol': {
    name: 'Óculos de Sol',
    description: 'Proteção e estilo para seus olhos'
  },
  'oculos-grau': {
    name: 'Óculos de Grau',
    description: 'Visão perfeita com design moderno'
  },
  'armacoes': {
    name: 'Armações',
    description: 'Armações de qualidade premium'
  },
  'lentes-contato': {
    name: 'Lentes de Contato',
    description: 'Conforto e praticidade no seu dia a dia'
  },
  'acessorios': {
    name: 'Acessórios',
    description: 'Complemente seu estilo'
  }
};

// Funções utilitárias para o banco de dados
const DB = {
  // Obter todos os produtos
  getAllProducts: () => {
    return Object.values(productsDB);
  },

  // Obter produto por ID
  getProductById: (id) => {
    return productsDB[id] || null;
  },

  // Obter produtos por categoria
  getProductsByCategory: (category) => {
    return Object.values(productsDB).filter(product => product.category === category);
  },

  // Obter produtos em promoção
  getDiscountedProducts: () => {
    return Object.values(productsDB).filter(product => product.discount > 0);
  },

  // Obter produtos mais bem avaliados
  getTopRatedProducts: (limit = 8) => {
    return Object.values(productsDB)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  },

  // Obter produtos mais vendidos (baseado no número de reviews)
  getBestSellingProducts: (limit = 8) => {
    return Object.values(productsDB)
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, limit);
  },

  // Buscar produtos por nome
  searchProducts: (query) => {
    const searchTerm = query.toLowerCase();
    return Object.values(productsDB).filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  },

  // Obter categorias
  getCategories: () => {
    return categories;
  },

  // Obter produtos em estoque
  getInStockProducts: () => {
    return Object.values(productsDB).filter(product => product.inStock && product.stockQuantity > 0);
  }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.productsDB = productsDB;
  window.DB = DB;
  window.categories = categories;
}