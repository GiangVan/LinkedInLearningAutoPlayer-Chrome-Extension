// content.js - Phiên bản Robust (Hạn chế tối đa phụ thuộc vào ID/Class biến động)

console.log("LinkedIn Auto Player [Robust Mode] đã kích hoạt!");

/**
 * Hàm tìm kiếm phần tử có khả năng click dựa trên nội dung văn bản
 * @param {string} tagSelector - Loại thẻ cần quét (button, a, span...)
 * @param {string[]} keywords - Danh sách từ khóa (Next, Skip, Continue...)
 */
function findClickableByText(tagSelector, keywords) {
    const elements = document.querySelectorAll(tagSelector);
    for (let el of elements) {
        const text = (el.innerText || el.textContent || "").toLowerCase().trim();
        const ariaLabel = (el.getAttribute('aria-label') || "").toLowerCase();

        for (let key of keywords) {
            if (text === key.toLowerCase() || ariaLabel.includes(key.toLowerCase())) {
                // Trả về phần tử click được gần nhất (chính nó hoặc cha của nó)
                return el.closest('button') || el.closest('a') || el;
            }
        }
    }
    return null;
}

function autoPlayerLogic() {
    try {
        // --- 1. XỬ LÝ TRANG TÀI LIỆU (DOCUMENT) ---
        // Thay vì bắt ID, ta tìm container có vai trò "paging" hoặc "multimedia"
        const nextDocBtn = findClickableByText('.classroom-multimedia__paging span, .classroom-multimedia__paging button', ["next", "tiếp theo"]);
        if (nextDocBtn && nextDocBtn.offsetParent !== null) {
            console.log("Found Document Next button via Semantic Search.");
            setTimeout(() => nextDocBtn.click(), 5000);
            return;
        }

        // --- 2. XỬ LÝ CHUYỂN SECTION (COURSE INCOMPLETE) ---
        // Tìm link có chứa chữ "Continue course" bất kể class là gì
        const continueSectionBtn = findClickableByText('a, button', ["continue course", "tiếp tục khóa học"]);
        if (continueSectionBtn && continueSectionBtn.offsetParent !== null) {
            console.log("Moving to next section...");
            continueSectionBtn.click();
            return;
        }

        // --- 3. XỬ LÝ NÚT NEXT UP (THUMBNAIL) ---
        // Sử dụng data-attribute hoặc class chức năng (ít thay đổi hơn ID)
        const nextUpBtn = document.querySelector('[class*="next-up__image-container"]') ||
            document.querySelector('[data-control-name="next_video"]');
        if (nextUpBtn && nextUpBtn.offsetParent !== null) {
            console.log("Clicking Next Up thumbnail...");
            nextUpBtn.click();
            return;
        }

        // --- 4. XỬ LÝ QUIZ / POPUP / ARE YOU STILL THERE ---
        const popupBtn = findClickableByText('button, a', ["skip", "bỏ qua", "resume", "yes", "still watching", "i'm back"]);
        if (popupBtn && popupBtn.offsetParent !== null) {
            console.log("Bypassing Quiz/Popup/Idle check...");
            popupBtn.click();
            return;
        }

        // --- 5. TỰ ĐỘNG CHUYỂN VIDEO (FALLBACK) ---
        const video = document.querySelector('video');
        if (video && video.ended) {
            const playerNext = document.querySelector('.vjs-next-button');
            if (playerNext) playerNext.click();
        }

    } catch (err) {
        // Không hiện log lỗi liên tục để tránh rác console
    }
}

// Chạy vòng lặp kiểm tra
setInterval(autoPlayerLogic, 3000);