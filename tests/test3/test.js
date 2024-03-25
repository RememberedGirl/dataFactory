

const dictionary = {
    "e1ee": "osnovaku -1_1",
    "2": "osnovaku -1_1",
    "3": "osnovaku -1_1",
    "4": "osnovaku -1_1",
};

// Generating HTML markup based on the dictionary object
let elementHTML = '<div class="grid-container">';
Object.keys(dictionary).forEach(key => {
    const strclass = dictionary[key].split('-')[0];
    const [rows, columns] = dictionary[key].split('-')[1].split('_'); // Splitting the class value into rows and columns
    elementHTML += `<div class="${strclass} cell"
    style="grid-row: span ${rows}; grid-column: span ${columns};"
    >${key} 
        <div class="data"> ${strclass.includes("osnovaku") ? 123 : ""}</div>
    </div>`;
});

let widgetId = w.general.renderTo;
const tableContainer = document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body');
tableContainer.innerHTML = elementHTML;

let style = document.createElement('style');
style.innerHTML = `
body {
    background-color: #292b4c;
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 3fr 3fr;
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 10px;
    width: 100%;
    height: 200px;
}

.osnovaku {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    border: 1.5px solid transparent;
    border-image: linear-gradient(#67cbf8 , #66d6e5);
    -moz-border-image: -moz-linear-gradient(#67cbf8 , #66d6e5);
    -webkit-border-image: -webkit-linear-gradient(#67cbf8 , #66d6e5);
    border-image-slice: 0.5;
    background: linear-gradient(-55deg, rgba(102, 214, 229,0.1), rgba(102, 214, 229,0.1) 60%, transparent 60%, transparent 85%,rgba(102, 214, 229,0.1) 60%, rgba(102, 214, 229,0.1) 99%, transparent 100%);
    backdrop-filter: blur();
}
`;
document.head.append(style);