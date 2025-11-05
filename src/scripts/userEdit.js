/**
 * ユーザー編集画面
 * 
 * 機能:
 * - ユーザー情報の編集・更新
 * - パスワード変更
 * - 権限・ロール管理
 * - アバター画像アップロード
 * - ユーザー削除
 * - バリデーション
 */

// ユーザー編集データ管理クラス
class UserEditManager {
    constructor() {
        this.apiBaseUrl = '/api';
        this.currentUser = null;
        this.originalData = null;
        this.permissions = {
            'admin': ['pos', 'user_view', 'user_edit', 'report_view'],
            'manager': ['pos', 'user_view', 'report_view'],
            'staff': ['pos']
        };
    }

    // ユーザー情報取得
    async getUser(userId) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });

            if (response.ok) {
                const result = await response.json();
                this.currentUser = result.data;
                this.originalData = JSON.parse(JSON.stringify(result.data));
                return { success: true, data: result.data };
            } else {
                return { success: false, message: 'ユーザー情報の取得に失敗しました' };
            }
        } catch (error) {
            console.error('Get user error:', error);
            return { success: false, message: 'ネットワークエラーが発生しました' };
        }
    }

    // ユーザー情報更新
    async updateUser(userId, userData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                this.currentUser = { ...this.currentUser, ...userData };
                return { success: true, data: result.data };
            } else {
                return { 
                    success: false, 
                    message: result.message || 'ユーザー情報の更新に失敗しました' 
                };
            }
        } catch (error) {
            console.error('Update user error:', error);
            return { 
                success: false, 
                message: 'ネットワークエラーが発生しました' 
            };
        }
    }

    // ユーザー削除
    async deleteUser(userId) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });

            const result = await response.json();

            if (response.ok && result.success) {
                return { success: true };
            } else {
                return { 
                    success: false, 
                    message: result.message || 'ユーザーの削除に失敗しました' 
                };
            }
        } catch (error) {
            console.error('Delete user error:', error);
            return { 
                success: false, 
                message: 'ネットワークエラーが発生しました' 
            };
        }
    }

    // アバター画像アップロード
    async uploadAvatar(userId, file) {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch(`${this.apiBaseUrl}/user/${userId}/avatar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.success) {
                return { success: true, data: result.data };
            } else {
                return { 
                    success: false, 
                    message: result.message || '画像のアップロードに失敗しました' 
                };
            }
        } catch (error) {
            console.error('Upload avatar error:', error);
            return { 
                success: false, 
                message: 'ネットワークエラーが発生しました' 
            };
        }
    }

    // 認証トークン取得
    getToken() {
        const sessionData = localStorage.getItem('pos_session');
        if (sessionData) {
            const session = JSON.parse(sessionData);
            return session.token;
        }
        return null;
    }

    // デモデータ生成
    generateDemoUser(userId) {
        const demoUsers = {
            'user001': {
                userId: 'user001',
                userName: '田中太郎',
                email: 'tanaka@example.com',
                phone: '090-1234-5678',
                role: 'manager',
                permissions: ['pos', 'user_view', 'report_view'],
                active: true,
                passwordReset: false,
                avatar: null,
                createdAt: '2025-01-01T00:00:00.000Z',
                updatedAt: '2025-01-15T12:00:00.000Z'
            },
            'user002': {
                userId: 'user002',
                userName: '佐藤花子',
                email: 'sato@example.com',
                phone: '080-9876-5432',
                role: 'staff',
                permissions: ['pos'],
                active: true,
                passwordReset: false,
                avatar: null,
                createdAt: '2025-01-05T00:00:00.000Z',
                updatedAt: '2025-01-10T15:30:00.000Z'
            }
        };

        return demoUsers[userId] || null;
    }
}

// ユーザー編集画面アプリケーション
class UserEditApp {
    constructor() {
        this.userManager = new UserEditManager();
        this.isSubmitting = false;
        this.userId = null;
        this.hasChanges = false;
        this.init();
    }

    init() {
        this.getUserIdFromUrl();
        this.bindEvents();
        this.loadUserData();
        this.setupFormValidation();
        this.setupRoleSelection();
        this.setupPasswordToggle();
        this.setupAvatarUpload();
    }

    // URLからユーザーID取得
    getUserIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        this.userId = urlParams.get('id') || 'user001'; // デフォルトでuser001
    }

    // イベント設定
    bindEvents() {
        // 戻るボタン
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.goBack());
        }

        // 保存ボタン
        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.handleSave());
        }

        // キャンセルボタン
        const cancelBtn = document.getElementById('cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.handleCancel());
        }

        // 削除ボタン
        const deleteBtn = document.getElementById('delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.showDeleteModal());
        }

        // 削除確認モーダル
        const deleteCancel = document.getElementById('delete-cancel');
        const deleteConfirm = document.getElementById('delete-confirm');
        
        if (deleteCancel) {
            deleteCancel.addEventListener('click', () => this.hideDeleteModal());
        }
        
        if (deleteConfirm) {
            deleteConfirm.addEventListener('click', () => this.handleDelete());
        }

        // フォーム変更検知
        const form = document.querySelector('form') || document.body;
        form.addEventListener('input', () => this.markAsChanged());
        form.addEventListener('change', () => this.markAsChanged());

        // ページ離脱警告
        window.addEventListener('beforeunload', (e) => {
            if (this.hasChanges) {
                e.preventDefault();
                e.returnValue = '変更が保存されていません。ページを離れますか？';
                return e.returnValue;
            }
        });
    }

    // ユーザーデータ読み込み
    async loadUserData() {
        this.showLoading(true);

        try {
            // デモデータを使用
            const demoUser = this.userManager.generateDemoUser(this.userId);
            
            if (demoUser) {
                this.populateForm(demoUser);
                this.userManager.currentUser = demoUser;
                this.userManager.originalData = JSON.parse(JSON.stringify(demoUser));
            } else {
                // 実際のAPI呼び出し
                const result = await this.userManager.getUser(this.userId);
                
                if (result.success) {
                    this.populateForm(result.data);
                } else {
                    this.showMessage(result.message, 'error');
                }
            }
        } catch (error) {
            console.error('Load user data error:', error);
            this.showMessage('ユーザー情報の読み込みに失敗しました', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    // フォームにデータ設定
    populateForm(userData) {
        // 基本情報
        this.setInputValue('user-id', userData.userId);
        this.setInputValue('user-name', userData.userName);
        this.setInputValue('email', userData.email);
        this.setInputValue('phone', userData.phone);

        // アカウント設定
        this.setCheckboxValue('active', userData.active);
        this.setCheckboxValue('password-reset', userData.passwordReset);

        // ロール設定
        this.setRole(userData.role);

        // 権限設定
        this.setPermissions(userData.permissions || []);

        // アバター
        this.updateAvatar(userData.avatar, userData.userName);

        // 変更フラグリセット
        this.hasChanges = false;
    }

    // 入力値設定
    setInputValue(id, value) {
        const element = document.getElementById(id);
        if (element && value !== undefined && value !== null) {
            element.value = value;
        }
    }

    // チェックボックス値設定
    setCheckboxValue(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.checked = !!value;
        }
    }

    // ロール設定
    setRole(role) {
        const roleCards = document.querySelectorAll('.role-card');
        roleCards.forEach(card => {
            card.classList.remove('selected');
            if (card.dataset.role === role) {
                card.classList.add('selected');
            }
        });

        // ロールに応じた権限を自動設定
        if (this.userManager.permissions[role]) {
            this.setPermissions(this.userManager.permissions[role]);
        }
    }

    // 権限設定
    setPermissions(permissions) {
        const permissionInputs = document.querySelectorAll('input[name="permissions"]');
        permissionInputs.forEach(input => {
            input.checked = permissions.includes(input.value);
        });
    }

    // アバター更新
    updateAvatar(avatarUrl, userName) {
        const avatarText = document.getElementById('avatar-text');
        
        if (avatarUrl) {
            // 画像がある場合は背景画像として設定
            const avatarContainer = avatarText.parentElement;
            avatarContainer.style.backgroundImage = `url(${avatarUrl})`;
            avatarContainer.style.backgroundSize = 'cover';
            avatarContainer.style.backgroundPosition = 'center';
            avatarText.textContent = '';
        } else {
            // 画像がない場合は名前の初文字を表示
            const initial = userName ? userName.charAt(0) : '👤';
            avatarText.textContent = initial;
        }
    }

    // ロール選択設定
    setupRoleSelection() {
        const roleCards = document.querySelectorAll('.role-card');
        roleCards.forEach(card => {
            card.addEventListener('click', () => {
                const role = card.dataset.role;
                this.setRole(role);
                this.markAsChanged();
            });
        });
    }

    // パスワード表示切り替え設定
    setupPasswordToggle() {
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

    // アバターアップロード設定
    setupAvatarUpload() {
        const avatarBtn = document.getElementById('avatar-btn');
        const avatarUpload = document.getElementById('avatar-upload');

        if (avatarBtn && avatarUpload) {
            avatarBtn.addEventListener('click', () => {
                avatarUpload.click();
            });

            avatarUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.handleAvatarUpload(file);
                }
            });
        }
    }

    // アバターアップロード処理
    async handleAvatarUpload(file) {
        // ファイルサイズチェック（2MB制限）
        if (file.size > 2 * 1024 * 1024) {
            this.showMessage('ファイルサイズは2MB以下にしてください', 'error');
            return;
        }

        // ファイル形式チェック
        if (!file.type.startsWith('image/')) {
            this.showMessage('画像ファイルを選択してください', 'error');
            return;
        }

        this.showLoading(true);

        try {
            // プレビュー表示
            const reader = new FileReader();
            reader.onload = (e) => {
                this.updateAvatar(e.target.result, '');
            };
            reader.readAsDataURL(file);

            // 実際のアップロード（デモでは省略）
            // const result = await this.userManager.uploadAvatar(this.userId, file);
            
            this.markAsChanged();
            this.showMessage('画像をアップロードしました', 'success');
        } catch (error) {
            console.error('Avatar upload error:', error);
            this.showMessage('画像のアップロードに失敗しました', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    // フォームバリデーション設定
    setupFormValidation() {
        const requiredFields = ['user-id', 'user-name'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => this.validateForm());
            }
        });

        // パスワード確認
        const password = document.getElementById('password');
        const passwordConfirm = document.getElementById('password-confirm');
        
        if (password && passwordConfirm) {
            [password, passwordConfirm].forEach(field => {
                field.addEventListener('input', () => this.validatePasswords());
            });
        }
    }

    // フィールドバリデーション
    validateField(field) {
        const value = field.value.trim();
        
        field.classList.remove('border-red-500', 'border-green-500');
        
        if (field.required && !value) {
            field.classList.add('border-red-500');
            return false;
        } else if (value) {
            field.classList.add('border-green-500');
        }
        
        return true;
    }

    // パスワードバリデーション
    validatePasswords() {
        const password = document.getElementById('password');
        const passwordConfirm = document.getElementById('password-confirm');
        
        if (!password || !passwordConfirm) return true;
        
        const passwordValue = password.value;
        const confirmValue = passwordConfirm.value;
        
        passwordConfirm.classList.remove('border-red-500', 'border-green-500');
        
        if (passwordValue && confirmValue) {
            if (passwordValue === confirmValue) {
                passwordConfirm.classList.add('border-green-500');
                return true;
            } else {
                passwordConfirm.classList.add('border-red-500');
                return false;
            }
        }
        
        return true;
    }

    // フォーム全体バリデーション
    validateForm() {
        const requiredFields = ['user-id', 'user-name'];
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !this.validateField(field)) {
                isValid = false;
            }
        });
        
        if (!this.validatePasswords()) {
            isValid = false;
        }
        
        // 選択されたロールがあるかチェック
        const selectedRole = document.querySelector('.role-card.selected');
        if (!selectedRole) {
            isValid = false;
        }
        
        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.disabled = !isValid || this.isSubmitting;
        }
        
        return isValid;
    }

    // 変更マーク
    markAsChanged() {
        this.hasChanges = true;
        this.validateForm();
    }

    // 保存処理
    async handleSave() {
        if (!this.validateForm() || this.isSubmitting) {
            return;
        }

        this.isSubmitting = true;
        this.showLoading(true);

        try {
            const formData = this.collectFormData();
            
            // デモ環境では即座に成功
            const result = { success: true };
            
            // const result = await this.userManager.updateUser(this.userId, formData);
            
            if (result.success) {
                this.hasChanges = false;
                this.showMessage('ユーザー情報を保存しました', 'success');
                
                setTimeout(() => {
                    this.goBack();
                }, 1500);
            } else {
                this.showMessage(result.message, 'error');
            }
        } catch (error) {
            console.error('Save error:', error);
            this.showMessage('保存に失敗しました', 'error');
        } finally {
            this.isSubmitting = false;
            this.showLoading(false);
            this.validateForm();
        }
    }

    // フォームデータ収集
    collectFormData() {
        const selectedRole = document.querySelector('.role-card.selected');
        const selectedPermissions = Array.from(
            document.querySelectorAll('input[name="permissions"]:checked')
        ).map(input => input.value);

        const password = document.getElementById('password').value;
        
        const formData = {
            userId: document.getElementById('user-id').value.trim(),
            userName: document.getElementById('user-name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            role: selectedRole ? selectedRole.dataset.role : 'staff',
            permissions: selectedPermissions,
            active: document.getElementById('active').checked,
            passwordReset: document.getElementById('password-reset').checked
        };

        // パスワードが入力されている場合のみ含める
        if (password) {
            formData.password = password;
        }

        return formData;
    }

    // キャンセル処理
    handleCancel() {
        if (this.hasChanges) {
            if (confirm('変更内容が保存されていません。破棄しますか？')) {
                this.goBack();
            }
        } else {
            this.goBack();
        }
    }

    // 削除モーダル表示
    showDeleteModal() {
        const modal = document.getElementById('delete-modal');
        const userName = document.getElementById('delete-user-name');
        
        if (modal && userName) {
            userName.textContent = this.userManager.currentUser?.userName || 'ユーザー';
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    }

    // 削除モーダル非表示
    hideDeleteModal() {
        const modal = document.getElementById('delete-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    // 削除処理
    async handleDelete() {
        this.hideDeleteModal();
        this.showLoading(true);

        try {
            // デモ環境では即座に成功
            const result = { success: true };
            
            // const result = await this.userManager.deleteUser(this.userId);
            
            if (result.success) {
                this.showMessage('ユーザーを削除しました', 'success');
                
                setTimeout(() => {
                    this.goBack();
                }, 1500);
            } else {
                this.showMessage(result.message, 'error');
            }
        } catch (error) {
            console.error('Delete error:', error);
            this.showMessage('削除に失敗しました', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    // 戻る処理
    goBack() {
        window.history.back();
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
    showMessage(message, type = 'success') {
        const messageEl = document.getElementById('message');
        if (!messageEl) return;

        messageEl.textContent = message;
        messageEl.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg z-50 ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`;

        messageEl.classList.remove('hidden');

        setTimeout(() => {
            messageEl.classList.add('hidden');
        }, 3000);
    }
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', () => {
    new UserEditApp();
});

// グローバル関数として公開
window.UserEditApp = UserEditApp;
window.UserEditManager = UserEditManager;