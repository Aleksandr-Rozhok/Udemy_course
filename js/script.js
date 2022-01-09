import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {
    openModalWindow
} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerID = setTimeout(() => openModalWindow('.modal', modalTimerID), 50000);

    calc();
    cards();
    forms(modalTimerID);
    modal('[data-modal]', '.modal', modalTimerID);
    slider({
        container: '.offer__slider',
        slidesSelector: '.offer__slide',
        prevArrowSelector: '.offer__slider-prev',
        nextArrowSelector: '.offer__slider-next',
        totalCounterSelector: '#total',
        currentCounterSelector: '#current',
        sliderWrapperSelector: '.offer__slider-wrapper',
        sliderInnerSelector: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2022-04-25');
});