// content.js - v1.8.1 (Play Next only after video ends)
let isAutoEnabled = true;

chrome.storage.local.get({ enabled: true }, (result) => {
    isAutoEnabled = result.enabled;
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.hasOwnProperty('enabled')) {
        isAutoEnabled = request.enabled;
    }
});

/**
 * Tìm phần tử có thể bấm dựa trên danh sách từ khóa.
 * @param {ParentNode|null} container
 * @param {string} tagSelector
 * @param {string[]} keywords
 * @returns {HTMLElement|null}
 */
function findClickableByText(container, tagSelector, keywords) {
    const parent = container || document;
    const elements = parent.querySelectorAll(tagSelector);
    for (let el of elements) {
        const text = (el.innerText || el.textContent || "").toLowerCase().trim();
        for (let key of keywords) {
            if (text === key.toLowerCase()) {
                return el.closest('button') || el.closest('a') || el;
            }
        }
    }
    return null;
}

/**
 * Xử lý logic tự động phát và điều hướng.
 */
function autoPlayerLogic() {
    if (!isAutoEnabled) return;

    try {
        // --- 1. ƯU TIÊN: Nút "Return to learning path" sau khi hoàn thành khóa học ---
        const returnToPathBtn = findClickableByText(
            document,
            'a, button, span',
            ["return to learning path"]
        );
        if (returnToPathBtn && returnToPathBtn.offsetParent !== null) {
            console.log("↩️ Đang quay lại Learning Path...");
            returnToPathBtn.click();
            return;
        }

        // --- 2. ƯU TIÊN: Chọn khóa học chưa hoàn thành trong Learning Path ---
        const pathStepper = document.querySelector('.path-body-v2__stepper');
        if (pathStepper) {
            const pathCards = pathStepper.querySelectorAll('.path-body-v2__item-card');
            for (const card of pathCards) {
                const completedState = card.querySelector('.lls-card-completion-state--completed');
                // Nếu không có trạng thái hoàn thành thì coi là chưa học.
                if (!completedState) {
                    const courseLink = card.querySelector('a.entity-link');
                    if (courseLink && courseLink.offsetParent !== null) {
                        console.log("📚 Đang mở khóa học chưa hoàn thành trong Learning Path...");
                        courseLink.click();
                        return;
                    }
                }
            }
        }

        // --- 3. XỬ LÝ NÚT "PLAY NEXT" KHI VIDEO KẾT THÚC ---
        // Chỉ tìm nút này bên trong container thông báo hoàn thành video
        const videoCompleteOverlay = document.querySelector('.media-screens-playlist-item-complete__content');
        if (videoCompleteOverlay) {
            const playNextBtn = findClickableByText(videoCompleteOverlay, 'button, span', ["play next"]);
            if (playNextBtn && playNextBtn.offsetParent !== null) {
                console.log("✅ Video đã kết thúc. Đang bấm Play Next...");
                playNextBtn.click();
                return;
            }
        }

        // --- 4. ƯU TIÊN: Chuyển khóa học mới trong Learning Path ---
        const nextItemCard = document.querySelector('.media-screens-content-chaining__next-item');
        if (nextItemCard) {
            const nextCourseLink = nextItemCard.querySelector('a.entity-link');
            if (nextCourseLink && nextCourseLink.offsetParent !== null) {
                nextCourseLink.click();
                return;
            }
        }

        // --- 5. ƯU TIÊN: Nút điều hướng trên trang Tài liệu (Document) ---
        const nextDocBtn = findClickableByText(null, '.classroom-multimedia__paging span, .classroom-multimedia__paging button', ["next", "tiếp theo"]);
        if (nextDocBtn && nextDocBtn.offsetParent !== null) {
            console.log("📄 Đang đọc tài liệu... Sẽ chuyển bài sau 5s");
            setTimeout(() => { if (isAutoEnabled) nextDocBtn.click(); }, 5000);
            return;
        }

        // --- 6. ƯU TIÊN: Chuyển Section/Chương ---
        const continueBtn = findClickableByText(null, 'a, button', ["continue course", "tiếp tục khóa học"]);
        if (continueBtn && continueBtn.offsetParent !== null) {
            continueBtn.click();
            return;
        }

        // --- 7. ƯU TIÊN: Next Up Video (Thumbnail nhỏ góc màn hình) ---
        const nextUpBtn = document.querySelector('[class*="next-up__image-container"]') ||
            document.querySelector('[data-control-name="next_video"]');
        if (nextUpBtn && nextUpBtn.offsetParent !== null) {
            nextUpBtn.click();
            return;
        }

        // --- 8. ƯU TIÊN: Popup/Quiz/Still Watching ---
        const popupBtn = findClickableByText(null, 'button, a, span', ["skip", "bỏ qua", "resume", "yes", "still watching", "i'm back"]);
        if (popupBtn && popupBtn.offsetParent !== null) {
            popupBtn.click();
            return;
        }

    } catch (err) { }
}

setInterval(autoPlayerLogic, 3000);
