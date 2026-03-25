import { test } from '@playwright/test';
import { MainPage } from '../../pages/mainPage/mainPage';

test.describe('Тоггл "Только срочные"', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
    });

    test('По умолчанию тогл выключен', async () => {
        await mainPage.expectUrgentOff();
    });

    test('Включение тоггла фильтрует только срочные карточки', async () => {
        await mainPage.toggleUrgent(true);
        await mainPage.expectUrgentOn();
        await mainPage.expectOnlyUrgentCards();
    });

    test('Выключение тоггла показывает все карточки', async () => {
        await mainPage.toggleUrgent(true);
        await mainPage.toggleUrgent(false);
        await mainPage.expectUrgentOff();
        await mainPage.expectAllCards();
    });
});