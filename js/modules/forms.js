function forms() {
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
}

module.exports = forms;