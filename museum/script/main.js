// меню бургер
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('burger').addEventListener('click', function(){
    event._isClickWithInMenu = true
    document.querySelector('.header').classList.toggle('open')
  })
})

document.getElementById('nav-menu').addEventListener('click', event =>{
  event._isClickWithInMenu = true
})

document.getElementById('burger').addEventListener('click', event =>{
  event._isClickWithInMenu = true
})

document.body.addEventListener('click', event =>{

  if(event._isClickWithInMenu === true) return

   document.querySelector('.header').classList.remove('open')

})

// меню все
//слайдер начало 
let swiper = new Swiper(".mySwiper", {
  navigation: {
     nextEl: ".gallery__brn-next",
    prevEl: ".gallery__brn-prev",
  },
  // Автоматические буллеты (точки)
  pagination: {
    el: ".swiper-pagination-bull",
    type: "bullets",
    clickable: true,
  },
  // Ручное управление цифровым счётчиком
  on: {
    init: function() {
      updateCustomPagination(this); // Инициализация при загрузке
    },
    slideChange: function() {
      updateCustomPagination(this); // Обновление при переключении
    }
  }
});

// Функция для обновления кастомного счётчика
function updateCustomPagination(swiper) {
  const current = swiper.activeIndex + 1; // Текущий слайд (начинается с 1)
  const total = swiper.slides.length;     // Всего слайдов
  
  // Форматируем цифры
  const formattedCurrent = current.toString().padStart(2, '0');
  const formattedTotal = total.toString().padStart(2, '0');
  
  // Вставляем в кастомный блок
  document.querySelector('.custom-pagination-fraction').innerHTML = 
    `${formattedCurrent} | ${formattedTotal}`;
}