// Функция для генерации HTML-кода сетки из водопадов


import {generateWaterfallChart} from "../../components/highcharts.js";

export function generateGridOfWaterfalls(dataArray, divName) {

    let gridHtml = `<div class=${divName}>`;
    dataArray.forEach( (data, i ) => {
        //gridHtml += generateWaterfallChart(data, divName+i);
        console.log('generateWaterfallChart:', generateWaterfallChart(data, i))
    });
    gridHtml += '</div>';
    return gridHtml;
}

// Функция для добавления HTML-кода в указанный элемент
export function appendHtmlToElement(html, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML += html;
    } else {
        console.error(`Element with ID "${elementId}" not found.`);
    }
}

// module.exports = {
//     generateGridOfWaterfalls,
//     appendHtmlToElement
// }