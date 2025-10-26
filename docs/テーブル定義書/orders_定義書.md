# テーブル定義書（IPA標準）

テーブル名 (Tên bảng): orders
テーブル物理名 (Tên vật lý bảng): orders
用途・業務説明 (Mục đích/Nghiệp vụ): Quản lý đơn hàng tạm thời, bán hàng, xác nhận, báo cáo

## カラム定義 (Định nghĩa cột)

| 論理名     | 物理名      | データ型   | 長さ | 必須 | PK | FK | 初期値 | 説明                | 備考 |
|------------|-------------|-----------|------|------|----|----|--------|---------------------|------|
| Đơn hàng ID| order_id    | varchar   | 36   | ○    | ○  |    |        | Mã đơn hàng         |      |
| Mã khách   | customer_id | varchar   | 36   |      |    |    |        | Mã khách hàng       |      |
| Ngày tạo   | created_at  | datetime  |      | ○    |    |    |        | Ngày tạo đơn hàng   |      |
| Trạng thái | status      | varchar   | 20   | ○    |    |    |        | Trạng thái đơn hàng |      |
| Tổng tiền  | total       | decimal   |      | ○    |    |    |        | Tổng giá trị đơn    |      |
| Nhân viên  | staff_id    | varchar   | 36   | ○    |    |    |        | Mã nhân viên xử lý  |      |
| Ghi chú    | note        | text      |      |      |    |    |        | Ghi chú đơn hàng    |      |
| Ngày cập nhật| updated_at | datetime  |      |      |    |    |        | Ngày cập nhật       |      |

## インデックス・制約 (Index/Ràng buộc)

| インデックス名 | カラム名   | 種類   | ユニーク | 説明           |
|----------------|-----------|--------|---------|----------------|
| idx_order_id   | order_id  | PK     | ○       | Khóa chính     |
| idx_customer   | customer_id| INDEX |         | Tìm kiếm khách |

## リレーション (Quan hệ bảng)

| 関連テーブル名 | FKカラム名 | 関係   | 説明           |
|----------------|-----------|--------|----------------|
| products       | order_id   | n-1    | Một đơn hàng gồm nhiều sản phẩm |
| users          | staff_id   | n-1    | Một đơn hàng do một nhân viên xử lý |

## 備考 (Ghi chú)

- Nếu bổ sung trường mới, cần cập nhật lại định nghĩa bảng
- Nếu có điểm chưa rõ, ghi chú "Cần xác nhận"
