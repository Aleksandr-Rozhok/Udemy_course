function tabs() {
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
            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active')
            });
            target.classList.add('tabheader__item_active');
        }
    });

    hide();
    show();
}

module.exports = tabs;