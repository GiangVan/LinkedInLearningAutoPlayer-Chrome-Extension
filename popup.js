const toggle = document.getElementById('statusToggle');
const statusText = document.getElementById('statusText');

function updateUI(isEnabled) {
    toggle.checked = isEnabled;
    statusText.innerText = isEnabled ? "Đang hoạt động" : "Đang tạm dừng";
}

// Lấy trạng thái từ Storage (mặc định là true)
chrome.storage.local.get({ enabled: true }, (result) => {
    updateUI(result.enabled);
});

// Xử lý sự kiện thay đổi
toggle.addEventListener('change', () => {
    const isEnabled = toggle.checked;
    
    chrome.storage.local.set({ enabled: isEnabled }, () => {
        updateUI(isEnabled);
        
        // Gửi tin nhắn đến Content Script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, { enabled: isEnabled }).catch(() => {
                    console.log("Tab chưa được làm mới.");
                });
            }
        });
    });
});