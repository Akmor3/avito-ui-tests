// tests/main-page/category-filter.spec.ts
import { test } from '@playwright/test';
import { MainPage } from '../../pages/mainPage/mainPage';

test.describe('Фильтр по категории', () => {

    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
    });

const testCategories = [
        'Недвижимость',
        'Животные',
        'Мода',
        'Транспорт',
        'Работа',
        'Услуги',
        'Детское',
        'Электроника'
    ];

    for (const category of testCategories) {
        test(`фильтр по категории "${category}" показывает только объявления этой категории`, async () => {
            await mainPage.selectCategory(category);

            await mainPage.expectCategory(category);
        });
    }

});