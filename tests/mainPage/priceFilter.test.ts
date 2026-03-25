// tests/main-page/price-filter.spec.ts
import { test } from '@playwright/test';
import { MainPage } from '../../pages/mainPage/mainPage';

test.describe('Фильтр "Диапазон цен"', () => {


    //Вопросы к началу тестирования:
    let mainPage: MainPage;
    
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
    });

    test('фильтр Диапазон цен: оба значения заданы', async () => {
        const minPrice = 1000;
        const maxPrice = 10000;
        await mainPage.setSortBy('price');
        await mainPage.setOrder('asc');

        await mainPage.setPriceRange(minPrice, maxPrice);

        await mainPage.expectPricesNotBelow(minPrice);
        await mainPage.expectPricesNotAbove(maxPrice);
        await mainPage.setSortBy('price');
        await mainPage.setOrder('desc');

        await mainPage.expectPricesNotBelow(minPrice);
        await mainPage.expectPricesNotAbove(maxPrice);
    });

    test('фильтр Диапазон цен: только минимальная цена (от)', async () => {
        const minPrice = 50000;

        await mainPage.setSortBy('price');
        await mainPage.setOrder('asc');

        await mainPage.setPriceRange(minPrice, '');
        
        await mainPage.expectPricesNotBelow(minPrice);
    });

    test('фильтр Диапазон цен: только максимальная цена (до)', async () => {
        const maxPrice = 40000;

        await mainPage.setSortBy('price');
        await mainPage.setOrder('desc');

        await mainPage.setPriceRange('', maxPrice);

        await mainPage.expectPricesNotAbove(maxPrice);
    });

    test('фильтр Диапазон цен: нулевой диапазон', async () => {
    const minPrice = 0;
    const maxPrice = 0;

    await mainPage.setPriceRange(minPrice, maxPrice);

    await mainPage.expectPricesNotBelow(minPrice);
    await mainPage.expectPricesNotAbove(maxPrice);
});

});