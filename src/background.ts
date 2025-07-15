// 监听工具栏按钮点击
chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
    if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { action: "modifyTask" }, (response?: { status: string }) => {
            if (response && response.status === "success") {
                console.log("任务修改成功");
            } else {
                console.log("任务修改失败");
            }
        });
    }
});