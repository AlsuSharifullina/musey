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
//слайдер начало for welcome
let swiper = new Swiper(".mySwiper", {
  autoHeight: true,
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

// explore
document.addEventListener('DOMContentLoaded', function() {
    // Получаем необходимые элементы DOM
    const slider = document.getElementById('exsplore__slider');
    const mask = document.getElementById('mask');
    const imgWrapper = document.querySelector('.explore__img-wrapper');
    
    // Флаг для отслеживания состояния перетаскивания
    let isDragging = false;
    
    // Функция для обновления позиции слайдера и маски
    function updateSliderPosition(clientX) {
        const wrapperRect = imgWrapper.getBoundingClientRect();
        const wrapperLeft = wrapperRect.left;
        const wrapperWidth = wrapperRect.width;
        
        let newPosition = clientX - wrapperLeft;
        

        newPosition = Math.max(0, Math.min(newPosition, wrapperWidth));
        

        const percentage = (newPosition / wrapperWidth) * 100;
        

        mask.style.width = `${percentage}%`;
        slider.style.left = `${percentage}%`;
    }
    

    slider.addEventListener('mousedown', function(e) {
        isDragging = true;
        slider.classList.add('active');
        e.preventDefault(); 
    });
    
    // Обработчик движения мыши
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        updateSliderPosition(e.clientX);
    });
    
    // Обработчик окончания перетаскивания
    document.addEventListener('mouseup', function() {
        isDragging = false;
        slider.classList.remove('active');
    });
    
    // Обработчик выхода мыши за пределы документа
    document.addEventListener('mouseleave', function() {
        isDragging = false;
        slider.classList.remove('active');
    });
    
    // Сброс положения слайдера при обновлении страницы
    function resetSlider() {
        // Устанавливаем начальное положение (например, 50%)
        const initialPosition = 50;
        mask.style.width = `${initialPosition}%`;
        slider.style.left = `${initialPosition}%`;
    }
    
    resetSlider();
    
    // Дополнительно: обработка касаний для мобильных устройств
    slider.addEventListener('touchstart', function(e) {
        isDragging = true;
        slider.classList.add('active');
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        updateSliderPosition(e.touches[0].clientX);
        e.preventDefault();
    });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
        slider.classList.remove('active');
    });
});



// галлерея
document.addEventListener('DOMContentLoaded', function() {
  const gallerySection = document.querySelector('.gallery');
  const galleryImages = document.querySelectorAll('.gallery__img');
  
  // Функция для проверки видимости элемента с небольшим отступом
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return (
      rect.top <= viewportHeight * 0.75 && // Элемент в верхних 75% viewport
      rect.bottom >= 0
    );
  }
  
  // Функция для анимации изображений
  function animateImages() {
    galleryImages.forEach((img, index) => {
      if (isElementInViewport(img)) {
        // Если изображение видно - анимируем его
        if (img.style.opacity !== '1') {
          setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'translateY(0) scale(1)';
          }, index * 50); // Уменьшил задержку для более плавного эффекта
        }
      } else if (window.pageYOffset < gallerySection.offsetTop) {
        // Если мы выше секции галереи - сбрасываем анимацию
        img.style.opacity = '0';
        img.style.transform = 'translateY(50px) scale(0.9)';
      }
      // Если мы ниже секции галереи - оставляем изображения видимыми
    });
  }
  
  // Инициализация стилей для анимации
  function initAnimationStyles() {
    galleryImages.forEach(img => {
      img.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      img.style.opacity = '0';
      img.style.transform = 'translateY(50px) scale(0.9)';
      img.style.willChange = 'opacity, transform';
    });
  }
  
  // Проверка при загрузке страницы
  function checkOnLoad() {
    if (isElementInViewport(gallerySection)) {
      animateImages();
    }
  }
  
  // Инициализация
  initAnimationStyles();
  checkOnLoad();
  
  // Оптимизированный обработчик события прокрутки
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        animateImages();
        ticking = false;
      });
      ticking = true;
    }
  });
});