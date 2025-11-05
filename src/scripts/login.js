/**
 * ログイン画面
 * 
 * 機能:
 * - ユーザー認証
 * - デモアカウント自動入力
 * - パスワード表示/非表示切り替え
 * - ログイン状態管理
 * - エラーハンドリング
 */

// 認証管理クラス
class AuthManager {
    constructor() {
        this.apiBaseUrl = '/api';
        this.sessionKey = 'pos_session';
        this.init();
    }

    init() {
        // 既にログインしている場合はリダイレクト
        if (this.isLoggedIn()) {
            this.redirectToHome();
        }
    }

    // ログイン処理
    async login(userId, password, rememberMe = false) {
        try {
            const loginData = {
                userId: userId.trim(),
                password: password,
                rememberMe: rememberMe
            };

            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // セッション情報保存
                this.saveSession(result.data);
                return { success: true, data: result.data };
            } else {
                return { 
                    success: false, 
                    message: result.message || 'ログインに失敗しました' 
                };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                message: 'ネットワークエラーが発生しました' 
            };
        }
    }

    // デモログイン処理
    async demoLogin(demoUserId, demoPassword) {
        // デモ環境の場合は簡易認証
        const demoUsers = {
            'admin': {
                userId: 'admin',
                userName: '管理者',
                role: 'admin',
                permissions: ['all']
            },
            'manager': {
                userId: 'manager',
                userName: 'マネージャー',
                role: 'manager',
                permissions: ['pos', 'user_view', 'report_view']
            },
            'staff': {
                userId: 'staff',
                userName: 'スタッフ',
                role: 'staff',
                permissions: ['pos']
            }
        };

        if (demoUsers[demoUserId] && demoPassword === '123456') {
            const userData = {
                ...demoUsers[demoUserId],
                token: this.generateDemoToken(),
                loginTime: new Date().toISOString()
            };
            
            this.saveSession(userData);
            return { success: true, data: userData };
        }

        return { success: false, message: 'デモアカウントが無効です' };
    }

    // セッション保存
    saveSession(userData) {
        const sessionData = {
            userId: userData.userId,
            userName: userData.userName,
            role: userData.role,
            permissions: userData.permissions || [],
            token: userData.token,
            loginTime: userData.loginTime || new Date().toISOString()
        };

        localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
    }

    // ログイン状態確認
    isLoggedIn() {
        const sessionData = localStorage.getItem(this.sessionKey);
        return sessionData !== null;
    }

    // ホーム画面へリダイレクト
    redirectToHome() {
        window.location.href = '../home/index.html';
    }

    // デモトークン生成
    generateDemoToken() {
        return 'demo_token_' + Math.random().toString(36).substr(2, 9);
    }
}

// ログイン画面アプリケーション
class LoginApp {
    constructor() {
        this.authManager = new AuthManager();
        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.initPasswordToggle();
        this.setupFormValidation();
    }

    // イベント設定
    bindEvents() {
        // ログインフォーム送信
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // デモログインボタン
        const demoButtons = document.querySelectorAll('.demo-login-btn');
        demoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleDemoLogin(e));
        });

        // パスワードリセット
        const forgotPassword = document.getElementById('forgot-password');
        if (forgotPassword) {
            forgotPassword.addEventListener('click', () => this.showResetModal());
        }

        // リセットモーダル閉じる
        const resetClose = document.getElementById('reset-close');
        if (resetClose) {
            resetClose.addEventListener('click', () => this.hideResetModal());
        }

        // Enter キー処理
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.isSubmitting) {
                const loginBtn = document.getElementById('login-btn');
                if (loginBtn && !loginBtn.disabled) {
                    loginBtn.click();
                }
            }
        });
    }

    // パスワード表示切り替え
    initPasswordToggle() {
        const toggleBtn = document.getElementById('toggle-password');
        const passwordInput = document.getElementById('password');

        if (toggleBtn && passwordInput) {
            toggleBtn.addEventListener('click', () => {
                const isPassword = passwordInput.type === 'password';
                passwordInput.type = isPassword ? 'text' : 'password';
                toggleBtn.textContent = isPassword ? '🙈' : '👁️';
            });
        }
    }

    // フォームバリデーション設定
    setupFormValidation() {
        const userIdInput = document.getElementById('user-id');
        const passwordInput = document.getElementById('password');

        [userIdInput, passwordInput].forEach(input => {
            if (input) {
                input.addEventListener('input', () => this.validateForm());
                input.addEventListener('blur', () => this.validateField(input));
            }
        });
    }

    // フィールドバリデーション
    validateField(input) {
        const value = input.value.trim();
        const fieldName = input.name;

        input.classList.remove('border-red-500', 'border-green-500');

        if (!value) {
            input.classList.add('border-red-500');
            return false;
        } else {
            input.classList.add('border-green-500');
            return true;
        }
    }

    // フォーム全体バリデーション
    validateForm() {
        const userIdInput = document.getElementById('user-id');
        const passwordInput = document.getElementById('password');
        const loginBtn = document.getElementById('login-btn');

        const isValid = userIdInput.value.trim() && passwordInput.value.trim();

        if (loginBtn) {
            loginBtn.disabled = !isValid || this.isSubmitting;
            loginBtn.classList.toggle('opacity-50', !isValid || this.isSubmitting);
        }

        return isValid;
    }

    // ログイン処理
    async handleLogin(e) {
        e.preventDefault();

        if (this.isSubmitting || !this.validateForm()) {
            return;
        }

        const userIdInput = document.getElementById('user-id');
        const passwordInput = document.getElementById('password');
        const rememberMeInput = document.getElementById('remember-me');

        const userId = userIdInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberMeInput.checked;

        this.showLoading(true);
        this.isSubmitting = true;

        try {
            // まずデモログインを試行
            const demoResult = await this.authManager.demoLogin(userId, password);
            
            let result;
            if (demoResult.success) {
                result = demoResult;
            } else {
                // 通常のAPI認証
                result = await this.authManager.login(userId, password, rememberMe);
            }

            if (result.success) {
                this.showMessage('ログインしました', 'success');
                
                // 少し遅延してリダイレクト
                setTimeout(() => {
                    this.authManager.redirectToHome();
                }, 1000);
            } else {
                this.showMessage(result.message, 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('ログイン処理でエラーが発生しました', 'error');
        } finally {
            this.showLoading(false);
            this.isSubmitting = false;
            this.validateForm();
        }
    }

    // デモログイン処理
    async handleDemoLogin(e) {
        const button = e.target;
        const userId = button.dataset.user;
        const password = button.dataset.pass;

        if (!userId || !password) return;

        // フォームに値を設定
        const userIdInput = document.getElementById('user-id');
        const passwordInput = document.getElementById('password');

        if (userIdInput && passwordInput) {
            userIdInput.value = userId;
            passwordInput.value = password;
            
            // ログイン実行
            const loginForm = document.getElementById('login-form');
            if (loginForm) {
                this.handleLogin({ preventDefault: () => {} });
            }
        }
    }

    // ローディング表示
    showLoading(show) {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.toggle('hidden', !show);
            loading.classList.toggle('flex', show);
        }
    }

    // メッセージ表示
    showMessage(message, type = 'error') {
        const messageEl = document.getElementById('message');
        if (!messageEl) return;

        messageEl.textContent = message;
        messageEl.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg z-50 ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`;

        messageEl.classList.remove('hidden');

        // 3秒後に自動非表示
        setTimeout(() => {
            messageEl.classList.add('hidden');
        }, 3000);
    }

    // パスワードリセットモーダル表示
    showResetModal() {
        const modal = document.getElementById('reset-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    }

    // パスワードリセットモーダル非表示
    hideResetModal() {
        const modal = document.getElementById('reset-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', () => {
    new LoginApp();
});

// グローバル関数として公開（必要に応じて）
window.LoginApp = LoginApp;
window.AuthManager = AuthManager;