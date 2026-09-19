/* ============================================================
   APP.JS – Timeless Watches
   ============================================================ */

// ── INR Formatter ────────────────────────────────────────────
const INR = n => '₹' + Number(n).toLocaleString('en-IN');

// ── Products (10 items – deleted patek & IWC replaced) ───────
const PRODUCTS = [
  {
    id: 1, name: 'Submariner Date', brand: 'Rolex',
    category: 'luxury', price: 1050000, oldPrice: null,
    rating: 5, reviews: 142, badge: 'bestseller',
    img: 'images/rolex-submariner.jpg',
    specs: { Movement: 'Automatic', Case: '41mm Steel', Water: '300m', Glass: 'Sapphire' }
  },
  {
    id: 2, name: 'Speedmaster Pro', brand: 'Omega',
    category: 'luxury', price: 570000, oldPrice: 630000,
    rating: 5, reviews: 98, badge: 'sale',
    img: 'images/omega-speedmaster.jpg',
    specs: { Movement: 'Manual Wind', Case: '42mm Steel', Chronograph: 'Yes', Glass: 'Hesalite' }
  },
  {
    id: 3, name: 'Aquaracer 300M', brand: 'TAG Heuer',
    category: 'sport', price: 185000, oldPrice: null,
    rating: 4, reviews: 76, badge: 'new',
    img: 'images/tag-heuer.jpg',
    specs: { Movement: 'Quartz', Case: '43mm Steel', Water: '300m', Glass: 'Sapphire' }
  },
  {
    id: 4, name: 'Superocean II', brand: 'Breitling',
    category: 'sport', price: 378000, oldPrice: 436000,
    rating: 4, reviews: 61, badge: 'sale',
    img: 'images/breitling-superocean.jpg',
    specs: { Movement: 'Automatic', Case: '44mm Steel', Water: '1000m', Glass: 'Sapphire' }
  },
  {
    id: 5, name: 'Presage Cocktail', brand: 'Seiko',
    category: 'classic', price: 37800, oldPrice: null,
    rating: 4, reviews: 210, badge: 'new',
    img: 'images/seiko-presage.jpg',
    specs: { Movement: 'Automatic', Case: '40.5mm Steel', Water: '50m', Glass: 'Hardlex' }
  },
  {
    id: 6, name: 'Galaxy Watch Ultra', brand: 'Samsung',
    category: 'smart', price: 54600, oldPrice: 63000,
    rating: 4, reviews: 155, badge: 'sale',
    img: 'images/samsung-galaxy.jpg',
    specs: { OS: 'Wear OS', Case: '47mm Titanium', Battery: '590mAh', GPS: 'Multi-band' }
  },
  {
    id: 7, name: 'Apple Watch Series 10', brand: 'Apple',
    category: 'smart', price: 67100, oldPrice: null,
    rating: 5, reviews: 430, badge: 'new',
    img: 'images/apple-watch.jpg',
    specs: { OS: 'watchOS', Case: '46mm Aluminium', Battery: '18hr', Health: 'ECG + SpO2' }
  },
  {
    id: 8, name: 'Big Bang Unico', brand: 'Hublot',
    category: 'sport', price: 1554000, oldPrice: 1680000,
    rating: 5, reviews: 47, badge: 'sale',
    img: 'images/hublot-bigbang.jpg',
    specs: { Movement: 'UNICO HUB1242', Case: '42mm Carbon', Water: '100m', Glass: 'Sapphire' }
  },
  {
    id: 9, name: 'Reverso Classic', brand: 'Jaeger',
    category: 'classic', price: 655000, oldPrice: null,
    rating: 4, reviews: 28, badge: null,
    img: 'images/jaeger-reverso.jpg',
    specs: { Movement: 'Manual Wind', Case: '38.8×23.8mm Steel', Water: '30m', Glass: 'Sapphire' }
  },
  {
    id: 10, name: 'Navitimer B01', brand: 'Breitling',
    category: 'luxury', price: 747600, oldPrice: null,
    rating: 5, reviews: 62, badge: 'new',
    img: 'images/breitling-navitimer.jpg',
    specs: { Movement: 'B01 Chronograph', Case: '43mm Steel', Water: '30m', Glass: 'Sapphire' }
  }
];

// ── State ─────────────────────────────────────────────────────
let cart          = JSON.parse(localStorage.getItem('tw_cart') || '[]');
let wishlist      = JSON.parse(localStorage.getItem('tw_wishlist') || '[]');
let activeFilter  = 'all';
let searchQuery   = '';
let saleOnly      = false;

// ── DOM shortcuts ─────────────────────────────────────────────
const $id = id => document.getElementById(id);

// ── Wait for DOM ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', _init);

function _init() {
  initNavAuth();
  renderProducts();
  updateCartBadge();
  renderCartSidebar();
}

// ============================================================
//  AUTH – read session and render navbar
// ============================================================
function getSession() {
  try {
    return JSON.parse(
      localStorage.getItem('tw_session') || sessionStorage.getItem('tw_session') || 'null'
    );
  } catch(e) { return null; }
}

function initNavAuth() {
  const sess = getSession();
  const loginBtn  = $id('loginNavBtn');
  const userMenu  = $id('userNavMenu');
  const userName  = $id('userNavName');
  const userEmail = $id('userNavEmail');

  if (sess && sess.loggedIn) {
    if (loginBtn)  loginBtn.style.display  = 'none';
    if (userMenu)  { userMenu.style.cssText = 'display:flex!important;align-items:center;'; }
    if (userName)  userName.textContent  = sess.name;
    if (userEmail) userEmail.textContent = sess.email;
  } else {
    if (loginBtn) loginBtn.style.display = '';
    if (userMenu) userMenu.style.display = 'none';
  }
}

function logout() {
  localStorage.removeItem('tw_session');
  sessionStorage.removeItem('tw_session');
  cart = []; saveCart();
  window.location.reload();
  return false;
}

// ============================================================
//  RENDER PRODUCTS
// ============================================================
function renderProducts() {
  const grid      = $id('productsGrid');
  const noResults = $id('noResults');

  const filtered = PRODUCTS.filter(p => {
    const matchCat    = activeFilter === 'all' || p.category === activeFilter;
    const q           = searchQuery.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    return matchCat && matchSearch && (!saleOnly || p.oldPrice);
  });

  if (!filtered.length) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  grid.innerHTML = filtered.map(p => {
    const stars     = '★'.repeat(p.rating) + '☆'.repeat(5 - p.rating);
    const inCart    = cart.some(c => c.id === p.id);
    const inWish    = wishlist.includes(p.id);
    const discount  = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

    const badgeMap  = { sale:'badge-sale', new:'badge-new', bestseller:'badge-best' };
    const badgeLabel= { sale:'SALE', new:'NEW', bestseller:'⭐ BEST' };
    const badgeHTML = p.badge
      ? `<span class="badge ${badgeMap[p.badge]} position-absolute top-0 start-0 m-2 px-2 py-1 rounded">${badgeLabel[p.badge]}</span>`
      : '';
    const oldPrHTML = p.oldPrice
      ? `<span class="product-old-price ms-2">${INR(p.oldPrice)}</span>`
      : '';
    const discHTML  = discount
      ? `<span class="discount-badge ms-1">-${discount}%</span>`
      : '';

    return `
    <div class="col-sm-6 col-lg-4 col-xl-3">
      <div class="product-card">
        <div class="product-img-wrap">
          <img src="${p.img}" alt="${p.name}" class="product-img"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="product-img-fallback" style="display:none;"><i class="bi bi-watch"></i></div>
          ${badgeHTML}
          <div class="product-overlay">
            <button class="btn-quick-view" onclick="openQuickView(${p.id})">
              <i class="bi bi-eye me-1"></i>Quick View
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="product-brand">${p.brand}</div>
          <div class="product-name">${p.name}</div>
          <div class="star-rating mb-2">${stars} <small style="color:var(--text-muted)">(${p.reviews})</small></div>
          <div class="d-flex align-items-center flex-wrap mb-3">
            <span class="product-price">${INR(p.price)}</span>
            ${oldPrHTML}${discHTML}
          </div>
          <div class="d-flex gap-2">
            <button class="btn-add-cart ${inCart?'in-cart':''}" id="addBtn-${p.id}" onclick="addToCart(${p.id})">
              <i class="bi bi-bag-plus me-1"></i>${inCart ? 'Added ✓' : 'Add to Cart'}
            </button>
            <button class="btn-buy-now" onclick="buyNow(${p.id})">
              <i class="bi bi-lightning-charge"></i>
            </button>
            <button class="btn-wish ${inWish?'active':''}" id="wishBtn-${p.id}" onclick="toggleWish(${p.id})">
              <i class="bi ${inWish?'bi-heart-fill':'bi-heart'}"></i>
            </button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ============================================================
//  FILTERS & SEARCH
// ============================================================
$id('filterBtns').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter  = btn.dataset.filter;
  searchQuery   = '';
  saleOnly      = false;
  $id('searchInput').value = '';
  renderProducts();
});

function doSearch() {
  searchQuery  = $id('searchInput').value.trim();
  activeFilter = 'all';
  saleOnly = false;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-filter="all"]').classList.add('active');
  renderProducts();
}

function selectCategory(category) {
  activeFilter = category;
  searchQuery = '';
  saleOnly = false;
  const input = $id('searchInput');
  if (input) input.value = '';
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });
  renderProducts();
  return true;
}

function selectSale() {
  activeFilter = 'all';
  searchQuery = '';
  saleOnly = true;
  const input = $id('searchInput');
  if (input) input.value = '';
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.filter === 'all'));
  renderProducts();
  document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' });
  return false;
}

function selectBrand(brand) {
  activeFilter = 'all';
  searchQuery = brand;
  saleOnly = false;
  const input = $id('searchInput');
  if (input) input.value = brand;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.filter === 'all'));
  renderProducts();
  document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' });
}

function handleAccountAction(action) {
  const sess = getSession();
  if (!sess || !sess.loggedIn) {
    showToast('info', 'Please <a href="login.html" style="color:var(--accent)">login</a> to access your account.');
    return false;
  }
  if (action === 'wishlist') {
    const count = wishlist.length;
    showToast('info', count ? `You have ${count} item${count === 1 ? '' : 's'} in your wishlist.` : 'Your wishlist is empty.');
  } else if (action === 'orders') {
    showToast('info', 'Your orders will appear here after your first checkout.');
  } else {
    showToast('info', `Profile for ${sess.name} is ready to customize.`);
  }
  return false;
}

function showHelp(topic) {
  showToast('info', `${topic}: our specialists are available at contact@timelesswatches.in.`);
  return true;
}

$id('searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

// ============================================================
//  CART
// ============================================================
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(c => c.id === id);
  existing ? existing.qty++ : cart.push({ ...p, qty: 1 });
  saveCart();
  renderProducts();
  updateCartBadge();
  showToast('success', `<strong>${p.name}</strong> added to cart!`);
}

function buyNow(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  cart = [{ ...p, qty: 1 }];
  saveCart();
  window.location.href = 'buy.html';
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart(); updateCartBadge(); renderCartSidebar(); renderProducts();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart(); updateCartBadge(); renderCartSidebar();
}

function clearCart() {
  cart = []; saveCart(); updateCartBadge(); renderCartSidebar(); renderProducts();
}

function saveCart() { localStorage.setItem('tw_cart', JSON.stringify(cart)); }

function updateCartBadge() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  const el = $id('cart-count');
  el.textContent = total;
  el.style.display = total ? 'inline-flex' : 'none';
}

function renderCartSidebar() {
  const body  = $id('cartBody');
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  $id('cartTotal').textContent = INR(total);

  if (!cart.length) {
    body.innerHTML = `
      <div class="empty-cart">
        <i class="bi bi-bag-x"></i>
        <p>Your cart is empty.<br>Explore our collection!</p>
        <button class="btn-shop" onclick="toggleCart()">Shop Now</button>
      </div>`;
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" class="cart-item-img"
           onerror="this.style.background='var(--navy3)'">
      <div class="flex-grow-1 overflow-hidden">
        <div class="cart-item-brand">${item.brand}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${INR(item.price)}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
          <span class="item-subtotal">${INR(item.price * item.qty)}</span>
        </div>
      </div>
      <button class="btn-remove-item" onclick="removeFromCart(${item.id})">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>`).join('');
}

function toggleCart() {
  $id('cartSidebar').classList.toggle('open');
  $id('cartOverlay').classList.toggle('show');
  renderCartSidebar();
}

function checkout() {
  if (!cart.length) { showToast('error', 'Your cart is empty!'); return; }
  window.location.href = 'buy.html';
}

// ============================================================
//  WISHLIST
// ============================================================
function toggleWish(id) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('info', 'Removed from wishlist.');
  } else {
    wishlist.push(id);
    const p = PRODUCTS.find(x => x.id === id);
    showToast('success', `<i class="bi bi-heart-fill me-1" style="color:#ff4757"></i><strong>${p.name}</strong> added to wishlist!`);
  }
  localStorage.setItem('tw_wishlist', JSON.stringify(wishlist));
  renderProducts();
}

// ============================================================
//  QUICK VIEW MODAL
// ============================================================
function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  $id('qvImg').src        = p.img;
  $id('qvImg').alt        = p.name;
  $id('qvBrand').textContent  = p.brand;
  $id('qvName').textContent   = p.name;
  $id('qvStars').textContent  = '★'.repeat(p.rating) + '☆'.repeat(5 - p.rating);
  $id('qvReviews').textContent= `(${p.reviews} verified reviews)`;
  $id('qvPrice').textContent  = INR(p.price);
  $id('qvOldPrice').textContent = p.oldPrice ? INR(p.oldPrice) : '';
  const disc = p.oldPrice ? Math.round((1-p.price/p.oldPrice)*100) : 0;
  $id('qvDiscount').textContent = disc ? `-${disc}%` : '';
  $id('qvCategory').textContent =
    p.category.charAt(0).toUpperCase() + p.category.slice(1);

  // specs
  $id('qvSpecs').innerHTML = Object.entries(p.specs).map(([k,v]) => `
    <div class="qv-spec-item">
      <span>${k}</span><span>${v}</span>
    </div>`).join('');

  $id('qvAddCart').onclick = () => {
    addToCart(p.id);
    bootstrap.Modal.getInstance($id('quickViewModal')).hide();
  };

  new bootstrap.Modal($id('quickViewModal')).show();
}

// ============================================================
//  TOAST
// ============================================================
let toastTimer;
function showToast(type, msg) {
  const icons = { success:'check-circle-fill', error:'x-circle-fill', info:'info-circle-fill' };
  const colors= { success:'var(--accent)', error:'var(--danger)', info:'var(--blue-light)' };
  const container = $id('toastContainer');

  const el = document.createElement('div');
  el.className = 'custom-toast show-toast';
  el.innerHTML = `
    <i class="bi bi-${icons[type]||icons.info} toast-icon" style="color:${colors[type]||colors.info}"></i>
    <span>${msg}</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--text-muted);margin-left:auto;cursor:pointer;padding:0 4px;font-size:1rem;">×</button>`;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ============================================================
//  NEWSLETTER & CONTACT
// ============================================================
function subscribeNewsletter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value.trim().toLowerCase();
  const subscribers = JSON.parse(localStorage.getItem('tw_subscribers') || '[]');
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    localStorage.setItem('tw_subscribers', JSON.stringify(subscribers));
  }
  showToast('success', 'Subscribed successfully! Welcome aboard 🎉');
  e.target.reset();
}
function submitContact(e) {
  e.preventDefault();
  showToast('success', 'Message sent! We\'ll get back to you within 24 hours.');
  e.target.reset();
}

// ============================================================
//  COUNTER ANIMATION
// ============================================================
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = +el.dataset.target;
    let cur = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = cur.toLocaleString('en-IN') + '+';
      if (cur >= target) clearInterval(t);
    }, 22);
  });
}
const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { animateCounters(); statsObserver.disconnect(); }
}, { threshold: 0.4 });
const statsEl = document.querySelector('.stats-bar');
if (statsEl) statsObserver.observe(statsEl);

// ============================================================
//  NAVBAR SCROLL EFFECT
// ============================================================
window.addEventListener('scroll', () => {
  document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 50);
  $id('backToTop')?.classList.toggle('show', window.scrollY > 400);
});

// ============================================================
//  INIT
// ============================================================
// Initial setup is handled by _init() on DOMContentLoaded.
