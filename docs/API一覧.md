# API一覧（POSシステム）

| API名                | エンドポイント                | メソッド | Màn hình sử dụng           | Chức năng chính                | Tài liệu định nghĩa |
|----------------------|------------------------------|----------|---------------------------|-------------------------------|--------------------|
| Đăng nhập            | /api/login                   | POST     | SRC0001 (Đăng nhập POS)   | Xác thực đăng nhập            | [login_API定義書](docs/API定義書/login_API定義書.md) |
| Tạo đơn tạm thời      | /api/provisional-order       | POST     | SRC0002 (Tạo đơn tạm thời) | Tạo đơn hàng tạm thời          | [provisional-order_API定義書](docs/API定義書/provisional-order_API定義書.md) |
| Quét barcode         | /api/provisional-order/scan  | POST     | SRC0002                   | Quét barcode sản phẩm          | [provisional-order_API定義書](docs/API定義書/provisional-order_API定義書.md) |
| Sửa đơn tạm thời      | /api/provisional-order/:id   | PUT      | SRC0002                   | Sửa đơn hàng tạm thời          | [provisional-order_API定義書](docs/API定義書/provisional-order_API定義書.md) |
| Xóa đơn tạm thời      | /api/provisional-order/:id   | DELETE   | SRC0002                   | Xóa đơn hàng tạm thời          | [provisional-order_API定義書](docs/API定義書/provisional-order_API定義書.md) |
| Tìm kiếm đơn tạm thời | /api/provisional-order       | GET      | SRC0003 (Danh sách đơn)   | Lọc, tìm kiếm đơn tạm thời      | [provisional-order_API定義書](docs/API定義書/provisional-order_API定義書.md) |
| Xem chi tiết đơn      | /api/provisional-order/:id   | GET      | SRC0003                   | Xem chi tiết đơn tạm thời       | [provisional-order_API定義書](docs/API定義書/provisional-order_API定義書.md) |
| Xác nhận bán hàng     | /api/provisional-order/:id/confirm | POST | SRC0003, SRC0004          | Xác nhận bán hàng              | [checkout_API定義書](docs/API定義書/checkout_API定義書.md) |
| Thêm sản phẩm         | /api/checkout/add-product    | POST     | SRC0004 (Bán hàng)        | Thêm sản phẩm vào bảng         | [checkout_API定義書](docs/API定義書/checkout_API定義書.md) |
| Sửa sản phẩm          | /api/checkout/edit-product   | PUT      | SRC0004                   | Sửa thông tin sản phẩm         | [checkout_API定義書](docs/API定義書/checkout_API定義書.md) |
| Xóa sản phẩm          | /api/checkout/delete-product | DELETE   | SRC0004                   | Xóa sản phẩm khỏi bảng         | [checkout_API定義書](docs/API定義書/checkout_API定義書.md) |
| Thanh toán            | /api/checkout/payment        | POST     | SRC0004, SRC0005          | Xử lý thanh toán               | [payment_API定義書](docs/API定義書/payment_API定義書.md) |
| In hóa đơn            | /api/checkout/receipt        | GET      | SRC0004                   | In/xuất hóa đơn                | [checkout_API定義書](docs/API定義書/checkout_API定義書.md) |
| Chọn phương thức      | /api/payment/select-method   | POST     | SRC0005 (Chọn thanh toán)  | Chọn phương thức thanh toán     | [payment_API定義書](docs/API定義書/payment_API定義書.md) |
| Xác nhận thanh toán   | /api/payment/confirm         | POST     | SRC0005                   | Xác nhận, xử lý thanh toán      | [payment_API定義書](docs/API定義書/payment_API定義書.md) |
| In hợp đồng           | /api/payment/print-contract  | GET      | SRC0005                   | In hợp đồng chia nhỏ thanh toán | [payment_API定義書](docs/API定義書/payment_API定義書.md) |
| Lọc báo cáo           | /api/sales-report/search     | GET      | SRC0006 (Báo cáo)         | Lọc, tìm kiếm báo cáo           | [sales-report_API定義書](docs/API定義書/sales-report_API定義書.md) |
| Xuất CSV              | /api/sales-report/export-csv | GET      | SRC0006                   | Xuất báo cáo CSV                | [sales-report_API定義書](docs/API定義書/sales-report_API定義書.md) |
| Xuất Excel            | /api/sales-report/export-excel| GET     | SRC0006                   | Xuất báo cáo Excel              | [sales-report_API定義書](docs/API定義書/sales-report_API定義書.md) |
| In báo cáo            | /api/sales-report/print      | GET      | SRC0006                   | In báo cáo                      | [sales-report_API定義書](docs/API定義書/sales-report_API定義書.md) |
| Đăng xuất             | /api/logout                  | POST     | COMMON_LAYOUT             | Đăng xuất khỏi hệ thống          | [logout_API定義書](docs/API定義書/logout_API定義書.md) |
| Hiển thị thông báo    | /api/notify                  | GET      | COMMON_LAYOUT             | Hiển thị thông báo, chuyển nghiệp vụ | [notify_API定義書](docs/API定義書/notify_API定義書.md) |

> ※ Đảm bảo cập nhật khi có API mới hoặc thay đổi nghiệp vụ
> ※ Đính kèm link tới tài liệu API định nghĩa chi tiết
> ※ Nếu thiếu thông tin, ghi chú rõ để nhóm phát triển bổ sung
