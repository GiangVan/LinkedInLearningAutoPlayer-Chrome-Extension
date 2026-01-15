# LinkedIn Learning Auto-Streamer 🚀

**LinkedIn Learning Auto-Streamer** là một Chrome Extension mã nguồn mở giúp tự động hóa quá trình trải nghiệm học tập trên nền tảng LinkedIn Learning. Công cụ này được thiết kế đặc biệt cho mục đích **trình chiếu liên tục (continuous presentation)** các khóa học mà không cần sự tương tác vật lý từ chuột hoặc bàn phím.

---

## ✨ Tính năng chính

* **Tự động Next bài:** Nhận diện và click vào nút "Next Up" (Thumbnail) ngay khi video hiện tại kết thúc.
* **Tự động chuyển Section:** Phát hiện màn hình "Course Incomplete" hoặc "You’re almost there!" và tự động click "Continue course" để chuyển sang chương mới.
* **Bỏ qua Quiz/Knowledge Check:** Tự động tìm và click các nút "Skip" hoặc "Resume" khi gặp các bài kiểm tra kiến thức không bắt buộc.
* **Vượt rào "Idle Timeout":** Tự động xác nhận "Still watching?" để tránh bị dừng video khi treo máy lâu.
* **Xử lý thông minh:** Kết hợp linh hoạt giữa Class Selector và Text Content Matching để đảm bảo hoạt động ổn định.

---

## 🛠 Hướng dẫn cài đặt

Vì đây là Extension tự xây dựng (Unpacked), bạn cần cài đặt theo các bước sau:

1.  **Tải mã nguồn:** Lưu các file `manifest.json` và `content.js` vào cùng một thư mục (ví dụ: `LinkedInAutoPlayer`).
2.  **Truy cập Quản lý tiện ích:** Mở Chrome và nhập địa chỉ `chrome://extensions/`.
3.  **Bật Chế độ nhà phát triển:** Gạt công tắc **Developer mode** ở góc trên bên phải.
4.  **Nạp tiện ích:** Nhấn vào nút **Load unpacked** và chọn thư mục `LinkedInAutoPlayer` đã tạo.
5.  **Thưởng thức:** Mở một khóa học bất kỳ trên LinkedIn Learning, script sẽ tự động kích hoạt.

---

## 📂 Cấu trúc dự án

* `manifest.json`: Khai báo thông tin extension và quyền truy cập vào domain `linkedin.com`.
* `content.js`: Chứa logic JavaScript chính để quét DOM và thực hiện hành vi click tự động mỗi 2 giây.

---

## ⚙️ Tùy chỉnh (Customization)

Nếu bạn muốn thay đổi tốc độ quét, hãy mở file `content.js` và chỉnh sửa giá trị ở dòng cuối cùng:

```javascript
setInterval(autoClicker, 2000); // 2000ms = 2 giây mỗi lần quét