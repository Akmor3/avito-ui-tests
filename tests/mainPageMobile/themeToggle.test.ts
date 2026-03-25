import { test, devices  } from "@playwright/test";
import { MainPage } from "../../pages/mainPage/mainPage";

test.use({
  ...devices['Pixel 5'],
});

test.describe('Мобильная версия', () => {
  test('смена темы с тёмной на светлую и обратно', async ({ page }) => {
    const main = new MainPage(page);

    await main.open();

    await main.expectTheme('Темная');

    await main.toggleTheme();
    await main.expectTheme('Светлая');

    await main.toggleTheme();
    await main.expectTheme('Темная');
  });
});