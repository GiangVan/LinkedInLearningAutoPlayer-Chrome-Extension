# 🚀 LinkedIn Learning Auto-Streamer

**Giải pháp tự động hóa học tập rảnh tay toàn diện trên nền tảng LinkedIn Learning.**

LinkedIn Learning Auto-Streamer là một Chrome Extension mạnh mẽ được thiết kế để loại bỏ mọi rào cản tương tác thủ công trong quá trình học tập. Công cụ này tự động hóa việc điều hướng, cho phép bạn tập trung hoàn toàn vào nội dung hoặc duy trì luồng phát kiến thức liên tục mà không cần chạm vào chuột hay bàn phím.

---

## 🔥 Tại sao bạn nên sử dụng công cụ này?

Việc học trên LinkedIn thường xuyên bị ngắt quãng bởi các trang tài liệu, màn hình chuyển chương hoặc các câu hỏi kiểm tra sự hiện diện. Điều này gây lãng phí thời gian và làm đứt quãng dòng chảy kiến thức. **Auto-Streamer** giải quyết triệt để nhờ:

* **Học tập không điểm dừng:** Kết nối liền mạch giữa Video, Tài liệu đọc và các Khóa học trong cùng một lộ trình (Learning Path).
* **Công nghệ Robust Detection:** Không dựa vào các ID dễ thay đổi (như `ember123`), script sử dụng thuật toán tìm kiếm theo ý nghĩa văn bản (Semantic Search) để đảm bảo luôn hoạt động dù LinkedIn cập nhật giao diện.
* **Tối ưu hóa thời gian:** Tự động hóa các thao tác lặp đi lặp lại như bấm "Skip" Quiz hoặc "Continue" chương mới.
* **Kiểm soát linh hoạt:** Giao diện điều khiển đơn giản giúp bạn bật/tắt chế độ tự động chỉ với một cú click.

---

## 🛠 Chức năng chính

1.  **Tự động chuyển khóa học (Learning Path):** Khi hoàn thành một khóa học, hệ thống tự động nhận diện và chuyển sang khóa học tiếp theo trong lộ trình.
2.  **Tự động chuyển bài Video:** Nhận diện và click "Next Up" ngay khi video kết thúc.
3.  **Tự động đọc tài liệu (Document Reading):** Phát hiện trang tài liệu văn bản và tự động nhấn "Next" sau 5 giây để đảm bảo hệ thống ghi nhận hoàn thành.
4.  **Tự động chuyển chương (Section):** Vượt qua màn hình "Course Incomplete" hoặc "You’re almost there" để sang chương tiếp theo.
5.  **Bỏ qua Quiz & Popup:** Tự động click các nút Skip, Resume, hoặc các cảnh báo "Still watching?" để tránh gián đoạn.

---

## 🚀 Hướng dẫn cài đặt

1.  **Tải mã nguồn:** Sao chép các file `manifest.json`, `content.js`, và `popup.html` vào cùng một thư mục (ví dụ: `LinkedInAutoPlayer`).
2.  **Truy cập Quản lý tiện ích:** Mở trình duyệt Chrome và nhập `chrome://extensions/` vào thanh địa chỉ.
3.  **Bật Chế độ nhà phát triển:** Gạt công tắc **Developer mode** ở góc trên bên phải màn hình.
4.  **Nạp tiện ích:** Nhấn nút **Load unpacked** và chọn thư mục `LinkedInAutoPlayer` bạn vừa tạo.
5.  **Sử dụng:** Ghim (Pin) tiện ích lên thanh công cụ, truy cập LinkedIn Learning và gạt nút **Bật**.

---

## 🔄 Cách cập nhật phiên bản mới

Để cập nhật khi có mã nguồn mới hoặc thay đổi cấu hình:
1.  Mở file `content.js` trên máy tính và dán nội dung mới vào.
2.  Truy cập lại `chrome://extensions/`.
3.  Tìm tiện ích **LinkedIn Learning Auto-Streamer** và nhấn vào biểu tượng **Reload (Mũi tên xoay tròn)**.
4.  F5 lại trang LinkedIn Learning đang học để áp dụng thay đổi.

---
*Phát triển nhằm mục đích hỗ trợ học tập rảnh tay và nâng cao trải nghiệm người dùng.*