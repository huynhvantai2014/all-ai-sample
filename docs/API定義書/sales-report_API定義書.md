# sales-report_API定義書

## 1. Thông tin chung
- API ID: sales-report
- Endpoint: /api/sales-report/*
- Phương thức: GET
- Màn hình sử dụng: SRC0006
- Chức năng: Lọc, xuất, in báo cáo doanh số

## 2. Input
| Tên trường   | Loại | Bắt buộc | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|------|----------|-------------|--------|------------|
| from_date    | date | Yes      | string      | 10     | Ngày bắt đầu |
| to_date      | date | Yes      | string      | 10     | Ngày kết thúc |
| format       | string | No     | string      | 10     | Định dạng xuất (csv, excel) |
| ...          | ...  | ...      | ...         | ...    | ... |

## 3. Output
| Tên trường   | Kiểu dữ liệu | Độ dài | Giải thích |
|--------------|-------------|--------|------------|
| report       | object      |        | Dữ liệu báo cáo |
| file         | string      | 255    | File xuất báo cáo |
| error_code   | string      | 10     | Mã lỗi |
| error_msg    | string      | 255    | Thông điệp lỗi |

## 4. Mã lỗi
| Mã lỗi | Thông điệp | Điều kiện |
|--------|------------|-----------|
| E401   | Không có dữ liệu | Không có báo cáo trong khoảng thời gian |
| E402   | Định dạng không hợp lệ | format không hợp lệ |
| ...    | ...                    | ... |

## 5. Luồng xử lý
- 1. Validate đầu vào:
    - Kiểm tra from_date, to_date, format
    - Nếu thiếu hoặc định dạng không hợp lệ: trả về lỗi
- 2. Truy vấn bảng sales_reports:
    - Lọc dữ liệu theo khoảng thời gian
    - Nếu không có dữ liệu: trả về E401
- 3. Xuất báo cáo:
    - Nếu format hợp lệ: xuất file csv, excel
    - Nếu không: trả về E402
- 4. In báo cáo:
    - Tạo file in từ dữ liệu báo cáo
- 5. Trả kết quả:
    - Thành công: trả về report, file
    - Lỗi: trả về error_code, error_msg

## 6. Ghi chú
- Các endpoint phụ: /search, /export-csv, /export-excel, /print
- Đảm bảo validate dữ liệu đầu vào
