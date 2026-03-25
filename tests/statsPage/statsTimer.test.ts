import { test } from '@playwright/test';
import { StatsPage } from '../../pages/statsPage/statsPage';
import { MainPage } from '../../pages/mainPage/mainPage';

test.describe('Статистика', () => {

    let main: MainPage;
    let stats: StatsPage;

    test.beforeEach(async ({ page }) => {
        main = new MainPage(page);
        stats = new StatsPage(page);

        await main.open();
        await main.openStatsPage();
    });

    test('Кнопка Обновить работает', async () => {
        await stats.expectRefreshButtonIsVisible();
        await stats.expectRefreshButtonIsEnabled();
        await stats.clickRefresh();
    });

    test('Таймер можно остановить', async () => {
        await stats.expectTimerIsRunning();
        await stats.stopTimer();
        await stats.expectTimerIsStopped();
    });

    test('Таймер можно запустить после паузы', async () => {
        await stats.stopTimer();
        await stats.expectTimerIsStopped();
        await stats.startTimer();
        await stats.expectTimerIsRunning();
    });

        test('значение таймера отображается', async () => {
        await stats.expectTimeIsVisible();
    });
});