// Основной JavaScript для сайта 7D2D Servers

// Функция для копирования ссылки в буфер обмена
function copyToClipboard() {
    const linkText = document.getElementById('telegram-link');
    const copyBtn = document.querySelector('.copy-btn');
    
    // Создаем временный элемент для копирования
    const textArea = document.createElement('textarea');
    textArea.value = linkText.textContent;
    document.body.appendChild(textArea);
    
    try {
        // Выделяем и копируем текст
        textArea.select();
        textArea.setSelectionRange(0, 99999); // Для мобильных устройств
        
        const successful = document.execCommand('copy');
        
        if (successful) {
            // Изменяем текст кнопки на короткое время
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ Скопировано!';
            copyBtn.style.background = '#27ae60';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '#27ae60';
            }, 2000);
        }
    } catch (err) {
        console.error('Ошибка при копировании: ', err);
        
        // Fallback для современных браузеров
        if (navigator.clipboard) {
            navigator.clipboard.writeText(linkText.textContent).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✅ Скопировано!';
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Ошибка clipboard API: ', err);
            });
        }
    } finally {
        // Удаляем временный элемент
        document.body.removeChild(textArea);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигационных ссылок
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдение за элементами
    const animatedElements = document.querySelectorAll('.server-item, .config-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Активное выделение навигации при прокрутке
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Функция для загрузки статуса серверов (заглушка)
    function loadServerStatus() {
        // Здесь будет код для получения статуса серверов
        console.log('Загрузка статуса серверов...');
        
        // Пример добавления сервера в список
        const serverList = document.querySelector('.server-list');
        if (serverList) {
            // Очистить список и добавить актуальные данные
            // В реальном проекте здесь будет AJAX запрос
        }
    }
    
    // Инициализация загрузки статуса серверов
    loadServerStatus();
});

// Функции для работы с API (заглушки)
const ServerAPI = {
    // Получение списка серверов
    getServers: async function() {
        try {
            // В реальном проекте здесь будет запрос к API
            return [
                {
                    name: 'Vanilla Server',
                    status: 'online',
                    players: '12/50',
                    ip: 'server.example.com:26900'
                }
            ];
        } catch (error) {
            console.error('Ошибка при получении списка серверов:', error);
            return [];
        }
    },
    
    // Получение информации о сервере
    getServerInfo: async function(serverId) {
        try {
            // В реальном проекте здесь будет запрос к API
            return {
                id: serverId,
                name: 'Server Name',
                status: 'online',
                players: 12,
                maxPlayers: 50,
                uptime: '24:15:30'
            };
        } catch (error) {
            console.error('Ошибка при получении информации о сервере:', error);
            return null;
        }
    }
};
