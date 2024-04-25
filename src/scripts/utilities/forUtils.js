import {generateDataHTML} from "../../components/productCards.js";


export function arrrayDiv(str,n, divName) {


    const dataArray = Array.from({ length: n },
        (_,i) => `<div id="${str + i}" style="background: #C2B160FF"> _ </div>`)

    document.querySelector(divName).innerHTML = dataArray.join(' ')
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