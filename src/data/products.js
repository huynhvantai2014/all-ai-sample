// 商品データ管理クラス
export class ProductManager {
    constructor() {
        this.products = [
            { 
                code: 'A001', 
                name: 'りんご', 
                price: 120, 
                barcode: '123456789012', 
                desc: '新鮮なりんご',
                stock: 50
            },
            { 
                code: 'A002', 
                name: 'バナナ', 
                price: 80, 
                barcode: '234567890123', 
                desc: '甘いバナナ',
                stock: 30
            },
            { 
                code: 'B001', 
                name: 'おにぎり', 
                price: 150, 
                barcode: '345678901234', 
                desc: 'ツナマヨおにぎり',
                stock: 25
            },
            { 
                code: 'B002', 
                name: 'サンドイッチ', 
                price: 280, 
                barcode: '456789012345', 
                desc: 'ハム&チーズサンド',
                stock: 15
            },
            { 
                code: 'C001', 
                name: 'お茶', 
                price: 110, 
                barcode: '567890123456', 
                desc: '緑茶ペットボトル',
                stock: 40
            },
            { 
                code: 'C002', 
                name: 'コーヒー', 
                price: 130, 
                barcode: '678901234567', 
                desc: 'ブラックコーヒー',
                stock: 35
            }
        ];
    }

    /**
     * 商品検索
     * @param {string} query - 検索クエリ
     * @returns {Array} - マッチした商品の配列
     */
    search(query) {
        if (!query || query.trim() === '') {
            return this.products; // 全商品を返す
        }

        const searchTerm = query.toLowerCase().trim();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.code.toLowerCase().includes(searchTerm) ||
            product.barcode.includes(searchTerm) ||
            product.desc.toLowerCase().includes(searchTerm)
        );
    }

    /**
     * バーコードで商品検索
     * @param {string} barcode - バーコード
     * @returns {Object|null} - マッチした商品またはnull
     */
    findByBarcode(barcode) {
        return this.products.find(product => product.barcode === barcode) || null;
    }

    /**
     * 商品コードで商品検索
     * @param {string} code - 商品コード
     * @returns {Object|null} - マッチした商品またはnull
     */
    findByCode(code) {
        return this.products.find(product => product.code === code) || null;
    }

    /**
     * 在庫チェック
     * @param {string} code - 商品コード
     * @param {number} quantity - 必要数量
     * @returns {boolean} - 在庫があるかどうか
     */
    checkStock(code, quantity = 1) {
        const product = this.findByCode(code);
        return product && product.stock >= quantity;
    }

    /**
     * 在庫減算（デモ用）
     * @param {string} code - 商品コード
     * @param {number} quantity - 減算数量
     * @returns {boolean} - 成功したかどうか
     */
    reduceStock(code, quantity = 1) {
        const product = this.findByCode(code);
        if (product && product.stock >= quantity) {
            product.stock -= quantity;
            return true;
        }
        return false;
    }

    /**
     * 全商品取得
     * @returns {Array} - 全商品の配列
     */
    getAllProducts() {
        return [...this.products]; // 配列のコピーを返す
    }
}