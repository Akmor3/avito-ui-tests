### Требования

- Node.js 18+ (лучше LTS)
- npm 9+

### Установка

1) Установить зависимости:

```bash
npm install
```
Удостовериться, что установились браузеры
```bash
npx playwright install
```

### Запуск тестов

Запустить все тесты:

```bash
npx playwright test
```

Запустить конкретный тестовый файл reateAccount.test.ts:
```bash
npx playwright test tests/mainPage/priceFilter.test.ts
```

Запустить конкретный тест по названию:
```bash
npx playwright test --grep "Название теста"
```
## Дополнительные файлы

- В папке `task1` находится файл по первому заданию
