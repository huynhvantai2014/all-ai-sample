# テーブル定義書（IPA標準）

テーブル名 (Tên bảng): products
テーブル物理名 (Tên vật lý bảng): products
用途・業務説明 (Mục đích/Nghiệp vụ): Quản lý thông tin sản phẩm, phục vụ bán hàng, kiểm kho, báo giá

## カラム定義 (Định nghĩa cột)

| 論理名     | 物理名      | データ型   | 長さ | 必須 | PK | FK | 初期値 | 説明                | 備考 |
|------------|-------------|-----------|------|------|----|----|--------|---------------------|------|
| 商品ID     | product_id  | varchar   | 36   | ○    | ○  |    |        | Mã sản phẩm         |      |
| 商品名     | name        | varchar   | 100  | ○    |    |    |        | Tên sản phẩm        |      |
| バーコード | barcode     | varchar   | 50   |      |    |    |        | Barcode/JAN/SKU     |      |
| 価格       | price       | decimal   |      | ○    |    |    |        | Giá bán             |      |
| 在庫数     | stock       | int       |      |      |    |    | 0      | Số lượng tồn kho    |      |
| 有効期限   | expiry_date | date      |      |      |    |    |        | Hạn sử dụng         |      |
| 割引       | discount    | decimal   |      |      |    |    |        | Chiết khấu          |      |
| 登録日時   | created_at  | datetime  |      |      |    |    |        | Ngày tạo sản phẩm   |      |
| 更新日時   | updated_at  | datetime  |      |      |    |    |        | Ngày cập nhật       |      |

## インデックス・制約 (Index/Ràng buộc)

| インデックス名 | カラム名   | 種類   | ユニーク | 説明           |
|----------------|-----------|--------|---------|----------------|
| idx_product_id | product_id| PK     | ○       | Khóa chính     |
| idx_barcode    | barcode   | UNIQUE | ○       | Không trùng lặp|

## リレーション (Quan hệ bảng)

| 関連テーブル名 | FKカラム名 | 関係   | 説明           |
|----------------|-----------|--------|----------------|
| orders         | product_id | 1-n    | Một sản phẩm có thể thuộc nhiều đơn hàng |

## 備考 (Ghi chú)

- Nếu bổ sung trường mới, cần cập nhật lại định nghĩa bảng
- Nếu có điểm chưa rõ, ghi chú "Cần xác nhận"
