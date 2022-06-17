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
    const deadLine = `2022-08-18`;

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
        if (e.target === modal){
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
        constructor(src,alt,title,descr,price,parentSelector){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
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
            element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
            this.parent.append(element);
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu__field .container'
    ).render();
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        '.menu__field .container'
    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        12,
        '.menu__field .container'
    ).render();
});