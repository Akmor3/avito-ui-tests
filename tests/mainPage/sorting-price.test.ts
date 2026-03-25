// tests/main-page/sorting-price.spec.ts
import { test } from '@playwright/test';
import { MainPage } from '../../pages/mainPage/mainPage';

test.describe('Сортировка "По цене"', () => {

    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
    });

    test('сортировка По цене (по убыванию) работает корректно', async () => {
        await mainPage.setSortBy('price');
        await mainPage.setOrder('desc');

        await mainPage.expectPricesSortedDesc();
    });

    test('сортировка По цене (по возрастанию) работает корректно', async () => {
        await mainPage.setSortBy('price');
        await mainPage.setOrder('asc');

        await mainPage.expectPricesSortedAsc();
    });

});