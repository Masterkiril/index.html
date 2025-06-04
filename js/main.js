document.addEventListener('DOMContentLoaded', function() {
    // Анимация меню
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            if (nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });
    
    // Эффект при скролле
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Анимация элементов при скролле
        animateOnScroll();
    });
    
    // Инициализация particles.js
    particlesJS('particles-js', {
        particles: {
            number: { 
                value: 80, 
                density: { 
                    enable: true, 
                    value_area: 800 
                } 
            },
            color: { 
                value: "#ffffff" 
            },
            shape: { 
                type: "circle" 
            },
            opacity: { 
                value: 0.5, 
                random: true 
            },
            size: { 
                value: 3, 
                random: true 
            },
            line_linked: { 
                enable: true, 
                distance: 150, 
                color: "#ffffff", 
                opacity: 0.4, 
                width: 1 
            },
            move: { 
                enable: true, 
                speed: 2, 
                direction: "none", 
                random: true, 
                straight: false, 
                out_mode: "out" 
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { 
                    enable: true, 
                    mode: "repulse" 
                },
                onclick: { 
                    enable: true, 
                    mode: "push" 
                }
            }
        }
    });
    
    // Функция для анимации при скролле
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }
    
    // Инициализация
    animateOnScroll();
});

// Обновляем обработчик меню
document.addEventListener('DOMContentLoaded', function() {
    // Функция загрузки языка
    async function loadLanguage(lang) {
        const response = await fetch(`lang-${lang}.json`);
        return await response.json();
    }

    // Применение переводов
    function applyTranslations(translations) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }

    // Обработчик переключения языка
    document.querySelectorAll('.language-dropdown a').forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            
            localStorage.setItem('language', lang);
            const translations = await loadLanguage(lang);
            applyTranslations(translations);
            
            document.querySelector('.language-btn').innerHTML = 
                `${lang.toUpperCase()} <i class="fas fa-chevron-down"></i>`;
        });
    });

    // Инициализация языка при загрузке
    async function initLanguage() {
        const savedLang = localStorage.getItem('language') || 'ru';
        const translations = await loadLanguage(savedLang);
        applyTranslations(translations);
        
        document.querySelector('.language-btn').innerHTML = 
            `${savedLang.toUpperCase()} <i class="fas fa-chevron-down"></i>`;
    }

    initLanguage();

    // Остальной ваш код (меню, частицы и т.д.)
    // ...
});