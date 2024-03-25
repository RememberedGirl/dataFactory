
// Ваши данные для графиков водопадов
import {appendHtmlToElement, generateGridOfWaterfalls} from "../../src/scripts/utilities/forUtils";

const dataArray = [
    {
        categories: ['Категория 1', 'Категория 2', 'Категория 3', 'Категория 4'],
        values: [100, -20, 80, -50]
    },
    {
        categories: ['A', 'B', 'C', 'D', 'E'],
        values: [200, -100, 150, -50, 120]
    },
    {
        categories: ['Группа 1', 'Группа 2', 'Группа 3'],
        values: [300, -200, 100]
    }
];
// Генерируем HTML-код сетки из водопадов
const gridHtml = generateGridOfWaterfalls(dataArray);

// Добавляем HTML-код в указанный элемент
appendHtmlToElement(gridHtml, 'widget-123');
