# 画面定義書（IPA標準）

画面名 (Tên màn hình): 共通レイアウト（ヘッダー・フッター）
画面ID (Mã màn hình): COMMON_LAYOUT
画面物理名 (Tên vật lý màn hình): common_layout

## 権限定義 (Phân quyền)

| 画面物理名    | Quản trị | Nhân viên | IT | Khách | Dev/Test |
|---------------|---------|-----------|----|-------|----------|
| common_layout | ○       | ○         | ○  |       | ○        |

## 項目定義 (Định nghĩa item)

| 論理名           | 物理名      | 項目タイプ   | 説明                                 | IN/OUT | 必須 | 桁数 | 正規表現 | 初期値 | 制御内容 | 備考 |
|------------------|-------------|-------------|--------------------------------------|--------|------|------|--------|--------|--------|------|
| 画面タイトル     | title       | label       | Tiêu đề màn hình                     | OUT    | ○    |      |        |        |        |      |
| ロゴ             | logo        | image       | Logo hệ thống                        | OUT    |      |      |        |        |        |      |
| 店舗名           | store_name  | label       | Tên cửa hàng                         | OUT    | ○    |      |        |        |        |      |
| 端末ID           | terminal_id | label       | Mã thiết bị                          | OUT    | ○    |      |        |        |        |      |
| IPアドレス       | ip_address  | label       | Địa chỉ IP                           | OUT    | ○    |      |        |        |        |      |
| ユーザー名       | user_name   | label       | Tên người dùng đăng nhập             | OUT    | ○    |      |        |        |        |      |
| ログアウト       | logout_btn  | button      | Nút đăng xuất                        | IN     | ○    |      |        |        |        |      |
| システム名       | system_name | label       | Tên hệ thống                         | OUT    |      |      |        |        |        |      |
| バージョン       | version     | label       | Phiên bản hệ thống                   | OUT    |      |      |        |        |        |      |
| コピーライト     | copyright   | label       | Thông tin bản quyền                  | OUT    |      |      |        |        |        |      |
| サポート         | support     | label       | Thông tin hỗ trợ, liên hệ            | OUT    |      |      |        |        |        |      |
| 通知領域         | notification| label       | Vùng thông báo, chuyển đổi nghiệp vụ  | OUT    |      |      |        |        |        |      |

## イベント定義 (Event Definition)

### logout_btn onClick

- Đăng xuất khỏi hệ thống

### notification onUpdate

- Hiển thị thông báo, chuyển đổi nghiệp vụ

## 画面遷移 (Screen Transition)

| 遷移元画面ID | 遷移元画面名   | 遷移先画面ID | 遷移先画面名     | 条件・イベント           | 備考 |
|--------------|----------------|--------------|------------------|-------------------------|------|
| COMMON_LAYOUT| 共通レイアウト | SRC0001      | ログイン画面     | Đăng xuất               |      |
| COMMON_LAYOUT| 共通レイアウト | SRC0004      | レジ販売画面     | Đăng nhập thành công    |      |
| COMMON_LAYOUT| 共通レイアウト | SRC0002      | 仮販売作成画面   | Chuyển nghiệp vụ        |      |

## アクション一覧 (Action List)

| アクション名 | 論理名      | 説明                | Điều kiện/Quyền | API名         | HTTPメソッド | 関連イベント         | 備考 |
|--------------|-------------|---------------------|----------------|---------------|-------------|---------------------|------|
| Đăng xuất    | logout      | Đăng xuất khỏi hệ thống| Tất cả         | /api/logout   | POST        | logout_btn onClick  |      |
| Hiển thị thông báo| notify  | Hiển thị thông báo, chuyển nghiệp vụ| Tất cả | /api/notify   | GET         | notification onUpdate|      |

## Mock/Đối chiếu

- Layout header/footer đã có đầy đủ các thành phần: tiêu đề, logo, thông tin cửa hàng, thiết bị, IP, người dùng, nút đăng xuất, thông tin hệ thống, bản quyền, hỗ trợ, vùng thông báo.
- Đảm bảo đồng nhất trên toàn bộ các màn hình POS.

## Message/Error

- Hiển thị thông báo lỗi khi đăng xuất, khi có sự cố hệ thống
- Sử dụng message từ docs/templates/メッセージ一覧_Template.md

## Ghi chú

- Nếu bổ sung thành phần mới (ví dụ: vùng thông báo đặc biệt), cần cập nhật lại định nghĩa màn hình và API
- Nếu có điểm chưa rõ, ghi chú "Cần xác nhận" hoặc "レイアウト情報不足"
