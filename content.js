// content.js - Phiên bản v1.3: Hỗ trợ tự động chuyển trang tài liệu (Document)

console.log("LinkedIn Auto Player v1.3 đã sẵn sàng!");

function findButtonByText(textKeywords) {
    const elements = document.querySelectorAll('button, a, span');
    for (let el of elements) {
        const text = (el.innerText || "").toLowerCase().trim();
        for (let keyword of textKeywords) {
            if (text === keyword.toLowerCase()) {
                return el.closest('button') || el.closest('a') || el;
            }
        }
    }
    return null;
}

function autoClicker() {
    try {
        // --- 1. XỬ LÝ TÀI LIỆU (Document/Reading) ---
        // Phát hiện dựa trên class paging của tài liệu
        const docNextBtn = document.querySelector('.classroom-multimedia__paging button');
        if (docNextBtn) {
            const btnText = docNextBtn.innerText.toLowerCase();
            if (btnText.includes('next') && docNextBtn.offsetParent !== null) {
                console.log("👉 Phát hiện tài liệu bài đọc. Sẽ chuyển bài sau 5 giây...");
                // Đợi một chút để trang kịp load và mô phỏng việc đọc trước khi click
                setTimeout(() => {
                    docNextBtn.click();
                }, 5000);
                return;
            }
        }

        // --- 2. XỬ LÝ CHUYỂN SECTION (Màn hình Course Incomplete) ---
        const continueSectionBtn = document.querySelector('a.media-screens-course-incomplete__show-all');
        if (continueSectionBtn && continueSectionBtn.offsetParent !== null) {
            console.log("👉 Đang chuyển sang Section/Review tiếp theo...");
            continueSectionBtn.click();
            return;
        }

        // --- 3. XỬ LÝ NÚT "NEXT UP" (Thumbnail kết thúc video) ---
        const nextUpBtn = document.querySelector('button.classroom-next-up__image-container');
        if (nextUpBtn && nextUpBtn.offsetParent !== null) {
            console.log("👉 Kết thúc video. Đang Next...");
            nextUpBtn.click();
            return;
        }

        // --- 4. CÁC NÚT ĐIỀU HƯỚNG VĂN BẢN (Quiz/Skip) ---
        const generalBtn = findButtonByText(["continue course", "skip", "bỏ qua", "resume", "tiếp tục"]);
        if (generalBtn && generalBtn.offsetParent !== null) {
            console.log("👉 Đang xử lý nút điều hướng: " + generalBtn.innerText);
            generalBtn.click();
            return;
        }

        // --- 5. TỰ ĐỘNG CHUYỂN KHI VIDEO KẾT THÚC ---
        const videoElement = document.querySelector('video');
        if (videoElement && videoElement.ended) {
            const playerNextBtn = document.querySelector('.vjs-next-button') ||
                document.querySelector('[data-control-name="next_video"]');
            if (playerNextBtn) {
                playerNextBtn.click();
            }
        }

    } catch (err) {
        console.error("Lỗi Auto Player:", err);
    }
}

// Kiểm tra mỗi 3 giây để tránh xung đột với các hàm setTimeout bên trong
setInterval(autoClicker, 3000);