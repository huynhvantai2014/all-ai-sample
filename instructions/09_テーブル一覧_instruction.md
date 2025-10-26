# Hướng dẫn tổng hợp テーブル一覧 (Bản tiếng Việt)

## Mục đích

Hướng dẫn quy trình tổng hợp danh sách bảng dữ liệu (テーブル一覧) sử dụng trong hệ thống POS, giúp quản lý tập trung, dễ tra cứu, kiểm thử và phát triển.

## Vai trò

Bạn là chuyên gia phân tích nghiệp vụ, thiết kế hệ thống và cơ sở dữ liệu cho dự án POS, có nhiệm vụ tổng hợp, quản lý và cập nhật danh sách bảng dữ liệu sử dụng trong toàn hệ thống.

## Input

- Tài liệu nghiệp vụ (Business Requirement Document, BRD), đặc tả nghiệp vụ, tài liệu phân tích hệ thống, sơ đồ ERD, tài liệu thiết kế logic dữ liệu, yêu cầu hệ thống
- Template テーブル一覧: docs/templates/テーブル一覧_Template.md
- Sau khi có テーブル一覧, sử dụng để tạo các file テーブル定義書 (docs/テーブル定義書/<Tên bảng>_定義書.md)

## Quy trình thực hiện

1. Đầu tiên, xác định và tổng hợp danh sách các bảng dữ liệu cần sử dụng cho hệ thống vào file テーブル一覧 (`docs/テーブル一覧.md`), sử dụng template chuẩn IPA (`docs/templates/テーブル一覧_Template.md`).
2. Sau khi hoàn thành テーブル一覧, tiến hành tạo từng テーブル定義書 cho các bảng đã liệt kê, sử dụng template `docs/templates/テーブル定義書_Template.md`.
3. Nếu có bảng mới phát sinh, cập nhật lại テーブル一覧 trước, sau đó bổ sung テーブル定義書 tương ứng.
4. Đảm bảo テーブル一覧 luôn được cập nhật khi có thay đổi nghiệp vụ hoặc bổ sung bảng mới.
5. Đối chiếu với tài liệu nghiệp vụ để đảm bảo đầy đủ, nhất quán.

> Quy trình chuẩn: Luôn tạo và cập nhật テーブル一覧 trước, sau đó mới tạo テーブル定義書 cho từng bảng.

## Output

- Tạo file テーブル一覧 tổng hợp tại docs/テーブル一覧.md
- Đảm bảo danh sách bảng dữ liệu đầy đủ, rõ ràng, dễ tra cứu
- Đính kèm checklist hoặc danh sách các vấn đề cần xác nhận

## Lưu ý

- Bắt buộc sử dụng đúng mẫu template docs/templates/テーブル一覧_Template.md
- Luôn đối chiếu với các tài liệu nguồn: nghiệp vụ, テーブル定義書
- Nếu thiếu thông tin, phải ghi chú rõ ràng để nhóm phát triển bổ sung
- Đảm bảo テーブル一覧 dễ hiểu cho cả nhóm backend, frontend và kiểm thử
