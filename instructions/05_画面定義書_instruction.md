# Hướng dẫn tạo tài liệu API定義書 (Bản tiếng Việt)

## Mục đích

Hướng dẫn quy trình xây dựng tài liệu định nghĩa API (API定義書) cho hệ thống POS, đảm bảo mỗi API sử dụng trong từng màn hình đều có tài liệu chi tiết, nhất quán, dễ tra cứu và phát triển.

## Vai trò

Bạn là chuyên gia phân tích nghiệp vụ, thiết kế hệ thống và API cho dự án POS, có nhiệm vụ tạo và review tài liệu API định nghĩa cho từng API sử dụng trong các 画面定義書.

## Input

- Các API sử dụng được liệt kê trong từng file 画面定義書 (docs/画面定義書/<画面ID>_定義書.md)
- Template API định nghĩa: docs/templates/API定義書_Template.md
- Tài liệu nghiệp vụ, message, error liên quan

## Quy trình thực hiện

1. Đọc từng file 画面定義書 để tổng hợp danh sách API sử dụng cho từng màn hình.
2. Với mỗi API, tạo một tài liệu API定義書 mới theo đúng mẫu template (docs/templates/API定義書_Template.md):
   - Ghi rõ API ID, tên, endpoint, phương thức (GET/POST/PUT/DELETE...)
   - Mô tả chức năng nghiệp vụ của API
   - Định nghĩa chi tiết các tham số (input), kiểu dữ liệu, bắt buộc, giải thích rõ ý nghĩa
   - Định nghĩa chi tiết response (output), kiểu dữ liệu, giải thích rõ ý nghĩa
   - Liệt kê mã lỗi, thông điệp lỗi, điều kiện phát sinh lỗi
   - Mô tả luồng xử lý nghiệp vụ (validate, xử lý, trả kết quả)
   - Ghi chú các điểm cần xác nhận, các trường hợp đặc biệt
3. Đảm bảo tài liệu API định nghĩa có liên kết rõ ràng với màn hình sử dụng (ghi chú màn hình sử dụng API đó).
4. Nếu API chưa có, đề xuất bổ sung API mới và mô tả chi tiết theo template.
5. Đối chiếu với tài liệu message, error để đảm bảo thông điệp trả về nhất quán.

## Output

- Tạo file API定義書 cho từng API tại docs/API定義書/<API名>_定義書.md hoặc docs/API定義書/<API ID>_定義書.md
- Đảm bảo mỗi API đều có tài liệu định nghĩa chi tiết, nhất quán, dễ tra cứu
- Đính kèm checklist hoặc danh sách các vấn đề cần xác nhận

## Lưu ý

- Bắt buộc sử dụng đúng mẫu template docs/templates/API定義書_Template.md
- Luôn đối chiếu với các tài liệu nguồn: 画面定義書, nghiệp vụ, message, error
- Nếu thiếu thông tin, phải ghi chú rõ ràng để nhóm phát triển bổ sung
- Đảm bảo tài liệu API dễ hiểu cho cả nhóm backend, frontend và kiểm thử

# Hướng dẫn tạo 画面定義書 (Bản tiếng Việt)

## Mục đích

Hướng dẫn quy trình xây dựng tài liệu định nghĩa màn hình (画面定義書) cho hệ thống POS, đảm bảo đầy đủ nghiệp vụ, UI/UX, layout, chức năng và thiết kế hiện đại.

## Vai trò

Bạn là chuyên gia kiểm tra, tổng hợp nghiệp vụ và thiết kế UI/UX theo chuẩn Nhật Bản, có nhiệm vụ tạo và review tài liệu 画面定義書 cho từng màn hình.


## Input

- Tài liệu 画面概要: docs/画面概要/<画面ID>_概要.md
- Danh sách màn hình: docs/画面一覧.md
- File mock HTML/CSS: docs/mock/<画面ID>.html, docs/mock/<画面ID>.css
- Tài liệu API định nghĩa: docs/templates/API定義書_Template.md (nếu có)
- Tài liệu message, error: docs/templates/メッセージ一覧_Template.md



## Quy trình thực hiện

1. Đọc danh sách màn hình (docs/画面一覧.md) để lấy toàn bộ ID và tên màn hình.
2. Với mỗi màn hình, tham khảo đồng thời:
   - File 画面概要 tương ứng để lấy thông tin nghiệp vụ, chức năng, layout, UI/UX
   - File mock HTML/CSS (docs/mock/<画面ID>.html, docs/mock/<画面ID>.css) để kiểm tra thực tế giao diện, thành phần, layout, style
3. Đối chiếu giữa 画面概要 và mock HTML/CSS:
   - Kiểm tra mock có đầy đủ thành phần, chức năng, layout như mô tả không
   - Đánh giá màu sắc, font, style, hiệu ứng, sự đồng nhất giữa các màn hình
   - Ghi chú các điểm thiếu, chưa đúng, cần chỉnh sửa
4. Ghi lại các thông tin trên vào file định nghĩa màn hình theo đúng mẫu template (bắt buộc sử dụng docs/templates/画面定義書_Template.md).
5. Nếu màn hình có sử dụng API, thực hiện các bước sau:
   - Tham khảo tài liệu API định nghĩa (docs/templates/API定義書_Template.md)
   - Ghi rõ API nào được sử dụng, mục đích, input/output, thông điệp lỗi, trạng thái trả về
   - Đảm bảo API phù hợp nghiệp vụ, bảo mật, dễ mở rộng
   - Nếu chưa có API, đề xuất API cần thiết và mô tả chi tiết
6. Đối với UI/UX:
   - Kiểm tra sự đồng nhất về layout, màu sắc, font, icon giữa các màn hình
   - Đảm bảo các thành phần UI hiện đại (bo góc, shadow, hiệu ứng hover/focus, font sans-serif, icon hiện đại)
   - Đánh dấu rõ các điểm thiếu, chưa đồng nhất, cần chỉnh sửa
7. Nếu có điểm chưa rõ, thiếu thông tin, ghi chú "Cần xác nhận" hoặc "レイアウト情報不足".

## Output

- Tạo file 画面定義書 cho từng màn hình tại docs/画面定義書/<画面ID>_定義書.md
- Liệt kê rõ các điểm đạt/chưa đạt, các thành phần thiếu, các đề xuất chỉnh sửa UI/UX, API
- Đính kèm checklist hoặc danh sách các vấn đề cần xác nhận

## Lưu ý

- Tài liệu phải đầy đủ nghiệp vụ, UI/UX, thiết kế, API, message, error
- Luôn đối chiếu với các tài liệu nguồn: 画面概要, 画面一覧, API định nghĩa, message
- Nếu thiếu thông tin, phải ghi chú rõ ràng để nhóm phát triển bổ sung
