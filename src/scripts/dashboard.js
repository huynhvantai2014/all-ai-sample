// ダッシュボードアプリケーション
import { 
    formatPrice, 
    showMessage, 
    escapeHtml 
} from './utils.js';

// ダッシュボードデータ管理クラス
class DashboardDataManager {
    constructor() {
        this.currentPeriod = 'daily';
        this.mockData = this.generateMockData();
    }

    /**
     * モックデータ生成
     * @returns {Object} - ダッシュボード用のモックデータ
     */
    generateMockData() {
        return {
            daily: {
                sales: {
                    amount: 58420,
                    change: 12.5,
                    data: [
                        { date: '11/01', amount: 45000 },
                        { date: '11/02', amount: 52000 },
                        { date: '11/03', amount: 48000 },
                        { date: '11/04', amount: 63000 },
                        { date: '11/05', amount: 58420 }
                    ]
                },
                stock: {
                    count: 195,
                    status: '品目',
                    lowStock: 8
                },
                customers: {
                    count: 127,
                    newCustomers: 5,
                    change: 8.2
                },
                products: [
                    { name: 'おにぎり', amount: 15600, percentage: 26.7 },
                    { name: 'サンドイッチ', amount: 12200, percentage: 20.9 },
                    { name: 'お茶', amount: 8900, percentage: 15.2 },
                    { name: 'コーヒー', amount: 7800, percentage: 13.4 },
                    { name: 'りんご', amount: 6720, percentage: 11.5 },
                    { name: 'バナナ', amount: 7200, percentage: 12.3 }
                ],
                kpi: {
                    salesPerDay: 58420,
                    itemsPerTransaction: 2.3,
                    stockTurnover: 4.2,
                    newCustomers: 5
                }
            },
            weekly: {
                sales: {
                    amount: 389650,
                    change: 15.8,
                    data: [
                        { date: '第1週', amount: 310000 },
                        { date: '第2週', amount: 325000 },
                        { date: '第3週', amount: 298000 },
                        { date: '第4週', amount: 389650 }
                    ]
                },
                stock: {
                    count: 195,
                    status: '品目',
                    lowStock: 8
                },
                customers: {
                    count: 856,
                    newCustomers: 34,
                    change: 12.4
                },
                products: [
                    { name: 'おにぎり', amount: 103840, percentage: 26.7 },
                    { name: 'サンドイッチ', amount: 81418, percentage: 20.9 },
                    { name: 'お茶', amount: 59227, percentage: 15.2 },
                    { name: 'コーヒー', amount: 52213, percentage: 13.4 },
                    { name: 'りんご', amount: 44810, percentage: 11.5 },
                    { name: 'バナナ', amount: 48142, percentage: 12.3 }
                ],
                kpi: {
                    salesPerDay: 55665,
                    itemsPerTransaction: 2.4,
                    stockTurnover: 4.1,
                    newCustomers: 34
                }
            },
            monthly: {
                sales: {
                    amount: 1678320,
                    change: 8.9,
                    data: [
                        { date: '8月', amount: 1420000 },
                        { date: '9月', amount: 1380000 },
                        { date: '10月', amount: 1540000 },
                        { date: '11月', amount: 1678320 }
                    ]
                },
                stock: {
                    count: 195,
                    status: '品目',
                    lowStock: 8
                },
                customers: {
                    count: 3421,
                    newCustomers: 127,
                    change: 6.8
                },
                products: [
                    { name: 'おにぎり', amount: 448111, percentage: 26.7 },
                    { name: 'サンドイッチ', amount: 350769, percentage: 20.9 },
                    { name: 'お茶', amount: 255105, percentage: 15.2 },
                    { name: 'コーヒー', amount: 224895, percentage: 13.4 },
                    { name: 'りんご', amount: 193007, percentage: 11.5 },
                    { name: 'バナナ', amount: 206433, percentage: 12.3 }
                ],
                kpi: {
                    salesPerDay: 54204,
                    itemsPerTransaction: 2.5,
                    stockTurnover: 3.8,
                    newCustomers: 127
                }
            }
        };
    }

    /**
     * 期間データを取得
     * @param {string} period - 期間（daily, weekly, monthly）
     * @returns {Object} - 期間データ
     */
    getPeriodData(period) {
        return this.mockData[period] || this.mockData.daily;
    }

    /**
     * 現在の期間を設定
     * @param {string} period - 期間
     */
    setCurrentPeriod(period) {
        this.currentPeriod = period;
    }

    /**
     * 現在の期間データを取得
     * @returns {Object} - 現在の期間データ
     */
    getCurrentData() {
        return this.getPeriodData(this.currentPeriod);
    }
}

// ダッシュボードアプリケーションクラス
class DashboardApp {
    constructor() {
        this.dataManager = new DashboardDataManager();
        this.salesChart = null;
        this.productChart = null;
        this.currentPeriod = 'daily';
        
        this.init();
    }

    /**
     * アプリケーション初期化
     */
    init() {
        this.initElements();
        this.bindEvents();
        this.loadDashboardData();
        
        console.log('ダッシュボードアプリケーションが初期化されました');
    }

    /**
     * DOM要素の初期化
     */
    initElements() {
        this.loadingElement = document.getElementById('loading');
        this.periodButtons = document.querySelectorAll('.period-btn');
        
        // サマリー要素
        this.salesAmountElement = document.getElementById('sales-amount');
        this.salesChangeElement = document.getElementById('sales-change');
        this.stockCountElement = document.getElementById('stock-count');
        this.stockStatusElement = document.getElementById('stock-status');
        this.customerCountElement = document.getElementById('customer-count');
        this.customerChangeElement = document.getElementById('customer-change');
        
        // KPI要素
        this.kpiSalesPerDayElement = document.getElementById('kpi-sales-per-day');
        this.kpiItemsPerTransactionElement = document.getElementById('kpi-items-per-transaction');
        this.kpiStockTurnoverElement = document.getElementById('kpi-stock-turnover');
        this.kpiNewCustomersElement = document.getElementById('kpi-new-customers');
        
        // グラフ要素
        this.salesChartCanvas = document.getElementById('sales-chart');
        this.productChartCanvas = document.getElementById('product-chart');
    }

    /**
     * イベントバインディング
     */
    bindEvents() {
        // 戻るボタン
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                showMessage('ホーム画面に戻る機能は未実装です', 'info');
            });
        }

        // 期間選択ボタン
        this.periodButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const period = e.target.dataset.period;
                this.changePeriod(period);
            });
        });
    }

    /**
     * 期間変更
     * @param {string} period - 期間
     */
    changePeriod(period) {
        // アクティブ状態を更新
        this.periodButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.period === period) {
                btn.classList.add('active');
            }
        });

        this.currentPeriod = period;
        this.dataManager.setCurrentPeriod(period);
        this.loadDashboardData();
    }

    /**
     * ダッシュボードデータの読み込み
     */
    loadDashboardData() {
        this.showLoading(true);
        
        // API呼び出しをシミュレート
        setTimeout(() => {
            const data = this.dataManager.getCurrentData();
            this.updateSummaryCards(data);
            this.updateKPIs(data.kpi);
            this.updateCharts(data);
            this.showLoading(false);
        }, 800);
    }

    /**
     * サマリーカード更新
     * @param {Object} data - ダッシュボードデータ
     */
    updateSummaryCards(data) {
        // 売上
        if (this.salesAmountElement) {
            this.salesAmountElement.textContent = formatPrice(data.sales.amount);
        }
        if (this.salesChangeElement) {
            const changeText = data.sales.change >= 0 ? `+${data.sales.change}%` : `${data.sales.change}%`;
            this.salesChangeElement.textContent = `前期比: ${changeText}`;
            this.salesChangeElement.classList.toggle('text-green-600', data.sales.change >= 0);
            this.salesChangeElement.classList.toggle('text-red-600', data.sales.change < 0);
        }

        // 在庫
        if (this.stockCountElement) {
            this.stockCountElement.textContent = data.stock.count.toLocaleString();
        }
        if (this.stockStatusElement) {
            this.stockStatusElement.textContent = `${data.stock.status} (低在庫: ${data.stock.lowStock})`;
        }

        // 顧客数
        if (this.customerCountElement) {
            this.customerCountElement.textContent = data.customers.count.toLocaleString();
        }
        if (this.customerChangeElement) {
            this.customerChangeElement.textContent = `新規: ${data.customers.newCustomers}人`;
        }
    }

    /**
     * KPI更新
     * @param {Object} kpiData - KPIデータ
     */
    updateKPIs(kpiData) {
        if (this.kpiSalesPerDayElement) {
            this.kpiSalesPerDayElement.textContent = formatPrice(kpiData.salesPerDay);
        }
        if (this.kpiItemsPerTransactionElement) {
            this.kpiItemsPerTransactionElement.textContent = kpiData.itemsPerTransaction.toFixed(1);
        }
        if (this.kpiStockTurnoverElement) {
            this.kpiStockTurnoverElement.textContent = kpiData.stockTurnover.toFixed(1);
        }
        if (this.kpiNewCustomersElement) {
            this.kpiNewCustomersElement.textContent = kpiData.newCustomers.toLocaleString();
        }
    }

    /**
     * グラフ更新
     * @param {Object} data - ダッシュボードデータ
     */
    updateCharts(data) {
        this.updateSalesChart(data.sales);
        this.updateProductChart(data.products);
    }

    /**
     * 売上グラフ更新
     * @param {Object} salesData - 売上データ
     */
    updateSalesChart(salesData) {
        if (!this.salesChartCanvas) return;

        // 既存のグラフを破棄
        if (this.salesChart) {
            this.salesChart.destroy();
        }

        const ctx = this.salesChartCanvas.getContext('2d');
        this.salesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: salesData.data.map(item => item.date),
                datasets: [{
                    label: '売上',
                    data: salesData.data.map(item => item.amount),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatPrice(value);
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        });
    }

    /**
     * 商品別売上グラフ更新
     * @param {Array} productsData - 商品データ
     */
    updateProductChart(productsData) {
        if (!this.productChartCanvas) return;

        // 既存のグラフを破棄
        if (this.productChart) {
            this.productChart.destroy();
        }

        const ctx = this.productChartCanvas.getContext('2d');
        this.productChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: productsData.map(item => item.name),
                datasets: [{
                    data: productsData.map(item => item.amount),
                    backgroundColor: [
                        '#3b82f6', // 青
                        '#10b981', // 緑
                        '#f59e0b', // 黄
                        '#ef4444', // 赤
                        '#8b5cf6', // 紫
                        '#06b6d4'  // シアン
                    ],
                    borderWidth: 0,
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const product = productsData[context.dataIndex];
                                return `${product.name}: ${formatPrice(product.amount)} (${product.percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }

    /**
     * ローディング表示
     * @param {boolean} show - 表示するかどうか
     */
    showLoading(show) {
        if (this.loadingElement) {
            this.loadingElement.classList.toggle('hidden', !show);
            this.loadingElement.classList.toggle('flex', show);
        }
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    window.dashboardApp = new DashboardApp();
});