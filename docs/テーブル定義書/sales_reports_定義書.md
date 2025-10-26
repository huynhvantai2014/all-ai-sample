# テーブル定義書（IPA標準）

テーブル名 (Tên bảng): sales_reports
テーブル物理名 (Tên vật lý bảng): sales_reports
用途・業務説明 (Mục đích/Nghiệp vụ): Quản lý báo cáo doanh thu, thuế, giao dịch, phục vụ thống kê và xuất báo cáo

## カラム定義 (Định nghĩa cột)

| 論理名     | 物理名      | データ型   | 長さ | 必須 | PK | FK | 初期値 | 説明                | 備考 |
|------------|-------------|-----------|------|------|----|----|--------|---------------------|------|
| Báo cáo ID | report_id   | varchar   | 36   | ○    | ○  |    |        | Mã báo cáo          |      |
| Ngày       | date        | date      |      | ○    |    |    |        | Ngày báo cáo        |      |
| Cửa hàng   | store_id    | varchar   | 36   | ○    |    |    |        | Mã cửa hàng         |      |
| Doanh thu  | sales_amount| decimal   |      | ○    |    |    |        | Tổng doanh thu      |      |
| Thuế       | tax         | decimal   |      |      |    |    |        | Thuế tiêu dùng      |      |
| Số giao dịch| transaction_count| int |      |      |    |    |        | Số lượng giao dịch   |      |
| Ngày tạo   | created_at  | datetime  |      |      |    |    |        | Ngày tạo báo cáo    |      |
| Ngày cập nhật| updated_at | datetime  |      |      |    |    |        | Ngày cập nhật       |      |

## インデックス・制約 (Index/Ràng buộc)

| インデックス名 | カラム名   | 種類   | ユニーク | 説明           |
|----------------|-----------|--------|---------|----------------|
| idx_report_id  | report_id | PK     | ○       | Khóa chính     |
| idx_store_date | store_id, date| INDEX|         | Tìm kiếm theo cửa hàng/ngày |

## リレーション (Quan hệ bảng)

| 関連テーブル名 | FKカラム名 | 関係   | 説明           |
|----------------|-----------|--------|----------------|
| stores         | store_id   | n-1    | Một báo cáo thuộc một cửa hàng |

## 備考 (Ghi chú)

- Nếu bổ sung trường mới, cần cập nhật lại định nghĩa bảng
- Nếu có điểm chưa rõ, ghi chú "Cần xác nhận"
