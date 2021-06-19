/*JS*/

'use strict';

const SLIDERS = document.querySelectorAll('.glide');
const CONFIGS = [
    {
        autoplay: 3000,
        type: 'carousel',
        gap: 0,
        perView: 1
    },
    {
        autoplay: 3000,
        type: 'carousel',
        gap: 30,
        perView: 3,

        breakpoints: {
            900: {
                gap: 15
            },
            660: {
                perView: 2
            },
            490: {
                perView: 1
            }
        }

    }
];
const POPUP = document.querySelector('.popup');
const SHIELD = document.querySelector('.shield');
const FOOTER = document.querySelector('.footer');
const SCROLL_W = (window.innerWidth - document.documentElement.clientWidth) / 10;
const H2S = [...document.querySelectorAll('.heading-secondary')];
const BTNS = [...document.querySelectorAll('.btn-link')];
const CIRCLES = [...document.querySelectorAll('.circle-link')];
const MENU_LINKS = [...document.querySelectorAll('.menu__link')];
const LOGO = document.querySelector('.logo');
const MENU = document.querySelector('.js-menu');
const CHECKBOX = document.querySelector('.js-checkbox');
const RECTL = document.querySelector('.rectL');
const RECTR = document.querySelector('.rectR');

//utility functions
function isVisible(item) {
    let elemRect = item.getBoundingClientRect();
    let top = elemRect.top;
    let bottom = elemRect.bottom;

    return ((top >= 0) && (bottom <= window.innerHeight));
}

function isPartialyVisible(item) {
    let elemRect = item.getBoundingClientRect();
    let top = elemRect.top;
    let bottom = elemRect.bottom;
    let height = elemRect.height;

    return ((top + height + 50 >= 0) && (height + window.innerHeight + 50 >= bottom));
}

function throttle(func, ms) {
    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}


//slider
function sliderLaunch(SLIDERS, CONFIGS) {

    if (SLIDERS.length === CONFIGS.length) {

        for (let i = 0; i < SLIDERS.length; i++) {
            new Glide(SLIDERS[i], CONFIGS[i]).mount();
        }
    }
}

document.onload = sliderLaunch(SLIDERS, CONFIGS);


//animations
let animatedItems = throttle(function () {
    if (H2S) {
        for (let h2 of H2S) {
            (isPartialyVisible(h2)) ? h2.classList.add('animated-text') : h2.classList.remove('animated-text');
        }
    }

    if (BTNS) {
        for (let btn of BTNS) {
            (isPartialyVisible(btn)) ? btn.classList.add('animated-btn') : btn.classList.remove('animated-btn');
        }
    }

    if (CIRCLES) {
        for (let circle of CIRCLES) {
            (isVisible(circle)) ? circle.classList.add('rotated-btn') : circle.classList.remove('rotated-btn');
        }
    }

    if (RECTL) {
        (isPartialyVisible(RECTL)) ? RECTL.classList.add('rect-move-left') : RECTL.classList.remove('rect-move-left');
    }

    if (RECTR) {
        (isPartialyVisible(RECTR)) ? RECTR.classList.add('rect-move-right') : RECTR.classList.remove('rect-move-right');
    }
}, 50);

function menuLights() {
    let delay = 500;

    if (LOGO) {
        setTimeout(() => {
            LOGO.classList.add('logo-start')
        }, delay);
    }

    if (MENU_LINKS) {
        let length = MENU_LINKS.length;

        for (let i = 0; i < length; i++) {
            setTimeout(() => {
                MENU_LINKS[i].classList.add('bullet-start')
            }, (i + 3) * delay);
            setTimeout(() => {
                MENU_LINKS[i].classList.remove('bullet-start')
            }, (i + 4) * delay);
        }

        setTimeout(() => {
            LOGO.classList.remove('logo-start')
        }, 3 * delay);
    }
}


//popup
let trigger = {
    condition: false,
    counter: true,

    get getCondition() {
        if (this.counter) {
            this.counter = false;

            return false;
        }

        return true;
    }
};

function killPopup(POPUP, SHIELD) {
    SHIELD.removeAttribute('style');
    POPUP.removeAttribute('style');
    document.body.removeAttribute('style');
}

function showPopup(POPUP, SHIELD, SCROLL_W) {
    POPUP.style.visibility = 'visible';
    POPUP.style.opacity = 1;
    SHIELD.style.visibility = 'visible';
    SHIELD.style.opacity = 1;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${SCROLL_W}rem`;
}

let popupTrigger = throttle(function () {

    if (POPUP && SHIELD && isPartialyVisible(FOOTER) && !trigger.getCondition) {
        showPopup(POPUP, SHIELD, SCROLL_W);
    }
}, 100);


//listeners
window.addEventListener('scroll', () => {
    animatedItems();
    popupTrigger();
}, false);

window.addEventListener('click', event => {

    if (POPUP && SHIELD && (event.target.className === 'shield' || event.target.className === "btn-link info__btn")) {
        killPopup(POPUP, SHIELD);
    }
});

document.addEventListener("DOMContentLoaded", menuLights, false);

if (MENU && CHECKBOX) {
    MENU.addEventListener('click', event => {
        if (event.target.nodeName === 'A') {
            CHECKBOX.checked = false;
        }
    });
}