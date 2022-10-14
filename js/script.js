document.addEventListener(`DOMContentLoaded`, () => {
    //tabs
    const tabs = document.querySelectorAll(`.tabheader__item`),
        tabsContent = document.querySelectorAll(`.tabcontent`),
        tabsParent = document.querySelector(`.tabheader__items`);

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.classList.remove(`show`, `fade`);
            item.classList.add(`hide`);
        });
        tabs.forEach(item => {
            item.classList.remove(`tabheader__item_active`);
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add(`show`,`fade`);
        tabsContent[i].classList.remove(`hide`);
        tabs[i].classList.add(`tabheader__item_active`);
    }

    tabsParent.addEventListener(`click`, (event) => {
        const target = event.target;

        if(target && target.classList.contains(`tabheader__item`)){
            tabs.forEach((item, i) =>{
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    hideTabContent();
    showTabContent();


    //timer
    const deadLine = `2022-10-18`;

    function getZero (num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        } else if(num < 0){
            return `00`;
        }else {
            return num;
        }
    }

    function getTimeRamaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t/(1000*60*60*24)),
            hours = Math.floor((t/(1000*60*60)) % 24),
            minutes = Math.floor((t/(1000 * 60) % 60)),
            seconds = Math.floor((t/1000) % 60);
        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
            
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(`.timer`),
            days = timer.querySelector(`#days`),
            hours = timer.querySelector(`#hours`),
            minutes = timer.querySelector(`#minutes`),
            seconds = timer.querySelector(`#seconds`),
            timerInterval = setInterval(updateClock, 1000);

            updateClock();

        function updateClock(){
            const t = getTimeRamaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timerInterval);
            }
        }
    }

    setClock(`.timer`, deadLine);


    //Модальное окно
    const modalTrigger = document.querySelectorAll(`[data-modal]`),
        modal = document.querySelector(`.modal`),
        modalClose = document.querySelector(`.modal__close`);
    function openModal(){
        modal.classList.remove(`hide`);
        modal.classList.add(`show`);

        document.body.style.overflow = `hidden`;

        clearTimeout(timerModalId);
    }
    modalTrigger.forEach(btn =>{
        btn.addEventListener(`click`, openModal);
    });
    function closeModal(){
        modal.classList.add(`hide`);
        modal.classList.remove(`show`);
        document.body.style.overflow = ``;
    }

    modalClose.addEventListener(`click`, closeModal);

    modal.addEventListener(`click`, (e) =>{
        if (e.target === modal || e.target.getAttribute(`data-close`) == ""){
            closeModal();
        }
    });

    document.addEventListener(`keydown`, (e)=>{
        if (e.code === `Escape` && modal.classList.contains(`show`)){
            closeModal();
        }
    });

    const timerModalId = setTimeout(openModal, 10000);

    function showModal(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
            openModal();
            window.removeEventListener(`scroll`, showModal);
        }
    }

    window.addEventListener(`scroll`, showModal);

    //Динамические создаем карточки товаров
    class MenuCard {
        constructor(src,alt,title,descr,price,parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.price = price;
            this.transfer = 27;
            
            this.changeToUAH();

            this.parent = document.querySelector(parentSelector);
        }
        changeToUAH(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement(`div`);
            if (this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
            this.parent.append(element);
        }
    }

    // const getResourse = async (url) => {
    //     const res = await fetch(url);

    //     if (!res.ok){
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // };

    // getResourse(`http://localhost:3000/menu`)
    // .then(data =>{
        // data.forEach(({img, alt, title, descr, price}) => {
        //     new MenuCard(img, alt, title, descr, price, `.menu .container`).render();
        // });
    // });

    // axios.get(`http://localhost:3000/menu`)
    // .then(data => {
    //     data.data.forEach(({img, alt, title, descr, price}) => {
    //         new MenuCard(img, alt, title, descr, price, `.menu .container`).render();
    //     });
    // });

    // getResourse(`http://localhost:3000/menu`)
    // .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, alt, title, descr, price}) =>{
    //         const element = document.createElement(`div`);

    //         element.classList.add(`menu__item`);
    //         element.innerHTML = `
    //             <img src=${img} alt=${alt}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector(`.menu .container`).append(element);
    //     });
    // }

    //Forms
    // const forms = document.querySelectorAll('form');
    // const message = {
    //     loading: 'img/form/spinner.svg',
    //     success: 'Спасибо! Скоро мы с вами свяжемся',
    //     failure: 'Что-то пошло не так...'
    // };

    // forms.forEach(item => {
    //     bindPostData(item);
    // });


    // const postData = async (url, data) => {
    //     const res = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: data
    //     });

    //     return await res.json();
    // };

    // function bindPostData(form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         let statusMessage = document.createElement('img');
    //         statusMessage.src = message.loading;
    //         statusMessage.style.cssText = `
    //             display: block;
    //             margin: 0 auto;
    //         `;
    //         form.insertAdjacentElement('afterend', statusMessage);
        
    //         const formData = new FormData(form);

    //         const json = JSON.stringify(Object.fromEntries(formData.entries()));

    //         postData('http://localhost:3000/requests', json)
    //         .then(data => {
    //             console.log(data);
    //             showThanksModal(message.success);
    //             statusMessage.remove();
    //         }).catch(() => {
    //             showThanksModal(message.failure);
    //         }).finally(() => {
    //             form.reset();
    //         });
    //     });
    // }

    // forms.forEach(item => {
    //     postData(item);
    // });

    // function showThanksModal(message){
    //     const prevModalDialog = document.querySelector(`.modal__dialog`);

    //     prevModalDialog.classList.add(`hide`);
    //     openModal();
    //     const thanksModal = document.createElement(`div`);
    //     thanksModal.classList.add(`modal__dialog`);
    //     thanksModal.innerHTML = `
    //     <div class="modal__content">
    //         <div class="modal__close" data-close>&times;</div>
    //         <div class="modal__title">${message}</div>
    //     </div>
    //     `;

    //     document.querySelector(`.modal`).append(thanksModal);

    //     setTimeout(()=>{
    //         thanksModal.remove();
    //         prevModalDialog.classList.add(`show`);
    //         prevModalDialog.classList.remove(`hide`);
    //         closeModal();
    //     },4000);
    // }


    const prev = document.querySelector(`.offer__slider-prev`),
        dots = [],
        slider = document.querySelector(`.offer__slider`),
        next = document.querySelector(`.offer__slider-next`),
        slides = document.querySelectorAll(`.offer__slide`),
        total = document.querySelector(`#total`),
        current = document.querySelector(`#current`);
        sliderWrapper = document.querySelector(`.offer__slider-wrapper`),
        sliderField = document.querySelector(`.offer__slider-inner`),
        width = window.getComputedStyle(sliderWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    const dotsAppend = function(){
        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = `0.5`);
        dots[slideIndex - 1].style.opacity = `1`;
    };

    const strReg = function(str){
        return +str.replace(/\D/g, ``);
    }

    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length
        current.textContent = `0${slideIndex}`;
    }

    sliderField.style.width = 100 * slides.length + `%`;
    sliderField.style.display = `flex`;
    sliderField.style.transition = `0.5s all`;

    sliderWrapper.style.overflow = `hidden`;

    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener(`click`, () =>{
        if(offset == strReg(width) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += strReg(width);
        }
        sliderField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        dotsAppend();
    });

    prev.addEventListener(`click`, () =>{
        if(offset == 0){
            offset = strReg(width) * (slides.length - 1);
        } else {
            offset -= strReg(width);
        }
        sliderField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        dotsAppend();
    });

    slider.style.position = `relative`;
    const indicators = document.createElement(`ol`);
    indicators.classList.add(`carousel-indicator`);
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement(`li`);
        dot.setAttribute(`data-slide-to`, i+1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if(i == 0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }


    dots.forEach(dot => {
        dot.addEventListener(`click`, (e) =>{
            const slideTo = e.target.getAttribute(`data-slide-to`);
            slideIndex = slideTo;
            offset = strReg(width) * (slideTo - 1);
            sliderField.style.transform = `translateX(-${offset}px)`;

            dotsAppend();
        });
    });
    // showSlides(slideIndex);

    // if(slides.length < 10){
    //     total.textContent = `0${slides.length}`
    // } else {
    //     total.textContent = slides.length
    // }

    // function showSlides(n){
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1){
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => {
    //         item.style.display = `none`;
    //     });

    //     slides[slideIndex - 1].style.display = `block`;

    //     if(slides.length < 10){
    //         current.textContent = `0${slideIndex}`
    //     } else {
    //         total.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener(`click`, () =>{
    //     plusSlides(-1);
    // });

    // next.addEventListener(`click`, () =>{
    //     plusSlides(1);
    // });


    //Калькулятор
    const result = document.querySelector(`.calculating__result span`);
    let sex = "female",heigth, weight, age, ratio = 1.375;

    function calcTotal(){
        if(!sex || !heigth || !weight || !age || !ratio){
            result.textContent = "____";
            return;
        }
        
        if(sex === `female`){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * heigth) - (4.3 * age)) * ratio);
        } else {
            result.textContent =Math.round((88.36 + (13.4 * weight) + (4.8 * heigth) - (5.7 * age)) * ratio);
        }   
    }

    calcTotal();

    function getStaticInfo(parentSelector, activeClass){
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem =>{
            elem.addEventListener(`click`, (e) =>{
                if (e.target.getAttribute(`data-ratio`)){
                    ratio = +e.target.getAttribute(`data-ratio`);
                } else{
                    sex = e.target.getAttribute(`id`);
                }
    
                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        }); 

        document.querySelector(parentSelector).addEventListener(`click`, (e) =>{
            
        });
        
    }

    getStaticInfo(`#gender` , `calculating__choose-item_active`);
    getStaticInfo(`.calculating__choose_big` , `calculating__choose-item_active`);


    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case "height":
                    heigth = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
                
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
});