# LinkedIn Learning Auto-Streamer 🚀

**LinkedIn Learning Auto-Streamer** là một Chrome Extension giúp tự động hóa quá trình học tập, tối ưu cho việc trình chiếu (slideshow) nội dung liên tục mà không cần tác động thủ công.

## ✨ Tính năng cập nhật (v1.3)

* **[Mới] Tự động đọc tài liệu:** Nhận diện các trang "Reading Material" (Tài liệu đọc) và tự động nhấn **Next** sau 5 giây để tiếp tục khóa học.
* **Tự động chuyển Section:** Vượt qua màn hình "You’re almost there!" bằng cách tự động click **Continue course**.
* **Tiếp tục bài học:** Tự động click vào các nút **Next Up** (hình ảnh thumbnail) khi video kết thúc.
* **Bỏ qua Quiz:** Tự động nhấn **Skip** hoặc **Resume** tại các điểm kiểm tra kiến thức giữa bài.
* **Chống treo máy:** Tự động xác nhận khi LinkedIn hỏi "Are you still watching?".

## 🛠 Hướng dẫn cài đặt

1.  Lưu file `manifest.json` và `content.js` vào thư mục `LinkedInAutoPlayer`.
2.  Mở Chrome, truy cập `chrome://extensions/`.
3.  Bật **Developer mode** (Góc trên bên phải).
4.  Chọn **Load unpacked** và trỏ đến thư mục trên.
5.  F5 lại trang LinkedIn Learning để áp dụng thay đổi.

## 📂 Cấu trúc dự án
* `manifest.json`: Cấu hình quyền truy cập.
* `content.js`: Logic điều hướng tự động dựa trên DOM Selector và Text Matching.

## ⚠️ Lưu ý
* **Tốc độ:** Mặc định script quét mỗi 3 giây và đợi 5 giây tại trang tài liệu để đảm bảo tính ổn định.
* **Bảo trì:** Nếu LinkedIn thay đổi giao diện, hãy cập nhật lại các Class Selector trong `content.js` dựa trên mã HTML thực tế.

---
*Phát triển bởi Trí tuệ nhân tạo dành cho cộng đồng tự học.*