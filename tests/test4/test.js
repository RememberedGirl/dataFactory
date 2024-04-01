

// Ваши данные для графиков водопадов
import {appendHtmlToElement, generateGridOfWaterfalls} from "../../src/scripts/utilities/forUtils.js";

const dataArray = [
    {
        name: 'Year 1990',
        data: [631, 727, 3202, 721]
    }, {
        name: 'Year 2000',
        data: [814, 841, 3714, 726]
    }, {
        name: 'Year 2018',
        data: [1276, 1007, 4561, 746]
    }
];
// // Генерируем HTML-код сетки из водопадов

const gridHtml = generateGridOfWaterfalls(dataArray,"grid-container");
console.log('gridHtml',gridHtml)


// Добавляем HTML-код в указанный элемент
// appendHtmlToElement(gridHtml, 'widget-123');
