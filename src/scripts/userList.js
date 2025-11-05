// ユーザー一覧アプリケーション
import { 
    showMessage, 
    debounce, 
    escapeHtml,
    validateInput 
} from './utils.js';

// ユーザーデータ管理クラス
class UserManager {
    constructor() {
        this.users = [
            {
                id: 'U001',
                name: '田中一郎',
                role: 'admin',
                status: 'active',
                email: 'tanaka@example.com',
                createdAt: '2025-01-01'
            },
            {
                id: 'U002',
                name: '鈴木花子',
                role: 'manager',
                status: 'active',
                email: 'suzuki@example.com',
                createdAt: '2025-01-02'
            },
            {
                id: 'U003',
                name: '佐藤太郎',
                role: 'staff',
                status: 'inactive',
                email: 'sato@example.com',
                createdAt: '2025-01-03'
            },
            {
                id: 'U004',
                name: '高橋美咲',
                role: 'staff',
                status: 'active',
                email: 'takahashi@example.com',
                createdAt: '2025-01-04'
            },
            {
                id: 'U005',
                name: '伊藤健二',
                role: 'manager',
                status: 'active',
                email: 'ito@example.com',
                createdAt: '2025-01-05'
            }
        ];
    }

    /**
     * ユーザー検索
     * @param {string} query - 検索クエリ
     * @returns {Array} - マッチしたユーザーの配列
     */
    search(query) {
        if (!query || query.trim() === '') {
            return [...this.users];
        }

        const searchTerm = query.toLowerCase().trim();
        return this.users.filter(user => 
            user.id.toLowerCase().includes(searchTerm) ||
            user.name.toLowerCase().includes(searchTerm) ||
            user.role.toLowerCase().includes(searchTerm) ||
            user.status.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
    }

    /**
     * ユーザー追加
     * @param {Object} userData - ユーザーデータ
     * @returns {boolean} - 成功したかどうか
     */
    addUser(userData) {
        // IDの重複チェック
        if (this.users.find(user => user.id === userData.id)) {
            return { success: false, message: 'ユーザーIDが既に存在します' };
        }

        // メールアドレスの重複チェック
        if (this.users.find(user => user.email === userData.email)) {
            return { success: false, message: 'メールアドレスが既に存在します' };
        }

        const newUser = {
            ...userData,
            createdAt: new Date().toISOString().split('T')[0]
        };

        this.users.push(newUser);
        return { success: true, message: 'ユーザーを追加しました' };
    }

    /**
     * ユーザー更新
     * @param {string} id - ユーザーID
     * @param {Object} userData - 更新するユーザーデータ
     * @returns {Object} - 処理結果
     */
    updateUser(id, userData) {
        const userIndex = this.users.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
            return { success: false, message: 'ユーザーが見つかりません' };
        }

        // IDが変更された場合、重複チェック
        if (userData.id !== id) {
            if (this.users.find(user => user.id === userData.id)) {
                return { success: false, message: 'ユーザーIDが既に存在します' };
            }
        }

        // メールアドレスの重複チェック（自分以外）
        const emailExists = this.users.find(user => 
            user.email === userData.email && user.id !== id
        );
        if (emailExists) {
            return { success: false, message: 'メールアドレスが既に存在します' };
        }

        this.users[userIndex] = { ...this.users[userIndex], ...userData };
        return { success: true, message: 'ユーザーを更新しました' };
    }

    /**
     * ユーザー削除
     * @param {string} id - ユーザーID
     * @returns {Object} - 処理結果
     */
    deleteUser(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
            return { success: false, message: 'ユーザーが見つかりません' };
        }

        this.users.splice(userIndex, 1);
        return { success: true, message: 'ユーザーを削除しました' };
    }

    /**
     * ユーザー取得
     * @param {string} id - ユーザーID
     * @returns {Object|null} - ユーザーオブジェクトまたはnull
     */
    getUserById(id) {
        return this.users.find(user => user.id === id) || null;
    }

    /**
     * 全ユーザー取得
     * @returns {Array} - 全ユーザーの配列
     */
    getAllUsers() {
        return [...this.users];
    }
}

// ユーザー一覧アプリケーションクラス
class UserListApp {
    constructor() {
        this.userManager = new UserManager();
        this.searchInput = null;
        this.userTableBody = null;
        this.userCardContainer = null;
        this.editModal = null;
        this.currentEditingUserId = null;
        
        // デバウンス検索関数
        this.debouncedSearch = debounce(this.handleSearch.bind(this), 300);
        
        this.init();
    }

    /**
     * アプリケーション初期化
     */
    init() {
        this.initElements();
        this.bindEvents();
        this.displayUsers();
        
        console.log('ユーザー一覧アプリケーションが初期化されました');
    }

    /**
     * DOM要素の初期化
     */
    initElements() {
        this.searchInput = document.getElementById('search');
        this.userTableBody = document.getElementById('user-table-body');
        this.userCardContainer = document.getElementById('user-card-container');
        this.editModal = document.getElementById('edit-modal');
        this.noResultsElement = document.getElementById('no-results');
        this.loadingElement = document.getElementById('loading');
    }

    /**
     * イベントバインディング
     */
    bindEvents() {
        // 検索
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.debouncedSearch);
        }

        // 戻るボタン
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                // ホーム画面に戻る（実装は後で）
                showMessage('ホーム画面に戻る機能は未実装です', 'info');
            });
        }

        // 新規追加ボタン
        const addUserBtn = document.getElementById('add-user-btn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', this.openAddUserModal.bind(this));
        }

        // モーダル関連
        this.bindModalEvents();
    }

    /**
     * モーダル関連のイベントバインディング
     */
    bindModalEvents() {
        // モーダル閉じる
        const modalClose = document.getElementById('modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', this.closeModal.bind(this));
        }

        // 保存ボタン
        const modalSave = document.getElementById('modal-save');
        if (modalSave) {
            modalSave.addEventListener('click', this.saveUser.bind(this));
        }

        // モーダル背景クリックで閉じる
        if (this.editModal) {
            this.editModal.addEventListener('click', (e) => {
                if (e.target === this.editModal) {
                    this.closeModal();
                }
            });
        }
    }

    /**
     * 検索処理
     * @param {Event} event - inputイベント
     */
    handleSearch(event) {
        const query = event?.target?.value || '';
        this.displayUsers(query);
    }

    /**
     * ユーザー一覧表示
     * @param {string} searchQuery - 検索クエリ
     */
    displayUsers(searchQuery = '') {
        this.showLoading(true);
        
        // API呼び出しをシミュレート
        setTimeout(() => {
            const users = this.userManager.search(searchQuery);
            
            if (users.length === 0) {
                this.showNoResults(true);
                this.clearUserDisplay();
            } else {
                this.showNoResults(false);
                this.renderUsers(users);
            }
            
            this.showLoading(false);
        }, 300);
    }

    /**
     * ユーザーをレンダリング
     * @param {Array} users - ユーザー配列
     */
    renderUsers(users) {
        this.renderUserTable(users);
        this.renderUserCards(users);
    }

    /**
     * テーブル表示（デスクトップ）
     * @param {Array} users - ユーザー配列
     */
    renderUserTable(users) {
        if (!this.userTableBody) return;

        this.userTableBody.innerHTML = users.map(user => `
            <tr class="table-row border-b cursor-pointer" onclick="window.userListApp.editUser('${user.id}')">
                <td class="px-4 py-3">${escapeHtml(user.id)}</td>
                <td class="px-4 py-3">${escapeHtml(user.name)}</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded-full text-xs ${this.getRoleBadgeClass(user.role)}">
                        ${this.getRoleName(user.role)}
                    </span>
                </td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded-full text-xs ${this.getStatusBadgeClass(user.status)}">
                        ${this.getStatusName(user.status)}
                    </span>
                </td>
                <td class="px-4 py-3 text-center">
                    <button 
                        class="bg-blue-500 text-white px-3 py-1 rounded touch-btn hover:bg-blue-600 text-sm"
                        onclick="event.stopPropagation(); window.userListApp.editUser('${user.id}')"
                    >
                        編集
                    </button>
                    <button 
                        class="bg-red-500 text-white px-3 py-1 rounded touch-btn hover:bg-red-600 text-sm ml-1"
                        onclick="event.stopPropagation(); window.userListApp.deleteUser('${user.id}')"
                    >
                        削除
                    </button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * カード表示（モバイル）
     * @param {Array} users - ユーザー配列
     */
    renderUserCards(users) {
        if (!this.userCardContainer) return;

        this.userCardContainer.innerHTML = users.map(user => `
            <div class="bg-white border rounded-lg p-4 shadow-sm" onclick="window.userListApp.editUser('${user.id}')">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-semibold text-lg">${escapeHtml(user.name)}</h3>
                    <span class="text-sm text-gray-500">${escapeHtml(user.id)}</span>
                </div>
                <div class="flex items-center justify-between mb-3">
                    <span class="px-2 py-1 rounded-full text-xs ${this.getRoleBadgeClass(user.role)}">
                        ${this.getRoleName(user.role)}
                    </span>
                    <span class="px-2 py-1 rounded-full text-xs ${this.getStatusBadgeClass(user.status)}">
                        ${this.getStatusName(user.status)}
                    </span>
                </div>
                <div class="text-sm text-gray-600 mb-3">${escapeHtml(user.email)}</div>
                <div class="flex gap-2">
                    <button 
                        class="flex-1 bg-blue-500 text-white p-2 rounded touch-btn hover:bg-blue-600 text-sm"
                        onclick="event.stopPropagation(); window.userListApp.editUser('${user.id}')"
                    >
                        編集
                    </button>
                    <button 
                        class="flex-1 bg-red-500 text-white p-2 rounded touch-btn hover:bg-red-600 text-sm"
                        onclick="event.stopPropagation(); window.userListApp.deleteUser('${user.id}')"
                    >
                        削除
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * 権限バッジのクラスを取得
     * @param {string} role - 権限
     * @returns {string} - CSSクラス
     */
    getRoleBadgeClass(role) {
        const classes = {
            'admin': 'bg-red-100 text-red-800',
            'manager': 'bg-blue-100 text-blue-800',
            'staff': 'bg-green-100 text-green-800'
        };
        return classes[role] || 'bg-gray-100 text-gray-800';
    }

    /**
     * 状態バッジのクラスを取得
     * @param {string} status - 状態
     * @returns {string} - CSSクラス
     */
    getStatusBadgeClass(status) {
        const classes = {
            'active': 'bg-green-100 text-green-800',
            'inactive': 'bg-red-100 text-red-800'
        };
        return classes[status] || 'bg-gray-100 text-gray-800';
    }

    /**
     * 権限名を取得
     * @param {string} role - 権限コード
     * @returns {string} - 権限名
     */
    getRoleName(role) {
        const names = {
            'admin': '管理者',
            'manager': 'マネージャー',
            'staff': 'スタッフ'
        };
        return names[role] || role;
    }

    /**
     * 状態名を取得
     * @param {string} status - 状態コード
     * @returns {string} - 状態名
     */
    getStatusName(status) {
        const names = {
            'active': '有効',
            'inactive': '無効'
        };
        return names[status] || status;
    }

    /**
     * ユーザー表示をクリア
     */
    clearUserDisplay() {
        if (this.userTableBody) {
            this.userTableBody.innerHTML = '';
        }
        if (this.userCardContainer) {
            this.userCardContainer.innerHTML = '';
        }
    }

    /**
     * 検索結果なし表示
     * @param {boolean} show - 表示するかどうか
     */
    showNoResults(show) {
        if (this.noResultsElement) {
            this.noResultsElement.classList.toggle('hidden', !show);
        }
    }

    /**
     * ローディング表示
     * @param {boolean} show - 表示するかどうか
     */
    showLoading(show) {
        if (this.loadingElement) {
            this.loadingElement.classList.toggle('hidden', !show);
        }
    }

    /**
     * 新規ユーザー追加モーダルを開く
     */
    openAddUserModal() {
        this.currentEditingUserId = null;
        this.clearForm();
        
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle) {
            modalTitle.textContent = 'ユーザー新規追加';
        }
        
        this.openModal();
    }

    /**
     * ユーザー編集
     * @param {string} userId - ユーザーID
     */
    editUser(userId) {
        const user = this.userManager.getUserById(userId);
        if (!user) {
            showMessage('ユーザーが見つかりません', 'error');
            return;
        }

        this.currentEditingUserId = userId;
        this.populateForm(user);
        
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle) {
            modalTitle.textContent = 'ユーザー編集';
        }
        
        this.openModal();
    }

    /**
     * ユーザー削除
     * @param {string} userId - ユーザーID
     */
    deleteUser(userId) {
        const user = this.userManager.getUserById(userId);
        if (!user) {
            showMessage('ユーザーが見つかりません', 'error');
            return;
        }

        if (confirm(`${user.name} を削除しますか？`)) {
            const result = this.userManager.deleteUser(userId);
            
            if (result.success) {
                showMessage(result.message, 'success');
                this.displayUsers(this.searchInput?.value || '');
            } else {
                showMessage(result.message, 'error');
            }
        }
    }

    /**
     * モーダルを開く
     */
    openModal() {
        if (this.editModal) {
            this.editModal.classList.remove('hidden');
            this.editModal.classList.add('flex');
        }
    }

    /**
     * モーダルを閉じる
     */
    closeModal() {
        if (this.editModal) {
            this.editModal.classList.add('hidden');
            this.editModal.classList.remove('flex');
        }
        this.currentEditingUserId = null;
    }

    /**
     * フォームをクリア
     */
    clearForm() {
        const form = document.getElementById('user-form');
        if (form) {
            form.reset();
        }
    }

    /**
     * フォームにデータを設定
     * @param {Object} user - ユーザーオブジェクト
     */
    populateForm(user) {
        const fields = ['user-id', 'user-name', 'user-role', 'user-status', 'user-email'];
        const values = [user.id, user.name, user.role, user.status, user.email];
        
        fields.forEach((fieldId, index) => {
            const element = document.getElementById(fieldId);
            if (element) {
                element.value = values[index] || '';
            }
        });
    }

    /**
     * ユーザー保存
     */
    saveUser() {
        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) {
            return;
        }

        let result;
        if (this.currentEditingUserId) {
            // 更新
            result = this.userManager.updateUser(this.currentEditingUserId, formData);
        } else {
            // 新規追加
            result = this.userManager.addUser(formData);
        }

        if (result.success) {
            showMessage(result.message, 'success');
            this.closeModal();
            this.displayUsers(this.searchInput?.value || '');
        } else {
            showMessage(result.message, 'error');
        }
    }

    /**
     * フォームデータを取得
     * @returns {Object} - フォームデータ
     */
    getFormData() {
        return {
            id: document.getElementById('user-id')?.value.trim() || '',
            name: document.getElementById('user-name')?.value.trim() || '',
            role: document.getElementById('user-role')?.value || '',
            status: document.getElementById('user-status')?.value || '',
            email: document.getElementById('user-email')?.value.trim() || ''
        };
    }

    /**
     * フォームバリデーション
     * @param {Object} formData - フォームデータ
     * @returns {boolean} - バリデーション結果
     */
    validateForm(formData) {
        // 必須チェック
        if (!formData.id || !formData.name || !formData.role || !formData.status || !formData.email) {
            showMessage('すべての項目を入力してください', 'warning');
            return false;
        }

        // メールアドレスバリデーション
        const emailValidation = validateInput(formData.email, 'email');
        if (!emailValidation.isValid) {
            showMessage(emailValidation.message, 'warning');
            return false;
        }

        return true;
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    window.userListApp = new UserListApp();
});