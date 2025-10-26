# notify_API定義書

## 1. Thông tin chung
- API ID: notify
- Endpoint: /api/notify
- Phương thức: GET
- Màn hình sử dụng: COMMON_LAYOUT
- Chức năng: Hiển thị thông báo, chuyển nghiệp vụ

## 2. Input
| Tên trường   | Loại | Bắt buộc | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|------|----------|-------------|--------|------------|
| token        | text | Yes      | string      | 255    | Token xác thực |

## 3. Output
| Tên trường   | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|-------------|--------|------------|
| message      | string      | 255    | Thông báo nghiệp vụ |
| type         | string      | 20     | Loại thông báo |
| error_code   | string      | 10     | Mã lỗi nếu thất bại |
| error_msg    | string      | 255    | Thông điệp lỗi |

## 4. Mã lỗi
| Mã lỗi | Thông điệp | Điều kiện |
|--------|------------|-----------|
| E004   | Không có thông báo | Không có thông báo nghiệp vụ |

## 5. Luồng xử lý
- 1. Validate đầu vào:
    - Kiểm tra token có rỗng không
    - Nếu thiếu: trả về lỗi
- 2. Truy vấn bảng notify/messages:
    - Kiểm tra token hợp lệ
    - Lấy thông báo từ bảng messages
    - Nếu không có thông báo: trả về E004
- 3. Trả kết quả:
    - Thành công: trả về message, type
    - Lỗi: trả về error_code, error_msg

## 6. Ghi chú
- Thông báo có thể là chuyển nghiệp vụ hoặc cảnh báo
