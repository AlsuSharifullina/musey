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
  
  // Форматируем цифры (например, "01 — 05")
  const formattedCurrent = current.toString().padStart(2, '0');
  const formattedTotal = total.toString().padStart(2, '0');
  
  // Вставляем в кастомный блок
  document.querySelector('.custom-pagination-fraction').innerHTML = 
    `${formattedCurrent} | ${formattedTotal}`;
}