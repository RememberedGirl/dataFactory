// Функция loadObjectWObject предназначена для сохранения JavaScript объекта в формате JSON в файле.
// Эта утилита полезна для выгрузки основного объекта ObjectW, который может быть использован в рамках различных задач в Visiology.

function loadObjectWObject(obj, fileName) {
    // Преобразуем объект в JSON формат с отступами для читаемости
    const data = JSON.stringify(obj, null, 2);

    // Создаем объект типа Blob
    const blob = new Blob([data], { type: 'application/json' });

    // Создаем ссылку для скачивания
    const url = window.URL.createObjectURL(blob);

    // Создаем элемент "a" для загрузки файла
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    // Добавляем элемент "a" на страницу для активации клика
    document.body.appendChild(a);

    // Запускаем клик по элементу "a"
    a.click();

    // Освобождаем ресурсы
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

module.exports = {
    loadObjectWObject
};