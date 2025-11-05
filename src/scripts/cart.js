// cart.js - カート管理クラス

export class CartManager {
    constructor() {
        this.cart = [];
        this.total = 0;
        this.points = 0;
        this.pointsRate = 0.01; // 1%還元
        this.selectedPaymentMethod = null;
    }

    /**
     * カートに商品追加
     * @param {Object} product - 商品オブジェクト
     * @param {number} quantity - 数量（デフォルト1）
     * @returns {boolean} - 成功したかどうか
     */
    addItem(product, quantity = 1) {
        if (!product || quantity <= 0) {
            return false;
        }

        // 既存商品があるかチェック
        const existingItem = this.cart.find(item => item.code === product.code);

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.subtotal = existingItem.price * existingItem.quantity;
        } else {
            this.cart.push({
                code: product.code,
                name: product.name,
                price: product.price,
                quantity: quantity,
                subtotal: product.price * quantity
            });
        }

        this.updateTotals();
        return true;
    }

    /**
     * 商品の数量を更新
     * @param {number} index - カート内のインデックス
     * @param {number} quantity - 新しい数量
     * @returns {boolean} - 成功したかどうか
     */
    updateQuantity(index, quantity) {
        if (index < 0 || index >= this.cart.length || quantity < 0) {
            return false;
        }

        if (quantity === 0) {
            return this.removeItem(index);
        }

        this.cart[index].quantity = quantity;
        this.cart[index].subtotal = this.cart[index].price * quantity;
        this.updateTotals();
        return true;
    }

    /**
     * カートから商品削除
     * @param {number} index - カート内のインデックス
     * @returns {boolean} - 成功したかどうか
     */
    removeItem(index) {
        if (index < 0 || index >= this.cart.length) {
            return false;
        }

        this.cart.splice(index, 1);
        this.updateTotals();
        return true;
    }

    /**
     * 数量を1つ増やす
     * @param {number} index - カート内のインデックス
     * @returns {boolean} - 成功したかどうか
     */
    increaseQuantity(index) {
        if (index < 0 || index >= this.cart.length) {
            return false;
        }

        this.cart[index].quantity += 1;
        this.cart[index].subtotal = this.cart[index].price * this.cart[index].quantity;
        this.updateTotals();
        return true;
    }

    /**
     * 数量を1つ減らす
     * @param {number} index - カート内のインデックス
     * @returns {boolean} - 成功したかどうか
     */
    decreaseQuantity(index) {
        if (index < 0 || index >= this.cart.length) {
            return false;
        }

        if (this.cart[index].quantity <= 1) {
            return this.removeItem(index);
        }

        this.cart[index].quantity -= 1;
        this.cart[index].subtotal = this.cart[index].price * this.cart[index].quantity;
        this.updateTotals();
        return true;
    }

    /**
     * 合計金額とポイントを更新
     */
    updateTotals() {
        this.total = this.cart.reduce((sum, item) => sum + item.subtotal, 0);
        this.points = Math.floor(this.total * this.pointsRate);
    }

    /**
     * カートをクリア
     */
    clear() {
        this.cart = [];
        this.total = 0;
        this.points = 0;
        this.selectedPaymentMethod = null;
    }

    /**
     * 支払い方法を設定
     * @param {string} method - 支払い方法（cash, card, points）
     */
    setPaymentMethod(method) {
        const validMethods = ['cash', 'card', 'points'];
        if (validMethods.includes(method)) {
            this.selectedPaymentMethod = method;
            return true;
        }
        return false;
    }

    /**
     * カートの状態を取得
     * @returns {Object} - カートの現在状態
     */
    getCartState() {
        return {
            items: [...this.cart],
            total: this.total,
            points: this.points,
            paymentMethod: this.selectedPaymentMethod,
            itemCount: this.cart.length,
            totalQuantity: this.cart.reduce((sum, item) => sum + item.quantity, 0)
        };
    }

    /**
     * カートが空かどうか
     * @returns {boolean} - カートが空の場合true
     */
    isEmpty() {
        return this.cart.length === 0;
    }

    /**
     * 会計処理
     * @returns {Object} - 会計結果
     */
    checkout() {
        if (this.isEmpty()) {
            return {
                success: false,
                message: 'カートが空です',
                receipt: null
            };
        }

        if (!this.selectedPaymentMethod) {
            return {
                success: false,
                message: '支払い方法を選択してください',
                receipt: null
            };
        }

        // レシート情報作成
        const receipt = {
            timestamp: new Date().toISOString(),
            items: [...this.cart],
            total: this.total,
            points: this.points,
            paymentMethod: this.selectedPaymentMethod,
            transactionId: `TXN${Date.now()}`
        };

        // カートをクリア
        this.clear();

        return {
            success: true,
            message: '会計が完了しました',
            receipt: receipt
        };
    }
}