// content.js - Phiên bản v1.7 (Robust & Learning Path Support)
let isAutoEnabled = false;

chrome.storage.local.get(['enabled'], (result) => {
    isAutoEnabled = result.enabled || false;
});

chrome.runtime.onMessage.addListener((request) => {
    isAutoEnabled = request.enabled;
});

function findClickableByText(tagSelector, keywords) {
    const elements = document.querySelectorAll(tagSelector);
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
        // 1. ƯU TIÊN: Chuyển khóa học mới trong Learning Path (Khi hoàn thành 1 khóa)
        const nextItemCard = document.querySelector('.media-screens-content-chaining__next-item');
        if (nextItemCard) {
            const nextCourseLink = nextItemCard.querySelector('a.entity-link');
            if (nextCourseLink && nextCourseLink.offsetParent !== null) {
                nextCourseLink.click();
                return;
            }
        }

        // 2. ƯU TIÊN: Nút Next trên trang Tài liệu (Document)
        const nextDocBtn = findClickableByText('.classroom-multimedia__paging span, .classroom-multimedia__paging button', ["next", "tiếp theo"]);
        if (nextDocBtn && nextDocBtn.offsetParent !== null) {
            setTimeout(() => { if (isAutoEnabled) nextDocBtn.click(); }, 5000);
            return;
        }

        // 3. ƯU TIÊN: Chuyển Section/Chương học
        const continueBtn = findClickableByText('a, button', ["continue course", "tiếp tục khóa học"]);
        if (continueBtn && continueBtn.offsetParent !== null) {
            continueBtn.click();
            return;
        }

        // 4. ƯU TIÊN: Next Up Video (Thumbnail sau khi hết clip)
        const nextUpBtn = document.querySelector('[class*="next-up__image-container"]') || document.querySelector('[data-control-name="next_video"]');
        if (nextUpBtn && nextUpBtn.offsetParent !== null) {
            nextUpBtn.click();
            return;
        }

        // 5. ƯU TIÊN: Xử lý Popup/Quiz/Still Watching
        const popupBtn = findClickableByText('button, a, span', ["skip", "bỏ qua", "resume", "yes", "still watching", "i'm back", "tiếp tục"]);
        if (popupBtn && popupBtn.offsetParent !== null) {
            popupBtn.click();
            return;
        }
    } catch (err) { }
}

setInterval(autoPlayerLogic, 3000);