/**
 * Модуль visApi.js предоставляет интерфейс для работы с API Visiology.
 * Здесь содержатся описания объектов, методов и событий, которые могут быть использованы для взаимодействия с виджетами в Visiology Designer.
 * Предоставленные объекты описывают структуру данных и фильтры, используемые в API.
 * Методы позволяют подписываться на события, устанавливать фильтры и получать данные виджетов.
 * Этот модуль предназначен для облегчения разработки компонентов и взаимодействия с Visiology внутри проекта.
 */

// Описание объектов и методов API

// Методы

// Функция для установки фильтра в виджете
function setFilterSelectedValues(widgetGuid, values, handler) {
    // Реализация функции для установки фильтра в виджете
}

// Функция для установки выбранных дат в виджете Фильтр по датам
function setDateFilterSelectedValues(widgetGuid, values) {
    // Реализация функции для установки выбранных дат в фильтре по датам
}

// Функция для получения данных виджета по его GUID
async function getWidgetDataByGuid(widgetGuid) {
    // Реализация функции для получения данных виджета по его GUID
}

// Функция для получения выбранных значений (фильтров) на виджете
function getSelectedValues(widgetGuid) {
    // Реализация функции для получения выбранных значений (фильтров) на виджете
}

// Функция для получения состояния выпадающего списка в виджете "Фильтр"
function getFilterIsOpen(widgetGuid) {
    // Реализация функции для получения состояния выпадающего списка в виджете "Фильтр"
}

// Функция для получения текущего уровня drilldown в виджете
function getDrillLevel(widgetGuid) {
    // Реализация функции для получения текущего уровня drilldown в виджете
}

// Функция для получения пути к текущему уровню drilldown в виджете
function getDrillPath(widgetGuid) {
    // Реализация функции для получения пути к текущему уровню drilldown в виджете
}

// Функция для выполнения drilldown в виджете
function drillDown(widgetGuid, values) {
    // Реализация функции для выполнения drilldown в виджете
}

// Функция для экспорта данных виджета в Excel-файл
function exportWidgetData(widgetId) {
    // Реализация функции для экспорта данных виджета в Excel-файл
}

// Функция для выполнения drillup в виджете
function drillUp(widgetGuid) {
    // Реализация функции для выполнения drillup в виджете
}

// Функция для установки исключающего фильтра в виджете
function setExcludeFilterSelectedValues(widgetGuid, values, handler) {
    // Реализация функции для установки исключающего фильтра в виджете
}


// События


// Функция для подписки на изменение выбранных фильтров у виджета
function onSelectedValuesChangedListener({ guid, widgetGuid }, handler) {
    // Реализация функции подписки на изменение выбранных фильтров у виджета
}

// Функция для подписки на загрузку виджета
function onWidgetLoadedListener({ guid, widgetGuid }, handler) {
    // Реализация функции подписки на загрузку виджета
}

// Функция для подписки на загрузку всех виджетов
function onAllWidgetsLoadedListener({ guid }, handler) {
    // Реализация функции подписки на загрузку всех виджетов
}

// Функция для подписки на изменение состояния выпадающего списка в виджете "Фильтр"
function onFilterIsOpenChangedListener({ guid, widgetGuid }, handler) {
    // Реализация функции подписки на изменение состояния выпадающего списка в виджете "Фильтр"
}

// Функция для подписки на drilldown в виджете
function onDrillDownListener({ guid, widgetGuid }, handler) {
    // Реализация функции подписки на drilldown в виджете
}

// Функция для подписки на drillup в виджете
function onDrillUpListener({ guid, widgetGuid }, handler) {
    // Реализация функции подписки на drillup в виджете
}

// Функция для подписки на событие перед загрузкой данных для drilldown в виджете
function onBeforeDrillDownListener({ guid, widgetGuid }, handler) {
    // Реализация функции подписки на событие перед загрузкой данных для drilldown в виджете
}


// Описание объектов

// Описание объекта DataFrame
// Описание объекта DataFrame
class DataFrame {
    /**
     * Конструктор объекта DataFrame.
     * @param {DataFrameItem} primaryData - Объект, содержащий данные, сгруппированные по первому измерению.
     * @param {DataFrameItem} secondaryData - Объект, содержащий данные, сгруппированные по второму измерению.
     */
    constructor(primaryData, secondaryData) {
        this.primaryData = primaryData;
        this.secondaryData = secondaryData;
    }
}

// Описание объекта DataFrameItem
class DataFrameItem {
    /**
     * Конструктор объекта DataFrameItem.
     * @param {object} key - Значение, по которому сгруппированы Items.
     * @param {Array<object>} values - Значения показателей по сгруппированному элементу.
     * @param {Array<DataFrameItem>} items - Данные, сгруппированные по одному измерению.
     * @param {Array<ValueMetadata>} metadata - Метаданные показателей.
     */
    constructor(key, values, items, metadata) {
        this.key = key;
        this.values = values;
        this.items = items;
        this.metadata = metadata;
    }
}

// Описание объекта ValueMetadata
class ValueMetadata {
    /**
     * Конструктор объекта ValueMetadata.
     * @param {string} displayName - Отображаемое название столбца.
     * @param {string} columnName - Оригинальное название столбца.
     * @param {string} dataType - Тип данных столбца.
     */
    constructor(displayName, columnName, dataType) {
        this.displayName = displayName;
        this.columnName = columnName;
        this.dataType = dataType;
    }
}

// Описание объекта WidgetDataFilter
class WidgetDataFilter {
    /**
     * Конструктор объекта WidgetDataFilter.
     * @param {string} type - Тип фильтра.
     * @param {Array<Array<string>>} values - Выбранные значения в случае, когда тип фильтра равен "In".
     * @param {Array<Column>} columns - Список колонок, по которым идет фильтрация.
     * @param {Date|null} from - Выбранная дата "от" в случае, когда тип фильтра равен "Between".
     * @param {Date|null} to - Выбранная дата "до" в случае, когда тип фильтра равен "Between".
     */
    constructor(type, values, columns, from, to) {
        this.type = type;
        this.values = values;
        this.columns = columns;
        this.from = from;
        this.to = to;
    }
}

// Экспорт функций для использования в других модулях
module.exports = {
    setFilterSelectedValues,
    setDateFilterSelectedValues,
    getWidgetDataByGuid,
    getSelectedValues,
    getFilterIsOpen,
    getDrillLevel,
    getDrillPath,
    drillDown,
    exportWidgetData,
    drillUp,
    setExcludeFilterSelectedValues,

    onSelectedValuesChangedListener,
    onWidgetLoadedListener,
    onAllWidgetsLoadedListener,
    onFilterIsOpenChangedListener,
    onDrillDownListener,
    onDrillUpListener,
    onBeforeDrillDownListener,

    DataFrame,
    DataFrameItem,
    ValueMetadata,
    WidgetDataFilter
};
