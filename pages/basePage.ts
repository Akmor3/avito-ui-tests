import { expect, Locator, Page } from "@playwright/test";

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected abstract root(): Locator;
    protected abstract pageName: string;

    async waitForOpen() {
        await expect(
            this.root(),
            `Страница ${this.pageName} не открылась`)
            .toBeVisible();
    }

    async waitForUrl(re: RegExp) {
        await expect(this.page).toHaveURL(re);
    }

    async clickAndWaitForUrl(clickTarget: Locator, re: RegExp) {
        await Promise.all([
            this.waitForUrl(re),
            clickTarget.click(),
        ]);
    }

    async fill(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async expectVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async expectHidden(locator: Locator) {
        await expect(locator).toBeHidden();
    }

    async expectEnabled(locator: Locator) {
        await expect(locator).toBeEnabled();
    }

    async expectDisabled(locator: Locator) {
        await expect(locator).toBeDisabled();
    }

    async getNumbers(locator: Locator): Promise<number[]> {
    const texts = await locator.allTextContents();
    return texts.map(t => {
        let numStr = "";
        for (const char of t) {
            if (char >= "0" && char <= "9") numStr += char;
        }
        return Number(numStr);
    });
    }

    expectInRange(numbers: number[], min: number, max: number) {
    for (const n of numbers) {
        expect(n).toBeGreaterThanOrEqual(min);
        expect(n).toBeLessThanOrEqual(max);
    }
    }

}
