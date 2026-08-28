# SoloTome

**Личная библиотека в собственном Google-аккаунте.**

SoloTome — персональный каталог для прочитанных, текущих и запланированных книг. Он создаёт отдельный экземпляр приложения и таблиц в Google-аккаунте пользователя: без общей базы библиотек и без необходимости поднимать собственный сервер.

🌐 **Сайт проекта:** https://rommm13.github.io/solotome/

## Что будет в SoloTome

- статусы чтения, оценки по 10-балльной шкале и личные заметки;
- поиск метаданных через Google Books, Open Library и FantLab;
- одиночный и массовый импорт с предварительной проверкой и обнаружением дублей;
- независимый человекочитаемый экспорт каталога в `SoloTome_Export` Google Sheet;
- необязательные персональные рекомендации с Gemini;
- работа в браузере на компьютере, планшете и телефоне, с возможностью установки как PWA.
- мобильный интерфейс отдельно оптимизирован для небольших экранов;
- экспериментальная синхронизация перечня книг и статусов чтения с PocketBook и Kindle без передачи файлов книг.

## Где хранятся данные

Каталог создаётся в Google-аккаунте пользователя. SoloTome не использует общую пользовательскую базу для хранения библиотек. Отдельный экспорт в Google Sheets задуман как независимая копия, которую можно открыть, скачать или использовать для переноса данных без интерфейса SoloTome.

## Состояние проекта

Сейчас завершается MVP и публичная упаковка проекта. В этом репозитории уже находится production-сайт на React/Vite и его автоматический деплой в GitHub Pages. Стабильная версия приложения, установщик и пользовательская документация будут перенесены сюда после приёмки MVP и проверки установки с чистого Google-аккаунта.

Текущий код сайта находится в [`website/`](website/), дизайн-спецификация — в [`docs/website-design-spec.md`](docs/website-design-spec.md).

## Технологии

**Приложение:** Google Apps Script + Google Sheets  
**Сайт:** React + TypeScript + Vite + Framer Motion  
**Публикация сайта:** GitHub Pages + GitHub Actions

## English

**SoloTome is a personal open-source book catalog that runs in your own Google account.** Each user gets an isolated app instance and Google Sheets-backed catalog, without operating a personal server or storing libraries in a shared SoloTome user database. The public application and installer will be added here after MVP acceptance and clean-account installation testing.

---

SoloTome is under active development and is intended to be released as open source. A project license will be added before the first public application release.
