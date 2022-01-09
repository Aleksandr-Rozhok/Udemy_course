function tabs(tabsSelector, contentSelector, parentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
        content = document.querySelectorAll(contentSelector),
        parentTab = document.querySelector(parentSelector);

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
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {

                if (target == item) {
                    hide();
                    show(i);
                }
            });
            tabs.forEach(item => {
                item.classList.remove(activeClass);
            });
            target.classList.add(activeClass);
        }
    });

    hide();
    show();
}

export default tabs;