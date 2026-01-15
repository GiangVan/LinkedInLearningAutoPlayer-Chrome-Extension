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

function autoPlayerLogic() {
    if (!isAutoEnabled) return;

    try {
        // --- 1. XỬ LÝ NÚT "PLAY NEXT" KHI VIDEO KẾT THÚC ---
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

        // --- 2. ƯU TIÊN: Chuyển khóa học mới trong Learning Path ---
        const nextItemCard = document.querySelector('.media-screens-content-chaining__next-item');
        if (nextItemCard) {
            const nextCourseLink = nextItemCard.querySelector('a.entity-link');
            if (nextCourseLink && nextCourseLink.offsetParent !== null) {
                nextCourseLink.click();
                return;
            }
        }

        // --- 3. ƯU TIÊN: Nút điều hướng trên trang Tài liệu (Document) ---
        const nextDocBtn = findClickableByText(null, '.classroom-multimedia__paging span, .classroom-multimedia__paging button', ["next", "tiếp theo"]);
        if (nextDocBtn && nextDocBtn.offsetParent !== null) {
            console.log("📄 Đang đọc tài liệu... Sẽ chuyển bài sau 5s");
            setTimeout(() => { if (isAutoEnabled) nextDocBtn.click(); }, 5000);
            return;
        }

        // --- 4. ƯU TIÊN: Chuyển Section/Chương ---
        const continueBtn = findClickableByText(null, 'a, button', ["continue course", "tiếp tục khóa học"]);
        if (continueBtn && continueBtn.offsetParent !== null) {
            continueBtn.click();
            return;
        }

        // --- 5. ƯU TIÊN: Next Up Video (Thumbnail nhỏ góc màn hình) ---
        const nextUpBtn = document.querySelector('[class*="next-up__image-container"]') ||
            document.querySelector('[data-control-name="next_video"]');
        if (nextUpBtn && nextUpBtn.offsetParent !== null) {
            nextUpBtn.click();
            return;
        }

        // --- 6. ƯU TIÊN: Popup/Quiz/Still Watching ---
        const popupBtn = findClickableByText(null, 'button, a, span', ["skip", "bỏ qua", "resume", "yes", "still watching", "i'm back"]);
        if (popupBtn && popupBtn.offsetParent !== null) {
            popupBtn.click();
            return;
        }

    } catch (err) { }
}

setInterval(autoPlayerLogic, 3000);