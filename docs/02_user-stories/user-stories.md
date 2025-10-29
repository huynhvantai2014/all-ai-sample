# User stories demo — POS siêu thị điện máy Nhật Bản

> **Lưu ý thiết kế giao diện:**
> - Giao diện ưu tiên sử dụng trên điện thoại (mobile-first), phù hợp cho môi trường bán hàng POS tại Nhật.
> - Cần bố trí nhiều nút chức năng và thông tin trên màn hình để đáp ứng nghiệp vụ thực tế, thao tác nhanh, giảm chuyển đổi màn hình.
> - Thiết kế tối ưu cho thao tác chạm, hiển thị rõ ràng các nút, trạng thái, thông tin sản phẩm, thanh toán, hỗ trợ khách hàng.

---

## 1. Đăng nhập POS
U-01
- Title: Màn hình đăng nhập POS / Terminal login
- As a: Nhân viên / Thu ngân
- I want: Đăng nhập vào terminal/POS thông qua màn hình đăng nhập an toàn
- So that: Mỗi giao dịch được gắn với user và ca làm việc để kiểm soát và audit
- Acceptance criteria:
  - Màn hình login cho username/password; hiển thị cửa hàng/terminal hiện tại.
  - Hỗ trợ "Remember device" tùy chọn cho terminal cố định (configurable).
  - Sau login, hiển thị tên user, role, và ca hiện tại trên UI.
  - Session timeout cấu hình được; sau timeout yêu cầu re-login hoặc supervisor unlock.
  - Ghi audit login/logout với timestamp, terminal ID, IP (nếu có).

---

## 2. Tạo đơn bán tạm (Provisional Order)
U-02
- Title: Tạo đơn hàng chưa chính thức (Provisional / Quotation → gửi đến thu ngân)
- As a: Nhân viên tư vấn bán hàng (floor staff / mobile sales)
- I want: Tạo đơn hàng tạm (未確定 / provisional) chứa sản phẩm, giá, khuyến mãi, điều kiện giao hàng và (tuỳ chọn) đặt cọc, rồi gửi trực tiếp đến nhân viên quầy/terminal để hoàn tất thanh toán nếu khách đồng ý
- So that: Khách không phải chờ tại quầy — nhân viên quầy nhận đơn sẵn sàng xử lý, giảm thời gian chờ và tránh sai sót
- Acceptance criteria:
  - Tạo đơn provisional với barcode, số lượng, voucher, phí vận chuyển, ghi chú lắp đặt.
  - Hệ thống tạo mã đơn provisional duy nhất (PROV-YYYYMMDD-XXXX), trạng thái "Provisional / 未確定".
  - Quản lý stock/hold, gửi đến quầy, cảnh báo hold expiry.
  - Khi gửi đơn bán tạm, hệ thống thông báo đến thu ngân qua popup, âm thanh, hoặc badge số lượng đơn mới trên giao diện POS.
  - Nhân viên quầy mở đơn, xác nhận, thanh toán, chuyển thành đơn hàng thật.
  - In領収書 hoặc gửi 電子レシート cho khách với ghi chú "Bắt nguồn từ đơn provisional".

---

## 2a. Quản lý danh sách đơn bán tạm
U-02a
- Title: Màn hình danh sách đơn bán tạm (Pending/Provisional Orders List)
- As a: Thu ngân
- I want: Xem và quản lý danh sách các đơn bán tạm đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách đơn bán tạm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 3. Bán thực tế tại quầy (Checkout)
U-03
- Title: Thanh toán quầy nhanh (scan & checkout)
- As a: Thu ngân
- I want: Quét mã vạch/SKU, điều chỉnh số lượng/giảm giá và thấy tổng tiền + thuế
- So that: Thu tiền nhanh và chính xác
- Acceptance criteria:
  - Thêm/xóa sản phẩm bằng quét barcode, mã JAN code (chuẩn Nhật), hoặc tìm SKU.
  - Hiển thị giá gốc, 消費税 (10%) theo hàng, tổng trước/ sau thuế.
  - Có nút điều chỉnh số lượng, áp voucher/giảm giá cho mỗi dòng.

U-04
- Title: Hỗ trợ thanh toán đa phương thức
- As a: Khách hàng
- I want: Thanh toán bằng tiền mặt, thẻ, IC card, QR, hoặc trả góp
- So that: Chọn cách tiện nhất cho tôi
- Acceptance criteria:
  - Các lựa chọn 現金/クレジット/IC/QR/分割 hiển thị rõ.
  - Lưu trạng thái giao dịch (thành công/thất bại) và mã giao dịch.
  - Thực hiện quy trình trả góp: chọn kỳ, in hợp đồng, gửi bản sao.

---

## 4. Báo cáo doanh thu
U-05
- Title: Báo cáo doanh thu, thuế và báo cáo hàng ngày
- As a: Kế toán/Quản lý
- I want: Báo cáo doanh thu theo cửa hàng, kênh, theo thuế
- So that: Chuẩn bị sổ sách và nộp thuế đúng
- Acceptance criteria:
  - Báo cáo doanh thu before/after tax, theo loại thuế.
  - Export CSV/Excel, lọc theo ngày/cửa hàng/người thu ngân.

---

## 5. Giỏ hàng (Cart)
U-06
- Title: Giỏ hàng (Cart)
- As a: Nhân viên quầy
- I want: Có thể xem và thao tác với danh sách sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 5a. Quản lý giỏ hàng
U-06a
- Title: Màn hình quản lý giỏ hàng (Cart Management)
- As a: Thu ngân
- I want: Xem và quản lý giỏ hàng đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách giỏ hàng với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 6. Thao tác với sản phẩm
U-07
- Title: Thao tác với sản phẩm
- As a: Nhân viên quầy
- I want: Có thể thao tác với sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 6a. Quản lý sản phẩm
U-07a
- Title: Màn hình quản lý sản phẩm (Product Management)
- As a: Thu ngân
- I want: Xem và quản lý sản phẩm đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 7. Hỗ trợ khách hàng
U-08
- Title: Hỗ trợ khách hàng
- As a: Nhân viên quầy
- I want: Có thể hỗ trợ khách hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 7a. Quản lý hỗ trợ khách hàng
U-08a
- Title: Màn hình quản lý hỗ trợ khách hàng (Customer Support)
- As a: Thu ngân
- I want: Xem và quản lý hỗ trợ khách hàng
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 8. Thanh toán
U-09
- Title: Thanh toán
- As a: Nhân viên quầy
- I want: Có thể thanh toán
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 8a. Quản lý thanh toán
U-09a
- Title: Màn hình quản lý thanh toán (Payment Management)
- As a: Thu ngân
- I want: Xem và quản lý thanh toán
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 9. Báo cáo doanh thu
U-10
- Title: Báo cáo doanh thu, thuế và báo cáo hàng ngày
- As a: Kế toán/Quản lý
- I want: Báo cáo doanh thu theo cửa hàng, kênh, theo thuế
- So that: Chuẩn bị sổ sách và nộp thuế đúng
- Acceptance criteria:
  - Báo cáo doanh thu before/after tax, theo loại thuế.
  - Export CSV/Excel, lọc theo ngày/cửa hàng/người thu ngân.

---

## 10. Giỏ hàng (Cart)
U-11
- Title: Giỏ hàng (Cart)
- As a: Nhân viên quầy
- I want: Có thể xem và thao tác với danh sách sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 10a. Quản lý giỏ hàng
U-11a
- Title: Màn hình quản lý giỏ hàng (Cart Management)
- As a: Thu ngân
- I want: Xem và quản lý giỏ hàng đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách giỏ hàng với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 11. Thao tác với sản phẩm
U-12
- Title: Thao tác với sản phẩm
- As a: Nhân viên quầy
- I want: Có thể thao tác với sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 11a. Quản lý sản phẩm
U-12a
- Title: Màn hình quản lý sản phẩm (Product Management)
- As a: Thu ngân
- I want: Xem và quản lý sản phẩm đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 12. Hỗ trợ khách hàng
U-13
- Title: Hỗ trợ khách hàng
- As a: Nhân viên quầy
- I want: Có thể hỗ trợ khách hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 12a. Quản lý hỗ trợ khách hàng
U-13a
- Title: Màn hình quản lý hỗ trợ khách hàng (Customer Support)
- As a: Thu ngân
- I want: Xem và quản lý hỗ trợ khách hàng
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 13. Thanh toán
U-14
- Title: Thanh toán
- As a: Nhân viên quầy
- I want: Có thể thanh toán
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 13a. Quản lý thanh toán
U-14a
- Title: Màn hình quản lý thanh toán (Payment Management)
- As a: Thu ngân
- I want: Xem và quản lý thanh toán
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 14. Báo cáo doanh thu
U-15
- Title: Báo cáo doanh thu, thuế và báo cáo hàng ngày
- As a: Kế toán/Quản lý
- I want: Báo cáo doanh thu theo cửa hàng, kênh, theo thuế
- So that: Chuẩn bị sổ sách và nộp thuế đúng
- Acceptance criteria:
  - Báo cáo doanh thu before/after tax, theo loại thuế.
  - Export CSV/Excel, lọc theo ngày/cửa hàng/người thu ngân.

---

## 15. Giỏ hàng (Cart)
U-16
- Title: Giỏ hàng (Cart)
- As a: Nhân viên quầy
- I want: Có thể xem và thao tác với danh sách sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 15a. Quản lý giỏ hàng
U-16a
- Title: Màn hình quản lý giỏ hàng (Cart Management)
- As a: Thu ngân
- I want: Xem và quản lý giỏ hàng đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách giỏ hàng với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 16. Thao tác với sản phẩm
U-17
- Title: Thao tác với sản phẩm
- As a: Nhân viên quầy
- I want: Có thể thao tác với sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 16a. Quản lý sản phẩm
U-17a
- Title: Màn hình quản lý sản phẩm (Product Management)
- As a: Thu ngân
- I want: Xem và quản lý sản phẩm đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 17. Hỗ trợ khách hàng
U-18
- Title: Hỗ trợ khách hàng
- As a: Nhân viên quầy
- I want: Có thể hỗ trợ khách hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 17a. Quản lý hỗ trợ khách hàng
U-18a
- Title: Màn hình quản lý hỗ trợ khách hàng (Customer Support)
- As a: Thu ngân
- I want: Xem và quản lý hỗ trợ khách hàng
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 18. Thanh toán
U-19
- Title: Thanh toán
- As a: Nhân viên quầy
- I want: Có thể thanh toán
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 18a. Quản lý thanh toán
U-19a
- Title: Màn hình quản lý thanh toán (Payment Management)
- As a: Thu ngân
- I want: Xem và quản lý thanh toán
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 19. Báo cáo doanh thu
U-20
- Title: Báo cáo doanh thu, thuế và báo cáo hàng ngày
- As a: Kế toán/Quản lý
- I want: Báo cáo doanh thu theo cửa hàng, kênh, theo thuế
- So that: Chuẩn bị sổ sách và nộp thuế đúng
- Acceptance criteria:
  - Báo cáo doanh thu before/after tax, theo loại thuế.
  - Export CSV/Excel, lọc theo ngày/cửa hàng/người thu ngân.

---

## 20. Giỏ hàng (Cart)
U-21
- Title: Giỏ hàng (Cart)
- As a: Nhân viên quầy
- I want: Có thể xem và thao tác với danh sách sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 20a. Quản lý giỏ hàng
U-21a
- Title: Màn hình quản lý giỏ hàng (Cart Management)
- As a: Thu ngân
- I want: Xem và quản lý giỏ hàng đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách giỏ hàng với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 21. Thao tác với sản phẩm
U-22
- Title: Thao tác với sản phẩm
- As a: Nhân viên quầy
- I want: Có thể thao tác với sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 21a. Quản lý sản phẩm
U-22a
- Title: Màn hình quản lý sản phẩm (Product Management)
- As a: Thu ngân
- I want: Xem và quản lý sản phẩm đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 22. Hỗ trợ khách hàng
U-23
- Title: Hỗ trợ khách hàng
- As a: Nhân viên quầy
- I want: Có thể hỗ trợ khách hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 23. Quản lý hỗ trợ khách hàng
U-23a
- Title: Màn hình quản lý hỗ trợ khách hàng (Customer Support)
- As a: Thu ngân
- I want: Xem và quản lý hỗ trợ khách hàng
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 24. 商品リスト（カート）表示・編集
POSレジ担当者は、販売画面で商品リスト（カート）を確認・編集できる。各商品行には画像、SKU/JAN、数量、単価、割引、合計金額が表示され、編集・削除・数量調整が可能。

---

## 25. カートが空の場合の表示
POSレジ担当者は、カートが空の場合「カートは空です」と明示的に表示されることを確認できる。

---

## 26. Thanh toán
U-27
- Title: Thanh toán
- As a: Nhân viên quầy
- I want: Có thể thanh toán
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 26a. Quản lý thanh toán
U-27a
- Title: Màn hình quản lý thanh toán (Payment Management)
- As a: Thu ngân
- I want: Xem và quản lý thanh toán
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 27. Báo cáo doanh thu
U-28
- Title: Báo cáo doanh thu, thuế và báo cáo hàng ngày
- As a: Kế toán/Quản lý
- I want: Báo cáo doanh thu theo cửa hàng, kênh, theo thuế
- So that: Chuẩn bị sổ sách và nộp thuế đúng
- Acceptance criteria:
  - Báo cáo doanh thu before/after tax, theo loại thuế.
  - Export CSV/Excel, lọc theo ngày/cửa hàng/người thu ngân.

---

## 28. Giỏ hàng (Cart)
U-29
- Title: Giỏ hàng (Cart)
- As a: Nhân viên quầy
- I want: Có thể xem và thao tác với danh sách sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 28a. Quản lý giỏ hàng
U-29a
- Title: Màn hình quản lý giỏ hàng (Cart Management)
- As a: Thu ngân
- I want: Xem và quản lý giỏ hàng đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách giỏ hàng với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 29. Thao tác với sản phẩm
U-30
- Title: Thao tác với sản phẩm
- As a: Nhân viên quầy
- I want: Có thể thao tác với sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 29a. Quản lý sản phẩm
U-30a
- Title: Màn hình quản lý sản phẩm (Product Management)
- As a: Thu ngân
- I want: Xem và quản lý sản phẩm đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 30. Hỗ trợ khách hàng
U-31
- Title: Hỗ trợ khách hàng
- As a: Nhân viên quầy
- I want: Có thể hỗ trợ khách hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 30a. Quản lý hỗ trợ khách hàng
U-31a
- Title: Màn hình quản lý hỗ trợ khách hàng (Customer Support)
- As a: Thu ngân
- I want: Xem và quản lý hỗ trợ khách hàng
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 31. Thanh toán
U-32
- Title: Thanh toán
- As a: Nhân viên quầy
- I want: Có thể thanh toán
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 31a. Quản lý thanh toán
U-32a
- Title: Màn hình quản lý thanh toán (Payment Management)
- As a: Thu ngân
- I want: Xem và quản lý thanh toán
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 32. Báo cáo doanh thu
U-33
- Title: Báo cáo doanh thu, thuế và báo cáo hàng ngày
- As a: Kế toán/Quản lý
- I want: Báo cáo doanh thu theo cửa hàng, kênh, theo thuế
- So that: Chuẩn bị sổ sách và nộp thuế đúng
- Acceptance criteria:
  - Báo cáo doanh thu before/after tax, theo loại thuế.
  - Export CSV/Excel, lọc theo ngày/cửa hàng/người thu ngân.

---

## 33. Giỏ hàng (Cart)
U-34
- Title: Giỏ hàng (Cart)
- As a: Nhân viên quầy
- I want: Có thể xem và thao tác với danh sách sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 34. Quản lý giỏ hàng
U-35
- Title: Màn hình quản lý giỏ hàng (Cart Management)
- As a: Thu ngân
- I want: Xem và quản lý giỏ hàng đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách giỏ hàng với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 35. Thao tác với sản phẩm
U-36
- Title: Thao tác với sản phẩm
- As a: Nhân viên quầy
- I want: Có thể thao tác với sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 36. Quản lý sản phẩm
U-37
- Title: Màn hình quản lý sản phẩm (Product Management)
- As a: Thu ngân
- I want: Xem và quản lý sản phẩm đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 37. Hỗ trợ khách hàng
U-38
- Title: Hỗ trợ khách hàng
- As a: Nhân viên quầy
- I want: Có thể hỗ trợ khách hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 38. Quản lý hỗ trợ khách hàng
U-39
- Title: Màn hình quản lý hỗ trợ khách hàng (Customer Support)
- As a: Thu ngân
- I want: Xem và quản lý hỗ trợ khách hàng
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 39. Thanh toán
U-40
- Title: Thanh toán
- As a: Nhân viên quầy
- I want: Có thể thanh toán
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 40. Quản lý thanh toán
U-41
- Title: Màn hình quản lý thanh toán (Payment Management)
- As a: Thu ngân
- I want: Xem và quản lý thanh toán
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 41. Báo cáo doanh thu
U-42
- Title: Báo cáo doanh thu, thuế và báo cáo hàng ngày
- As a: Kế toán/Quản lý
- I want: Báo cáo doanh thu theo cửa hàng, kênh, theo thuế
- So that: Chuẩn bị sổ sách và nộp thuế đúng
- Acceptance criteria:
  - Báo cáo doanh thu before/after tax, theo loại thuế.
  - Export CSV/Excel, lọc theo ngày/cửa hàng/người thu ngân.

---

## 42. Giỏ hàng (Cart)
U-43
- Title: Giỏ hàng (Cart)
- As a: Nhân viên quầy
- I want: Có thể xem và thao tác với danh sách sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 43. Quản lý giỏ hàng
U-44
- Title: Màn hình quản lý giỏ hàng (Cart Management)
- As a: Thu ngân
- I want: Xem và quản lý giỏ hàng đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách giỏ hàng với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 44. Thao tác với sản phẩm
U-45
- Title: Thao tác với sản phẩm
- As a: Nhân viên quầy
- I want: Có thể thao tác với sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 45. Quản lý sản phẩm
U-46
- Title: Màn hình quản lý sản phẩm (Product Management)
- As a: Thu ngân
- I want: Xem và quản lý sản phẩm đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 46. Hỗ trợ khách hàng
U-47
- Title: Hỗ trợ khách hàng
- As a: Nhân viên quầy
- I want: Có thể hỗ trợ khách hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 47. Quản lý hỗ trợ khách hàng
U-48
- Title: Màn hình quản lý hỗ trợ khách hàng (Customer Support)
- As a: Thu ngân
- I want: Xem và quản lý hỗ trợ khách hàng
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 48. Thanh toán
U-49
- Title: Thanh toán
- As a: Nhân viên quầy
- I want: Có thể thanh toán
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 49. Quản lý thanh toán
U-50
- Title: Màn hình quản lý thanh toán (Payment Management)
- As a: Thu ngân
- I want: Xem và quản lý thanh toán
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 50. Báo cáo doanh thu
U-51
- Title: Báo cáo doanh thu, thuế và báo cáo hàng ngày
- As a: Kế toán/Quản lý
- I want: Báo cáo doanh thu theo cửa hàng, kênh, theo thuế
- So that: Chuẩn bị sổ sách và nộp thuế đúng
- Acceptance criteria:
  - Báo cáo doanh thu before/after tax, theo loại thuế.
  - Export CSV/Excel, lọc theo ngày/cửa hàng/người thu ngân.

---

## 51. Giỏ hàng (Cart)
U-52
- Title: Giỏ hàng (Cart)
- As a: Nhân viên quầy
- I want: Có thể xem và thao tác với danh sách sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 52. Quản lý giỏ hàng
U-53
- Title: Màn hình quản lý giỏ hàng (Cart Management)
- As a: Thu ngân
- I want: Xem và quản lý giỏ hàng đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách giỏ hàng với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 53. Thao tác với sản phẩm
U-54
- Title: Thao tác với sản phẩm
- As a: Nhân viên quầy
- I want: Có thể thao tác với sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 54. Quản lý sản phẩm
U-55
- Title: Màn hình quản lý sản phẩm (Product Management)
- As a: Thu ngân
- I want: Xem và quản lý sản phẩm đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 55. Hỗ trợ khách hàng
U-56
- Title: Hỗ trợ khách hàng
- As a: Nhân viên quầy
- I want: Có thể hỗ trợ khách hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 56. Quản lý hỗ trợ khách hàng
U-57
- Title: Màn hình quản lý hỗ trợ khách hàng (Customer Support)
- As a: Thu ngân
- I want: Xem và quản lý hỗ trợ khách hàng
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 57. Thanh toán
U-58
- Title: Thanh toán
- As a: Nhân viên quầy
- I want: Có thể thanh toán
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 58a. Quản lý thanh toán
U-59
- Title: Màn hình quản lý thanh toán (Payment Management)
- As a: Thu ngân
- I want: Xem và quản lý thanh toán
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 59. Báo cáo doanh thu
U-60
- Title: Báo cáo doanh thu, thuế và báo cáo hàng ngày
- As a: Kế toán/Quản lý
- I want: Báo cáo doanh thu theo cửa hàng, kênh, theo thuế
- So that: Chuẩn bị sổ sách và nộp thuế đúng
- Acceptance criteria:
  - Báo cáo doanh thu before/after tax, theo loại thuế.
  - Export CSV/Excel, lọc theo ngày/cửa hàng/người thu ngân.

---

## 60. Giỏ hàng (Cart)
U-61
- Title: Giỏ hàng (Cart)
- As a: Nhân viên quầy
- I want: Có thể xem và thao tác với danh sách sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 61. Quản lý giỏ hàng
U-62
- Title: Màn hình quản lý giỏ hàng (Cart Management)
- As a: Thu ngân
- I want: Xem và quản lý giỏ hàng đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách giỏ hàng với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 62. Thao tác với sản phẩm
U-63
- Title: Thao tác với sản phẩm
- As a: Nhân viên quầy
- I want: Có thể thao tác với sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 63. Quản lý sản phẩm
U-64
- Title: Màn hình quản lý sản phẩm (Product Management)
- As a: Thu ngân
- I want: Xem và quản lý sản phẩm đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 64. Hỗ trợ khách hàng
U-65
- Title: Hỗ trợ khách hàng
- As a: Nhân viên quầy
- I want: Có thể hỗ trợ khách hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 65. Quản lý hỗ trợ khách hàng
U-66
- Title: Màn hình quản lý hỗ trợ khách hàng (Customer Support)
- As a: Thu ngân
- I want: Xem và quản lý hỗ trợ khách hàng
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 66. Thanh toán
U-67
- Title: Thanh toán
- As a: Nhân viên quầy
- I want: Có thể thanh toán
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 67. Quản lý thanh toán
U-68
- Title: Màn hình quản lý thanh toán (Payment Management)
- As a: Thu ngân
- I want: Xem và quản lý thanh toán
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 68. Báo cáo doanh thu
U-69
- Title: Báo cáo doanh thu, thuế và báo cáo hàng ngày
- As a: Kế toán/Quản lý
- I want: Báo cáo doanh thu theo cửa hàng, kênh, theo thuế
- So that: Chuẩn bị sổ sách và nộp thuế đúng
- Acceptance criteria:
  - Báo cáo doanh thu before/after tax, theo loại thuế.
  - Export CSV/Excel, lọc theo ngày/cửa hàng/người thu ngân.

---

## 69. Giỏ hàng (Cart)
U-70
- Title: Giỏ hàng (Cart)
- As a: Nhân viên quầy
- I want: Có thể xem và thao tác với danh sách sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 70. Quản lý giỏ hàng
U-71
- Title: Màn hình quản lý giỏ hàng (Cart Management)
- As a: Thu ngân
- I want: Xem và quản lý giỏ hàng đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách giỏ hàng với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 71. Thao tác với sản phẩm
U-72
- Title: Thao tác với sản phẩm
- As a: Nhân viên quầy
- I want: Có thể thao tác với sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 72. Quản lý sản phẩm
U-73
- Title: Màn hình quản lý sản phẩm (Product Management)
- As a: Thu ngân
- I want: Xem và quản lý sản phẩm đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 73. Hỗ trợ khách hàng
U-74
- Title: Hỗ trợ khách hàng
- As a: Nhân viên quầy
- I want: Có thể hỗ trợ khách hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 74. Quản lý hỗ trợ khách hàng
U-75
- Title: Màn hình quản lý hỗ trợ khách hàng (Customer Support)
- As a: Thu ngân
- I want: Xem và quản lý hỗ trợ khách hàng
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 75. Thanh toán
U-76
- Title: Thanh toán
- As a: Nhân viên quầy
- I want: Có thể thanh toán
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 76. Quản lý thanh toán
U-77
- Title: Màn hình quản lý thanh toán (Payment Management)
- As a: Thu ngân
- I want: Xem và quản lý thanh toán
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách sản phẩm với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 77. Báo cáo doanh thu
U-78
- Title: Báo cáo doanh thu, thuế và báo cáo hàng ngày
- As a: Kế toán/Quản lý
- I want: Báo cáo doanh thu theo cửa hàng, kênh, theo thuế
- So that: Chuẩn bị sổ sách và nộp thuế đúng
- Acceptance criteria:
  - Báo cáo doanh thu before/after tax, theo loại thuế.
  - Export CSV/Excel, lọc theo ngày/cửa hàng/người thu ngân.

---

## 78. Giỏ hàng (Cart)
U-79
- Title: Giỏ hàng (Cart)
- As a: Nhân viên quầy
- I want: Có thể xem và thao tác với danh sách sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

## 79. Quản lý giỏ hàng
U-80
- Title: Màn hình quản lý giỏ hàng (Cart Management)
- As a: Thu ngân
- I want: Xem và quản lý giỏ hàng đang chờ xử lý
- So that: Dễ dàng theo dõi, tìm kiếm, xác nhận và xử lý các đơn bán tạm từ nhân viên tư vấn
- Acceptance criteria:
  - Hiển thị danh sách giỏ hàng với các thông tin: mã đơn, nhân viên gửi, thời gian, trạng thái hold, tổng tiền...
  - Cho phép lọc, tìm kiếm, sắp xếp theo trạng thái, thời gian, nhân viên gửi.
  - Đơn mới được highlight hoặc có badge số lượng cập nhật tự động.
  - Thu ngân có thể chọn đơn để xem chi tiết, xác nhận, chỉnh sửa hoặc tiến hành thanh toán.

---

## 80. Thao tác với sản phẩm
U-81
- Title: Thao tác với sản phẩm
- As a: Nhân viên quầy
- I want: Có thể thao tác với sản phẩm trong giỏ hàng
- So that: Dễ dàng quản lý và xử lý các sản phẩm trong giỏ hàng
- Acceptance criteria:
  - Có thể xem danh sách sản phẩm trong giỏ hàng.
  - Có thể chỉnh sửa, thêm, xóa sản phẩm trong giỏ hàng.
  - Có thể điều chỉnh số lượng, đơn giá, giảm giá cho từng sản phẩm.
  - Có thể xem tổng tiền, thuế, và các chi tiết thanh toán.

---

### U-23: 仮販売一覧管理
レジ担当者は仮販売一覧画面で仮販売の検索・詳細・確定・取消・一括処理・履歴参照・エクスポートができる。
※ 自動更新・AI推奨等の設定は「設計・設定画面」で管理。