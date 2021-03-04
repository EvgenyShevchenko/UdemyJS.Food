window.addEventListener("DOMContentLoaded", () => {
  //tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabsContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide", "fade");
      item.classList.remove("show");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabsContent(i = 0) {
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabsContent();
  showTabsContent();

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, indx) => {
        if (target == item) {
          hideTabsContent();
          showTabsContent(indx);
        }
      });
    }
  });

  //Timer

  const deadline = '2021-03-10';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60) % 24)),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);


  //modal
  const btnModal = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalClose = document.querySelector('[data-close]');

  function modalHide() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function modalShow() {
    modal.classList.remove('hide');
    modal.classList.add('show', 'fade');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
  }

  btnModal.forEach(item => item.addEventListener('click', modalShow));
  modalClose.addEventListener('click', modalHide);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modalHide();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      modalHide();
    }
  });

  const modalTimer = setTimeout(modalShow, 5000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      modalShow();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);


});