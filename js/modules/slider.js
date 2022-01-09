function slider({
    container,
    slidesSelector,
    prevArrowSelector,
    nextArrowSelector,
    totalCounterSelector,
    currentCounterSelector,
    sliderWrapperSelector,
    sliderInnerSelector
}) {
    // const parentSlider = document.querySelector('.offer__slider-wrapper'),
    //     counterSlider = document.querySelector('.offer__slider-counter'),
    //     currentSlide = counterSlider.querySelector('#current'),
    //     totalSlide = counterSlider.querySelector('#total'),
    //     leftButtonSlider = document.querySelector('.offer__slider-prev'),
    //     rightButtonSlider = document.querySelector('.offer__slider-next');
    // let counter = 0,
    //     arrDots = {};


    // getResource('http://localhost:3000/slider')
    //     .then(data => {

    //         renderDots(data.length);

    //         renderCounter(data[counter].id, data.length);

    //         renderSlider(data[counter].src, data[counter].alt);

    //         rightButtonSlider.addEventListener('click', () => {
    //             counter++;
    //             if (counter == data.length) {
    //                 counter = 0;
    //             }
    //             renderCounter(data[counter].id, data.length);

    //             removeActiveClass(counter);
    //             addActiveClass(counter);

    //             renderSlider(data[counter].src, data[counter].alt);

    //         });


    //         leftButtonSlider.addEventListener('click', () => {
    //             counter--;
    //             if (counter === -1) {
    //                 counter = data.length - 1;
    //             }
    //             renderCounter(data[counter].id, data.length);

    //             removeActiveClass(counter);
    //             addActiveClass(counter);

    //             renderSlider(data[counter].src, data[counter].alt);

    //         });

    //         arrDots.forEach((item, i) => {
    //             item.addEventListener('click', () => {
    //                 arrDots.forEach((item) => {
    //                     item.classList.remove('activeDots');
    //                 })
    //                 addActiveClass(i);
    //                 renderCounter(data[i].id, data.length);
    //                 renderSlider(data[i].src, data[i].alt);
    //             });
    //         });
    //     });

    // const renderCounter = (num, lastNum) => {
    //     if (lastNum < 10) {
    //         totalSlide.innerText = `0${lastNum}`;
    //         currentSlide.innerText = `0${num}`;
    //     } else {
    //         totalSlide.innerText = lastNum;
    //         currentSlide.innerText = num;
    //     }
    // };

    // const slide = document.createElement('div');
    // slide.classList.add(`slide`);

    // const renderSlider = (src, alt) => {
    //     slide.innerHTML = `
    //               <div class="offer__slide">
    //                     <img src=${src} alt=${alt}>
    //                 </div>
    //               `;
    //     parentSlider.append(slide);
    // };

    // Dots slider

    // const carouselIndicators = document.querySelector('.carousel-indicators');

    // const renderDots = (countSlides) => {
    //     for (let i = 0; i < countSlides; i++) {
    //         const dot = document.createElement('div');
    //         dot.classList.add('dot', `dot-${i}`);
    //         carouselIndicators.append(dot);
    //     }

    //     arrDots = (document.querySelectorAll('.dot'));
    //     addActiveClass(0);
    // };

    // const addActiveClass = (counter) => {
    //     arrDots[counter].classList.add('activeDots');
    //     console.log(counter);
    // };

    // const removeActiveClass = (counter) => {
    //     console.log(arrDots.length);
    //     if (counter == 0) {
    //         arrDots[arrDots.length - 1].classList.remove('activeDots');
    //         arrDots[counter + 1].classList.remove('activeDots');
    //     } else if (counter == arrDots.length - 1) {
    //         arrDots[counter - 1].classList.remove('activeDots');
    //         arrDots[0].classList.remove('activeDots');
    //     } else {
    //         arrDots[counter - 1].classList.remove('activeDots');
    //         arrDots[counter + 1].classList.remove('activeDots');
    //     }
    // };

    // Teachers version slider 1

    const slides = document.querySelectorAll(slidesSelector),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrowSelector),
        next = document.querySelector(nextArrowSelector),
        total = document.querySelector(totalCounterSelector),
        current = document.querySelector(currentCounterSelector),
        sliderWrapper = document.querySelector(sliderWrapperSelector),
        sliderInner = document.querySelector(sliderInnerSelector),
        width = window.getComputedStyle(sliderWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    sliderInner.style.display = 'flex';
    sliderInner.style.width = 100 * (slides.length) + '%';
    sliderInner.style.transition = '0.5s';
    sliderWrapper.style.overflow = 'hidden';

    const examinationSlides = () => {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
        } else {
            total.textContent = slides.length;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    };

    const activeDot = () => {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    };

    const examinationOffsetNext = (slides) => {
        if (offset == +width.replace(/\D/g, '') * (slides - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;
    };

    const examinationOffsetPrev = (slides) => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, '') * (slides - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;
    };

    examinationSlides();

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        examinationOffsetNext(slides.length);

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        examinationSlides();

        activeDot();
    });

    prev.addEventListener('click', () => {
        examinationOffsetPrev(slides.length);

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        examinationSlides();

        activeDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const sliderTo = e.target.getAttribute('data-slide-to');

            slideIndex = sliderTo;
            offset = width.replace(/\D/g, '') * (sliderTo - 1);

            sliderInner.style.transform = `translateX(-${offset}px)`;

            activeDot();

            examinationSlides();
        });
    });

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n < 1) {
    //         slideIndex = slides.length - 1;
    //     }

    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     slides.forEach(item => {
    //         item.style.display = 'none';
    //     });
    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusIndex(n) {
    //     slideIndex += n;
    // }

    // prev.addEventListener('click', () => {
    //     plusIndex(-1);
    //     showSlides(slideIndex);
    // });

    // next.addEventListener('click', () => {
    //     plusIndex(1);
    //     showSlides(slideIndex);
    // });
}

export default slider;