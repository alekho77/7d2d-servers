# Документация GitHub Pages

Эта папка содержит исходные файлы для сайта GitHub Pages проекта 7 Days to Die Servers.

## 🌐 Структура сайта

```
docs/
├── index.html           # Главная страница
├── configs.md          # Документация конфигураций
├── _config.yml         # Настройки Jekyll
├── Gemfile             # Ruby зависимости
├── assets/             # Статические ресурсы
│   ├── css/style.css   # Основные стили
│   ├── js/main.js      # JavaScript
│   └── images/         # Изображения
├── _layouts/           # Шаблоны Jekyll
│   └── default.html    # Основной шаблон
└── _includes/          # Включаемые компоненты
    └── breadcrumb.html # Навигационные крошки
```

## 🚀 Локальная разработка

Для запуска сайта локально:

1. Установите Ruby и Bundler
2. Выполните команды:
   ```bash
   cd docs
   bundle install
   bundle exec jekyll serve
   ```
3. Откройте http://localhost:4000

## 📝 Редактирование

- **Контент**: Редактируйте `.md` и `.html` файлы
- **Стили**: Изменяйте `assets/css/style.css`
- **JavaScript**: Обновляйте `assets/js/main.js`
- **Настройки**: Конфигурируйте в `_config.yml`

## 🔗 Полезные ссылки

- [Jekyll документация](https://jekyllrb.com/docs/)
- [GitHub Pages руководство](https://docs.github.com/en/pages)
- [Liquid шаблоны](https://shopify.github.io/liquid/)
