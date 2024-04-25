import {arrrayDiv} from "../../src/scripts/utilities/forUtils.js";
import {
    generateChart,
    generateeWaterfallChart,
    generateGaugeChart, generatePictorialChart, generatePieChart,
} from "../../src/components/highcharts.js";

var seriesData = [{
    name: 'Start',
    y: 0
}, {
    name: 'Product 1',
    y: 500
}, {
    name: 'Product 2',
    y: -200
}, {
    name: 'Product 3',
    y: 300
}, {
    name: 'End',
    isSum: true,
    color: 'black'
}];

var series = [{
    upColor: 'green',
    color: 'red',
    data: seriesData
}]

arrrayDiv('blok',10, '.va-widget-body')

const data = {
    "colors": [
        "rgba(180, 61, 199, 1)",
        "rgba(244, 108, 156, 1)",
        "rgba(239, 156, 31, 1)",
        "rgba(237, 190, 48, 1)",
        "rgba(188, 207, 49, 1)",
        "rgba(133, 187, 68, 1)",
        "rgba(59, 173, 239, 1)",
        "rgba(112, 58, 238, 1)",
        "rgba(234, 67, 102, 1)",
        "rgba(246, 126, 109, 1)"
    ],
    "cols": [
        ["product_id", "Product Type"],
        ["price", "Product Type"],
        ["quantity", "Product Type"],
        ["Total Sales"]
    ],
    "rows": [
        ["2023-02-28", "2"],
        ["2023-03-01", "3"],
        ["2023-03-02", "3"]
    ],
    "values": [
        [100, 105, 100],
        [20, 25, 20],
        [5, 5, 5],
        [100, 130, 100]
    ],
    'stacking': ["percent","percent",  "percent", ""],//["overlap","normal",  "percent", "stream"],
    'stack': ["group1","group2",  "group2", "group3"],
    "colsDataType": ["integer", "integer", "integer", null],
    "type": ["line", "column", "column", "line"],
    "colHeaders": ["product_id", "price", "quantity", "Total Sales"],
    "rowHeaders": ["Date", "Month Number"]
};
// const series2 = data.cols.map((col, index) => ({
//     name: col.join(' - '),
//     data: data.rows.map((row, rowIndex) => [row.join(' - '), data.values[index][rowIndex]])
// }));

const series2 = data.cols.map((col, index) => ({
    name: col.join(' - '),
    type: data.type[index],
    stack: data.stack[index],
    stacking: data.stacking[index],
    color: data.colors[index],
    data: data.rows.map((row, rowIndex) => [row.join(' - '), data.values[index][rowIndex]])
}));



generateChart(series2, "blok1")
generateeWaterfallChart(series, "blok0")
generatePieChart(series, "blok2")
generateGaugeChart(series, "blok3")
generatePictorialChart(series, "blok4")
