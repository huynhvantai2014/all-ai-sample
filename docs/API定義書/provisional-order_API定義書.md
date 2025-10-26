# provisional-order_API定義書

## 1. Thông tin chung
- API ID: provisional-order
- Endpoint: /api/provisional-order
- Phương thức: POST, GET, PUT, DELETE, /scan, /:id, /:id/confirm
- Màn hình sử dụng: SRC0002, SRC0003
- Chức năng: Tạo, sửa, xóa, tìm kiếm, quét barcode, xác nhận đơn tạm thời

## 2. Input
| Tên trường   | Loại | Bắt buộc | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|------|----------|-------------|--------|------------|
| user_id      | int  | Yes      | int         |        | Mã người dùng |
| product_id   | int  | Yes      | int         |        | Mã sản phẩm |
| quantity     | int  | Yes      | int         |        | Số lượng |
| barcode      | string | No     | string      | 50     | Mã barcode sản phẩm |
| ...          | ...  | ...      | ...         | ...    | ... |

## 3. Output
| Tên trường   | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|-------------|--------|------------|
| order_id     | int         |        | Mã đơn tạm thời |
| status       | string      | 20     | Trạng thái đơn |
| error_code   | string      | 10     | Mã lỗi |
| error_msg    | string      | 255    | Thông điệp lỗi |

## 4. Mã lỗi
| Mã lỗi | Thông điệp | Điều kiện |
|--------|------------|-----------|
| E101   | Không tìm thấy sản phẩm | Quét barcode không hợp lệ |
| E102   | Số lượng không hợp lệ   | Số lượng <= 0 |
| ...    | ...                    | ... |

## 5. Luồng xử lý
- 1. Validate đầu vào:
    - Kiểm tra user_id, product_id, quantity
    - Nếu thiếu hoặc quantity <= 0: trả về E102
- 2. Truy vấn bảng products:
    - Kiểm tra product_id có tồn tại không
    - Nếu không: trả về E101
- 3. Quét barcode:
    - Nếu có barcode, kiểm tra barcode trong bảng products
    - Nếu không hợp lệ: trả về E101
- 4. Tạo/sửa/xóa/tìm kiếm đơn tạm thời:
    - Thực hiện thao tác trên bảng orders
    - Nếu thành công: trả về order_id, status
    - Nếu lỗi: trả về error_code, error_msg
- 5. Xác nhận bán hàng:
    - Kiểm tra trạng thái đơn, xác nhận bán hàng
- 6. Trả kết quả:
    - Thành công: trả về order_id, status
    - Lỗi: trả về error_code, error_msg

## 6. Ghi chú
- Các endpoint phụ: /scan, /:id, /:id/confirm
- Đảm bảo validate dữ liệu đầu vào
