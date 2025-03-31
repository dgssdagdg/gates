//Тут мы создаем слайдер с цветами забора и также переключаемя между ними
let fenceColors = document.querySelector('.fence-colors')
let swiperFenceColors;
function switchColors(type) {
    if(swiperFenceColors) {
        swiperFenceColors.disable()
    }
    let activeColor = document.querySelector('.fence-colors_pagination_img-active');
    let activeSliderColor = document.querySelector('.fence-colors-type-active')
    let typeSlider = document.querySelector('.fence-colors-type-active')
    if(type) {
        typeSlider = document.querySelector(`[data-type="${type.getAttribute('data-type')}"]`)

        activeColor.classList.remove('fence-colors_pagination_img-active')
        activeSliderColor.classList.remove('fence-colors-type-active')
    
        typeSlider.classList.add('fence-colors-type-active')
        type.classList.add('fence-colors_pagination_img-active')
    }

    swiperFenceColors = new Swiper(typeSlider, {
        slidesPerView: 'auto',
        speed: 300,
        spaceBetween: 20,
        navigation: {
            nextEl: '.fence-colors-button-next',
            prevEl: '.fence-colors-button-prev',
        },
        pagination: {
            el: '.fence-colors-pagination-mini',
            clickable: true,
        },
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if(fenceColors) {
        switchColors()
    }
//---------------------------------------------------------------------------------------------
    const serviceTypes = document.querySelectorAll('.services-type');
    const serviceItems = document.querySelectorAll('.services-item');

    // Функция для переключения контента
    function switchContent(type) {
        // Скрываем все элементы
        serviceItems.forEach((item, index) => {
            item.style.display = 'none';
        });
    
        const visibleItems = document.querySelectorAll(`.services-item[data-type="${type}"]`);
        visibleItems.forEach((item, index) => {
            item.style.display = 'block'; // Показываем элемент
        });
    }

    // Обработчик клика на тип услуги
    serviceTypes.forEach(type => {
        type.addEventListener('click', function () {
            // Убираем активный класс у всех типов
            serviceTypes.forEach(t => t.classList.remove('services-type-active'));

            // Добавляем активный класс к выбранному типу
            this.classList.add('services-type-active');

            // Переключаем контент
            const selectedType = this.getAttribute('data-type');
            switchContent(selectedType);
        });
    });

    // По умолчанию показываем контент для "заборы"
    if(serviceTypes.length >= 1) {
        switchContent('fences');
    }

    //--------------------------------------------------------------------------
    const answerItems = document.querySelectorAll('.answer-item');

    answerItems.forEach(item => {
        const openButton = item.querySelector('.answer-item-open');
        const menu = item.querySelector('.answer-item-menu');
        openButton.addEventListener('click', function () {
            if (item.classList.contains('_open')) {
                menu.style.maxHeight = '0';
            } else {
                menu.style.maxHeight = menu.scrollHeight + 'px';
            }
            item.classList.toggle('_open');
        });
    });




//Вот тут снизу все что связано с галереей------------------------------------------------------------------------------------------------
    const galleryTypes = document.querySelectorAll('.galery-type');
    const galleryItems = document.querySelectorAll('.galery-item');
    const loadMoreButton = document.querySelector('.galery-more-btn');
    const gallerySelectActive = document.querySelector('.galery-types-select-active');
    const gallerySelectItems = document.querySelector('.galery-types-select-items');
    const gallerySelectItem = document.querySelectorAll('.galery-types-select-item');
    let galaryMore = document.querySelector('.galary-more')
    let visibleItems;
    if(galaryMore) {
        visibleItems = 8;
    } else {
        visibleItems = 4; // Количество элементов, которые показываются изначально
    }
    let currentType = 'Все работы'; // Текущий выбранный тип
    let filteredItems = []; // Массив для хранения отфильтрованных элементов

    // Функция для фильтрации слайдов по типу
    function filterItemsByType(type) {
        
        filteredItems = Array.from(galleryItems).filter(item => {
            const itemType = item.getAttribute('data-type');
            return type === 'Все работы' || itemType === type;
        });
        // Сбрасываем количество видимых элементов
        if(galaryMore) {
            visibleItems = 8;
        } else {
            visibleItems = 4;
        }
        // Обновляем отображение
        updateVisibleItems();
    }

    // Функция для показа/скрытия элементов
    function updateVisibleItems() {
        // Сначала скрываем все элементы
        galleryItems.forEach(item => item.style.display = 'none');

        // Показываем только первые `visibleItems` элементов из отфильтрованных
        filteredItems.slice(0, visibleItems).forEach(item => {
            item.style.display = 'block';
        });

        // Скрываем кнопку, если все элементы уже видны
        if (visibleItems >= filteredItems.length) {
            loadMoreButton.style.display = 'none';
        } else {
            loadMoreButton.style.display = 'block';
        }
    }

    // Изначальная фильтрация и отображение

    if(galleryItems.length >= 1){
        filterItemsByType(currentType);
    }
    // Обработчик клика на тип (для десктопов)
    galleryTypes.forEach(type => {
        type.addEventListener('click', function () {
            currentType = this.textContent.trim(); // Получаем текст выбранного типа

            // Убираем активный класс у всех типов
            galleryTypes.forEach(t => t.classList.remove('galery-type-active'));
            // Добавляем активный класс выбранному типу
            this.classList.add('galery-type-active');

            // Фильтруем и обновляем отображение
            filterItemsByType(currentType);
        });
    });

    // Обработчик клика на кнопку "Показать еще"
    if(loadMoreButton) {
        loadMoreButton.addEventListener('click', function () {
            if(galaryMore) {
                visibleItems += 8; // Увеличиваем количество видимых элементов на 8
            } else {
                visibleItems += 4; // Увеличиваем количество видимых элементов на 4
            }
            updateVisibleItems(); // Обновляем отображение элементов
        });
    }

    if(gallerySelectActive) {
        // Обработчик для мобильного селекта
        gallerySelectActive.addEventListener('click', function () {
            gallerySelectItems.classList.toggle('active'); // Показываем/скрываем выпадающий список
        });
    }

    // Обработчик выбора элемента в селекте
    gallerySelectItem.forEach(item => {
        item.addEventListener('click', function () {
            currentType = this.textContent.trim(); // Получаем текст выбранного типа
            
            // Обновляем текст активного элемента
            gallerySelectActive.querySelector('span').textContent = currentType;

            // Скрываем выпадающий список
            gallerySelectItems.classList.remove('active');

            // Фильтруем и обновляем отображение
            filterItemsByType(currentType);
        });
    });

//Тут снизу все что связона с открытием картинок в модалке---------------------------------------------------------------------------------------------
    const modal = document.getElementById('photoModal');
    let modalContent;
    if(modal) {
        modalContent = modal.querySelector('.photo-slider .swiper-wrapper');
    }
    const images = document.querySelectorAll('._photo-img');

    let modalSwiper;

    // Функция для открытия модального окна
    function openModal(clickedImage) {
        // Очищаем содержимое модального слайдера
        modalContent.innerHTML = '';

        // Добавляем все изображения в модальный слайдер
        clickedImage.forEach(img => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
            modalContent.appendChild(slide);
        });

        // Открываем модальное окно
        modal.style.display = 'flex';

        // Инициализируем Swiper в модальном окне
        modalSwiper = new Swiper('.photo-slider', {
            loop: true,
            pagination: {
                el: '.photo-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return `<span class="${className}"><img src="${clickedImage[index].src}" alt="Thumbnail ${index + 1}"></span>`;
                },
            },
            navigation: {
                nextEl: '.photo-button-next',
                prevEl: '.photo-button-prev',
            },
        });

        // Переходим к слайду, на который кликнули
        const clickedIndex = Array.from(clickedImage).indexOf(clickedImage);
        modalSwiper.slideTo(clickedIndex);
    }

    // Обработчик клика на изображение
    images.forEach(img => {
        img.addEventListener('click', function (e) {
            let imgArray = e.target.closest('.swiper-wrapper').querySelectorAll('._photo-img')
            openModal(imgArray);
        });
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            if (modalSwiper) {
                modalSwiper.destroy(); // Уничтожаем Swiper при закрытии
            }
        }
    });

    //Оптимизация ifranme--------------------------------------------------------------------------
    const lazyIframes = document.querySelectorAll('.lazy-iframe');

    if ('IntersectionObserver' in window) {
        const iframeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    iframe.src = iframe.dataset.src;
                    iframeObserver.unobserve(iframe);
                }
            });
        });

        lazyIframes.forEach((iframe) => {
            iframeObserver.observe(iframe);
        });
    } else {
        // Fallback для старых браузеров (загрузить сразу)
        lazyIframes.forEach((iframe) => {
            iframe.src = iframe.dataset.src;
        });
    }
});

document.addEventListener('click', function(e) {
    let menuBtn = document.querySelector('.menu-btn');
    let menu = document.querySelector('.menu');
    if(e.target.closest('.menu-btn')) {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    } else if (menu.closest('.active') && !e.target.closest('.menu-row') && menuBtn.closest('.active')) {
        menuBtn.classList.remove('active');
        menu.classList.remove('active');
    }

    let catalogMenu = document.querySelector('.catalog-header')
    if(e.target.closest('.header-open-meny-btn')) {
        catalogMenu.classList.toggle('_active')
    } else if(catalogMenu.closest('._active') && !e.target.closest('.catalog-header-body')) {
        catalogMenu.classList.remove('_active')
    }

    let callBackMenu = document.querySelector('.call-back')
    if(e.target.closest('.header-open-pop-up') || e.target.closest('._open-call-back')) {
        callBackMenu.classList.toggle('_active')
    }   else if(callBackMenu.closest('._active') && !e.target.closest('.call-back-body') || e.target.closest('.call-back-close')) {
        let callBackMenuInput = document.querySelector('.call-back-input')
        callBackMenu.classList.remove('_active')
        callBackMenuInput.value = ''
    }

    let telMenu = document.querySelector('.tel-pop-up')
    let telMenuBtn = document.querySelector('.header-mini-tel-btn')
    if(e.target.closest('.header-mini-tel-btn')) {
        telMenu.classList.toggle('_active')
        telMenuBtn.classList.toggle('_active')
    } else if(telMenu.closest('._active') && !e.target.closest('.tel-pop-up-body')) {
        telMenu.classList.remove('_active')
        telMenuBtn.classList.remove('_active')
    }

    if (e.target.closest('.menu-select-open')) {
        let menuSelect = e.target.closest('.menu-select');
        let menuItems = menuSelect.querySelector('.menu-select-items');
    
        if (menuSelect.classList.contains('_active')) {
            // Если блок уже открыт, закрываем его
            menuSelect.classList.remove('_active');
            menuItems.style.maxHeight = '0'; // Сбрасываем высоту
        } else {
            // Если блок закрыт, открываем его
            menuSelect.classList.add('_active');
            // Устанавливаем max-height на реальную высоту содержимого
            menuItems.style.maxHeight = menuItems.scrollHeight + 'px';
        }
    }

    let menuPhone = document.querySelector('.mini-phone')
    if(e.target.closest('.mini-phone-block') && !menuPhone.closest('._active')) {
        menuPhone.classList.add('_active')
    } else if(menuPhone.closest('._active') && e.target.closest('.mini-phone-close')) {
        menuPhone.classList.remove('_active')
    }

    if(e.target.closest('._scroll-top')) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавная прокрутка
        });
    }

    if(e.target.closest('.iframe-overlay')) {
        e.target.style.display = 'none';
    }


    let nav = document.querySelector('.navigation')
    if(e.target.closest('.navigation-open')) {
        nav.classList.add('_active')
    }
    if(e.target.closest('.navigation-close')) {
        nav.classList.remove('_active')
    }
})
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition > 10) {
        header.classList.add('_shadow');
    } else {
        header.classList.remove('_shadow');
    }
});

// Функция для форматирования телефона
function formatPhoneInput(value) {
    value = value.replace(/\D/g, ''); // Удаляем всё, кроме цифр
    let formattedValue = '';

    if (value.length > 0) {
        formattedValue += '+7 ';
        if (value.length > 1) {
        formattedValue += '(' + value.substring(1, 4);
        }
        if (value.length > 4) {
        formattedValue += ') ' + value.substring(4, 7);
        }
        if (value.length > 7) {
        formattedValue += '-' + value.substring(7, 9);
        }
        if (value.length > 9) {
        formattedValue += '-' + value.substring(9, 11);
        }
    }

    return formattedValue;
}

// Находим все поля с классом phone-mask
const phoneInputs = document.querySelectorAll('._phone-mask');

// Добавляем обработчик события input для каждого поля
phoneInputs.forEach(input => {
    input.addEventListener('input', function (e) {
        e.target.value = formatPhoneInput(e.target.value);
    });
});

//-----------------------------------------------------------------------------------------------
let touchStartX = 0; // Начальная позиция касания по оси X
let touchEndX = 0;   // Конечная позиция касания по оси X
const swipeThreshold = 50; // Порог для определения свайпа (в пикселях)
let swipeBlock = document.querySelector('.prices-tops')
if(swipeBlock) {
    // Обработчик начала касания
    swipeBlock.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX; // Запоминаем начальную позицию
    })
    
    // Обработчик окончания касания
    swipeBlock.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].clientX; // Запоминаем конечную позицию
        handleSwipe(); // Определяем свайп
    })
}

// Функция для определения свайпа
function handleSwipe() {
    const deltaX = touchEndX - touchStartX; // Разница по оси X

    if (Math.abs(deltaX) > swipeThreshold) { // Проверяем, превышает ли разница порог
        if (deltaX > 0) {
            btnNavigation(false) // Если разница положительная, свайп вправо
        } else {
            btnNavigation(true) // Если разница отрицательная, свайп влево
        }
    }
}
function deleteActiveClass(name, type, activeClass) {
    let typeActive = document.querySelector(`.${activeClass}`)
    let allItems = document.querySelectorAll(`${name}`);
    let pressedItem =  Array.from(allItems).find(item => item.getAttribute('data-type') == type)
    typeActive.classList.remove(`${activeClass}`)
    pressedItem.classList.add(`${activeClass}`)
}
function btnNavigation(boolean) {
    let allItems = document.querySelectorAll('.prices-type');
    let typeActive = document.querySelector('.prices-type-active')
    let index = Array.from(allItems).indexOf(typeActive);
    let type;
    if(boolean) {
        type = allItems[index + 1];
        index = index + 1
    } else {
        type = allItems[index - 1];
        index = index - 1
    }
    typeChanges(type)
}
function typeChanges(type) {
    let typeValues;
    let slideElement = document.querySelectorAll('._slide-element');
    if(!type) {
        typeValues = document.querySelector('.prices-type-active').getAttribute('data-type');
    } else {

        type = type.getAttribute('data-type')
        //Добовляем активный клас нашим типам
        deleteActiveClass('.prices-type', type, 'prices-type-active')
        deleteActiveClass('.prices-slide-pagination-bullet', type, 'prices-slide-pagination-bullet-active')
        typeValues = type;
    }

    //Фильтруем масив ишя слайды с таким же типом
    let slideActive = Array.from(slideElement).filter((item) => item.getAttribute('data-type') == typeValues)
    
    //Скрываем все элементы а потом показываем элементы типа
    slideElement.forEach((item) => {
        item.style.display = 'none'
    })
    slideActive.forEach((item) => {
        item.style.display = 'block'
    })
}
let pricesTypes = document.querySelector('.prices-types')
if(pricesTypes) {
    typeChanges()
}

function isSafari() {
    return (
      /constructor/i.test(window.HTMLElement) ||
      (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(
        !window['safari'] || safari.pushNotification
      )
    );
}
const eventName = isSafari() ? 'load' : 'DOMContentLoaded';
// Оптимизированный обработчик загрузки
document.addEventListener(eventName, function () {
    if(fenceColors) {
        switchColors()
    }
    let swiperone = document.querySelector('.promotions-sliders');
    if(swiperone) {
        const swiper = new Swiper('.promotions-sliders', {
            // Optional parameters
            slidesPerView: 3,
            spaceBetween: 6,
            loop: true,
            speed: 500,
            pagination: {
              el: '.promotions-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.promotions-button-next',
              prevEl: '.promotions-button-prev',
            },
        });
    }

    let swiperBlogItem = document.querySelector('.blog-sliders');
    if(swiperBlogItem) {
        const swiperBlog = new Swiper('.blog-sliders', {
            spaceBetween: 10,
            speed: 500,
            slidesPerView: 'auto',
            // Navigation arrows
            navigation: {
              nextEl: '.blog-button-next',
              prevEl: '.blog-button-prev',
            },
            breakpoints: {
                768: {
                  slidesPerView: 2,
                }
              }
        });
    }

    let galerys = document.querySelectorAll('.galery-sliders');
    galerys.forEach((item) => {
        let itemGalery = item.closest('.galery-item')
        let prev = itemGalery.querySelector('.galery-button-prev')
        let next = itemGalery.querySelector('.galery-button-next')
        let pagination = itemGalery.querySelector('.galery-pagination')
        const swiperGalery = new Swiper(item, {
            speed: 500,
            // Navigation arrows
            navigation: {
              nextEl: next,
              prevEl: prev,
            },
            pagination: {
                el: pagination,
                clickable: true,
                renderBullet: function (index, className) {
                    // Получаем все слайды
                    const slides = item.querySelectorAll('.swiper-slide');
                    // Извлекаем путь к изображению из слайда
                    const imgSrc = slides[index].querySelector('img').getAttribute('src');
                    // Возвращаем кастомный элемент пагинации
                    return `
                        <span class="${className}">
                            <img src="${imgSrc}" alt="Thumbnail ${index + 1}">
                        </span>
                    `;
                },
              },
        });
    })

    let reviews = document.querySelector('.review-sliders');
    if(reviews) {
        const swiperReviews = new Swiper('.review-sliders', {
            spaceBetween: 6,
            slidesPerView: 'auto',
            speed: 500,
            pagination: {
                el: '.review-pagination',
                clickable: true,
              },
        });
    }

    let additionally = document.querySelector('.prices-additionally-sliders');
    if(additionally) {
        const swiperAdditionally = new Swiper('.prices-additionally-sliders', {
            slidesPerView: 1,
            spaceBetween: 10,
            speed: 500,
            pagination: {
                el: '.prices-additionally-pagination',
                clickable: true,
            },
        });
    }

    let examples = document.querySelector('.prices-examples-sliders');
    if(examples) {
        const swiperPricesExamples = new Swiper('.prices-examples-sliders', {
            slidesPerView: 1,
            spaceBetween: 17.5,
            initialSlide: 2,
            speed: 500,
            navigation: {
                nextEl: '.prices-examples-button-next',
                prevEl: '.prices-examples-button-prev',
              },
        });
    }

    let MetalPicket = document.querySelectorAll('.metal-picket-sliders')
    if(MetalPicket.length >= 1) {
        MetalPicket.forEach((item) => {
            const swiperMetalPicket = new Swiper(item, {
                slidesPerView: 'auto',
                spaceBetween: 15,
                speed: 500,
                navigation: {
                    nextEl: '.metal-picket-button-next',
                    prevEl: '.metal-picket-button-prev',
                  },
            });
        })
    }
})