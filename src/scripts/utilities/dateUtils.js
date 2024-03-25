/*
Файл dateUtils.js содержит набор функций для работы с датами.
Для удобства использования функций создан класс DateCalculator, который позволяет выстраивать цепочки операций над датами.
*/


const funcs = {
    'Относительный': addIntervalToDate,  //(date, 'год', -1)
    'Календарный': getStartEndPeriodDate, //(date, 'год', 'начало')
    'Установить': setDatePeriod, //(date, 'год', 2022);
    'Условие': isDateComponentEqual, //(date, 'год','>=', 2022);
};

// #классы
class DateCalculator {
    constructor(date = new Date()) {
        this.date = date;
        this.if = true
    }


    check(...args) {

        if (args.length > 0) {
            const func = funcs['Условие']

            this.if = func(this.date, ...args);
        }
        return this.if;
    }

    calc(action, ...args) {
        const func = funcs[action];
        if (!func) {
            throw new Error('Invalid action specified');
        }
        this.date = func(this.date, ...args);
        return this;
    }

    getDate() {
        return this.date;
    }
}

function addIntervalToDate(date, periodType, value) {
    // Создание объекта Moment с переданной датой
    const mDate = moment(date);

    // Прибавление времени к дате в зависимости от типа периода
    switch (periodType) {
        case 'год':
            mDate.add(value, 'years');
            break;
        case 'квартал':
            mDate.add(value, 'quarters');
            break;
        case 'месяц':
            mDate.add(value, 'months');
            break;
        case 'неделя':
            mDate.add(value, 'weeks');
            break;
        case 'день':
            mDate.add(value, 'days');
            break;
        default:
            throw new Error('период долден быть из списка: год, квартал, месяц, неделя, день');
    }

    // Преобразование обновленной даты в формат JavaScript Date и возврат
    return mDate.toDate();
}

// Функция для определения начала или конца периода для заданной даты
function getStartEndPeriodDate(_date = new Date(), period = 'год', type = 'конец') {
    const resultDate = new Date(_date);
    const date = new Date(_date)
    switch (period) {
        case 'год':
            if (type === 'начало') {
                resultDate.setMonth(0);
                resultDate.setDate(1);
            } else {
                resultDate.setMonth(11);
                resultDate.setDate(31);
            }
            break;
        case 'квартал':
            const quarter = Math.floor(date.getMonth() / 3) + 1;
            if (type === 'начало') {
                resultDate.setMonth((quarter - 1) * 3);
                resultDate.setDate(1);
            } else {
                resultDate.setMonth(quarter * 3);
                resultDate.setDate(0);
            }
            break;
        case 'месяц':
            if (type === 'начало') {
                resultDate.setDate(1);
            } else {
                resultDate.setMonth(date.getMonth() + 1);
                resultDate.setDate(0);
            }
            break;
        case 'неделя':
            const dayOfWeek = date.getDay();
            // что бы узнать когда неделя началась, необходимо из текщего дня вычесть номер дня недели и прибавить 1
            // тк вс == 0, то отнять надо 6
            const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
            const firstDayOfWeek = new Date(date.setDate(diff));
            const lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
            if (type === 'начало') {
                return firstDayOfWeek;
            } else {
                return lastDayOfWeek;
            }
            break;
        default:
            throw new Error('период долден быть из списка: год, квартал, месяц, неделя');
    }
    return resultDate;
}

// Функция для установки значения в дате
function setDatePeriod(date = new Date(), period = "день недели", value = 1) {
    const mDate = moment(date);

    switch (period) {
        case 'год':
            mDate.year(value);
            break;
        case 'квартал':
            mDate.quarter(value);
            break;
        case 'месяц':
            mDate.month(value - 1);
            break;
        case 'неделя':
            mDate.week(value).isoWeekday(1);
            break;
        case 'день недели':
            mDate.isoWeekday(value);
            break;
        case 'день':
            mDate.date(value);
            break;
        default:
            throw new Error('период долден быть из списка: год, квартал, месяц, неделя, день недели, день');
    }

    return mDate.toDate();
}

// Функция для проверки условия
function isDateComponentEqual(date, period, operator, value) {
    switch (period) {
        case 'год':
            return compareValues(date.getFullYear(), operator, value);
        case 'квартал':
            return compareValues(Math.floor((date.getMonth() + 3) / 3), operator, value);
        case 'месяц':
            return compareValues(date.getMonth() + 1, operator, value);
        case 'неделя':
            return compareValues(getWeekNumber(date), operator, value);
        case 'день недели':
            return compareValues(date.getDay(), operator, value);
        case 'день':
            return compareValues(date.getDate(), operator, value);
        default:
            throw new Error('период долден быть из списка: год, квартал, месяц, неделя, день недели, день');
    }
}

// Функция для получения номера недели в году
function getWeekNumber(date) {

    // Определяем первый день недели для нашего календаря (Воскресенье - 0, Понедельник - 1, и так далее)
    const firstDayOfWeek = 1;

    // Определяем первую неделю года
    let firstWeekOfYear = new Date(date.getFullYear(), 0, 1);
    while (firstWeekOfYear.getDay() !== firstDayOfWeek) {
        firstWeekOfYear.setDate(firstWeekOfYear.getDate() - 1);
    }

    // Рассчитываем количество дней между текущей датой и первым днем первой недели года, день = 1000 * 60 * 60 * 24 секунд
    const daysDiff = Math.floor((date - firstWeekOfYear) / 86400000);

    // Определяем номер текущей недели
    const weekNumber = Math.floor(daysDiff / 7) + 1;

    return weekNumber;

}

// Функция для сравнения значений с помощью операторов
function compareValues(a, operator, b) {
    switch (operator) {
        case '<':
            return a < b;
        case '<=':
            return a <= b;
        case '>':
            return a > b;
        case '>=':
            return a >= b;
        case '==':
            return a === b;
        case '!=':
            return a !== b;
        default:
            throw new Error('оператор должен быть из спика: <, >, <=, >=, ==, !==');
    }
}

class DateCalculator {
    static funcs = {
        'Относительный': addIntervalToDate,  //(date, 'год', -1)
        'Календарный': getStartEndPeriodDate, //(date, 'год', 'начало')
        'Установить': setDatePeriod, //(date, 'год', 2022);
        'Условие': isDateComponentEqual, //(date, 'год','>=', 2022);
    };

    constructor(date = new Date()) {
        this.date = date;
        this.if = true;
    }

    check(...args) {
        if (args.length > 0) {
            const func = DateCalculator.funcs['Условие'];
            this.if = func(this.date, ...args);
        }
        return this.if;
    }

    calc(action, ...args) {
        const func = DateCalculator.funcs[action];
        if (!func) {
            throw new Error('Invalid action specified');
        }
        this.date = func(this.date, ...args);
        return this;
    }

    getDate() {
        return this.date;
    }
}

module.exports = {
    addIntervalToDate,
    getStartEndPeriodDate,
    setDatePeriod,
    isDateComponentEqual,
    getWeekNumber,
    compareValues,

    DateCalculator
};


