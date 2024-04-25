const time = 5000
const label = 'Запуск'

if (typeof window.isButtonPressed === 'undefined') {
    window.isButtonPressed = false;
}
if (typeof window.intervalId === 'undefined') {
    window.intervalId = null;
}


TextRender({
    text: w.general,
    style: w.style
});
document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body').innerHTML =
    `<div id="${w.general.render}-button-id" class='buttonPresentation'> ${label}</div>`; // Получаем кнопку по её ID

let button = document.getElementById(`${w.general.render}-button-id`); // Получаем кнопку по её ID
if (window.isButtonPressed) {
    button.classList.add("pressed");
}


// Обработчик события клика по кнопке
button.addEventListener("click", function() {
    // Изменяем переменную isButtonPressed
    window.isButtonPressed = !window.isButtonPressed;

    if (window.isButtonPressed) {
        const buttons = document.querySelector(`.buttonPresentation`);
        buttons.classList.add('pressed');
        clickButtonsWithDelay();

    } else {
        stopToggle();
    }


});

// Функция, которая будет кликать по всем кнопкам с задержкой
function clickButtonsWithDelay() {

    function loading(i,time){

        setTimeout(()=>  i.classList.remove('animated-bg-color'), time);
        i.classList.add('animated-bg-color');

        document.documentElement.style.setProperty('--animation-duration', `${time/1000}.5s`);

    }
    let buttons = document.querySelectorAll('#va-sheet-tabs button');
    let index = 1; // Начальный индекс кнопки
    document.querySelectorAll('.va-sheet-tab').forEach((button, iSelected) => {
        if (button.classList.contains('selected')) { // Проверяем, содержит ли кнопка класс "selected"
            index += iSelected; // Если да, то устанавливаем текущий индекс
        }
    });

    loading(buttons[0],time)
    window.intervalId  = setInterval(function() {
        if (index < buttons.length) { // Если достигнут конец списка кнопок
            console.log('клик', index)
            buttons[index].click(); // Кликаем по кнопке
            loading(buttons[index],time)
            index++; // Увеличиваем индекс для следующей кнопки
        } else {stopToggle()
            console.log('stopToggle')
        }
    }, time); // Задержка между кликами (в миллисекундах)
}


// Функция, которая останавливает функцию переключения
function stopToggle() {
    clearInterval(window.intervalId); // Останавливаем интервал
    // window.intervalId = null; // Сбрасываем идентификатор интервала
    window.isButtonPressed = false;
    const buttons = document.querySelector(`.buttonPresentation`);
    buttons.classList.remove('pressed')
    const animatedElement = document.querySelector('.animated-bg-color');
    if (animatedElement) {
        animatedElement.classList.remove('animated-bg-color');
    }
}
