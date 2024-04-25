//todo код для генерации карточек товара

import {generateDataHTML} from "../../src/components/productCards.js";


function setGridStyle(divId, w,h) {
    const div = document.querySelector(divId);
    if (!div) {
        console.error("Div с id", divId, "не найден");
        return;
    }

    const gridStyles = `
        display: grid;
        grid-template-columns:repeat(${h}, 10px);
        grid-template-rows: repeat(${w}, 10px);
        gap: 10px;
        box-sizing: border-box;
        
    `;

    div.style.cssText = gridStyles;
}
setGridStyle(".va-widget-body", 192,139)

const dataObject = {
    value1: 100,
    date1: "2024-03-25",
    value2: 150,
    date2: "2024-03-26",
    difference: 50,
    indicatorName: "Примерный показатель",
    unit: "единиц",
    period: "2 года"
};

const size = {
    span: 25,
    grid_row: 10
}
const htmlString = Array.from({ length: 12 }, () => generateDataHTML(dataObject ,size));
document.querySelector(".va-widget-body").innerHTML = htmlString.join(' ');


//todo код для генерации танцующей плитки

function setGridStyle(divId, w,h) {
    const div = document.querySelector(divId);

    if (!div) {
        console.error("Div с id", divId, "не найден");
        return;
    }

    const gridTo = e => Math. floor(e/10)

    const gridStyles = `
        display: grid;
        grid-template-columns:repeat(${gridTo(h)}, 1fr);
        grid-template-rows: repeat(${gridTo(w)}, 1fr);
        gap: 0px;
        box-sizing: border-box;
        background-color: #000;
        margin: 0px;
        padding: 10px;
    `;

    div.style.cssText = gridStyles;
}
setGridStyle(".va-widget-body", 1920,1080)

function generateDancingTiles(dictionary) {
    let html = '';
    for (const key in dictionary) {
        if (Object.hasOwnProperty.call(dictionary, key)) {
            const className = dictionary[key].split('-')[0];
            const [rows, columns] = dictionary[key].split('-')[1].split('_');
            html += `<div id="${key}" class="${className}"
                    style="
                        grid-row: span ${rows}; grid-column: span ${columns}; background: aqua;
                    ">
                        111
                    </div>`;
        }
    }
    return html;
}

const dictionary = {
    "1":  "osnovaku -100_50",
    "2":  "osnovaku -50_20",
    "3":  "osnovaku -20_10",
    "4":  "osnovaku -20_30",
    "5":  "osnovaku -20_30",
    "6":  "osnovaku -20_30",
};
const htmlString = generateDancingTiles(dictionary)
document.querySelector(".va-widget-body").innerHTML = htmlString





