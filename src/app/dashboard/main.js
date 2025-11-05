// src/app/dashboard/main.js
const salesEl = document.getElementById('sales');
const stockEl = document.getElementById('stock');
const customersEl = document.getElementById('customers');
const kpiList = document.getElementById('kpi-list');

// ダミーデータ
const data = {
  day:   { sales: 12000, stock: 80, customers: 15, kpi: { sales: 12000, stockRate: 0.8, newCustomers: 2 } },
  week:  { sales: 80000, stock: 70, customers: 90, kpi: { sales: 80000, stockRate: 0.7, newCustomers: 10 } },
  month: { sales: 320000, stock: 60, customers: 350, kpi: { sales: 320000, stockRate: 0.6, newCustomers: 40 } }
};

function render(period) {
  const d = data[period];
  salesEl.textContent = `￥${d.sales.toLocaleString()}`;
  stockEl.textContent = d.stock;
  customersEl.textContent = d.customers;
  kpiList.innerHTML = `
    <li>売上高: ￥${d.kpi.sales.toLocaleString()}</li>
    <li>在庫回転率: ${(d.kpi.stockRate * 100).toFixed(1)}%</li>
    <li>新規顧客数: ${d.kpi.newCustomers}</li>
  `;
}

document.querySelectorAll('.period-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    render(btn.dataset.period);
  });
});

// 初期表示
render('day');
