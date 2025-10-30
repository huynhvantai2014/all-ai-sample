
# ドキュメント命名規則・保存場所（簡易版）

## 画面概要
Mô tả: Tổng quan nghiệp vụ, chức năng, vai trò của từng màn hình UI.
Lưu tại: `docs/03_画面系/<画面論理名>/`
Ví dụ: `<画面論理名>_画面概要.md`

## 画面定義書
Mô tả: Định nghĩa chi tiết layout, logic, luồng nghiệp vụ, input/output của màn hình.
Lưu tại: `docs/03_画面系/<画面論理名>/`
Ví dụ: `ログイン画面_画面定義書.md`

## API定義書
Mô tả: Định nghĩa chi tiết endpoint, nghiệp vụ backend, request/response, mã lỗi.
Lưu tại: `docs/04_機能系/` hoặc trong thư mục màn hình liên quan
Ví dụ: `employeeSearch_API定義書.md`

## テーブル定義書
Mô tả: Định nghĩa chi tiết cấu trúc bảng, các trường, kiểu dữ liệu, ràng buộc.
Lưu tại: `docs/05_DM系/`
Ví dụ: `Employee_テーブル定義書.md`

## テーブル一覧.md
Mô tả: Danh sách tổng hợp tất cả các bảng dữ liệu trong hệ thống.
Lưu tại: `docs/05_DM系/`
Ví dụ: `テーブル一覧.md`

## Quy tắc chung
Đảm bảo nhất quán tên gọi, vị trí lưu, format tài liệu cho toàn bộ hệ thống.
Tên màn hình: luôn kết thúc bằng "画面" (Nhật)
Tên API: dùng tên vật lý tiếng Anh, không dùng tiếng Nhật
Thư mục màn hình: dùng tiếng Nhật, không dùng tiếng Anh
Không dùng mã màn hình (SRC0001...) cho tên file/thư mục
Luôn tuân thủ template ở `docs/01_templates/`