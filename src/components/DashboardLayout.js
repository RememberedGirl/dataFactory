
/**
 * Класс SeederElement предоставляет методы для управления элементами и стилями в DOM.
 */
class SeederElement {
    constructor(wGeneralRenderTo) {
        this.wGeneralRenderTo = wGeneralRenderTo;
    }

    /**
     * Добавляет HTML-элемент в виджет.
     * @param {string} elementHTML HTML-код элемента для добавления в виджет.
     */
    addElementToWidget(elementHTML) {
        const widgetBody = document.querySelector('#widget-' + this.wGeneralRenderTo + ' .va-widget-body');
        if (widgetBody) {
            widgetBody.innerHTML = elementHTML;
        } else {
            console.error('Виджет с ID', this.wGeneralRenderTo, 'или его тело не найдено');
        }
    }

    addStyleToWidget(styleString) {
        const div = document.querySelector('#widget-' +this.wGeneralRenderTo + ' .va-widget-body');
        if (!div) {
            console.error("Div с id", wGeneralRenderTo, "не найден");
            return;
        }
        div.style.cssText = styleString;
    }
    /**
     * Добавляет стиль в DOM.
     * @param {string} styleString Строка, содержащая CSS-стили для добавления в DOM.
     * @param {string} [styleId] Идентификатор стиля. Если не указан, будет использован wGeneralRenderTo.
     */
    addStyleToDOM(styleString, styleId = this.wGeneralRenderTo) {
        // Добавляем #+this.wGeneralRenderTo к каждому селектору в стиле
        let updatedStyleString = styleString
        if (styleId === this.wGeneralRenderTo) {
//          .replace(/(^|,|})\s*([^,{]+)/g, `$1 #${this.wGeneralRenderTo} $2`)
//          /.../g: Это литерал регулярного выражения, где / начинает и заканчивает выражение, а g - флаг,
//                     указывающий на глобальный поиск (т.е. поиск всех вхождений, а не только первого).
//         (^|,|}): Это группа символов, которая совпадает с началом строки (^), запятой или закрывающей скобкой }.
//                     Этот фрагмент предназначен для выбора начала селектора (после запятой или в начале строки)
//                     или конца правила стиля (после закрывающей скобки).
//         \s*: Этот фрагмент совпадает с любым количеством пробелов (включая ноль),
//                     после которых может следовать селектор.
//         ([^,{]+): Это группа символов, которая совпадает с любым непустым набором символов,
//                     кроме запятых и открывающих скобок {.
//                     Она захватывает селектор (или правило стиля) внутри строки styleString.
//         $1 #${this.wGeneralRenderTo} $2: Это строка замены,
//                     которая вставляет #${this.wGeneralRenderTo} перед каждым селектором в строке styleString.
//                     $1 соответствует группе символов (^|,|}), а $2 соответствует группе ([^,{]+).

            updatedStyleString = styleString.replace(/(^|,|})\s*([^,{]+)/g, `$1 #widget-${this.wGeneralRenderTo} $2`);

        }


        // Перебираем все элементы <style> и ищем среди них нужный по id
        const styles = document.getElementsByTagName('style');
        let foundStyle = null;
        for (let i = 0; i < styles.length; i++) {
            if (styles[i].id === styleId) {
                foundStyle = styles[i];
                break;
            }
        }

        if (foundStyle) {
            // Если найден нужный элемент <style>, обновляем его содержимое
            foundStyle.textContent = updatedStyleString;
        } else {
            // Если стиль не существует, создаем новый элемент стиля и добавляем его в head
            const styleElement = document.createElement('style');
            styleElement.id = styleId;
            styleElement.appendChild(document.createTextNode(updatedStyleString));
            document.head.appendChild(styleElement);
        }
    }


    /**
     * Добавляет библиотеку в DOM.
     * @param {string} libraryUrl URL-адрес библиотеки для добавления в DOM.
     */
    addLibraryToDOM(libraryUrl) {
        // Проверяем существует ли уже скрипт с таким URL-адресом
        let existingScript = document.querySelector(`script[src="${libraryUrl}"]`);
        if (!existingScript) {
            // Если скрипт не существует, создаем новый элемент script и добавляем его в body
            const scriptElement = document.createElement('script');
            scriptElement.src = libraryUrl;
            document.body.appendChild(scriptElement);
        }
    }

    /**
     * Функция генерации стиля сетки.
     * @param {number} w - Количество столбцов.
     * @param {number} h - Количество строк.
     * @returns {string} - Стиль сетки в формате строки.
     */
    generateGridStyle(w, h) {
        // Функция для округления значения до ближайшего десятка
        const gridTo = e => Math.floor(e / 10);

        // Возвращаем строку со стилями сетки
        return `
        display: grid;
        grid-template-columns: repeat(${gridTo(w)}, 1fr);
        grid-template-rows: repeat(${gridTo(h)}, 1fr);
        gap: 0px;
        box-sizing: border-box;
        background-color: #fff;
        margin: 0px;
        padding: 10px;
    `;
    }

    /**
     * Функция генерации HTML для элементов сетки.
     * @param {Array[]} tileArray - Массив элементов сетки.
     * @returns {string} - HTML для элементов сетки.
     */
    generateDancingTiles(tileArray) {
        let html = '';
        // Перебираем каждый элемент массива
        tileArray.forEach((tile, index) => {
            // Извлекаем значения идентификатора, класса, количества столбцов и строк из текущего элемента массива
            const [id, className, columns, rows] = tile;
            // Формируем HTML для текущего элемента сетки и добавляем его к общей строке HTML
            html += `<div id="${id}" class="${className}"
                 style=" 
                    grid-row: span ${rows}; grid-column: span ${columns};
                 ">
                    загрузка...
                 </div>`;
        });
        return html; // Возвращаем сгенерированный HTML
    }

    /**
     * Добавляет макет плитки в виджет.
     * @param {Array[]} tileArray - Массив элементов сетки.
     * @param {string} styleString - Строка со стилями сетки.
     * @param {number} w - Количество столбцов (по умолчанию 1920).
     * @param {number} h - Количество строк (по умолчанию 1080).
     */
    addTilesToWidget(tileArray, styleStringSubsidiary , w = 1920, h = 1080) {
        const styleString = this.generateGridStyle(w, h);
        const elementHTML = this.generateDancingTiles(tileArray);

        this.addStyleToWidget(styleString);
        this.addStyleToDOM(styleStringSubsidiary)
        this.addElementToWidget(elementHTML);

    }


}



const tilesArray = [
    ["blok-1", "osnovaku widget", 13, 192],
    ["blok0", "osnovaku", 6, 142]
]