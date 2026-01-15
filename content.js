// content.js - Phiên bản cập nhật v1.2 chuyên xử lý chuyển Section

console.log("LinkedIn Auto Player (Section Update) đã được kích hoạt!");

function findButtonByText(textKeywords) {
    // Tìm tất cả các thẻ có khả năng là nút hoặc link
    const elements = document.querySelectorAll('button, a, span, div');
    for (let el of elements) {
        const text = (el.innerText || "").toLowerCase().trim();
        for (let keyword of textKeywords) {
            if (text === keyword.toLowerCase()) { // So khớp chính xác text
                // Trả về phần tử có thể click được (thẻ a hoặc button)
                return el.closest('a') || el.closest('button') || el;
            }
        }
    }
    return null;
}

function autoClicker() {
    try {
        // --- 1. XỬ LÝ CHUYỂN SECTION (Dựa trên HTML mới bạn cung cấp) ---
        // Tìm nút "Continue course" bằng class đặc trưng
        const continueSectionBtn = document.querySelector('a.media-screens-course-incomplete__show-all');
        if (continueSectionBtn && continueSectionBtn.offsetParent !== null) {
            console.log("👉 Phát hiện màn hình chuyển Section -> Đang chuyển tiếp...");
            continueSectionBtn.click();
            return;
        }

        // --- 2. XỬ LÝ NÚT "NEXT UP" (Màn hình kết thúc video) ---
        const nextUpBtn = document.querySelector('button.classroom-next-up__image-container');
        if (nextUpBtn && nextUpBtn.offsetParent !== null) {
            console.log("👉 Phát hiện nút 'Next Up' -> Click.");
            nextUpBtn.click();
            return;
        }

        // --- 3. XỬ LÝ CÁC NÚT ĐIỀU HƯỚNG CHUNG (Dùng text) ---
        // Thêm "continue course" vào danh sách nhận diện text
        const generalBtn = findButtonByText(["continue course", "skip", "bỏ qua", "resume", "tiếp tục"]);
        if (generalBtn && generalBtn.offsetParent !== null) {
            console.log("👉 Click nút điều hướng phát hiện được bằng văn bản.");
            generalBtn.click();
            return;
        }

        // --- 4. TỰ ĐỘNG CỦNG CỐ (Nếu video bị dừng/ended mà không tự chuyển) ---
        const videoElement = document.querySelector('video');
        if (videoElement && videoElement.ended) {
            const playerNextBtn = document.querySelector('.vjs-next-button') || 
                                 document.querySelector('[data-control-name="next_video"]');
            if (playerNextBtn) {
                console.log("👉 Video kết thúc -> Click Next trên thanh điều khiển.");
                playerNextBtn.click();
            }
        }

    } catch (err) {
        console.error("Lỗi Auto Player:", err);
    }
}

// Chạy kiểm tra mỗi 2 giây
setInterval(autoClicker, 2000);