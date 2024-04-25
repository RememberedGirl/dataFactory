let css = `
:root {
    --animation-duration: 1.3s;
}

.animated-bg-color {
    position: relative;
}


.animated-bg-color::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 14px;
    background: #013358;
    left: -10px;
    bottom: -50%;
    animation: l8-1 var(--animation-duration) infinite linear;
}

@keyframes l8-1{
        100% {left:115%}
    }

.buttonPresentation {
    /* Стили для кнопки */
    background-color: initial; /* Изначальный цвет фона */
    color: initial; /* Изначальный цвет текста */
    font-size: 24px;
    font-family: Arial;
    justify-content: center;
    display: flex;
    weight: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: #013358;
    color: #fff;
         
    
}


.buttonPresentation:hover {

    /* Стили для наведения на кнопку */
    background-color: lightblue; /* Цвет фона при наведении */
    color: black; /* Цвет текста при наведении */
}

.pressed {
    background-color: #2884c3; /* Серый цвет фона */
    color: white; /* Белый цвет текста */
}
    

 
`
let style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);