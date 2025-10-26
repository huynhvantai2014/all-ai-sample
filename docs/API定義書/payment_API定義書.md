# payment_API定義書

## 1. Thông tin chung
- API ID: payment
- Endpoint: /api/payment/*
- Phương thức: POST, GET
- Màn hình sử dụng: SRC0005
- Chức năng: Chọn phương thức, xác nhận thanh toán, in hợp đồng

## 2. Input
| Tên trường   | Loại | Bắt buộc | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|------|----------|-------------|--------|------------|
| order_id     | int  | Yes      | int         |        | Mã đơn hàng |
| method       | string | Yes    | string      | 20     | Phương thức thanh toán |
| amount       | decimal | Yes   | decimal     |        | Số tiền thanh toán |
| ...          | ...  | ...      | ...         | ...    | ... |

## 3. Output
| Tên trường   | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|-------------|--------|------------|
| contract     | string      | 255    | Thông tin hợp đồng |
| status       | string      | 20     | Trạng thái thanh toán |
| error_code   | string      | 10     | Mã lỗi |
| error_msg    | string      | 255    | Thông điệp lỗi |

## 4. Mã lỗi
| Mã lỗi | Thông điệp | Điều kiện |
|--------|------------|-----------|
| E301   | Phương thức không hợp lệ | method không hợp lệ |
| E302   | Số tiền không hợp lệ     | amount <= 0 |
| ...    | ...                    | ... |

## 5. Luồng xử lý
- 1. Validate đầu vào:
    - Kiểm tra order_id, method, amount
    - Nếu thiếu hoặc không hợp lệ: trả về lỗi
- 2. Truy vấn bảng orders:
    - Kiểm tra order_id có tồn tại không
    - Nếu không: trả về lỗi
- 3. Chọn phương thức, xác nhận thanh toán:
    - Kiểm tra method hợp lệ
    - Nếu không: trả về E301
    - Kiểm tra amount > 0
    - Nếu không: trả về E302
    - Thực hiện cập nhật trạng thái thanh toán trong bảng orders
- 4. In hợp đồng:
    - Tạo thông tin hợp đồng từ bảng orders
- 5. Trả kết quả:
    - Thành công: trả về contract, status
    - Lỗi: trả về error_code, error_msg

## 6. Bảng dữ liệu liên quan
- orders: Quản lý đơn hàng, trạng thái thanh toán, thông tin hợp đồng
- products: Tham chiếu sản phẩm trong đơn hàng (nếu cần)
- users: Tham chiếu người dùng thực hiện giao dịch

## 7. Ghi chú
- Các endpoint phụ: /select-method, /confirm, /print-contract
- Đảm bảo validate dữ liệu đầu vào
