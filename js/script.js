window.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        content = document.querySelectorAll('.tabcontent'),
        parentTab = document.querySelector('.tabheader__items');

    const hide = () => {
        content.forEach(item => {
            // item.style.display = "none";
            item.classList.add('hide');
            item.classList.remove('show');
        });
    };

    const show = (i = 0) => {
        // content[i].style.display = "block";
        content[i].classList.add('show');
        content[i].classList.remove('hide');
    };

    parentTab.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hide();
                    show(i);
                }
            });
        }
    });

    hide();
    show();

    //Timer

    const deadline = '2022-01-01';

    const getTimerRemaining = (endtime) => {

        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24) % 24),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const getClock = (selector, endtime) => {

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateCLock, 1000);

        updateCLock();

        function getZero(num) {
            if (num > 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        function updateCLock() {

            const t = getTimerRemaining(endtime);

            days.innerText = getZero(t.days);
            hours.innerText = getZero(t.hours);
            minutes.innerText = getZero(t.minutes);
            seconds.innerText = getZero(t.seconds);

            if (timeInterval <= 0) {
                clearInterval(timeInterval);
            }
        }
    };

    getClock('.timer', deadline);

    //Modal 

    const btn = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    const openModalWindow = () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerID);
    };

    const closeModalWindow = () => {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    btn.forEach(btn => {
        btn.addEventListener('click', openModalWindow);
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow();
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModalWindow();
        }
    });

    const modalTimerID = setTimeout(openModalWindow, 50000);

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);

    // Constructor menu

    class MenuCard {
        constructor(src, alt, title, text, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length == 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
            this.parent.append(element);
        }
    }

    const getResourse = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    };

    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // Forms

    const forms = document.querySelectorAll('form');
    const messages = {
        loading: 'img/form/spinner.svg',
        success: 'Форма отправлена! Ожидайте звонка',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessages = document.createElement('img');
            statusMessages.src = messages.loading;
            statusMessages.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessages);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(messages.success);
                    statusMessages.remove();
                }).catch(() => {
                    showThanksModal(messages.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevThanksModal = document.querySelector('.modal__dialog');

        prevThanksModal.classList.add('hide');
        openModalWindow();

        const thanksMessage = document.createElement('div');
        thanksMessage.classList.add('modal__dialog');
        thanksMessage.innerHTML = `
        <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksMessage);

        setTimeout(() => {
            thanksMessage.remove();
            prevThanksModal.classList.add('show');
            prevThanksModal.classList.remove('hide');
            closeModalWindow();
        }, 2000);
    }

    // Slider

    const parentSlider = document.querySelector('.offer__slider-wrapper'),
        counterSlider = document.querySelector('.offer__slider-counter'),
        currentSlide = counterSlider.querySelector('#current'),
        totalSlide = counterSlider.querySelector('#total'),
        leftButtonSlider = document.querySelector('.offer__slider-prev'),
        rightButtonSlider = document.querySelector('.offer__slider-next');
    let counter = 0,
        arrDots = {};


    getResourse('http://localhost:3000/slider')
        .then(data => {

            renderDots(data.length);

            renderCounter(data[counter].id, data.length);

            renderSlider(data[counter].src, data[counter].alt);

            rightButtonSlider.addEventListener('click', () => {
                counter++;
                if (counter == data.length) {
                    counter = 0;
                }
                renderCounter(data[counter].id, data.length);

                removeActiveClass(counter);
                addActiveClass(counter);

                renderSlider(data[counter].src, data[counter].alt);

            });


            leftButtonSlider.addEventListener('click', () => {
                counter--;
                if (counter === -1) {
                    counter = data.length - 1;
                }
                renderCounter(data[counter].id, data.length);

                removeActiveClass(counter);
                addActiveClass(counter);

                renderSlider(data[counter].src, data[counter].alt);

            });

            arrDots.forEach((item, i) => {
                item.addEventListener('click', () => {
                    arrDots.forEach((item) => {
                        item.classList.remove('activeDots');
                    })
                    addActiveClass(i);
                    renderCounter(data[i].id, data.length);
                    renderSlider(data[i].src, data[i].alt);
                });
            });
        });

    const renderCounter = (num, lastNum) => {
        if (lastNum < 10) {
            totalSlide.innerText = `0${lastNum}`;
            currentSlide.innerText = `0${num}`;
        } else {
            totalSlide.innerText = lastNum;
            currentSlide.innerText = num;
        }
    };

    const slide = document.createElement('div');
    slide.classList.add(`slide`);

    const renderSlider = (src, alt) => {
        slide.innerHTML = `
                  <div class="offer__slide">
                        <img src=${src} alt=${alt}>
                    </div>
                  `;
        parentSlider.append(slide);
    };

    // Dots slider

    const carouselIndicators = document.querySelector('.carousel-indicators');

    const renderDots = (countSlides) => {
        for (let i = 0; i < countSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot', `dot-${i}`);
            carouselIndicators.append(dot);
        }

        arrDots = (document.querySelectorAll('.dot'));
        addActiveClass(0);
    };

    const addActiveClass = (counter) => {
        arrDots[counter].classList.add('activeDots');
        console.log(counter);
    };

    const removeActiveClass = (counter) => {
        console.log(arrDots.length);
        if (counter == 0) {
            arrDots[arrDots.length - 1].classList.remove('activeDots');
            arrDots[counter + 1].classList.remove('activeDots');
        } else if (counter == arrDots.length - 1) {
            arrDots[counter - 1].classList.remove('activeDots');
            arrDots[0].classList.remove('activeDots');
        } else {
            arrDots[counter - 1].classList.remove('activeDots');
            arrDots[counter + 1].classList.remove('activeDots');
        }
    };

});