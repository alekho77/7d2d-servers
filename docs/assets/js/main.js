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
    
    // Функция для загрузки статуса EOS Services
    function loadEOSStatus() {
        console.log('Загрузка статуса EOS Services...');
        
        // Проверяем статус EOS Sessions и Anti-cheat
        checkEOSService('sessions', 'EOS Sessions');
        checkEOSService('anticheat', 'EOS Anti-cheat');
        
        // Обновляем время последнего обновления
        updateLastUpdated();
        
        // Автоматическое обновление каждые 5 минут
        setInterval(() => {
            checkEOSService('sessions', 'EOS Sessions');
            checkEOSService('anticheat', 'EOS Anti-cheat');
            updateLastUpdated();
        }, 300000); // 5 минут
    }
    
    // Функция для проверки конкретного EOS сервиса
    async function checkEOSService(serviceType, serviceName) {
        try {
            // Имитируем проверку статуса (в реальности здесь будет API запрос)
            const status = await simulateEOSCheck(serviceType);
            
            const dotElement = document.getElementById(`${serviceType}-dot`);
            const statusElement = document.getElementById(`${serviceType}-status`);
            
            if (dotElement && statusElement) {
                // Очищаем все классы статуса
                dotElement.className = 'status-dot';
                
                // Устанавливаем новый статус
                switch (status.state) {
                    case 'operational':
                        dotElement.classList.add('operational');
                        statusElement.textContent = 'Работает';
                        break;
                    case 'degraded':
                        dotElement.classList.add('degraded');
                        statusElement.textContent = 'Частичный сбой';
                        break;
                    case 'outage':
                        dotElement.classList.add('outage');
                        statusElement.textContent = 'Недоступен';
                        break;
                    case 'maintenance':
                        dotElement.classList.add('maintenance');
                        statusElement.textContent = 'Обслуживание';
                        break;
                    default:
                        dotElement.classList.add('operational');
                        statusElement.textContent = 'Неизвестно';
                }
            }
        } catch (error) {
            console.error(`Ошибка при проверке ${serviceName}:`, error);
            
            const dotElement = document.getElementById(`${serviceType}-dot`);
            const statusElement = document.getElementById(`${serviceType}-status`);
            
            if (dotElement && statusElement) {
                dotElement.className = 'status-dot outage';
                statusElement.textContent = 'Ошибка';
            }
        }
    }
    
    // Симуляция проверки EOS статуса (замените на реальный API)
    async function simulateEOSCheck(serviceType) {
        // Имитируем задержку сети
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        // Имитируем различные состояния с вероятностями
        const rand = Math.random();
        
        if (rand < 0.85) {
            return { state: 'operational' };
        } else if (rand < 0.95) {
            return { state: 'degraded' };
        } else if (rand < 0.98) {
            return { state: 'maintenance' };
        } else {
            return { state: 'outage' };
        }
    }
    
    // Обновление времени последнего обновления
    function updateLastUpdated() {
        const lastUpdatedElement = document.getElementById('last-updated');
        if (lastUpdatedElement) {
            const now = new Date();
            const timeString = now.toLocaleString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            lastUpdatedElement.textContent = timeString;
        }
    }

    // Инициализация загрузки статуса серверов
    loadServerStatus();
    
    // Инициализация загрузки статуса EOS Services
    loadEOSStatus();
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

// API для работы с EOS статусом
const EOSAPI = {
    // Получение статуса EOS Services
    // В реальном проекте можно использовать публичный API Epic Games Status
    // Пример: https://status.epicgames.com/api/v2/status.json
    getEOSStatus: async function() {
        try {
            // Пример реального запроса к API Epic Games:
            // const response = await fetch('https://status.epicgames.com/api/v2/status.json');
            // const data = await response.json();
            // return this.parseEOSStatus(data);
            
            // Пока используем симуляцию
            return {
                sessions: await simulateEOSCheck('sessions'),
                anticheat: await simulateEOSCheck('anticheat')
            };
        } catch (error) {
            console.error('Ошибка при получении статуса EOS:', error);
            return {
                sessions: { state: 'outage' },
                anticheat: { state: 'outage' }
            };
        }
    },
    
    // Парсинг данных от Epic Games Status API
    parseEOSStatus: function(statusData) {
        // Пример парсинга реальных данных от Epic Games
        // Нужно найти компоненты "Epic Online Services", "Sessions", "Anti-cheat"
        const components = statusData.page?.component || [];
        
        const findComponent = (name) => {
            return components.find(comp => 
                comp.name.toLowerCase().includes(name.toLowerCase())
            );
        };
        
        const sessionsComponent = findComponent('sessions') || findComponent('epic online services');
        const anticheatComponent = findComponent('anti-cheat') || findComponent('anticheat');
        
        return {
            sessions: {
                state: this.mapEpicStatusToOur(sessionsComponent?.status || 'unknown')
            },
            anticheat: {
                state: this.mapEpicStatusToOur(anticheatComponent?.status || 'unknown')
            }
        };
    },
    
    // Маппинг статусов Epic Games к нашим статусам
    mapEpicStatusToOur: function(epicStatus) {
        switch (epicStatus.toLowerCase()) {
            case 'operational':
                return 'operational';
            case 'degraded_performance':
            case 'partial_outage':
                return 'degraded';
            case 'major_outage':
            case 'under_maintenance':
                return 'outage';
            case 'maintenance':
                return 'maintenance';
            default:
                return 'operational';
        }
    }
};
