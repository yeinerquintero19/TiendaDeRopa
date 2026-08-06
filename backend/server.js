const express = require('express');
const cors = require('cors');
const path = require('path');

const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir frontend estático
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas de API
app.use('/api/products', productsRouter);

// Endpoint de comprobación (Health check)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'MERVIN STORE Backend API',
    timestamp: new Date().toISOString()
  });
});

// Fallback SPA / Frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Backend MERVIN STORE ejecutándose en http://localhost:${PORT}`);
});

module.exports = app;
