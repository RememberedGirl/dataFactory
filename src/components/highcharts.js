function generateWaterfallChart(data) {
    // Создание блока для графика
    let chartBlock = document.createElement('div');
    chartBlock.id = 'waterfall-chart-container';

    // Создание конфигурации для графика
    let chartConfig = {
        chart: {
            type: 'waterfall',
            renderTo: 'waterfall-chart-container'
        },
        title: {
            text: 'Waterfall Chart'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Value'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '<b>{point.y:,.2f}</b>'

        },
        series: [{
            data: data
        }]
    };

    // Создание графика Highcharts Waterfall
    let chart = Highcharts.chart(chartConfig);

    // Получение HTML кода для блока графика
    let chartHTML = chartBlock.outerHTML;

    return chartHTML;
}

module.exports = {
    generateWaterfallChart
}