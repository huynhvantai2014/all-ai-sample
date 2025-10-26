# テーブル定義書（IPA標準）

テーブル名 (Tên bảng): users
テーブル物理名 (Tên vật lý bảng): users
用途・業務説明 (Mục đích/Nghiệp vụ): Quản lý thông tin người dùng POS, xác thực đăng nhập, phân quyền

## カラム定義 (Định nghĩa cột)
| 論理名     | 物理名      | データ型   | 長さ | 必須 | PK | FK | 初期値 | 説明                | 備考 |
|------------|-------------|-----------|------|------|----|----|--------|---------------------|------|
| ユーザーID | user_id     | varchar   | 36   | ○    | ○  |    |        | Mã người dùng       |      |
| ユーザー名 | username    | varchar   | 50   | ○    |    |    |        | Tên đăng nhập       |      |
| パスワード | password    | varchar   | 128  | ○    |    |    |        | Mật khẩu mã hóa     |      |
| 権限       | role        | varchar   | 20   | ○    |    |    |        | Quyền truy cập      |      |
| 氏名       | full_name   | varchar   | 100  |      |    |    |        | Họ tên người dùng   |      |
| メール     | email       | varchar   | 100  |      |    |    |        | Email liên hệ       |      |
| 登録日時   | created_at  | datetime  |      |      |    |    |        | Ngày tạo tài khoản  |      |
| 更新日時   | updated_at  | datetime  |      |      |    |    |        | Ngày cập nhật       |      |

## インデックス・制約 (Index/Ràng buộc)
| インデックス名 | カラム名   | 種類   | ユニーク | 説明           |
|----------------|-----------|--------|---------|----------------|
| idx_user_id    | user_id   | PK     | ○       | Khóa chính     |
| idx_username   | username  | UNIQUE | ○       | Không trùng lặp|

## リレーション (Quan hệ bảng)
| 関連テーブル名 | FKカラム名 | 関係   | 説明           |
|----------------|-----------|--------|----------------|
|                |           |        |                |

## 備考 (Ghi chú)
- Nếu bổ sung trường mới, cần cập nhật lại định nghĩa bảng
- Nếu có điểm chưa rõ, ghi chú "Cần xác nhận"
