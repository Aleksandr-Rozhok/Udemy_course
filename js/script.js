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
        })
    }

    const show = (i = 0) => {
        // content[i].style.display = "block";
        content[i].classList.add('show');
        content[i].classList.remove('hide');
    }

    parentTab.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hide();
                    show(i);
                };
            });
        };
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
            };
        };

        function updateCLock() {

            const t = getTimerRemaining(endtime);

            days.innerText = getZero(t.days);
            hours.innerText = getZero(t.hours);
            minutes.innerText = getZero(t.minutes);
            seconds.innerText = getZero(t.seconds);

            if (timeInterval <= 0) {
                clearInterval(timeInterval);
            };
        };
    };

    getClock('.timer', deadline);

    //Modal 

    const btn = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        closeBtn = document.querySelector('[data-close]');

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

    closeBtn.addEventListener('click', closeModalWindow);

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow();
        };
    });

    document.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalWindow();
        };
    });

    const modalTimerID = setTimeout(openModalWindow, 5000);

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        };
    };

    window.addEventListener('scroll', showModalByScroll);
});