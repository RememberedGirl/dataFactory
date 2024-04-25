
let elementHTML = '<button id="clearConsoleButton">Очистить консоль</button>';
const tableContainer = document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body');
tableContainer.innerHTML = elementHTML;
document.getElementById("clearConsoleButton").addEventListener("click", function() {
    console.clear();
});