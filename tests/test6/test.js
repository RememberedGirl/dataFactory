const monthIndex = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const columName = [
    ['до 5 дней', 0],
    ['5-29 дней', 0],
    ['свыше 30 дней', 0]
]
let yearAgo = new Date().toUTCString(), yearJanuary, end


const {data, colors} = w
if (data.rows.length == 1) {
    generateChart([], "blok3")
} else {
    data.cols = data.cols.slice(1,)
    data.rows = data.rows.slice(1,)
    data.values = data.values.slice(1,).map(e => e.slice(1,))


    const series1 = []
    const len = data.cols.length
    const lenD = data.rows.length

    yearAgo =  Date.UTC(data.rows[lenD-1][0]-1,monthIndex.indexOf(data.rows[lenD-1][1]))
    yearJanuary = Date.UTC(data.rows[lenD-1][0],0)
    end = Date.UTC(data.rows[lenD-1][0],monthIndex.indexOf(data.rows[lenD-1][1]))

    const dateStr = e =>  moment( e).locale('ru').format('YYYY MMMM')

    for (let index = 0; index < len; index += 2){
        const col = data.cols[index]
        const i = columName.findIndex((element) => element[0] == col[1])
        series1.push({
            name: col.join(' - ').replace('vehicle_in_service_cnt',"в ремонте"),
            type: 'column',
            stacking: 'normal',
            stack: "group1" ,
            color: colors[i],
            data: data.rows.map( (row, rowIndex) => [
                row.join(' ').toLowerCase(),

                //Date.UTC(row[0], monthIndex.indexOf(row[1])),
                data.values[index][rowIndex]
            ])
        })
    }

    series1[0].marker = {symbol: 'diamond', radius: 7 }
    series1[0].lineWidth = 2
    series1.lineWidth = 2


    const marginTop = 70

    let chart = generateChart(series1, "blok3")
    drawArrow(chart, ...getCoordinatesByDate(chart,-1, e => e.toLocaleString('ru'),dateStr(yearAgo),dateStr(end),'к АППГ'))
    drawArrow(chart, ...getCoordinatesByDate(chart,-1, e => e.toLocaleString('ru'),dateStr(yearJanuary),dateStr(end), 'к началу года'))


    const xSelectedMonth = chart.series[0].points.find(point => point.category === dateStr(end)).plotX + chart.plotLeft - 70

    const ySelectedMonth = chart.clipBox.height + chart.margin[0] + 2

    chart.renderer.rect(xSelectedMonth, ySelectedMonth, 140, 30, 2) // x, y, ширина, высота, скругление углов
        .attr({
            fill: '#EC5459', // Цвет заполнения
            zIndex: 6 // Установка zIndex для накладывания поверх других элементов
        })
        .add();
}


function generateChart(data, divId) {
    // Создание конфигурации для графика
    let chartConfig = {
        chart: {
            margin: [140,100,40,100],
            renderTo: divId
        },
        // title: { 
        //     text: 'Waterfall Chart'
        // },
        xAxis: [
            {
                title: {text: ' '},
                lineWidth: 0,
                gridLineWidth: 0,
                tickWidth: 0,
                type: 'category',
                min: 0,
                categories: getMonthsBetweenDates(yearAgo, end),
                labels: {

                    // Показывать пустые категории
                    //     formatter: function() {
                    //         const value = moment(this.value).locale('ru').format('MMM YYYY');

                    //         if (this.value == end) return  '<span style="color: white;">' + value + '</span>'
                    //         return  value
                    //     },
                    //     style: {
                    //         fontSize: '16px', // Размер шрифта меток
                    //         color: '#222' // Цвет меток
                    //     }
                }
            },
            {enabled: false, lineWidth: 0,title: {text: null}}
        ],
        yAxis: [

            {
                stackLabels: {
                    enabled: true
                },
                labels: {
                    enabled: false // Удаление подписей оси Y
                },
                lineWidth: 0,
                gridLineWidth: 0,
                title: {text: null}
            },
            {enabled: false, title: {text: null}}
        ],
        legend: {
            verticalAlign: 'top',
            align: 'left',
            enabled: true
        },

        tooltip: {
            //crosshairs : true,
            shared: true,
            //crosshairs: true,
            //pointFormat: '{point.series.name} <b>{point.y:,.2f}</b>',
            //formatter: function(){ return `${this.point.series.name.split('-')[1]  || ''} <b>${Highcharts.numberFormat(this.point.y,2)}</b> %`},
            formatter: function() {
                var tooltip = '' + moment(this.x).locale('ru').format('MMMM YYYY') + ':  <br> <b>' + Highcharts.numberFormat(this.points.reduce((a, v) => a + v.y,0),0) + ' </b> шт.<br>';
                this.points.forEach(function(point) {
                    tooltip += '<span style="color:' + point.series.color + '">\u25CF</span> ' + (point.series.name.split(' - ')[1]  || '') +
                        ': <b>' + Highcharts.numberFormat(point.y,0) + '</b> шт.<br/>';
                });
                return tooltip;
            },
            backgroundColor : 'rgba(149,143,159,0.9)',
            borderRadius : '15',
            textOutline:  false,
            style : {
                color:'white',
                fontSize: 21
            }

        },
        plotOptions: {
            column: {
                borderRadius: 5,

            },
            series: {
                dataLabels: {
                    color: 'contrast',
                    style : {
                        fontSize: 16
                    },
                    enabled : true,
                    formatter: function() {
                        return  Highcharts.numberFormat(this.y, 0);
                    }
                },
                smoothLine: true,
                lineWidth: 1,
                marker : {
                    enabled: true,
                    symbol: "circle",
                    radius: 3
                }
            }

        },
        series: data
    };

    // Создание графика Highcharts Waterfall
    let chart = Highcharts.chart(chartConfig);
    return chart;
}

/**
 * Функция getCoordinatesByDate используется для получения координат точек на графике Highcharts по дате.
 *
 * @param {Object} chart - Объект графика Highcharts.
 * @param {number} seriesIndex - Индекс серии данных на графике (если seriesIndex = -1, то функция применяется ко всем сериям).
 * @param {function} def - Функция, которая принимает дельту (разницу между значениями точек) и возвращает новое значение.
 * @param {number} x1 - Значение x (дата) первой точки.
 * @param {number} x2 - Значение x (дата) второй точки.
 * @param {number} dummy - Значение по умолчанию, используемое, если дельта равна 0.
 * @returns {Array} - Массив координат точек и дельты: [x1Pixels, y1Pixels, x2Pixels, y2Pixels, delta].
 */
function getCoordinatesByDate(chart, seriesIndex, def, category1, category2, dummy) {
    const len = seriesIndex === -1 ? chart.series.length : 1;

    let point1, point2, x1Pixels, y1Pixels, x2Pixels, y2Pixels, delta = 0;
    let _seriesIndex = seriesIndex;
    for (let i = 0; i < len; i++) {
        if (seriesIndex === -1) _seriesIndex = i;

        // Получаем точки по категориям
        point1 = chart.series[_seriesIndex].points.find(point => point.category === category1);
        point2 = chart.series[_seriesIndex].points.find(point => point.category === category2);

        // Получаем пиксельные координаты
        x1Pixels = point1 ? point1.plotX + chart.plotLeft : 0;
        y1Pixels = point1 ? point1.plotY + chart.plotTop : chart.margin[0] - 10;
        x2Pixels = point2 ? point2.plotX + chart.plotLeft : 0;
        y2Pixels = point2 ? point2.plotY + chart.plotTop : chart.margin[0];

        delta += point2 ? point2.y : 0;
        delta -= point1 ? point1.y : 0;
        console.log(seriesIndex, point2 ? point2.y : 0, point1 ? point1.y : 0);
    }

    delta = delta !== 0 ? def(delta, delta !== 0) : dummy;

    return [
        x1Pixels,
        y1Pixels,
        x2Pixels,
        y2Pixels,
        delta
    ];
}


/**
 * Функция drawArrow используется для рисования стрелки на графике Highcharts с определенными координатами начальной и конечной точек,
 * а также для добавления текста и прямоугольника под стрелкой.
 *
 * @param {Object} chart - Объект графика Highcharts, на котором будет нарисована стрелка.
 * @param {number} startX - Координата X начальной точки стрелки.
 * @param {number} startY - Координата Y начальной точки стрелки.
 * @param {number} endX - Координата X конечной точки стрелки.
 * @param {number} endY - Координата Y конечной точки стрелки.
 * @param {string} text - Текст, который будет отображен под стрелкой.
 */
function drawArrow(chart, startX, startY, endX, endY, text) {
    // Рисование стрелки
    const pad = 40;
    const arrowPath = chart.renderer.path([
        'M', startX, startY + 25, // Начальная точка
        'L', startX, pad + 15,
        'A', 15, 15, 0, 0, 1, startX + 15, pad, // rx, ry, x-axis-rotation, arge-arc-flag, sweep-flag, x, y
        'L', endX - 15, pad,
        'A', 15, 15, 0, 0, 1, endX, pad + 15, // rx, ry, x-axis-rotation, arge-arc-flag, sweep-flag, x, y
        'L', endX, endY - 15, // Конечная точка

        // Кончик стрелки
        'M', endX, endY - 15,
        'L', endX - 5, endY - 30,
        'M', endX, endY - 15,
        'L', endX + 5, endY - 30
    ]).attr({
        'stroke-width': 2, // Толщина линии стрелки
        'stroke': '#ddd' // Цвет линии стрелки
    }).add();

    // Прямоугольник под стрелкой
    const rect = chart.renderer.rect((startX + endX) / 2 - 70, pad - 10, 2 * 70, 15, 10)
        .attr({
            fill: '#ffff', // Цвет и прозрачность фона
            zIndex: 3 // Устанавливаем zIndex, чтобы прямоугольник был над графиком
        })
        .add();

    // Текст под стрелкой
    const textElement = chart.renderer.text(text, (startX + endX) / 2, pad+5)
        .attr({
            'text-anchor': 'middle', // Якорь текста по центру
            'fill': 'black', // Цвет текста
            'font-size': '16px', // Размер шрифта
            zIndex: 4
        }).add();
}

function getMonthsBetweenDates(startDate, endDate) {
    const start = moment(startDate);
    const end = moment(endDate);
    const months = [];

    while (start.isSameOrBefore(end, 'month')) {
        months.push(`${start.locale('ru').format('YYYY MMMM')}`);
        start.add(1, 'months');
    }
    console.log(months)
    return months;
}