function modifyFirstRow(): void {
    // 查找页面中的 iframe（假设它有 id="taskIframe"）
    const iframe: HTMLIFrameElement | null = document.querySelector('#appIframe-project');
    if (!iframe || !iframe.contentDocument) {
        console.log("未找到 iframe 或无法访问其内容");
        return;
    }

    // 获取 iframe 内的文档
    const iframeDoc: Document = iframe.contentDocument;

    // 在 iframe 内查找表格
    const tbody: HTMLTableSectionElement | null = iframeDoc.querySelector('#tableBody tbody');
    if (!tbody) {
        console.log("未找到表格 tbody");
        return;
    }

    const firstRow: HTMLTableRowElement | null = tbody.querySelector('tr:first-child');
    if (!firstRow) {
        console.log("未找到第一行");
        return;
    }

    const today: string = new Date().toISOString().split('T')[0];
    // 获取任务名称
    const taskName: string = iframeDoc.querySelector('.pull-left span').textContent!!;
    const nameInput: HTMLInputElement | null = firstRow.querySelector('input[name="name[1]"]');
    // if (nameInput) nameInput.value = `${taskName}接口开发`;
    if (nameInput) nameInput.value = `${taskName}前端开发`;

    const typeSelect: HTMLSelectElement | null = firstRow.querySelector('select[name="type[1]"]');
    if (typeSelect) typeSelect.value = "devel";

    const assignedToCell: HTMLSelectElement | null = firstRow.querySelector("[name='assignedTo[1]']")
    if (typeSelect) {
        assignedToCell!!.options[2].selected = true;
        assignedToCell!!.value = assignedToCell!!.options[2].value
    }

    const estStartedInput: HTMLInputElement | null = firstRow.querySelector('input[name="estStarted[1]"]');
    if (estStartedInput) estStartedInput.value = today;

    const deadlineInput: HTMLInputElement | null = firstRow.querySelector('input[name="deadline[1]"]');
    if (deadlineInput) deadlineInput.value = today;

    const descTextarea: HTMLTextAreaElement | null = firstRow.querySelector('textarea[name="desc[1]"]');
    // if (descTextarea) descTextarea.value = "根据评审完成的接口文档，完成接口并对接，自测，等待测试完成验收";
    if (descTextarea) descTextarea.value = "根据需求以及原型结合评审完成的接口文档，完成前端开发并对接，自测，等待测试完成验收";

    const priSelect: HTMLSelectElement | null = firstRow.querySelector('select[name="pri[1]"]');
    if (priSelect) priSelect.value = "1";

    console.log("iframe 内第一行已修改");
}

// 监听消息
chrome.runtime.onMessage.addListener(
    (message: { action: string }, sender: chrome.runtime.MessageSender, sendResponse: (response: { status: string }) => void) => {
        if (message.action === "modifyTask") {
            modifyFirstRow();
            sendResponse({ status: "success" });
        }
    }
);