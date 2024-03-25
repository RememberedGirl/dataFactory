// Функция для генерации HTML-кода сетки из водопадов
const {generateWaterfallChart} = require("../../components/highcharts");

function generateGridOfWaterfalls(dataArray) {
    let gridHtml = '<div class="grid-container">';
    dataArray.forEach(data => {
        gridHtml += generateWaterfallChart(data);
    });
    gridHtml += '</div>';
    return gridHtml;
}

// Функция для добавления HTML-кода в указанный элемент
function appendHtmlToElement(html, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML += html;
    } else {
        console.error(`Element with ID "${elementId}" not found.`);
    }
}

module.exports = {
    generateGridOfWaterfalls,
    appendHtmlToElement
}