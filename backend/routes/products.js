const express = require('express');
const router = express.Router();

// Base de datos de productos en memoria
let products = [
  {
    id: 'p1',
    name: 'Camiseta Spider Dark',
    price: 79000,
    category: 'Camisetas',
    img: '/assets/images/LOGO.jpeg',
    desc: 'Camiseta oversized negra con diseño exclusivo MERVIN estilo oscuro. Serigrafía de alta definición en tela 100% algodón de peso medio.',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Destacado',
    featured: true
  },
  {
    id: 'p2',
    name: 'Camiseta The Amazing Spider-Man',
    price: 69000,
    category: 'Camisetas',
    img: '/assets/images/product2.jpg',
    desc: 'Camiseta con estampado inspirado en The Amazing Spider-Man. Algodón suave de peso medio.',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Popular'
  },
  {
    id: 'p3',
    name: 'Camiseta Cristiano Ronaldo',
    price: 75000,
    category: 'Camisetas',
    img: '/assets/images/product3.jpg',
    desc: 'Camiseta con estampado exclusivo del CR7. Serigrafía de alta calidad sobre algodón premium.',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Oferta'
  },
  {
    id: 'p4',
    name: 'Camiseta A Marte Más No Pude',
    price: 61000,
    category: 'Camisetas',
    img: '/assets/images/product4.jpg',
    desc: 'Camiseta tributo a Diomedes Díaz con el diseño "A Marte Más No Pude". Algodón premium.',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

// GET /api/products — Obtener todos los productos
router.get('/', (req, res) => {
  res.json({
    success: true,
    total: products.length,
    products: products
  });
});

// GET /api/products/:id — Obtener producto por ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Producto no encontrado' });
  }
  res.json({ success: true, product });
});

// POST /api/products — Crear un nuevo producto
router.post('/', (req, res) => {
  const { name, price, category, img, desc, sizes, badge, featured } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ success: false, error: 'Campos requeridos: name, price, category' });
  }

  const newProduct = {
    id: 'p' + (Date.now()),
    name,
    price: Number(price),
    category,
    img: img || '/assets/images/LOGO.jpeg',
    desc: desc || '',
    sizes: Array.isArray(sizes) ? sizes : ['S', 'M', 'L', 'XL'],
    badge: badge || '',
    featured: Boolean(featured)
  };

  products.push(newProduct);
  res.status(201).json({ success: true, message: 'Producto creado exitosamente', product: newProduct });
});

// DELETE /api/products/:id — Eliminar un producto
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Producto no encontrado' });
  }
  const deleted = products.splice(index, 1);
  res.json({ success: true, message: 'Producto eliminado', product: deleted[0] });
});

module.exports = router;
