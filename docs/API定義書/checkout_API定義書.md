# checkout_API定義書

## 1. Thông tin chung
- API ID: checkout
- Endpoint: /api/checkout/*
- Phương thức: POST, PUT, DELETE, GET
- Màn hình sử dụng: SRC0003, SRC0004, SRC0005
- Chức năng: Xác nhận bán hàng, thêm/sửa/xóa sản phẩm, thanh toán, in hóa đơn

## 2. Input
| Tên trường   | Loại | Bắt buộc | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|------|----------|-------------|--------|------------|
| order_id     | int  | Yes      | int         |        | Mã đơn hàng |
| product_id   | int  | Yes      | int         |        | Mã sản phẩm |
| quantity     | int  | Yes      | int         |        | Số lượng |
| payment_info | object | No     | object      |        | Thông tin thanh toán |
| ...          | ...  | ...      | ...         | ...    | ... |

## 3. Output
| Tên trường   | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|-------------|--------|------------|
| status       | string      | 20     | Trạng thái giao dịch |
| receipt      | string      | 255    | Thông tin hóa đơn |
| error_code   | string      | 10     | Mã lỗi |
| error_msg    | string      | 255    | Thông điệp lỗi |

## 4. Mã lỗi
| Mã lỗi | Thông điệp | Điều kiện |
|--------|------------|-----------|
| E201   | Đơn hàng không tồn tại | order_id không hợp lệ |
| E202   | Sản phẩm không hợp lệ  | product_id không hợp lệ |
| ...    | ...                    | ... |

## 5. Luồng xử lý
- 1. Validate đầu vào:
    - Kiểm tra order_id, product_id, quantity
    - Nếu thiếu hoặc không hợp lệ: trả về lỗi
- 2. Truy vấn bảng orders, products:
    - Kiểm tra order_id, product_id có tồn tại không
    - Nếu không: trả về lỗi
- 3. Thêm/sửa/xóa sản phẩm:
    - Thực hiện thao tác trên bảng orders, products
    - Nếu thành công: trả về status, receipt
    - Nếu lỗi: trả về error_code, error_msg
- 4. Xác nhận bán hàng, thanh toán:
    - Kiểm tra trạng thái đơn, xử lý thanh toán
- 5. In hóa đơn:
    - Tạo thông tin hóa đơn từ bảng orders
- 6. Trả kết quả:
    - Thành công: trả về status, receipt
    - Lỗi: trả về error_code, error_msg

## 6. Ghi chú
- Các endpoint phụ: /add-product, /edit-product, /delete-product, /payment, /receipt
- Đảm bảo validate dữ liệu đầu vào
