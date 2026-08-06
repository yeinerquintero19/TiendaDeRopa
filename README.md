# 🛍️ MERVIN STORE — Tienda de Ropa

Aplicación web moderna y rápida para tienda de ropa urbana con catálogo dinámico, carrito de compras integrado a WhatsApp, panel de administración y API backend lista para **Vercel**.

---

## 📁 Estructura del Proyecto

```text
tienda-de-ropa/
├── index.html                    # Página principal de la tienda (HTML5 semántico)
├── vercel.json                   # Configuración para despliegue en Vercel
├── .gitignore                    # Archivos ignorados por Git
├── README.md                     # Documentación general
├── api/                          # Backend Serverless Functions (Node.js)
│   └── products.js               # API REST /api/products para consulta de productos
└── assets/                       # Recursos estáticos organizados
    ├── css/
    │   └── styles.css            # Hoja de estilos con variables CSS y tema oscuro
    ├── js/
    │   └── app.js                # Lógica del catálogo, carrito, administración y localStorage
    └── images/                   # Galería de imágenes y logos
        ├── logo_brand.png
        ├── LOGO.jpeg
        ├── hero_clothing.jpg
        ├── product2.jpg
        ├── product3.jpg
        └── product4.jpg
```

---

## 🚀 Despliegue en Vercel

Este proyecto está 100% optimizado para desplegarse en **Vercel** de dos formas sencillas:

### Opción A: Despliegue automático con GitHub (Recomendado)
1. Ve a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New"** -> **"Project"**.
3. Selecciona el repositorio `yeinerquintero19/TiendaDeRopa`.
4. Deja la configuración por defecto y haz clic en **"Deploy"**.
5. ¡Listo! Tu tienda estará publicada con HTTPS y dominio gratuito de Vercel.

### Opción B: Despliegue desde la consola (Vercel CLI)
```bash
# Instalar Vercel CLI si no lo tienes
npm i -g vercel

# Desplegar directamente
vercel
```

---

## ✨ Características Principales
- 🎨 **Diseño Moderno & Responsivo**: Estilo oscuro con tipografía Syne & Space Grotesk.
- 🛒 **Carrito de Compras con WhatsApp**: Envío directo de pedidos detallados por WhatsApp.
- ⚡ **Backend API en Serverless**: Endpoint `/api/products` funcional en Vercel.
- 🛠️ **Panel de Administración**: Gestión de productos con persistencia en `localStorage`.
