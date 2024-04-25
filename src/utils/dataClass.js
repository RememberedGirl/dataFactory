/**
 * Класс для представления данных и управления ими.
 * @class
 */
class DataStructure {
    /**
     * Создает экземпляр DataStructure.
     * @constructor
     * @param {Object} options - Объект с опциями для инициализации.
     * @param {Object} options.general - Общая информация о структуре данных.
     * @param {string} options.general.renderTo - ID элемента, в который будет отрисован виджет.
     * @param {string} options.general.type - Тип виджета.
     * @param {string[]} options.colors - Массив цветов для использования в виджете.
     * @param {Object} options.data - Данные, содержащие информацию о столбцах, строках, значениях и т.д.
     * @param {Array[]} options.data.cols - Массив столбцов, содержащих названия.
     * @param {Array[]} options.data.rows - Массив строк, содержащих значения для каждого столбца.
     * @param {number[][]} options.data.values - Массив значений для каждой ячейки.
     * @param {Object[]} options.data.colsMeta - Метаданные для каждого столбца.
     * @param {Object[]} options.data.colsInfo - Информация о каждом столбце.
     * @param {number[]} options.data.totals - Общие итоги.
     * @param {string[]} options.data.colsDataType - Типы данных для каждого столбца.
     * @param {string[]} options.data.colHeaders - Заголовки столбцов.
     * @param {string[]} options.data.rowHeaders - Заголовки строк.
     */
    constructor(options) {
        this.general = options.general;
        this.colors = options.colors;
        this.data = options.data;
    }

    /**
     * Метод для получения общей информации о структуре данных.
     * @returns {Object} Объект с общей информацией.
     */
    getGeneralInfo() {
        return this.general;
    }

    /**
     * Метод для получения цветов, используемых в виджете.
     * @returns {string[]} Массив цветов.
     */
    getColors() {
        return this.colors;
    }

    /**
     * Метод для получения данных о структуре данных.
     * @returns {Object} Объект с данными.
     */
    getData() {
        return this.data;
    }
}
