const {
    addIntervalToDate,
    getStartEndPeriodDate,
    setDatePeriod,
    isDateComponentEqual,
    getWeekNumber,
    compareValues,

    DateCalculator
} = require('./dateUtils.js');

const {
    saveWidgetsToStorage,
} = require('./widgetUtils.js');

const {
    saveDatesToLocalStorage,
    getDatesFromLocalStorage,
} = require('./storageUtils.js');

/**
 * Функция выполнения расчетов и установки выбранных значений фильтрации.
 * @param {Date[]} date - Массив дат для расчетов.
 * @param {Object} spravochnikId - Объект с идентификаторами виджетов из справочника.
 * @param {Object} spravochnik - Справочник с функциями расчета для каждого виджета.
 */
function render(date, spravochnikId, spravochnik) {
    // Проходим по каждому ключу в объекте spravochnikId
    for (var key in spravochnikId) {
        let ret = [];
        // Проходим по каждой дате в массиве date
        date.forEach((e, i) => {
            // Если значение в справочнике для данного ключа и индекса равно null, пропускаем итерацию
            if (spravochnik[key][i] === null) return;
            // Создаем экземпляр класса DateCalculator с текущей датой
            const calculator = new DateCalculator(e);
            // Выполняем расчет с помощью функции из справочника и сохраняем результат в массив ret
            ret.push(spravochnik[key][i](calculator).getDate());
        });
        // Устанавливаем выбранные значения фильтрации для виджета с идентификатором spravochnikId[key]
        visApi().setDateFilterSelectedValues(spravochnikId[key], ret);
    }

    // Отрисовываем значения даты для отображения результата
    w.general.text = date.join('<br>');
    TextRender({
        text: w.general,
        style: w.style
    });
}


// Настройки фильтров из списка funcs
const spravochnik = {
    'Выбранный период': 1, // Фильтр для выбора текущего периода
    'Фильтр по датам 0': [e => e.calc('Относительный', 'год', -1), e => e], // Фильтр для последнего года
    'Фильтр по датам 1': [e => e.calc('Календарный', 'год', 'начало'), e => e.calc('Календарный', 'год', 'конец')], // Фильтр для текущего года
    'Фильтр по датам 2': [e => e.calc('Относительный', 'месяц', -2).calc('Установить', 'день', 1), e => e.calc('Относительный', 'месяц', -1).calc('Календарный', 'месяц', 'конец')], // Фильтр для последних двух месяцев
    'Фильтр по датам 3': [e => e.calc('Календарный', 'квартал', 'начало'), e => e.calc('Календарный', 'квартал', 'конец')], // Фильтр для текущего квартала
    'Фильтр по датам 4': [e => e.calc('Календарный', 'неделя', 'начало'), null], // Фильтр для текущей недели
    'Фильтр по датам 5': [null, e => e.calc('Относительный', 'год', -1)], // Фильтр для прошлого года
    'Фильтр по датам 6': [ // Фильтр для предыдущего или текущего года в зависимости от условия
        e => e.check('месяц', '<', 2) ?
            e.calc('Относительный', 'год', -1).calc('Календарный', 'год', 'начало') :
            e.calc('Календарный', 'год', 'начало'),
        e => e.check('месяц', '<', 2) ?
            e.calc('Относительный', 'год', -1).calc('Календарный', 'год', 'конец') :
            e.calc('Календарный', 'год', 'конец')
    ],
    'Фильтр по датам 7': [e => e.calc('Установить', 'день недели', 7), null], // Фильтр для последнего дня недели (воскресенье)
};

// Переменные
const key = 'GlobalDtae'; // Ключ для хранения даты в локальном хранилище
let firstDateWidget; // Прослушиваемый фильтр (ПФ)
let date = getDatesFromLocalStorage(key); // Дата, загруженная из локального хранилища
let spravochnikId = saveWidgetsToStorage(spravochnik); // Идентификаторы виджетов, сохраненные в хранилище


// Функция, которая вызывается после загрузки виджета с датой
visApi().onWidgetLoadedListener({
    guid: `${w.general.renderTo}-загрузка-${firstDateWidget}`,
    widgetGuid: firstDateWidget
}, _ => {
    console.log('после загрузки ПФ')
    // Если LocalStorage пуст, запрашиваем дату из виджета
    if (date.length === 0) {
        date = (visApi().getSelectedValues(firstDateWidget)[0] || []).map(e => new Date(e));
        if (date.length === 1) {
            date = date.concat(date);
        }
        saveDatesToLocalStorage(key, date);
    }

    visApi().setDateFilterSelectedValues(firstDateWidget, date);
    render(date);

    // Подписываемся на обновления
    visApi().onSelectedValuesChangedListener({
        guid: w.general.renderTo + '-синхронизатор',
        widgetGuid: firstDateWidget
    }, (values) => {
        date = values.selectedValues[0];
        saveDatesToLocalStorage(key, date);
        render(date);
    });
});