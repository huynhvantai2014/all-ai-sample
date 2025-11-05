// src/app/pos/main.js
import { ProductManager } from '../../data/products.js';
import { CartManager } from '../../scripts/cart.js';
import { formatPrice } from '../../scripts/utils.js';

const productManager = new ProductManager();
const cartManager = new CartManager();

const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const totalEl = document.getElementById('total');
const pointsEl = document.getElementById('points');
const searchInput = document.getElementById('search');

function renderProducts(products) {
  productList.innerHTML = '';
  products.forEach((p, idx) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center px-3 py-2';
    li.innerHTML = `<span>${p.name} <span class='text-xs text-gray-400'>￥${p.price}</span></span>
      <button class='add-btn bg-blue-500 text-white px-2 py-1 rounded' data-idx='${idx}'>追加</button>`;
    productList.appendChild(li);
  });
}

function renderCart() {
  cartList.innerHTML = '';
  cartManager.cart.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center px-3 py-2';
    li.innerHTML = `<span>${item.name} x${item.qty}</span>
      <div class='flex space-x-1'>
        <button class='qty-btn bg-gray-200 px-2' data-idx='${idx}' data-delta='1'>＋</button>
        <button class='qty-btn bg-gray-200 px-2' data-idx='${idx}' data-delta='-1'>－</button>
        <button class='del-btn bg-red-400 text-white px-2 rounded' data-idx='${idx}'>削除</button>
      </div>`;
    cartList.appendChild(li);
  });
  totalEl.textContent = `合計: ${formatPrice(cartManager.total)}`;
  pointsEl.textContent = `ポイント: ${Math.floor(cartManager.total * 0.01)}`;
}

// 商品検索
searchInput.addEventListener('input', (e) => {
  const q = e.target.value;
  const results = productManager.search(q);
  renderProducts(results);
});

// 商品追加
productList.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-btn')) {
    const idx = e.target.dataset.idx;
    const item = productManager.products[idx];
    cartManager.addItem(item);
    renderCart();
  }
});

// カート数量調整・削除
cartList.addEventListener('click', (e) => {
  const idx = e.target.dataset.idx;
  if (e.target.classList.contains('qty-btn')) {
    const delta = Number(e.target.dataset.delta);
    cartManager.updateQuantity(idx, delta);
    renderCart();
  } else if (e.target.classList.contains('del-btn')) {
    cartManager.removeItem(idx);
    renderCart();
  }
});

// 支払い方法選択（ダミー）
document.querySelectorAll('.pay-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert(`支払い方法: ${btn.dataset.method}`);
  });
});

// 会計・キャンセル（ダミー）
document.getElementById('checkout').addEventListener('click', () => {
  alert('会計処理（ダミー）');
  cartManager.clear();
  renderCart();
});
document.getElementById('cancel').addEventListener('click', () => {
  if (confirm('カートを空にしますか？')) {
    cartManager.clear();
    renderCart();
  }
});

// 初期表示
renderProducts(productManager.products);
renderCart();
