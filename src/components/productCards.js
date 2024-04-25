export function generateDataHTML(dataObject,size ) {
    if (dataObject == undefined)
        dataObject = {
            value1: 100,
            date1: "2024-03-25",
            value2: 150,
            date2: "2024-03-26",
            difference: 50,
            indicatorName: "Примерный показатель",
            unit: "единиц",
            period: "2 года"
        };
    if (size == undefined)
        size = {
            span: 5,
            grid_row: 3
        }

    const { value1, date1, value2, date2, difference, indicatorName, unit, period } = dataObject;

    const html = `

    <div class="container" style="grid-column: span ${size.span}; grid-row: span ${size.grid_row};">
        <div class="header">${indicatorName}</div>
        <div class="row">
            <div class="column" style="width: 50%;">
                <div>
                <span class="item1">${value1}</span>
                <span class="item">${unit}</span>
                </div>
                
                <div class="item">${date1}</div>
            </div>
            <div class="column" style="max-width: 15%;">
                <div class="item gr ">${period}</div>
                <div class="dif ${difference > 0 ? 'positive' : 'negative'}">
                    ${difference > 0 ? '<i class="arrow up"></i>' : '<i class="arrow down"></i>'}
                    ${difference}%
                </div>
            </div>
            <div class="column" style="border-left: 1px solid grey;">
               
                <div>
                <span class="item1 gr">${value2}</span>
                <span class="item gr">${unit}</span>
                </div>
                <span class="item gr ">${date1}</span>
                
            </div>
        </div>
    </div>
    `;

    return html;
}


