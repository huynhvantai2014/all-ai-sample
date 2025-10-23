# Quy trình chỉnh sửa/generate tài liệu và source code khi có yêu cầu thay đổi

## 1. Tiếp nhận yêu cầu thay đổi
- Nhận yêu cầu từ người dùng hoặc các bên liên quan (thêm/chỉnh chức năng, cải tiến UI, cập nhật tài liệu...)
- Làm rõ nội dung yêu cầu, xác định phạm vi ảnh hưởng (màn hình, chức năng, tài liệu, source code...)

## 2. Xác định và rà soát các phần liên quan
- Kiểm tra các user story, danh sách màn hình, mô tả màn hình, file mock, source code liên quan.
- Lập danh sách các phần cần chỉnh sửa/generate.

## 3. Thực hiện chỉnh sửa/generate
- Chỉnh sửa hoặc tạo mới tài liệu (Markdown, hướng dẫn, mô tả màn hình, user story...)
- Chỉnh sửa hoặc tạo mới source code (HTML/CSS/JS/Python...)
  - UI mock, logic, style, v.v.
- Có thể sử dụng AI hoặc công cụ tự động để hỗ trợ sinh/gợi ý nội dung.

## 4. Review và xác nhận
- Review lại các nội dung đã chỉnh sửa/generate với các bên liên quan.
- Kiểm tra tính nhất quán, đúng nghiệp vụ, UI/UX, tài liệu.
- Sửa lại nếu cần thiết.

## 5. Quản lý phiên bản và ghi chú lịch sử
- Quản lý lịch sử thay đổi bằng Git hoặc công cụ tương tự.
- Ghi rõ nội dung, lý do thay đổi trong commit hoặc log.

## 6. Triển khai và cập nhật
- Đưa thay đổi lên môi trường demo/thực tế.
- Cập nhật tài liệu mới nhất và thông báo cho các bên liên quan.

---

### Gợi ý ứng dụng AI/tự động hóa
- Tự động sinh mock màn hình, mô tả từ user story/danh sách màn hình
- Tự động đề xuất chỉnh sửa dựa trên nội dung change request
- Tự động kiểm tra nhất quán UI/UX, tài liệu

---

Thực hiện đúng quy trình này giúp quản lý thay đổi nhanh chóng, nhất quán và dễ kiểm soát cho cả tài liệu lẫn source code.

# Phân loại chỉnh sửa & tài liệu cần cập nhật (ngắn gọn)

- **Thêm màn hình:**
  - Cập nhật: 画面一覧.md, 画面概要/, user-stories.md
- **Thêm user story:**
  - Cập nhật: user-stories.md, liên kết màn hình
- **Thêm chức năng cho màn hình:**
  - Cập nhật: 画面概要/, 画面一覧.md
- **Thêm xử lý nghiệp vụ/UI/backend:**
  - Cập nhật: 画面概要/, user-stories.md, tài liệu API (nếu có)
- **Thêm/chỉnh mock UI:**
  - Cập nhật: mock/, 画面概要/
- **Thêm hướng dẫn thao tác:**
  - Cập nhật: tài liệu hướng dẫn, 画面概要/, user-stories.md

> Luôn rà soát các tài liệu liên quan để đảm bảo nhất quán và đầy đủ thông tin.

# Ví dụ & lưu ý bổ sung

## Ví dụ minh họa
- Thêm màn hình: tạo file `SRC0005_概要.md`, cập nhật `画面一覧.md`, thêm liên kết user story trong `user-stories.md`.
- Commit mẫu: `feat: thêm màn hình SRC0005 và cập nhật user story liên quan`

## Quy tắc đặt tên/mã
- Mã màn hình: SRCxxxx (ví dụ: SRC0001, SRC0002...)
- Mã user story: USxxxx (ví dụ: US0001, US0002...)
- Tên file: dùng mã + tên chức năng, ví dụ: `SRC0003_概要.md`, `SRC0003.html`

## Lưu ý kiểm thử sau chỉnh sửa
- Kiểm tra lại UI mock, logic, tài liệu sau khi chỉnh sửa/generate
- Đảm bảo không ảnh hưởng các phần liên quan

## Quy trình review/duyệt thay đổi
- Người thực hiện chỉnh sửa tự review trước
- Gửi cho người phụ trách nghiệp vụ/QA xác nhận
- Chỉ triển khai khi đã được duyệt
