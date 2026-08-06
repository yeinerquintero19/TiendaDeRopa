// Vercel Serverless Function — Backend API for MERVIN STORE products

const PRODUCTS = [
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

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      total: PRODUCTS.length,
      products: PRODUCTS
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
