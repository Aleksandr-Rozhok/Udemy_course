const openModalWindow = (modalSelector, modalTimerID) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerID);
    if (modalTimerID) {
        clearInterval(modalTimerID);
    }
};

const closeModalWindow = (modalSelector) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

function modal(triggerSelector, modalSelector, modalTimerID) {
    const btn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    btn.forEach(btn => {
        btn.addEventListener('click', () => openModalWindow(modalSelector, modalTimerID));
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow(modalSelector);
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModalWindow(modalSelector);
        }
    });

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalSelector, modalTimerID);
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {
    openModalWindow,
    closeModalWindow
};