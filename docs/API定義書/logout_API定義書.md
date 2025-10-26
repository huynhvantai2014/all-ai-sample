# logout_API定義書

## 1. Thông tin chung
- API ID: logout
- Endpoint: /api/logout
- Phương thức: POST
- Màn hình sử dụng: COMMON_LAYOUT
- Chức năng: Đăng xuất khỏi hệ thống

## 2. Input
| Tên trường   | Loại | Bắt buộc | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|------|----------|-------------|--------|------------|
| token        | text | Yes      | string      | 255    | Token xác thực |

## 3. Output
| Tên trường   | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|-------------|--------|------------|
| success      | boolean     |        | Đăng xuất thành công |
| error_code   | string      | 10     | Mã lỗi nếu thất bại |
| error_msg    | string      | 255    | Thông điệp lỗi |

## 4. Mã lỗi
| Mã lỗi | Thông điệp | Điều kiện |
|--------|------------|-----------|
| E003   | Token không hợp lệ | Token hết hạn hoặc sai |

## 5. Luồng xử lý
- 1. Validate đầu vào:
    - Kiểm tra token có rỗng không
    - Nếu thiếu: trả về E003
- 2. Truy vấn bảng session/users:
    - Kiểm tra token có tồn tại, còn hiệu lực không
    - Nếu không hợp lệ: trả về E003
- 3. Xóa session:
    - Nếu hợp lệ, xóa session khỏi DB
- 4. Trả kết quả:
    - Thành công: trả về success=true
    - Lỗi: trả về error_code, error_msg

## 6. Ghi chú
- Token phải hợp lệ, chưa hết hạn
