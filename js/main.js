// ========================================
// ОБЩАЯ ФУНКЦИОНАЛЬНОСТЬ - main.js
// ========================================

// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', function () {

    // Мобильное меню
    initMobileMenu();

    // Плавная прокрутка
    initSmoothScroll();

    // Анимация при скролле
    initScrollAnimation();

});

// ========================================
// МОБИЛЬНОЕ МЕНЮ
// ========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');

            // Анимация бургер-кнопки
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Закрытие меню при клике на ссылку
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');

                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', function (event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');

                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// ========================================
// ПЛАВНАЯ ПРОКРУТКА
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// АНИМАЦИЯ ПРИ СКРОЛЛЕ
// ========================================
function initScrollAnimation() {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        let lastScroll = 0;

        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;

            // Добавление тени при скролле
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(212, 165, 116, 0.15)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(212, 165, 116, 0.1)';
            }

            lastScroll = currentScroll;
        });
    }
}

// ========================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ========================================

// Форматирование цены
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

// Валидация email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Валидация телефона
function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
    return re.test(phone);
}

// Маска для телефона
// Маска для телефона Кыргызстана
function phoneMask(input) {
    if (!input) return;
    
    input.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        
        // Если начинается с 0, заменяем на 996
        if (value.length > 0 && value[0] === '0') {
            value = '996' + value.slice(1);
        }
        
        let formatted = '+996';
        
        if (value.length > 3) {
            formatted += ' (' + value.substring(3, 6); // (XXX)
        }
        if (value.length >= 7) {
            formatted += ') ' + value.substring(6, 9); // XXX
        }
        if (value.length >= 10) {
            formatted += '-' + value.substring(9, 12); // XX-XX
        }
        
        this.value = formatted;
    });
    
    // Устанавливаем начальное значение
    if (!input.value) {
        input.placeholder = '+996 (XXX) XXX-XX-XX';
    }
}
// Применить маску ко всем полям телефона
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => phoneMask(input));