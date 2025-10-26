# Hướng dẫn tạo tài liệu API定義書 (Bản tiếng Việt)

## Mục đích

Hướng dẫn quy trình xây dựng tài liệu định nghĩa API (API定義書) cho hệ thống POS, đảm bảo mỗi API đều có tài liệu chi tiết, nhất quán, dễ tra cứu và phát triển, tuân thủ đúng template IPA.

## Vai trò

Bạn là chuyên gia phân tích nghiệp vụ, thiết kế hệ thống và API cho dự án POS, có nhiệm vụ tạo và review tài liệu API định nghĩa cho từng API sử dụng trong hệ thống.

## Input

- Danh sách API sử dụng trong các màn hình, nghiệp vụ
- Template API định nghĩa: docs/templates/API定義書_Template.md
- Tài liệu nghiệp vụ, message, error liên quan

## Quy trình thực hiện

1. Tổng hợp danh sách API sử dụng từ các tài liệu nghiệp vụ, 画面定義書, thiết kế hệ thống.
2. Với mỗi API, tạo một tài liệu API定義書 mới theo đúng mẫu template (docs/templates/API定義書_Template.md):
   - Ghi rõ API ID, tên, endpoint, phương thức (GET/POST/PUT/DELETE...)
   - Mô tả chức năng nghiệp vụ của API (機能概要)
   - Định nghĩa chi tiết các tham số (input): tên, loại, bắt buộc, kiểu dữ liệu, độ dài, giải thích ý nghĩa
   - Định nghĩa chi tiết response (output): tên trường, kiểu dữ liệu, độ dài, giải thích ý nghĩa
   - Liệt kê mã lỗi, thông điệp lỗi, điều kiện phát sinh lỗi
   - Mô tả luồng xử lý nghiệp vụ (validate đầu vào, kiểm tra tương quan/DB, xử lý logic, trả kết quả)
   - Ghi chú các điểm cần xác nhận, các trường hợp đặc biệt
3. Đảm bảo tài liệu API định nghĩa có liên kết rõ ràng với màn hình, nghiệp vụ sử dụng API đó.
4. Nếu API chưa có, đề xuất bổ sung API mới và mô tả chi tiết theo template.
5. Đối chiếu với tài liệu message, error để đảm bảo thông điệp trả về nhất quán.

## Output

- Tạo file API定義書 cho từng API tại docs/API定義書/<API名>_定義書.md hoặc docs/API定義書/<API ID>_定義書.md
- Đảm bảo mỗi API đều có tài liệu định nghĩa chi tiết, nhất quán, dễ tra cứu
- Đính kèm checklist hoặc danh sách các vấn đề cần xác nhận

## Lưu ý

- Bắt buộc sử dụng đúng mẫu template docs/templates/API定義書_Template.md
- Luôn đối chiếu với các tài liệu nguồn: nghiệp vụ, 画面定義書, message, error
- Nếu thiếu thông tin, phải ghi chú rõ ràng để nhóm phát triển bổ sung
- Đảm bảo tài liệu API dễ hiểu cho cả nhóm backend, frontend và kiểm thử
