# User stories chung — Ứng dụng POS cho siêu thị điện máy (Nhật Bản)

Mô tả ngắn: Tập hợp các user story chung, phù hợp cho siêu thị điện máy quy mô lớn tại Nhật. Tập trung vào nghiệp vụ tại cửa hàng: tương tác nhân viên — khách, tạo đơn tạm/provisional tại floor, thanh toán tại quầy, quản lý kho & fulfillment (giao hàng/lắp đặt), dịch vụ sau bán (bảo hành/đổi trả), vận hành cửa hàng, báo cáo kế toán theo quy định Nhật (消費税), và tích hợp phần cứng (máy quét, máy in, thiết bị đọc IC).

Context chung:
- Tiền tệ: JPY (¥).
- Thuế tiêu dùng: mặc định 10% (消費税) — ghi rõ từng mặt hàng nếu có ngoại lệ.
- Thanh toán phổ biến: 現金, クレジットカード, ICカード (Suica/Pasmo), QR決済 (PayPay/LINE Pay/Rakuten Pay).
- Yêu cầu đặc thù: phí tái chế 家電リサイクル, trả góp 分割払い, cấp 発行保証書, giao hàng/ lắp đặt 大型家電.
- Ghi chú: Không bao gồm xử lý đơn online/web; tất cả nghiệp vụ đều xảy ra tại cửa hàng hoặc do nhân viên cửa hàng tạo.

---

Epic 1 — Khách hàng & Loyalty
U-11
- Title: Đăng ký và quản lý khách hàng (ポイント/会員)
- As a: Nhân viên thu ngân / Khách hàng
- I want: Đăng ký thông tin khách hàng, lưu lịch sử mua & điểm tích luỹ
- So that: Thực hiện chương trình khách hàng thân thiết và phân tích
- Acceptance criteria:
  - Tạo/tra cứu hồ sơ khách hàng bằng phone/email/カード番号.
  - Tích điểm tự động theo chính sách và hiển thị điểm khả dụng.
- Priority: High
- Estimate: 4

U-12
- Title: Coupon/voucher & campaign áp dụng tại POS
- As a: Khách hàng/Marketing
- I want: Áp voucher/k mã khuyến mãi khi thanh toán
- So that: Sử dụng khuyến mãi nhanh và chính xác
- Acceptance criteria:
  - Hỗ trợ mã QR/ mã chữ, kiểm tra điều kiện (ngày, sản phẩm).
  - Ghi log mã đã dùng và số lần sử dụng.
- Priority: Medium
- Estimate: 3

---

Epic 2 — Authentication & Authorization (Màn hình đăng nhập, phân quyền, quản lý vai trò)
U-23
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
- Priority: High
- Estimate: 3

U-24
- Title: Phân quyền theo vai trò (Role-Based Access Control - RBAC)
- As a: Quản lý / IT
- I want: Mô hình phân quyền theo vai trò (thu ngân, sales assist, kho, quản lý, admin)
- So that: Hạn chế các chức năng nhạy cảm theo vai trò và đảm bảo an ninh vận hành
- Acceptance criteria:
  - Hệ thống có roles chuẩn (Cashier, SalesAssist, Warehouse, Manager, Admin) có thể mở rộng.
  - Mỗi hành động nhạy cảm (refund, price override, discount > X%, finalize payment, void transaction, change tax, cancel PO) kiểm tra quyền tương ứng.
  - UI ẩn/disable các nút/các thao tác nếu user không có quyền.
  - Có permission kiểm soát granular (ví dụ: can_finalize_payment, can_process_refund, can_override_price).
- Priority: High
- Estimate: 5

U-25
- Title: Quản lý vai trò & phân quyền (Role & Permission Management UI)
- As a: IT / Quản lý chuỗi
- I want: Giao diện quản trị để tạo vai trò, gán permission và gán nhân viên vào vai trò/cửa hàng
- So that: Dễ cấu hình quyền theo tổ chức và theo cửa hàng
- Acceptance criteria:
  - UI cho phép tạo/ chỉnh sửa role, tick các permission, mô tả role.
  - Gán nhân viên vào vai trò và scope theo cửa hàng/terminal nếu cần.
  - Lưu lịch sử thay đổi role/assignment (audit).
  - Hỗ trợ import/export role/assignment (CSV) cho triển khai nhiều cửa hàng.
- Priority: Medium
- Estimate: 5

U-26
- Title: Supervisor / Manager override & approval flow
- As a: Thu ngân / Quản lý
- I want: Khi cần override (ví dụ refund không có receipt, giảm giá lớn, chỉnh giá), có thể yêu cầu manager override hoặc approval
- So that: Hành động nhạy cảm có kiểm soát và có trách nhiệm
- Acceptance criteria:
  - Khi cashier thực hiện hành động yêu cầu override, hệ thống khóa thao tác và hiển thị yêu cầu "Manager Approval".
  - Manager có thể approve bằng login trên terminal (username/password) hoặc bằng mã PIN nhanh; approval ghi audit (manager id, timestamp, lý do).
  - Nếu manager không có mặt, có tùy chọn "manager remote approve" qua app internal (cần authentication).
  - Các thao tác override được lưu lại kèm lý do bắt buộc.
- Priority: High
- Estimate: 3

U-27
- Title: Đăng nhập/ca làm việc (Shift login & session tie to shift)
- As a: Quản lý / Thu ngân
- I want: Gán login vào ca làm việc; cho phép mở/đóng ca, tạm khóa ca khi chuyển ca
- So that: Theo dõi doanh thu theo ca và tránh nhầm lẫn khi thay đổi nhân viên
- Acceptance criteria:
  - Khi nhân viên login, hệ thống hỏi mở ca mới hoặc join ca hiện tại (nếu role cho phép).
  - Có màn hình mở/đóng ca với số dư tiền mặt ban đầu, nhập tiền ban đầu (float).
  - Khi đóng ca, yêu cầu báo cáo, reconcile, và ghi log user đóng ca.
  - Nếu user logout giữa ca, ca vẫn thuộc user hiện tại cho đến khi được đóng/transfer.
- Priority: Medium
- Estimate: 3

U-28
- Title: Xác thực mạnh cho quyền quản trị (MFA for admin / sensitive actions)
- As a: IT/Security
- I want: Bắt buộc MFA cho admin hoặc cho các hành động nhạy cảm
- So that: Giảm thiểu rủi ro truy cập bất hợp pháp
- Acceptance criteria:
  - Hỗ trợ OTP (TOTP) hoặc SMS 2FA cho tài khoản admin/manager.
  - Cho phép bật/tắt MFA theo role hoặc theo user (IT policy).
  - Các hành động nhạy cảm (thay đổi cấu hình, export dữ liệu lớn) yêu cầu MFA step-up auth.
- Priority: High
- Estimate: 5

U-29
- Title: Đăng nhập nhanh bằng thẻ/NFC/Badge (Optional hardware login)
- As a: Nhân viên / Kỹ thuật
- I want: Đăng nhập nhanh bằng thẻ RFID/NFC hoặc gắn thiết bị đọc thẻ để login/checkout nhanh
- So that: Tăng tốc thao tác cho nhân viên và giảm nhầm lẫn password share
- Acceptance criteria:
  - Hỗ trợ mapping badge ID → user account; reader plug-and-play.
  - Khi quẹt badge, yêu cầu PIN thêm nếu cấu hình "two-factor badge".
  - Badge login vẫn tuân thủ RBAC; badge bị disable nếu user bị suspend.
  - Ghi audit badge use.
- Priority: Medium
- Estimate: 3

U-30
- Title: Quản lý mật khẩu, reset, khóa tài khoản và audit bảo mật
- As a: IT / Helpdesk
- I want: Quy trình reset mật khẩu, khóa tài khoản, unlock và logging các sự kiện bảo mật
- So that: Hỗ trợ nhân viên khi quên mật khẩu và bảo vệ hệ thống
- Acceptance criteria:
  - Quy trình reset mật khẩu: self-service (email OTP) hoặc qua helpdesk với manager approval.
  - Tự động khóa sau X lần nhập sai (configurable) và thông báo tới admin.
  - Lịch sử event (failed login, lock, unlock, password change) được ghi log và có báo cáo an ninh.
- Priority: High
- Estimate: 3

---

Epic 3 — In-store Sales & Provisional Orders (tương tác nhân viên ↔ khách)
U-21
- Title: Tạo đơn hàng chưa chính thức (Provisional / Quotation → gửi đến thu ngân)
- As a: Nhân viên tư vấn bán hàng (floor staff / mobile sales)
- I want: Tạo đơn hàng tạm (未確定 / provisional) chứa sản phẩm, giá, khuyến mãi, điều kiện giao hàng và (tuỳ chọn) đặt cọc, rồi gửi trực tiếp đến nhân viên quầy/terminal để hoàn tất thanh toán nếu khách đồng ý
- So that: Khách không phải chờ tại quầy — nhân viên quầy nhận đơn sẵn sàng xử lý, giảm thời gian chờ và tránh sai sót
- Acceptance criteria:
  - Tạo đơn provisional:
    - Nhân viên tư vấn có thể tạo đơn tạm trên thiết bị di động/tablet/terminal bán hàng với: danh sách sản phẩm (bằng quét barcode hoặc tìm kiếm), số lượng, khuyến mãi/voucher, phí vận chuyển, phí tái chế nếu có, và ghi chú lắp đặt.
    - Hệ thống tạo mã đơn provisional duy nhất (ví dụ: PROV-YYYYMMDD-XXXX) và hiển thị trạng thái "Provisional / 未確定".
    - Có trường khách hàng (tùy chọn): tên, số điện thoại, email; có thể dùng để gửi thông báo nội bộ (ví dụ SMS nội bộ/ghi chú).
  - Quản lý stock/hold:
    - Khi tạo đơn provisional, có tuỳ chọn "hold stock" (giữ hàng) để kho hoặc hệ thống giảm số khả dụng tạm thời; hold có thời hạn cấu hình được (ví dụ 30 phút).
    - Nếu hold được kích hoạt, mục hàng bị đánh dấu reserved và không thể bán cho khách khác trong thời gian hold.
    - Nếu hold hết hạn thì stock được tự động giải phóng và trạng thái đơn chuyển sang "Expired".
  - Gửi và thông báo đến quầy:
    - Nhân viên tư vấn có nút "Gửi đến quầy" để push đơn vào queue POS/thu ngân.
    - Tại các terminal quầy có màn hình "Pending from floor / フロア受付" hiển thị danh sách đơn provisional gửi đến (mã đơn, nhân viên gửi, thời gian, tóm tắt hàng, hold expiry, deposit).
    - Khi một đơn mới được gửi, nhân viên quầy nhận cảnh báo hình/họa/âm thanh (cấu hình được).
  - Hoàn tất/Chuyển đổi đơn:
    - Nhân viên quầy có thể mở đơn provisional, chỉnh sửa (số lượng/giá/khuyến mãi) theo quyền, tiến hành thanh toán đầy đủ hoặc nhận đặt cọc; sau khi thanh toán, đơn provisional chuyển thành đơn chính thức/receipt với liên kết đến mã giao dịch.
    - Nếu khách yêu cầu thay đổi (ví dụ thêm phí lắp đặt), nhân viên quầy có thể lưu thay đổi và thông báo lại nhân viên tư vấn.
    - Hệ thống in領収書 hoặc gửi 電子レシート cho khách với ghi chú "Bắt nguồn từ đơn provisional PROV-...".
  - Hủy/Quá hạn:
    - Nhân viên tư vấn hoặc quầy có thể hủy đơn provisional (vì khách từ chối) và hệ thống ghi lý do.
    - Nếu đơn hết hạn (hold expiry) và không được hoàn tất, hệ thống đánh dấu "Expired" và giải phóng stock; có thông báo cho nhân viên gửi.
  - Bảo mật & quyền:
    - Chức năng chỉ mở cho role có quyền "Sales Assist / Floor Staff".
    - Chỉ role "Cashier" hoặc role có quyền tương ứng mới được finalize thanh toán.
  - Audit & logging:
    - Mọi thao tác (tạo, gửi, chỉnh sửa, hoàn tất, hủy) ghi audit log: user, timestamp, thay đổi nội dung và lý do (nếu có).
  - Trạng thái hiển thị & tìm kiếm:
    - POS/Backoffice có filter cho Provisional orders theo trạng thái (pending, hold, expired, completed, cancelled), theo nhân viên gửi, theo cửa hàng hoặc theo thời gian.
  - Khả năng xử lý song song:
    - Nếu nhiều terminal cùng xử lý, hệ thống phải đảm bảo consistency: tránh oversell bằng cơ chế lock/optimistic concurrency khi finalize hoặc khi hold stock.
  - Noti nội bộ:
    - Có tuỳ chọn gửi thông báo nội bộ (SMS hoặc message nội bộ) cho nhân viên khi: đơn created, sent to cashier, payment completed, hoặc khi hold expired.
- Priority: High
- Estimate: 5

U-22
- Title: Hỗ trợ khách không có tài khoản / khách vãng lai (Guest) cho provisional orders và checkout
- As a: Thu ngân / Nhân viên tư vấn
- I want: Có thể tạo provisional order và hoàn tất thanh toán cho khách không có tài khoản (khách vãng lai) mà không buộc phải tạo hồ sơ khách hàng
- So that: Khách không bị bắt buộc đăng ký, quy trình nhanh gọn và vẫn đảm bảo truy vết giao dịch, trả hàng và giao hàng khi cần
- Acceptance criteria:
  - Định nghĩa:
    - "Khách không có tài khoản / khách vãng lai" = khách không có hồ sơ thành viên trong hệ thống; POS sẽ đánh dấu customer_type = "guest" và không tạo customer_id tự động.
  - Tạo giao dịch cho khách vãng lai:
    - POS cho tuỳ chọn "Khách không có tài khoản / Khách vãng lai" khi tạo provisional hoặc checkout; hệ thống luôn tạo mã giao dịch/receipt.
    - Không yêu cầu các trường PII bắt buộc khi chọn loại này, ngoại trừ khi khách muốn nhận e-receipt (bắt buộc cung cấp email/phone).
    - POS in領収書 giấy theo mặc định (nếu khách không cung cấp email/phone).
  - Provisional orders:
    - Có thể tạo provisional cho khách vãng lai; tuỳ chọn "hold stock" vẫn hoạt động nhưng có hold tối đa mặc định ngắn hơn (ví dụ 30 phút, cấu hình được).
    - Màn hình quầy hiển thị rõ "Khách vãng lai" và hold expiry.
  - Delivery / Installation:
    - Nếu chọn giao hàng/lắp đặt thì bắt buộc thu tên + số điện thoại + địa chỉ trước khi lập lịch; hệ thống không cho phép lên lịch nếu thiếu thông tin bắt buộc.
  - Refund / Return:
    - Hệ thống cho phép refund dựa trên receipt/transaction ID. Nếu không có receipt, yêu cầu lookup theo transaction ID, thời gian, terminal. Nếu không thể xác thực, quy trình yêu cầu manager approval hoặc trả bằng phiếu mua hàng theo chính sách cửa hàng.
  - Loyalty:
    - Giao dịch cho khách vãng lai không tích điểm. Có chức năng "Link to customer" để gắn giao dịch vào hồ sơ khách khi khách cung cấp thông tin sau đó (yêu cầu xác thực bằng mã giao dịch và phương thức thanh toán).
  - Audit & Reporting:
    - Mọi giao dịch khách vãng lai ghi log: terminal ID, cashier ID, timestamp, transaction/provisional ID, hold status.
  - Privacy & Retention:
    - Nếu thu PII cho giao hàng, lưu trữ tối thiểu cho mục đích thực hiện dịch vụ và xóa/ẩn theo chính sách lưu trữ (tuân thủ APPI).
  - Search & Recovery:
    - Hỗ trợ tìm giao dịch khách vãng lai bằng transaction ID/receipt, terminal, cashier, ngày giờ.
  - UX:
    - POS hiển thị rõ trạng thái "Khách không có tài khoản / Khách vãng lai" trên UI và trên receipt để tránh nhầm lẫn với giao dịch có customer profile.
- Priority: High
- Estimate: 2

---

Epic 4 — Thanh toán & Checkout (sau khi khách & đơn đã sẵn sàng)
U-01
- Title: Thanh toán quầy nhanh (scan & checkout)
- As a: Thu ngân
- I want: Quét mã vạch/SKU, điều chỉnh số lượng/giảm giá và thấy tổng tiền + thuế
- So that: Thu tiền nhanh và chính xác
- Acceptance criteria:
  - Thêm/xóa sản phẩm bằng quét barcode hoặc tìm SKU.
  - Hiển thị giá gốc, 消費税 (10%) theo hàng, tổng trước/ sau thuế.
  - Có nút điều chỉnh số lượng, áp voucher/giảm giá cho mỗi dòng.
- Priority: High
- Estimate: 3

U-02
- Title: Hỗ trợ thanh toán đa phương thức
- As a: Khách hàng
- I want: Thanh toán bằng tiền mặt, thẻ, IC card, QR, hoặc trả góp
- So that: Chọn cách tiện nhất cho tôi
- Acceptance criteria:
  - Các lựa chọn 現金/クレジット/IC/QR/分割 hiển thị rõ.
  - Lưu trạng thái giao dịch (thành công/thất bại) và mã giao dịch.
  - Thực hiện quy trình trả góp: chọn kỳ, in hợp đồng, gửi bản sao.
- Priority: High
- Estimate: 5

U-03
- Title: In領収書 và gửi 電子レシート
- As a: Khách hàng
- I want: Nhận領収書 giấy hoặc 電子レシート (email/SMS) theo yêu cầu
- So that: Lưu giữ chứng từ để chi trả/hoàn thuế
- Acceptance criteria:
  - In mẫu領収書 gồm tên cửa hàng, mã giao dịch, thuế và tổng.
  - Gửi e-receipt kèm chi tiết sản phẩm khi khách chọn (bắt buộc có email/phone).
  - Nếu khách là khách vãng lai và không cung cấp email/phone thì in giấy bắt buộc.
- Priority: High
- Estimate: 2

---

Epic 5 — Kho & Chuỗi cung ứng (hỗ trợ cho order & fulfillment)
U-04
- Title: Quản lý tồn kho trung tâm & cửa hàng
- As a: Quản lý kho
- I want: Xem tồn kho theo kho trung tâm, cửa hàng và vị trí kệ
- So that: Điều phối hàng hóa hiệu quả
- Acceptance criteria:
  - Hiển thị tồn kho theo location (warehouse/store/aisle/shelf).
  - Đồng bộ khi có bán hàng, trả hàng, chuyển kho, nhập hàng.
- Priority: High
- Estimate: 5

U-05
- Title: Nhập hàng/PO và kiểm nhận theo serial
- As a: Nhân viên kho
- I want: Tạo PO, quét khi nhận hàng và đối chiếu serial
- So that: Tránh sai sót và theo dõi bảo hành
- Acceptance criteria:
  - Tạo PO, nhập số lượng, quét barcode/serial khi nhận.
  - Ghi log người nhận và thời gian, báo lỗi khi thiếu/không khớp.
- Priority: High
- Estimate: 5

U-06
- Title: Tự động đặt hàng khi tồn kho thấp
- As a: Quản lý mua hàng
- I want: Cảnh báo tồn kho thấp và gợi ý tạo PO tự động
- So that: Không hết hàng mặt hàng bán chạy
- Acceptance criteria:
  - Thiết lập ngưỡng tối thiểu cho từng SKU.
  - Khi dưới ngưỡng, gửi cảnh báo và tạo draft PO.
- Priority: Medium
- Estimate: 3

---

Epic 6 — Giao hàng, lắp đặt & logistics (thực hiện sau thanh toán/confirm)
U-07
- Title: Tạo đơn giao hàng & lịch lắp đặt
- As a: Nhân viên bán hàng/Logistics
- I want: Lên lịch giao hàng và lắp đặt cho hàng lớn
- So that: Khách được giao và lắp đặt đúng giờ
- Acceptance criteria:
  - Tạo shipment với địa chỉ, ngày giờ, yêu cầu lắp đặt.
  - Gửi thông báo cho khách (SMS/email) và cập nhật trạng thái giao hàng.
- Priority: High
- Estimate: 5

U-08
- Title: Tính phí vận chuyển và phí tái chế
- As a: Khách hàng thu ngân
- I want: Hệ thống tự tính phí vận chuyển/ 家電リサイクル nếu áp dụng
- So that: Tính đúng chi phí cuối cùng
- Acceptance criteria:
  - Công thức tính phí theo vùng và loại sản phẩm.
  - Hiển thị phí tái chế khi bán thiết bị lớn.
- Priority: Medium
- Estimate: 3

---

Epic 7 — Bảo hành & Đổi trả (sau bán & lắp đặt)
U-09
- Title: Quản lý bảo hành (保証書) và đăng ký bảo hành mở rộng
- As a: Nhân viên dịch vụ
- I want: Lưu thông tin bảo hành theo serial và đăng ký mở rộng
- So that: Dễ tra cứu khi khách đến bảo hành
- Acceptance criteria:
  - Lưu serial, ngày mua, thời hạn và loại bảo hành.
  - Hỗ trợ đăng ký bảo hành mở rộng và in/ gửi chứng nhận.
- Priority: High
- Estimate: 4

U-10
- Title: Xử lý đổi trả & refund theo chính sách
- As a: Thu ngân
- I want: Thực hiện trả hàng/hoàn tiền theo chính sách (thời hạn, điều kiện)
- So that: Duy trì quy trình nhất quán và lưu bằng chứng
- Acceptance criteria:
  - Kiểm tra điều kiện đổi trả (thời hạn, tình trạng).
  - Ghi nhận lý do, in biên nhận, hoàn tiền theo phương thức ban đầu hoặc phiếu mua hàng.
  - Với khách vãng lai: refund dựa trên receipt/transaction ID; nếu không thể xác thực, yêu cầu manager approval hoặc trả bằng phiếu mua hàng theo chính sách.
- Priority: High
- Estimate: 3

---

Epic 8 — Tích hợp phần cứng & thiết bị (hỗ trợ vận hành quầy)
U-19
- Title: Kết nối thiết bị ngoại vi (máy quét, máy in, thiết bị đọc IC)
- As a: Kỹ thuật
- I want: POS tích hợp plug-and-play với thiết bị tiêu chuẩn
- So that: Dễ triển khai cho các quầy
- Acceptance criteria:
  - Hỗ trợ driver cho máy in hóa đơn nhiệt, máy quét barcode và máy đọc IC.
  - Kiểm tra trạng thái thiết bị và hiển thị lỗi nếu mất kết nối.
- Priority: High
- Estimate: 4

---

Epic 9 — Nhân sự & Vận hành cửa hàng
U-17
- Title: Quản lý ca làm việc & phân quyền nhân viên
- As a: Quản lý cửa hàng
- I want: Tạo ca, gán quyền (thu ngân, kho, quản lý) và chấm công
- So that: Kiểm soát truy cập và theo dõi doanh thu theo ca
- Acceptance criteria:
  - Tạo ca, login/logout theo ca, gán role.
  - Doanh thu theo ca được tổng hợp tự động.
- Priority: Medium
- Estimate: 3

U-18
- Title: Xử lý nhiều quầy/ POS cùng lúc
- As a: Quản lý
- I want: Hệ thống hỗ trợ nhiều terminal/thu ngân làm việc song song
- So that: Vận hành siêu thị với lưu lượng khách cao
- Acceptance criteria:
  - Đồng bộ stock real-time, tránh oversell.
  - Mỗi terminal ghi log giao dịch riêng.
- Priority: High
- Estimate: 5

---

Epic 10 — Báo cáo & Kế toán
U-15
- Title: Báo cáo doanh thu, thuế và báo cáo hàng ngày
- As a: Kế toán/Quản lý
- I want: Báo cáo doanh thu theo cửa hàng, kênh, theo thuế
- So that: Chuẩn bị sổ sách và nộp thuế đúng
- Acceptance criteria:
  - Báo cáo doanh thu before/after tax, theo loại thuế.
  - Export CSV/Excel, lọc theo ngày/cửa hàng/người thu ngân.
- Priority: High
- Estimate: 4

U-16
- Title: Audit log & theo dõi giao dịch
- As a: Auditor/Quản lý
- I want: Lưu audit trail của hoạt động quan trọng (refund, discount, price change)
- So that: Truy nguồn khi có tranh chấp
- Acceptance criteria:
  - Ghi user, timestamp, hành động, lý do (nếu có).
  - Tìm kiếm/ lọc audit theo user/ loại hành động/ khoảng thời gian.
- Priority: High
- Estimate: 3

---

Epic 11 — Bảo mật & Tuân thủ
U-20
- Title: Bảo mật giao dịch & lưu trữ dữ liệu cá nhân
- As a: IT/Security
- I want: Mã hóa dữ liệu nhạy cảm, tuân thủ luật bảo mật
- So that: Bảo vệ thông tin khách hàng và tránh rủi ro pháp lý
- Acceptance criteria:
  - Mã hóa PII, tuân thủ các chính sách lưu trữ.
  - Quản lý quyền truy cập và audit.
- Priority: High
- Estimate: 5