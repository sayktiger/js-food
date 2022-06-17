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

    modalTrigger.forEach(btn =>{
        btn.addEventListener(`click`, (e) =>{
            modal.classList.remove(`hide`);
            modal.classList.add(`show`);

            document.body.style.overflow = `hidden`;
        });
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
});