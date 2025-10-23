# Sinh ra tài liệu 画面概要 cho từng màn hình

## Vai trò (role)
Bạn là chuyên gia thiết kế hệ thống theo chuẩn của Nhật với 20 năm kinh nghiệm. Nhiệm vụ: phân tích tài liệu user story và tạo tài liệu tổng quan màn hình (画面概要) cho từng màn hình theo template IPA chuẩn.

## Input
- Tài liệu nguồn: tất cả file trong thư mục docs/user_story (đường dẫn repo: docs/user_story)
- Tài liệu danh sách màn hình: docs/画面一覧.md
- Template tài liệu tổng quan màn hình: docs/templates/画面概要_Template.md


## Context / Yêu cầu phân tích
- Đọc và phân tích từng user story trong docs/user_story.
- Dựa vào danh sách màn hình trong docs/画面一覧.md, tạo một file tổng quan (画面概要) cho từng màn hình.
- Mỗi file 画面概要 phải tuân thủ cấu trúc và các trường của template docs/templates/画面概要_Template.md.
- Nếu một màn hình xuất hiện nhiều lần hoặc có nhiều yêu cầu, tổng hợp lại và ghi chú các nguồn liên quan.
- Nếu thông tin cần thiết không được cung cấp trong user story, đánh dấu màn hình đó là "情報不足" và liệt kê các trường thiếu cùng tham chiếu tới file user story tương ứng.

### Nội dung chi tiết cần viết trong 画面概要
1. Mục đích nghiệp vụ của màn hình: Giải thích vai trò, lý do tồn tại, giá trị nghiệp vụ của màn hình trong hệ thống.
2. Chức năng chính: Liệt kê các chức năng lớn mà màn hình cung cấp (ví dụ: đăng ký, tìm kiếm, xác thực, quản lý, báo cáo, v.v.).
3. Luồng nghiệp vụ chính: Mô tả các bước hoặc quy trình chính mà người dùng sẽ thực hiện trên màn hình này (ví dụ: từ đăng nhập đến xác nhận, từ nhập liệu đến lưu, v.v.).
4. Đối tượng sử dụng: Ai là người sử dụng màn hình này (nhân viên, quản lý, khách hàng, IT, v.v.).
5. Mối liên hệ với các màn hình khác: Mô tả các màn hình liên quan, các điểm chuyển tiếp hoặc luồng chuyển đổi giữa các màn hình.
6. Trường hợp sử dụng tiêu biểu: Đưa ra ví dụ thực tế về cách màn hình được sử dụng trong nghiệp vụ hàng ngày.
7. Ghi chú đặc biệt: Các lưu ý về nghiệp vụ, bảo mật, tích hợp phần cứng, quy định pháp lý, hoặc các điểm cần chú ý khác.
8. Nếu có thông tin thiếu, liệt kê rõ các trường/thông tin còn thiếu và đánh dấu "情報不足".

## Output (bắt buộc)
- Sinh một file Markdown: docs/画面概要/<画面ID>_概要.md (UTF-8) cho từng màn hình.
- Số lượng file được tạo ra phải bằng chính xác số lượng màn hình có trong docs/画面一覧.md.
- Ngôn ngữ nội dung file 画面概要: 日本語
- File phải tuân theo cấu trúc và các trường của template docs/templates/画面概要_Template.md.