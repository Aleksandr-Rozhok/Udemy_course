function modal() {
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
}

module.exports = modal;