# Hướng dẫn tổng hợp API一覧 từ các màn hình (Bản tiếng Việt)

## Mục đích

Hướng dẫn quy trình tổng hợp danh sách API (API一覧) mà các màn hình trong hệ thống POS sử dụng, giúp quản lý tập trung, dễ tra cứu, kiểm thử và phát triển.

## Vai trò

Bạn là chuyên gia phân tích nghiệp vụ, thiết kế hệ thống và API cho dự án POS, có nhiệm vụ tổng hợp, quản lý và cập nhật danh sách API sử dụng trong toàn hệ thống.

## Input

- Danh sách API sử dụng được liệt kê trong từng file 画面定義書 (docs/画面定義書/<画面ID>_定義書.md)
- Tài liệu API định nghĩa: docs/API定義書/<API名>_定義書.md
- Template API一覧: docs/templates/API一覧_Template.md

## Quy trình thực hiện

1. Đọc từng file 画面定義書 để tổng hợp danh sách API sử dụng cho từng màn hình.
2. Tạo file API一覧 mới theo đúng mẫu template (docs/templates/API一覧_Template.md):
   - Ghi rõ tên API, endpoint, phương thức, màn hình sử dụng, chức năng chính
   - Liệt kê các API theo nhóm nghiệp vụ hoặc theo màn hình
   - Đính kèm link tới tài liệu API定義書 chi tiết nếu có
   - Ghi chú các điểm cần xác nhận, các trường hợp đặc biệt
3. Đảm bảo API一覧 luôn được cập nhật khi có thay đổi nghiệp vụ hoặc bổ sung API mới.
4. Đối chiếu với tài liệu nghiệp vụ, 画面定義書, API定義書 để đảm bảo đầy đủ, nhất quán.

## Output

- Tạo file API一覧 tổng hợp tại docs/API一覧.md
- Đảm bảo danh sách API đầy đủ, rõ ràng, dễ tra cứu
- Đính kèm checklist hoặc danh sách các vấn đề cần xác nhận

## Lưu ý

- Bắt buộc sử dụng đúng mẫu template docs/templates/API一覧_Template.md
- Luôn đối chiếu với các tài liệu nguồn: nghiệp vụ, 画面定義書, API定義書
- Nếu thiếu thông tin, phải ghi chú rõ ràng để nhóm phát triển bổ sung
- Đảm bảo API一覧 dễ hiểu cho cả nhóm backend, frontend và kiểm thử
