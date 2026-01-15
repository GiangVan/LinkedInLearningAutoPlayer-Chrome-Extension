# LinkedIn Learning Auto-Streamer 🚀

Bộ công cụ tự động hóa rảnh tay cho LinkedIn Learning, được tối ưu hóa để chống lại các đợt cập nhật giao diện của website.

## ✨ Điểm khác biệt của phiên bản Robust (v1.5)

* **Loại bỏ phụ thuộc ID:** Không sử dụng các ID dễ thay đổi như `ember123`.
* **Semantic Search:** Tìm kiếm nút bấm dựa trên ý nghĩa văn bản (Text Content) và thuộc tính trợ năng (ARIA labels).
* **Deep Crawling:** Tự động tìm thẻ cha có khả năng click (`closest('button')`) khi nhận diện được văn bản bên trong.
* **Đa chế độ:** Hỗ trợ đồng thời Video, Tài liệu (Reading), Quiz và Chuyển chương (Section).

## 🛠 Cách cài đặt & Cập nhật
1. Lưu mã nguồn vào thư mục.
2. Tại `chrome://extensions/`, nạp thư mục qua **Load unpacked**.
3. Mỗi khi cập nhật code mới, hãy nhấn nút **Reload (biểu tượng xoay)** trên thẻ Extension để thay đổi có hiệu lực.

## ⚙️ Cơ chế hoạt động
Extension quét trang mỗi 3 giây. Riêng với tài liệu đọc, hệ thống sẽ đợi 5 giây để mô phỏng hành vi đọc của con người trước khi tự động nhấn "Next".

---
*Lưu ý: Luôn chạy trình duyệt ở tab đang hiển thị (active tab) để đạt hiệu quả cao nhất.*