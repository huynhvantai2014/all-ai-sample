// ホーム画面アプリケーション
import { 
    showMessage, 
    escapeHtml,
    formatPrice,
    saveToStorage,
    loadFromStorage 
} from './utils.js';

// ホーム画面アプリケーションクラス
class HomeApp {
    constructor() {
        this.currentUser = null;
        this.systemInfo = null;
        
        this.init();
    }

    /**
     * アプリケーション初期化
     */
    init() {
        this.initElements();
        this.bindEvents();
        this.loadUserInfo();
        this.loadSystemInfo();
        
        console.log('ホーム画面アプリケーションが初期化されました');
    }

    /**
     * DOM要素の初期化
     */
    initElements() {
        this.userNameElement = document.getElementById('user-name');
        this.userRoleElement = document.getElementById('user-role');
        this.todaySalesElement = document.getElementById('today-sales');
        this.todayTransactionsElement = document.getElementById('today-transactions');
        this.stockAlertsElement = document.getElementById('stock-alerts');
        this.logoutModal = document.getElementById('logout-modal');
    }

    /**
     * イベントバインディング
     */
    bindEvents() {
        // メニューカードのナビゲーション
        const menuCards = document.querySelectorAll('[data-navigate]');
        menuCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const destination = e.currentTarget.getAttribute('data-navigate');
                if (destination) {
                    this.navigateTo(destination);
                }
            });
        });

        // ログアウトボタン
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', this.showLogoutModal.bind(this));
        }

        // ログアウトモーダル
        const logoutCancel = document.getElementById('logout-cancel');
        const logoutConfirm = document.getElementById('logout-confirm');
        
        if (logoutCancel) {
            logoutCancel.addEventListener('click', this.hideLogoutModal.bind(this));
        }
        
        if (logoutConfirm) {
            logoutConfirm.addEventListener('click', this.handleLogout.bind(this));
        }

        // モーダル背景クリックで閉じる
        if (this.logoutModal) {
            this.logoutModal.addEventListener('click', (e) => {
                if (e.target === this.logoutModal) {
                    this.hideLogoutModal();
                }
            });
        }

        // キーボードショートカット
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
    }

    /**
     * ユーザー情報読み込み
     */
    loadUserInfo() {
        // ローカルストレージからユーザー情報を取得（デモ用）
        this.currentUser = loadFromStorage('currentUser', {
            id: 'U001',
            name: '田中一郎',
            role: 'admin',
            roleName: '管理者'
        });

        this.updateUserDisplay();
    }

    /**
     * システム情報読み込み
     */
    loadSystemInfo() {
        // システム情報を取得（デモ用）
        this.systemInfo = {
            todaySales: 58420,
            todayTransactions: 127,
            stockAlerts: 8,
            version: '1.0.0',
            lastUpdated: '2025/11/05'
        };

        this.updateSystemInfoDisplay();
    }

    /**
     * ユーザー表示更新
     */
    updateUserDisplay() {
        if (this.userNameElement) {
            this.userNameElement.textContent = escapeHtml(this.currentUser.name);
        }
        if (this.userRoleElement) {
            this.userRoleElement.textContent = escapeHtml(this.currentUser.roleName);
        }
    }

    /**
     * システム情報表示更新
     */
    updateSystemInfoDisplay() {
        if (this.todaySalesElement) {
            this.todaySalesElement.textContent = formatPrice(this.systemInfo.todaySales);
        }
        if (this.todayTransactionsElement) {
            this.todayTransactionsElement.textContent = this.systemInfo.todayTransactions.toLocaleString();
        }
        if (this.stockAlertsElement) {
            this.stockAlertsElement.textContent = `${this.systemInfo.stockAlerts}品目`;
            
            // 在庫アラートの色を設定
            if (this.systemInfo.stockAlerts > 10) {
                this.stockAlertsElement.className = 'text-xl font-bold text-red-600';
            } else if (this.systemInfo.stockAlerts > 5) {
                this.stockAlertsElement.className = 'text-xl font-bold text-yellow-600';
            } else {
                this.stockAlertsElement.className = 'text-xl font-bold text-green-600';
            }
        }
    }

    /**
     * 画面遷移
     * @param {string} destination - 遷移先
     */
    navigateTo(destination) {
        const routes = {
            'pos': '../pos/index.html',
            'user-list': '../user/list/index.html',
            'dashboard': '../dashboard/index.html',
            'login': '../login/index.html'
        };

        const url = routes[destination];
        if (url) {
            // 遷移前に状態を保存
            this.saveNavigationState(destination);
            
            showMessage(`${this.getDestinationName(destination)}に移動しています...`, 'info', 1500);
            
            setTimeout(() => {
                window.location.href = url;
            }, 500);
        } else {
            showMessage(`${destination}は利用できません`, 'warning');
        }
    }

    /**
     * 遷移先名を取得
     * @param {string} destination - 遷移先コード
     * @returns {string} - 遷移先名
     */
    getDestinationName(destination) {
        const names = {
            'pos': 'POSレジ画面',
            'user-list': 'ユーザー一覧',
            'dashboard': 'ダッシュボード',
            'login': 'ログイン画面'
        };
        return names[destination] || destination;
    }

    /**
     * ナビゲーション状態保存
     * @param {string} destination - 遷移先
     */
    saveNavigationState(destination) {
        const navigationState = {
            from: 'home',
            to: destination,
            timestamp: new Date().toISOString(),
            user: this.currentUser
        };
        
        saveToStorage('lastNavigation', navigationState);
    }

    /**
     * ログアウトモーダル表示
     */
    showLogoutModal() {
        if (this.logoutModal) {
            this.logoutModal.classList.remove('hidden');
            this.logoutModal.classList.add('flex');
        }
    }

    /**
     * ログアウトモーダル非表示
     */
    hideLogoutModal() {
        if (this.logoutModal) {
            this.logoutModal.classList.add('hidden');
            this.logoutModal.classList.remove('flex');
        }
    }

    /**
     * ログアウト処理
     */
    handleLogout() {
        this.hideLogoutModal();
        
        // ログアウト処理
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userSession');
        
        showMessage('ログアウトしました', 'success', 2000);
        
        setTimeout(() => {
            this.navigateTo('login');
        }, 1000);
    }

    /**
     * キーボードショートカット処理
     * @param {KeyboardEvent} event - キーボードイベント
     */
    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + 数字キーで画面遷移
        if ((event.ctrlKey || event.metaKey) && !event.shiftKey && !event.altKey) {
            switch (event.key) {
                case '1':
                    event.preventDefault();
                    this.navigateTo('pos');
                    break;
                case '2':
                    event.preventDefault();
                    this.navigateTo('user-list');
                    break;
                case '3':
                    event.preventDefault();
                    this.navigateTo('dashboard');
                    break;
                case 'l':
                case 'L':
                    event.preventDefault();
                    this.showLogoutModal();
                    break;
            }
        }
        
        // Escキーでモーダルを閉じる
        if (event.key === 'Escape') {
            this.hideLogoutModal();
        }
    }

    /**
     * 権限チェック
     * @param {string} feature - 機能名
     * @returns {boolean} - アクセス可能かどうか
     */
    hasPermission(feature) {
        if (!this.currentUser) {
            return false;
        }

        const permissions = {
            'admin': ['pos', 'user-list', 'dashboard', 'settings', 'reports'],
            'manager': ['pos', 'user-list', 'dashboard', 'reports'],
            'staff': ['pos', 'dashboard']
        };

        const userPermissions = permissions[this.currentUser.role] || [];
        return userPermissions.includes(feature);
    }

    /**
     * システム状態更新（定期実行）
     */
    updateSystemStatus() {
        // 5分ごとにシステム情報を更新
        setInterval(() => {
            this.loadSystemInfo();
        }, 5 * 60 * 1000);
    }

    /**
     * 通知表示
     * @param {string} message - 通知メッセージ
     * @param {string} type - 通知タイプ
     */
    showNotification(message, type = 'info') {
        showMessage(message, type, 3000);
    }

    /**
     * ヘルプ表示
     */
    showHelp() {
        const helpText = `
## キーボードショートカット
- Ctrl+1: POSレジ画面
- Ctrl+2: ユーザー一覧
- Ctrl+3: ダッシュボード
- Ctrl+L: ログアウト
- Esc: モーダルを閉じる

## 機能説明
- POSレジ: 商品検索・会計・支払い処理
- ユーザー一覧: ユーザー管理・権限設定
- ダッシュボード: 売上・在庫・KPI表示
        `;
        
        showMessage('ヘルプ情報をコンソールに表示しました', 'info');
        console.log(helpText);
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    window.homeApp = new HomeApp();
    
    // 定期的にシステム状態を更新
    window.homeApp.updateSystemStatus();
});