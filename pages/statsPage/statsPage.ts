// pages/statsPage.ts
import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class StatsPage extends BasePage {
    protected override readonly pageName = "Страница Статистики";

    readonly refreshButton: Locator;
    readonly enableAutoRefreshButton: Locator;
    readonly disableAutoRefreshButton: Locator;
    readonly timeValue: Locator;

    constructor(page: Page) {
        super(page);

        this.refreshButton = page.getByRole('button', { name: 'Обновить сейчас' });
        this.enableAutoRefreshButton = page.getByRole('button', { name: 'Включить автообновление' });
        this.disableAutoRefreshButton = page.getByRole('button', { name: 'Отключить автообновление' });
        this.timeValue = page.locator('._timeValue_ir5wu_112');
    }

    protected override root(): Locator {
        return this.page.locator('#root');
    }

    async open() {
        await this.page.goto("/stats");
        await this.waitForOpen();
    }

    async clickRefresh() {
        await this.refreshButton.click();
    }

    async stopTimer() {
        await this.disableAutoRefreshButton.click();
    }

    async startTimer() {
        await this.enableAutoRefreshButton.click();
    }

    async expectRefreshButtonIsVisible() {
        await expect(
            this.refreshButton,
            "Кнопка Обновить не отображается"
        ).toBeVisible();
    }

    async expectRefreshButtonIsEnabled() {
        await expect(
            this.refreshButton,
            "Кнопка Обновить недоступна"
        ).toBeEnabled();
    }

async expectTimerIsRunning() {
    await expect(this.disableAutoRefreshButton, "Таймер не запущен").toBeVisible();
}

async expectTimerIsStopped() {
    await expect(this.enableAutoRefreshButton, "Таймер не остановлен").toBeVisible();
}

    async expectTimeIsVisible() {
        await expect(
            this.timeValue,
            "Значение таймера не отображается"
        ).toBeVisible();
    }
}