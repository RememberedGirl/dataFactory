/*
Файл widgetUtils.js содержит функции для работы с виджетами.
*/
/**
 * Функция выполняет поиск виджетов по их названиям и сохраняет их идентификаторы в объекте spravochnikId.
 *
 * @param {Object} spravochnik - Объект с названиями виджетов в качестве ключей и значениями 1 или 0 для указания важности виджета.
 * @returns {Object} - Объект с идентификаторами необходимых виджетов, сгруппированными по их названиям.
 */
function saveWidgetsToStorage(spravochnik) {
    let allWidgets = visApi().getWidgets();
    let spravochnikId = {};

    allWidgets.forEach(widget => {
        let text = widget.widgetState.title.text;
        let key = text.trim();
        let id = widget.widgetState.guid;

        if (spravochnik[key]) {
            if (spravochnik[key] === 1) {
                firstDateWidget = id;
                console.log(`Установлена подписка на ${firstDateWidget}`);
            } else {
                spravochnikId[key] = id;
            }
        }
    });

    return spravochnikId;
}


module.exports = {
    saveWidgetsToStorage
};