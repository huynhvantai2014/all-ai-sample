# login_API定義書

## 1. Thông tin chung
- API ID: login
- Endpoint: /api/login
- Phương thức: POST
- Màn hình sử dụng: SRC0001 (Đăng nhập POS)
- Chức năng: Xác thực đăng nhập

## 2. Input
| Tên trường   | Loại | Bắt buộc | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|------|----------|-------------|--------|------------|
| username     | text | Yes      | string      | 50     | Tên đăng nhập |
| password     | text | Yes      | string      | 255    | Mật khẩu đã mã hóa |

## 3. Output
| Tên trường   | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|-------------|--------|------------|
| token        | string      | 255    | Token xác thực |
| user_id      | int         |        | Mã người dùng |
| error_code   | string      | 10     | Mã lỗi nếu đăng nhập thất bại |
| error_msg    | string      | 255    | Thông điệp lỗi |

## 4. Mã lỗi
| Mã lỗi | Thông điệp | Điều kiện |
|--------|------------|-----------|
| E001   | Sai thông tin đăng nhập | Đăng nhập thất bại |
| E002   | Tài khoản bị khóa       | Tài khoản không hoạt động |

## 5. Luồng xử lý
- 1. Validate đầu vào:
    - Kiểm tra username, password có rỗng không
    - Nếu thiếu: trả về E001
- 2. Truy vấn bảng users:
    - Tìm user theo username
    - Nếu không tồn tại: trả về E001
    - Nếu user.status = 'locked': trả về E002
- 3. Kiểm tra mật khẩu:
    - So sánh password đã mã hóa với DB
    - Nếu sai: trả về E001
- 4. Nếu hợp lệ:
    - Tạo token, trả về user_id và token
- 5. Trả kết quả:
    - Thành công: trả về token, user_id
    - Lỗi: trả về error_code, error_msg

## 6. Ghi chú
- Mã hóa mật khẩu trước khi gửi lên server
- Token trả về dùng cho các API tiếp theo
