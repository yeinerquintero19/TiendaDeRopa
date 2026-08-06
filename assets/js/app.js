/* ============================================
   MERVIN STORE — JavaScript
   Catálogo dinámico (localStorage) + carrito + panel admin
   ============================================ */

const STORAGE_KEY = 'mervin_products_v5';
const PHONE       = '573008605563';
const PHONE_DISPLAY = '+57 300 860 5563';
const ALL_SIZES   = ['S', 'M', 'L', 'XL', 'XXL'];

const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    name: 'Camiseta Spider Dark',
    price: 79000,
    category: 'Camisetas',
    img: 'assets/images/LOGO.jpeg',
    desc: 'Camiseta oversized negra con diseño exclusivo MERVIN estilo oscuro. Serigrafía de alta definición en tela 100% algodón de peso medio. El estampado no se despega ni desvanece con los lavados.',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Destacado',
    featured: true
  },
  {
    id: 'p2',
    name: 'Camiseta The Amazing Spider-Man',
    price: 69000,
    category: 'Camisetas',
    img: 'assets/images/product2.jpg',
    desc: 'Camiseta con estampado inspirado en The Amazing Spider-Man. Algodón suave de peso medio, edición coleccionable para fans. El estampado mantiene sus colores vibrantes lavado tras lavado.',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Popular'
  },
  {
    id: 'p3',
    name: 'Camiseta Cristiano Ronaldo',
    price: 75000,
    category: 'Camisetas',
    img: 'assets/images/product3.jpg',
    desc: 'Camiseta con estampado exclusivo del CR7. Serigrafía de alta calidad sobre algodón premium, perfecta para los fanáticos del fútbol. Estampado resistente a los lavados.',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Oferta'
  },
  {
    id: 'p4',
    name: 'Camiseta A Marte Más No Pude',
    price: 61000,
    category: 'Camisetas',
    img: 'assets/images/product4.jpg',
    desc: 'Camiseta tributo a Diomedes Díaz con el diseño "A Marte Más No Pude". Algodón premium con serigrafía de alta definición, ideal para los amantes de la música vallenata.',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

document.addEventListener('DOMContentLoaded', () => {

  /* ---- STORAGE HELPERS ---- */
  function getProducts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { /* ignore */ }
    return JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  }
  function saveProducts(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  let products = getProducts();
  let cart = [];
  let currentCat = 'all';

  /* ---- PRELOADER ---- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 1500);
  });
  setTimeout(() => preloader.classList.add('hidden'), 2800);

  /* ---- NAVBAR ---- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  const navLogo = document.getElementById('navLogo');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLogo.addEventListener('click', () => {
    document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
  });

  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allNavLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => observer.observe(s));

  /* ---- FORMAT ---- */
  function formatPrice(n) {
    return '$' + Number(n).toLocaleString('es-CO');
  }

  /* ---- CATALOG RENDER ---- */
  const productsGrid = document.getElementById('productsGrid');
  const categoriesGrid = document.getElementById('categoriesGrid');
  const productCounter = document.getElementById('productCounter');
  const catalogEmpty = document.getElementById('catalogEmpty');

  function badgeClass(badge) {
    if (badge === 'Destacado') return 'featured';
    if (badge === 'Oferta') return 'sale';
    if (badge === 'Popular') return 'new';
    return '';
  }

  function productCardHTML(p) {
    const avail = ALL_SIZES.map(s => p.sizes.includes(s));
    const sizesHtml = ALL_SIZES.map((s, i) => {
      if (!avail[i]) {
        return `<button class="size-btn unavailable" disabled>${s}</button>`;
      }
      return `<button class="size-btn" data-size="${s}">${s}</button>`;
    }).join('');

    const badgeHtml = p.badge
      ? `<div class="product-badge ${badgeClass(p.badge)}">${p.badge}</div>`
      : '';

    const imgHtml = p.img
      ? `<img src="${p.img}" alt="${p.name}" class="product-img" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />`
      : '';

    return `
      <article class="product-card ${p.featured ? 'featured' : ''}" data-id="${p.id}">
        <div class="product-image-wrap">
          ${imgHtml}
          <div class="product-img-placeholder" style="${p.img ? 'display:none;' : ''}">
            <div class="placeholder-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.8">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              <span style="font-size:0.66rem;letter-spacing:0.2em;text-transform:uppercase;">MERVIN STORE</span>
            </div>
          </div>
          <div class="product-overlay">
            <button class="btn-quick-view" data-id="${p.id}">Vista Rápida</button>
          </div>
          ${badgeHtml}
          <button class="btn-wishlist" aria-label="Favorito">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </button>
        </div>
        <div class="product-info">
          <div class="product-meta">
            <span class="product-category">${p.category}</span>
            <div class="product-stock in-stock">
              <span class="stock-dot"></span>
              <span>Disponible</span>
            </div>
          </div>
          <h3 class="product-name" data-id="${p.id}">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="product-sizes">
            <span class="size-label">Talla:</span>
            <div class="sizes-row">${sizesHtml}</div>
          </div>
          <div class="product-footer">
            <div class="product-price">
              <span class="price-current">${formatPrice(p.price)}</span>
            </div>
            <button class="btn-add-cart" data-id="${p.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              Agregar
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderCategories() {
    const cats = ['all', ...new Set(products.map(p => p.category))];
    categoriesGrid.innerHTML = cats.map(c => {
      const label = c === 'all' ? 'Todos' : c;
      return `<button class="cat-btn ${currentCat === c ? 'active' : ''}" data-cat="${c}">${label}</button>`;
    }).join('');
  }

  function renderCatalog() {
    renderCategories();
    const filtered = currentCat === 'all'
      ? products
      : products.filter(p => p.category === currentCat);

    productCounter.textContent = `${filtered.length} ${filtered.length === 1 ? 'prenda' : 'prendas'}`;

    if (filtered.length === 0) {
      productsGrid.innerHTML = '';
      catalogEmpty.style.display = 'block';
      return;
    }
    catalogEmpty.style.display = 'none';
    productsGrid.innerHTML = filtered.map(productCardHTML).join('');
  }

  /* ---- CATEGORY FILTER (delegación) ---- */
  categoriesGrid.addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    currentCat = btn.dataset.cat;
    renderCatalog();
  });

  /* ---- PRODUCT GRID INTERACTIONS (delegación) ---- */
  productsGrid.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (!card) return;
    const id = card.dataset.id;

    // size selection
    const sizeBtn = e.target.closest('.size-btn:not(.unavailable)');
    if (sizeBtn) {
      card.querySelectorAll('.size-btn:not(.unavailable)').forEach(b => b.classList.remove('selected'));
      sizeBtn.classList.add('selected');
      card.dataset.selectedSize = sizeBtn.dataset.size;
      return;
    }

    // wishlist
    if (e.target.closest('.btn-wishlist')) {
      const btn = e.target.closest('.btn-wishlist');
      btn.classList.toggle('active');
      if (btn.classList.contains('active')) showToast('Añadido a tus favoritos');
      return;
    }

    // quick view
    if (e.target.closest('.btn-quick-view')) {
      openModal(e.target.closest('.btn-quick-view').dataset.id);
      return;
    }

    // product name
    if (e.target.closest('.product-name')) {
      openModal(e.target.closest('.product-name').dataset.id);
      return;
    }

    // add to cart
    if (e.target.closest('.btn-add-cart')) {
      addToCart(card);
    }
  });

  function addToCart(card) {
    const id = card.dataset.id;
    const p = products.find(x => x.id === id);
    if (!p) return;

    const size = card.dataset.selectedSize;
    if (!size) {
      showToast('Selecciona una talla primero');
      card.querySelector('.sizes-row').style.animation = 'none';
      card.querySelector('.sizes-row').offsetHeight;
      card.querySelector('.sizes-row').style.animation = 'shake 0.4s ease';
      return;
    }

    const existing = cart.find(i => i.id === id && i.size === size);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name: p.name, price: p.price, size, qty: 1, img: p.img || '' });
    }

    renderCart();
    showToast(`"${p.name}" (${size}) añadido al carrito`);

    const btn = card.querySelector('.btn-add-cart');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Añadido';
    btn.style.background = 'var(--accent)';
    btn.style.color = '#0b0b0f';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.style.color = '';
    }, 1500);
  }

  /* ---- CART ---- */
  const cartBtn     = document.getElementById('cartBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartClose   = document.getElementById('cartClose');
  const cartCount   = document.getElementById('cartCount');
  const cartItems   = document.getElementById('cartItems');
  const cartEmpty   = document.getElementById('cartEmpty');
  const cartFooter  = document.getElementById('cartFooter');
  const cartTotal   = document.getElementById('cartTotalPrice');

  function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  function renderCart() {
    cartCount.textContent = cart.reduce((s, i) => s + i.qty, 0);

    if (cart.length === 0) {
      cartEmpty.style.display = 'flex';
      cartFooter.style.display = 'none';
      cartItems.innerHTML = '';
      cartItems.appendChild(cartEmpty);
      return;
    }

    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'flex';
    cartItems.querySelectorAll('.cart-item').forEach(el => el.remove());

    cart.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-detail">Talla: ${item.size}</div>
          <div class="cart-qty">
            <button class="qty-btn qty-minus" data-idx="${idx}" aria-label="Menos">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn qty-plus" data-idx="${idx}" aria-label="Más">+</button>
          </div>
        </div>
        <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
        <button class="cart-item-remove" data-idx="${idx}" aria-label="Eliminar">✕</button>
      `;
      cartItems.appendChild(div);
    });

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    cartTotal.textContent = formatPrice(total);
  }

  /* Cart quantity + / - (delegación) */
  cartItems.addEventListener('click', e => {
    const minus  = e.target.closest('.qty-minus');
    const plus   = e.target.closest('.qty-plus');
    const remove = e.target.closest('.cart-item-remove');

    if (minus) {
      const idx = parseInt(minus.dataset.idx);
      if (cart[idx].qty > 1) {
        cart[idx].qty--;
      } else {
        cart.splice(idx, 1);
      }
      renderCart();
    } else if (plus) {
      const idx = parseInt(plus.dataset.idx);
      cart[idx].qty++;
      renderCart();
    } else if (remove) {
      cart.splice(parseInt(remove.dataset.idx), 1);
      renderCart();
    }
  });

  document.getElementById('cartWhatsAppBtn').addEventListener('click', () => {
    let msg = `¡Hola MERVIN STORE! Quiero hacer el siguiente pedido:\n\n`;
    cart.forEach((item, i) => {
      msg += `${i + 1}. ${item.name} (Talla ${item.size}) x${item.qty} = ${formatPrice(item.price * item.qty)}\n`;
    });
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    msg += `\nTotal a pagar: ${formatPrice(total)}\n\n¿Me confirmas disponibilidad y envío? ¡Gracias!`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  });

  /* ---- QUICK VIEW MODAL ---- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalClose   = document.getElementById('modalClose');

  function openModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    const imgHtml = p.img
      ? `<img src="${p.img}" alt="${p.name}" />`
      : `<div class="product-img-placeholder" style="height:100%;"></div>`;

    const sizesHtml = ALL_SIZES.map(size => {
      const unavail = !p.sizes.includes(size);
      return `<button class="size-btn modal-size-btn ${unavail ? 'unavailable' : ''}" ${unavail ? 'disabled' : ''} data-size="${size}">${size}</button>`;
    }).join('');

    modalContent.innerHTML = `
      <div class="modal-img-side">${imgHtml}</div>
      <div class="modal-info-side">
        <span class="modal-category">${p.category}</span>
        <h3 class="modal-name">${p.name}</h3>
        <div class="modal-price">${formatPrice(p.price)}</div>
        <div class="modal-stock">
          <div class="product-stock in-stock">
            <span class="stock-dot"></span>
            <span>Disponible · Pregunta por la tuya</span>
          </div>
        </div>
        <p class="modal-desc">${p.desc}</p>
        <div class="modal-sizes-label">Selecciona tu talla:</div>
        <div class="modal-sizes">${sizesHtml}</div>
        <button class="btn-primary full-width btn-modal-add" data-id="${p.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          Agregar al carrito
        </button>
        <a href="https://wa.me/${PHONE}?text=Hola%20MERVIN%20STORE!%20Me%20interesa%20${encodeURIComponent(p.name)}%20-%20${formatPrice(p.price)}%20(${encodeURIComponent(p.img || '')})" target="_blank" class="btn-whatsapp" style="margin-top:12px;justify-content:center;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Consultar por WhatsApp
        </a>
      </div>
    `;

    let modalSelectedSize = null;
    modalContent.querySelectorAll('.modal-size-btn:not(.unavailable)').forEach(btn => {
      btn.addEventListener('click', () => {
        modalContent.querySelectorAll('.modal-size-btn:not(.unavailable)').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        modalSelectedSize = btn.dataset.size;
      });
    });

    const modalAddBtn = modalContent.querySelector('.btn-modal-add');
    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', () => {
        if (!modalSelectedSize) {
          showToast('Selecciona una talla primero');
          return;
        }
        const existing = cart.find(i => i.id === p.id && i.size === modalSelectedSize);
        if (existing) {
          existing.qty++;
        } else {
          cart.push({ id: p.id, name: p.name, price: p.price, size: modalSelectedSize, qty: 1, img: p.img || '' });
        }
        renderCart();
        showToast(`"${p.name}" (${modalSelectedSize}) añadido al carrito`);
        closeModal();
        openCart();
      });
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

  /* ---- ADMIN PANEL ---- */
  const adminOverlay = document.getElementById('adminOverlay');
  const adminClose   = document.getElementById('adminClose');
  const adminList    = document.getElementById('adminList');
  const adminCount   = document.getElementById('adminCount');
  const adminForm    = document.getElementById('adminForm');

  let adminImageData = '';

  document.getElementById('adminBtn').addEventListener('click', () => {
    renderAdminList();
    adminOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  function closeAdmin() {
    adminOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  adminClose.addEventListener('click', closeAdmin);
  adminOverlay.addEventListener('click', e => { if (e.target === adminOverlay) closeAdmin(); });

  // size picker toggling
  document.getElementById('aSizes').addEventListener('click', e => {
    const btn = e.target.closest('.size-pick');
    if (btn) btn.classList.toggle('active');
  });

  // image preview
  const aImageFile = document.getElementById('aImageFile');
  const aImageUrl  = document.getElementById('aImageUrl');
  const aImagePreview = document.getElementById('aImagePreview');
  aImageFile.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      adminImageData = reader.result;
      aImageUrl.value = '';
      aImagePreview.innerHTML = `<img src="${adminImageData}" alt="Vista previa" />`;
      aImagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });
  aImageUrl.addEventListener('input', () => {
    if (aImageUrl.value.trim()) {
      adminImageData = aImageUrl.value.trim();
      aImagePreview.innerHTML = `<img src="${adminImageData}" alt="Vista previa" onerror="this.parentElement.style.display='none';" />`;
      aImagePreview.style.display = 'block';
    }
  });

  function renderAdminList() {
    adminCount.textContent = products.length;
    if (products.length === 0) {
      adminList.innerHTML = '<p style="color:var(--dim);font-size:0.85rem;">No hay productos. Agrega el primero.</p>';
      return;
    }
    adminList.innerHTML = products.map(p => `
      <div class="admin-list-item" data-id="${p.id}">
        <div class="admin-list-thumb">
          ${p.img
            ? `<img src="${p.img}" alt="" onerror="this.style.display='none';" />`
            : `<div class="product-img-placeholder"></div>`}
        </div>
        <div class="admin-list-info">
          <strong>${p.name}</strong>
          <span>${p.category} · ${formatPrice(p.price)}</span>
        </div>
        <button class="btn-delete" data-id="${p.id}" aria-label="Eliminar">✕</button>
      </div>
    `).join('');
  }

  adminList.addEventListener('click', e => {
    const btn = e.target.closest('.btn-delete');
    if (!btn) return;
    const id = btn.dataset.id;
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    cart = cart.filter(i => products.some(p => p.id === i.id));
    renderAdminList();
    renderCatalog();
    renderCart();
    showToast('Producto eliminado');
  });

  adminForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('aName').value.trim();
    const price = parseFloat(document.getElementById('aPrice').value);
    const category = document.getElementById('aCategory').value;
    const desc = document.getElementById('aDesc').value.trim() || 'Prenda con diseño exclusivo MERVIN. Alta calidad y gran acabado.';
    const sizes = [...document.querySelectorAll('#aSizes .size-pick.active')].map(b => b.dataset.size);

    if (!name || isNaN(price) || sizes.length === 0) {
      showToast('Completa nombre, precio y al menos una talla');
      return;
    }

    const badge = document.getElementById('aBadge').value;

    products.unshift({
      id: 'p' + Date.now(),
      name,
      price,
      category,
      desc,
      sizes,
      img: adminImageData || '',
      badge: badge === 'none' ? '' : badge
    });
    saveProducts(products);
    renderAdminList();
    renderCatalog();
    adminForm.reset();
    adminImageData = '';
    aImagePreview.style.display = 'none';
    aImagePreview.innerHTML = '';
    document.querySelectorAll('#aSizes .size-pick').forEach(b => b.classList.add('active'));
    showToast('Producto agregado al catálogo');
  });

  document.getElementById('adminReset').addEventListener('click', () => {
    products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    saveProducts(products);
    cart = [];
    renderAdminList();
    renderCatalog();
    renderCart();
    showToast('Catálogo restablecido');
  });

  /* ---- TOAST ---- */
  const toast = document.getElementById('toast');
  let toastTimeout;
  function showToast(msg) {
    clearTimeout(toastTimeout);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ---- NEWSLETTER ---- */
  document.getElementById('newsletterForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    if (email) {
      showToast('Suscrito exitosamente. ¡Bienvenido!');
      e.target.reset();
    }
  });

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        navLinks.classList.remove('open');
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---- SCROLL REVEAL ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.feature-item, .about-content-side, .about-image-side').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(26px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `.revealed { opacity: 1 !important; transform: none !important; } @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`;
  document.head.appendChild(style);

  /* ---- INIT ---- */
  renderCatalog();
  renderCart();
});
