let isActive = false;

document.addEventListener('DOMContentLoaded', () => {
    const featureSwitch = document.getElementById('featureSwitch');

    featureSwitch.addEventListener('change', () => {
        if (featureSwitch.checked) {
            isActive = true;
        } else {
            isActive = false;
        }

        // 상태 저장
        chrome.storage.local.set({ isActive });
    });

    // 초기 상태 가져오기 (저장된 상태가 있다면)
    chrome.storage.local.get(['isActive'], (result) => {
        featureSwitch.checked = result.isActive || false;
    });
});