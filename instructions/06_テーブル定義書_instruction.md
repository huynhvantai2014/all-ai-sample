# Hướng dẫn tạo tài liệu テーブル定義書 (Bản tiếng Việt)

## Mục đích

Hướng dẫn quy trình xây dựng tài liệu định nghĩa bảng dữ liệu (テーブル定義書) cho hệ thống POS, đảm bảo mỗi bảng sử dụng đều có tài liệu chi tiết, nhất quán, dễ tra cứu và phát triển.

## Vai trò

Bạn là chuyên gia phân tích nghiệp vụ, thiết kế hệ thống và cơ sở dữ liệu cho dự án POS, có nhiệm vụ tạo và review tài liệu テーブル定義書 cho từng bảng dữ liệu sử dụng trong hệ thống.

## Input

- Danh sách bảng dữ liệu sử dụng trong các màn hình, API, nghiệp vụ
- Template テーブル定義書: docs/templates/テーブル定義書_Template.md
- Tài liệu nghiệp vụ, message, error liên quan

## Quy trình thực hiện

1. Tổng hợp danh sách bảng dữ liệu sử dụng từ các tài liệu nghiệp vụ, 画面定義書, API定義書.
2. Với mỗi bảng, tạo một tài liệu テーブル定義書 mới theo đúng mẫu template (docs/templates/テーブル定義書_Template.md):
   - Ghi rõ tên bảng, tên vật lý, mô tả nghiệp vụ
   - Định nghĩa chi tiết các cột: tên logic, tên vật lý, kiểu dữ liệu, độ dài, bắt buộc, khóa chính/phụ, giá trị mặc định, mô tả ý nghĩa
   - Liệt kê các chỉ mục, ràng buộc, quan hệ với bảng khác (FK, PK, UNIQUE...)
   - Mô tả các thao tác nghiệp vụ liên quan (insert, update, delete, select)
   - Ghi chú các điểm cần xác nhận, các trường hợp đặc biệt
3. Đảm bảo tài liệu テーブル定義書 có liên kết rõ ràng với màn hình, API, nghiệp vụ sử dụng bảng đó.
4. Nếu bảng chưa có, đề xuất bổ sung bảng mới và mô tả chi tiết theo template.
5. Đối chiếu với tài liệu message, error để đảm bảo dữ liệu nhất quán.

## Output

- Tạo file テーブル定義書 cho từng bảng tại docs/テーブル定義書/<Tên bảng>_定義書.md hoặc docs/テーブル定義書/<Tên vật lý>_定義書.md
- Đảm bảo mỗi bảng đều có tài liệu định nghĩa chi tiết, nhất quán, dễ tra cứu
- Đính kèm checklist hoặc danh sách các vấn đề cần xác nhận

## Lưu ý

- Bắt buộc sử dụng đúng mẫu template docs/templates/テーブル定義書_Template.md
- Luôn đối chiếu với các tài liệu nguồn: nghiệp vụ, 画面定義書, API定義書, message, error
- Nếu thiếu thông tin, phải ghi chú rõ ràng để nhóm phát triển bổ sung
- Đảm bảo tài liệu テーブル定義書 dễ hiểu cho cả nhóm backend, frontend và kiểm thử
