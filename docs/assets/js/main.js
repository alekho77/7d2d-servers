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

// Глобальные функции для работы с EOS статусом
window.checkEOSService = async function(serviceType, serviceName) {
    try {
        // Получаем реальный статус от Epic Games API
        const eosStatus = await EOSAPI.getEOSStatus();
        
        const dotElement = document.getElementById(`${serviceType}-dot`);
        const statusElement = document.getElementById(`${serviceType}-status`);
        
        if (dotElement && statusElement) {
            let status;
            
            if (serviceType === 'sessions') {
                status = eosStatus.sessions;
            } else if (serviceType === 'anticheat') {
                status = eosStatus.anticheat;
            } else {
                status = { state: 'operational' };
            }
            
            // Очищаем все классы статуса
            dotElement.className = 'status-dot';
            
            // Устанавливаем новый статус
            switch (status.state) {
                case 'operational':
                    dotElement.classList.add('operational');
                    statusElement.textContent = status.fallback ? 'Работает (оффлайн)' : 'Работает';
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
};

window.setLoadingState = function(isLoading) {
    const sessionsStatus = document.getElementById('sessions-status');
    const anticheatStatus = document.getElementById('anticheat-status');
    
    if (isLoading) {
        if (sessionsStatus) sessionsStatus.textContent = 'Проверка...';
        if (anticheatStatus) anticheatStatus.textContent = 'Проверка...';
    }
};

window.updateLastUpdated = function() {
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
};

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
        
        // Показываем индикатор загрузки
        window.setLoadingState(true);
        
        // Проверяем статус EOS Services
        window.checkEOSService('sessions', 'EOS Sessions');
        window.checkEOSService('anticheat', 'EOS Anti-cheat');
        
        // Обновляем время последнего обновления
        window.updateLastUpdated();
        
        // Автоматическое обновление каждые 5 минут
        setInterval(() => {
            console.log('Автоматическое обновление статуса EOS...');
            window.checkEOSService('sessions', 'EOS Sessions');
            window.checkEOSService('anticheat', 'EOS Anti-cheat');
            window.updateLastUpdated();
        }, 300000); // 5 минут
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
    getEOSStatus: async function() {
        try {
            // Пробуем несколько CORS прокси по очереди
            const corsProxies = [
                'https://corsproxy.io/?',
                'https://cors-anywhere.herokuapp.com/',
                'https://api.codetabs.com/v1/proxy/?quest=',
                'https://thingproxy.freeboard.io/fetch/'
            ];
            
            const apiUrl = 'https://status.epicgames.com/api/v2/components.json';
            
            for (const proxy of corsProxies) {
                try {
                    console.log(`Пробуем прокси: ${proxy}`);
                    const response = await fetch(proxy + encodeURIComponent(apiUrl), {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                        },
                        cache: 'no-cache'
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log('Успешно получены данные через', proxy);
                        return this.parseEOSStatus(data);
                    }
                } catch (proxyError) {
                    console.warn(`Прокси ${proxy} не сработал:`, proxyError);
                    continue;
                }
            }
            
            // Если все прокси не работают, используем fallback
            console.log('Все CORS прокси недоступны, пробуем альтернативные методы');
            return await this.getAlternativeStatus();
            
        } catch (error) {
            console.error('Критическая ошибка при получении статуса EOS:', error);
            return this.getFallbackStatus();
        }
    },
    
    // Альтернативный метод получения статуса (через другие источники)
    getAlternativeStatus: async function() {
        try {
            // Метод 1: Попробуем через простой GET без прокси (может сработать в некоторых браузерах)
            console.log('Пробуем прямой запрос к Epic Games API...');
            const directResponse = await fetch('https://status.epicgames.com/api/v2/status.json', {
                mode: 'no-cors'
            });
            
            // Метод 2: Если есть собственный backend, можно добавить сюда запрос к нему
            // const backendResponse = await fetch('/api/eos-status');
            
            return this.getFallbackStatus();
        } catch (error) {
            console.warn('Альтернативные методы не сработали:', error);
            return this.getFallbackStatus();
        }
    },
    
    // Fallback статус когда API недоступен
    getFallbackStatus: function() {
        // Возвращаем последний известный статус или оптимистичный статус
        const lastKnownStatus = localStorage.getItem('eos-last-status');
        
        if (lastKnownStatus) {
            try {
                const parsed = JSON.parse(lastKnownStatus);
                console.log('Используем сохраненный статус из localStorage');
                return parsed;
            } catch (e) {
                console.warn('Не удалось распарсить сохраненный статус');
            }
        }
        
        // По умолчанию считаем все работающим
        console.log('Используем fallback статус по умолчанию');
        return {
            sessions: { 
                state: 'operational',
                name: 'EOS Sessions',
                fallback: true
            },
            anticheat: { 
                state: 'operational',
                name: 'EOS Anti-cheat',
                fallback: true
            }
        };
    },
    
    // Сохранение последнего успешного статуса
    saveLastStatus: function(status) {
        try {
            localStorage.setItem('eos-last-status', JSON.stringify(status));
            localStorage.setItem('eos-last-update', new Date().toISOString());
        } catch (e) {
            console.warn('Не удалось сохранить статус в localStorage');
        }
    },
    
    // Парсинг данных от Epic Games Status API
    parseEOSStatus: function(statusData) {
        console.log('Парсинг данных статуса Epic Games:', statusData);
        
        const components = statusData.components || [];
        
        // Ищем компоненты EOS
        const findComponent = (searchTerms) => {
            return components.find(comp => {
                const name = comp.name.toLowerCase();
                return searchTerms.some(term => name.includes(term.toLowerCase()));
            });
        };
        
        // Поиск Sessions компонента
        const sessionsComponent = findComponent(['sessions']) || 
                                 findComponent(['epic online services']) ||
                                 findComponent(['eos']);
        
        // Поиск Anti-cheat компонента  
        const anticheatComponent = findComponent(['anti-cheat', 'anticheat']) ||
                                  findComponent(['epic online services']) ||
                                  findComponent(['eos']);
        
        console.log('Найденные компоненты:', {
            sessions: sessionsComponent,
            anticheat: anticheatComponent
        });
        
        const result = {
            sessions: {
                state: this.mapEpicStatusToOur(sessionsComponent?.status || 'operational'),
                name: sessionsComponent?.name || 'EOS Sessions'
            },
            anticheat: {
                state: this.mapEpicStatusToOur(anticheatComponent?.status || 'operational'),
                name: anticheatComponent?.name || 'EOS Anti-cheat'
            }
        };
        
        // Сохраняем успешный статус
        this.saveLastStatus(result);
        
        return result;
    },
    
    // Маппинг статусов Epic Games к нашим статусам
    mapEpicStatusToOur: function(epicStatus) {
        console.log('Маппинг статуса:', epicStatus);
        
        switch (epicStatus.toLowerCase()) {
            case 'operational':
                return 'operational';
            case 'degraded_performance':
            case 'partial_outage':
            case 'degraded':
                return 'degraded';
            case 'major_outage':
            case 'outage':
                return 'outage';
            case 'under_maintenance':
            case 'maintenance':
                return 'maintenance';
            case 'unknown':
                return 'operational'; // По умолчанию считаем работающим
            default:
                return 'operational';
        }
    },
    
    // Альтернативный метод через общий статус Epic Games
    getGeneralStatus: async function() {
        try {
            const corsProxy = 'https://api.allorigins.win/raw?url=';
            const apiUrl = 'https://status.epicgames.com/api/v2/status.json';
            
            const response = await fetch(corsProxy + encodeURIComponent(apiUrl));
            const data = await response.json();
            
            console.log('Общий статус Epic Games:', data);
            
            // Если общий статус показывает проблемы, отражаем это на всех сервисах
            const generalState = this.mapEpicStatusToOur(data.status?.indicator || 'none');
            
            return {
                sessions: { state: generalState === 'operational' ? 'operational' : generalState },
                anticheat: { state: generalState === 'operational' ? 'operational' : generalState }
            };
        } catch (error) {
            console.error('Ошибка при получении общего статуса:', error);
            throw error;
        }
    }
};

// Функция для ручного обновления статуса EOS
window.refreshEOSStatus = function() {
    const refreshBtn = document.querySelector('.refresh-btn');
    
    // Добавляем анимацию вращения
    if (refreshBtn) {
        refreshBtn.classList.add('spinning');
        refreshBtn.disabled = true;
    }
    
    console.log('Ручное обновление статуса EOS...');
    
    // Показываем индикатор загрузки
    window.setLoadingState(true);
    
    // Проверяем статус
    Promise.all([
        window.checkEOSService('sessions', 'EOS Sessions'),
        window.checkEOSService('anticheat', 'EOS Anti-cheat')
    ]).finally(() => {
        // Убираем анимацию и активируем кнопку через 2 секунды
        setTimeout(() => {
            if (refreshBtn) {
                refreshBtn.classList.remove('spinning');
                refreshBtn.disabled = false;
            }
        }, 2000);
        
        window.updateLastUpdated();
    });
};

// Функция для тестирования разных статусов (для отладки)
window.setTestEOSStatus = function(sessionsState = 'operational', anticheatState = 'operational') {
    console.log(`Устанавливаем тестовый статус: Sessions=${sessionsState}, Anti-cheat=${anticheatState}`);
    
    const testStatus = {
        sessions: { state: sessionsState, name: 'EOS Sessions (TEST)' },
        anticheat: { state: anticheatState, name: 'EOS Anti-cheat (TEST)' }
    };
    
    // Сохраняем в localStorage
    EOSAPI.saveLastStatus(testStatus);
    
    // Обновляем отображение
    updateEOSDisplay(testStatus);
    updateLastUpdated();
};

// Функция для обновления отображения статуса
window.updateEOSDisplay = function(eosStatus) {
    ['sessions', 'anticheat'].forEach(serviceType => {
        const status = eosStatus[serviceType];
        const dotElement = document.getElementById(`${serviceType}-dot`);
        const statusElement = document.getElementById(`${serviceType}-status`);
        
        if (dotElement && statusElement) {
            // Очищаем все классы статуса
            dotElement.className = 'status-dot';
            
            // Устанавливаем новый статус
            switch (status.state) {
                case 'operational':
                    dotElement.classList.add('operational');
                    statusElement.textContent = status.fallback ? 'Работает (оффлайн)' : 'Работает';
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
    });
};
