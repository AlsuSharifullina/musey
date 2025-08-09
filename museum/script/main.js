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
      rect.top <= viewportHeight * 0.75 && 
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
          }, index * 50); 
        }
      } else if (window.pageYOffset < gallerySection.offsetTop) {
        // Если мы выше секции галереи - сбрасываем анимацию
        img.style.opacity = '0';
        img.style.transform = 'translateY(50px) scale(0.9)';
      }
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


// билеты рассчет главная
document.addEventListener('DOMContentLoaded', function() {
    // Цены билетов
    const ticketPrices = {
        permanent: { basic: 20, senior: 10 },
        temporary: { basic: 25, senior: 12.5 },
        combined: { basic: 40, senior: 20 }
    };

    // Элементы DOM
    const basicInput = document.getElementById('tickets-age-18');
    const seniorInput = document.getElementById('tickets-age-65');
    const ticketTypeRadios = document.querySelectorAll('input[name="type-tikets"]');
    const totalElement = document.querySelector('.tickets__form-title-total span');
    const plusButtons = document.querySelectorAll('.btn__age-plus');
    const minusButtons = document.querySelectorAll('.btn__age-minus');

    // Загрузка сохраненных данных
    function loadSavedData() {
        const savedBasic = localStorage.getItem('ticketsBasic');
        const savedSenior = localStorage.getItem('ticketsSenior');
        const savedType = localStorage.getItem('ticketsType');

        if (savedBasic !== null) basicInput.value = savedBasic;
        if (savedSenior !== null) seniorInput.value = savedSenior;
        if (savedType) {
            document.getElementById(savedType).checked = true;
        }
    }

    // Расчет общей стоимости
    function calculateTotal() {
        const basicCount = parseInt(basicInput.value) || 0;
        const seniorCount = parseInt(seniorInput.value) || 0;
        const selectedType = document.querySelector('input[name="type-tikets"]:checked').id;
        
        const basicPrice = ticketPrices[selectedType].basic;
        const seniorPrice = ticketPrices[selectedType].senior;
        
        const total = (basicCount * basicPrice) + (seniorCount * seniorPrice);
        totalElement.textContent = total.toFixed(2);
    }

    // Обработчики событий
    function setupEventListeners() {
        // Изменение количества билетов
        basicInput.addEventListener('change', function() {
            if (this.value < 0) this.value = 0;
            if (this.value > 10) this.value = 10;
            localStorage.setItem('ticketsBasic', this.value);
            calculateTotal();
        });

        seniorInput.addEventListener('change', function() {
            if (this.value < 0) this.value = 0;
            if (this.value > 10) this.value = 10;
            localStorage.setItem('ticketsSenior', this.value);
            calculateTotal();
        });

        // Кнопки +/-
        plusButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const input = this.parentElement.querySelector('input');
                input.value = Math.min(parseInt(input.value || 0) + 1, 10);
                localStorage.setItem(input.id === 'tickets-age-18' ? 'ticketsBasic' : 'ticketsSenior', input.value);
                calculateTotal();
            });
        });

        minusButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const input = this.parentElement.querySelector('input');
                input.value = Math.max(parseInt(input.value || 0) - 1, 0);
                localStorage.setItem(input.id === 'tickets-age-18' ? 'ticketsBasic' : 'ticketsSenior', input.value);
                calculateTotal();
            });
        });

        // Изменение типа билета
        ticketTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                localStorage.setItem('ticketsType', this.id);
                calculateTotal();
            });
        });
    }

    // Инициализация
    loadSavedData();
    setupEventListeners();
    calculateTotal();
});



// карта
  const map = L.map('map').setView([48.86091, 2.3364], 16);

    // Добавляем тайлы OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Создаем кастомный маркер
    const redMarker = L.divIcon({
      className: 'custom-marker',
      html: '<svg viewBox="0 0 24 24" fill="#A62B1F"><path d="M12 0C7.8 0 4 3.2 4 8c0 4 8 16 8 16s8-12 8-16c0-4.8-3.8-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/></svg>',
      iconSize: [24, 24]
    });

    // Координаты маркеров
    const markers = [
      { lat: 48.86091, lng: 2.3364, title: "Главный вход" },
      { lat: 48.8602, lng: 2.3333, title: "Вход Porte des Lions" },
      { lat: 48.8607, lng: 2.3397, title: "Сад Карусель" },
      { lat: 48.8619, lng: 2.3330, title: "Музей декоративного искусства" },
      { lat: 48.8625, lng: 2.3365, title: "Пирамида" }
    ];

    // Добавляем маркеры на карту
    markers.forEach(point => {
      L.marker([point.lat, point.lng], {
        icon: redMarker,
        title: point.title
      }).addTo(map);
    });

    // Добавляем кнопки масштабирования
    L.control.zoom({ position: 'topright' }).addTo(map);