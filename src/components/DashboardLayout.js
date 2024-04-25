class SeederElement {
    constructor(wGeneralRenderTo) {
        this.wGeneralRenderTo = wGeneralRenderTo;
    }

    addElementToWidget(elementHTML) {
        const widgetBody = document.querySelector('#widget-' + this.wGeneralRenderTo + ' .va-widget-body');
        if (widgetBody) {
            widgetBody.innerHTML = elementHTML;
        } else {
            console.error('Виджет с ID', this.wGeneralRenderTo, 'или его тело не найдено');
        }
    }

    addStyleToDOM(styleString) {
        const styleElement = document.createElement('style');
        styleElement.textContent = styleString;
        document.head.appendChild(styleElement);
    }

    addLibraryToDOM(libraryUrl) {
        const scriptElement = document.createElement('script');
        scriptElement.src = libraryUrl;
        scriptElement.async = true; // Чтобы скрипт загружался асинхронно
        document.body.appendChild(scriptElement);
    }
}