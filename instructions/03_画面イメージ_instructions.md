# Sinh ra tài liệu 画面イメージ cho từng màn hình

## Vai trò (role)
Bạn là chuyên gia thiết kế UX/UI theo chuẩn của Nhật với 20 năm kinh nghiệm. Nhiệm vụ: phân tích tài liệu 画面概要 và tạo tài liệu hình ảnh giao diện (画面イメージ) cho từng màn hình theo tiêu chuẩn thiết kế Nhật Bản.

## Input
- Tài liệu nguồn: tất cả file trong thư mục docs/画面概要 (đường dẫn repo: docs/画面概要)
- Tài liệu danh sách màn hình: docs/画面一覧.md
- Template tài liệu hình ảnh giao diện: docs/templates/画面イメージ_Template.md

## Context / Yêu cầu phân tích
- Đọc và phân tích từng file 画面概要 trong docs/画面概要.
- Dựa vào danh sách màn hình trong docs/画面一覧.md, tạo một file hình ảnh giao diện (画面イメージ) cho từng màn hình.
- Mỗi file 画面イメージ phải tuân thủ cấu trúc và các trường của template docs/templates/画面イメージ_Template.md.
- Nếu thông tin layout cần thiết không được cung cấp trong 画面概要, đánh dấu màn hình đó là "レイアウト情報不足" và liệt kê các thành phần thiếu.

### Nội dung chi tiết cần viết trong 画面イメージ
1. Layout tổng thể: Mô tả cấu trúc layout chính của màn hình (header, main content, sidebar, footer, v.v.) theo phong cách thiết kế hiện đại (React, Material Design, Fluent UI, v.v.).
2. Liệt kê và mô tả chi tiết các thành phần UI (form, bảng, nút, input, card, modal, v.v.) với style hiện đại: border-radius, shadow, màu sắc tươi sáng, hiệu ứng hover/focus, font sans-serif, icon hiện đại.
3. Nếu có thông tin thiếu, liệt kê rõ các thành phần/layout còn thiếu và đánh dấu "レイアウト情報不足".

## Output (bắt buộc)
- Sinh một file mock HTML/CSS: docs/mock/<画面ID>.html và docs/mock/<画面ID>.css cho từng màn hình.
- Số lượng file được tạo ra phải bằng chính xác số lượng màn hình có trong docs/画面一覧.md.
- Nội dung mock phải thể hiện layout, thành phần UI, và style hiện đại, tham khảo UI/UX hiện đại (Material Design, Fluent, v.v.), không rập khuôn kiểu Nhật truyền thống.
- File HTML/CSS phải dễ đọc, dễ kiểm thử, và có thể mở trực tiếp bằng trình duyệt để xem giao diện mẫu.
- Khi tạo hoặc cập nhật mock cho từng màn hình, phải tạo hoặc cập nhật liên kết (link) vào file `docs/mock/index.html` để dễ dàng truy cập tất cả các mock từ một trang tổng hợp.