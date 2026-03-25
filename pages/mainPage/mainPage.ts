import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class MainPage extends BasePage {
    protected override readonly pageName = "Главная страница";

    readonly urgentToggleInput: Locator;
    readonly urgentToggleLabel: Locator;

    readonly sortBySelect: Locator;
    readonly orderSelect: Locator;
    readonly categorySelect: Locator;

    readonly priceFromInput: Locator;
    readonly priceToInput: Locator;
    readonly resetFiltersButton: Locator;

    readonly cards: Locator;
    readonly cardPrices: Locator;
    readonly cardCategories: Locator;
    readonly cardPriorities: Locator;

    readonly statsLink: Locator;

    readonly themeToggleButton: Locator;
    readonly themeIcon: Locator;
    readonly themeLabel: Locator;

    constructor(page: Page) {
        super(page);
        
        this.urgentToggleInput = page.locator('input._urgentToggle__input_h1vv9_14');
        this.urgentToggleLabel = page.locator('span._urgentToggle__label_h1vv9_51');

        this.sortBySelect = page.locator('div:has(> label:has-text("Сортировать по")) select');
        this.orderSelect = page.locator('div:has(> label:has-text("Порядок")) select');
        this.categorySelect = page.locator('div:has(> label:has-text("Категория")) select');

        this.priceFromInput = page.getByPlaceholder('От').first();
        this.priceToInput = page.getByPlaceholder('До').first();

        this.resetFiltersButton = page.getByRole('button', { name: /Сбросить/ });

        this.cards = page.locator('._card_15fhn_2');
        this.cardPrices = this.cards.locator('._card__price_15fhn_241');
        this.cardPriorities = this.cards.locator('._card__priority_15fhn_172');

        this.cardCategories = this.cards.locator('._card__category_15fhn_259');

        this.statsLink = page.getByRole('link', { name: 'Статистика' });

        this.themeToggleButton = page.getByLabel(/Switch to/);
        this.themeIcon = this.themeToggleButton.locator('span._icon_127us_23');
        this.themeLabel = this.themeToggleButton.locator('span._label_127us_35');
    }

    protected override root(): Locator {
        return this.page.locator('#root');
    }

    async open() {
        await this.page.goto("/");
        await this.waitForOpen();
    }

        async openStatsPage() {
        await this.statsLink.click();
    }

    async setPriceRange(from: number | '', to: number | '') {
        if (from !== '') await this.fill(this.priceFromInput, from.toString());
        if (to !== '') await this.fill(this.priceToInput, to.toString());
    }
    
    async setSortBy(value: 'createdAt' | 'price' | 'priority') {
        await this.sortBySelect.selectOption(value);
    }

    async setOrder(value: 'asc' | 'desc') {
        await this.orderSelect.selectOption(value);
    }

    async selectCategory(category: string) {
        await this.categorySelect.selectOption({ label: category });
    }

  async toggleUrgent(on: boolean) {
    const isChecked = await this.urgentToggleInput.isChecked();
    if (isChecked !== on) {
      await this.urgentToggleLabel.click();
    }
  }


    async expectUrgentOn() {
    await expect(this.urgentToggleInput).toBeChecked();
  }

    async expectUrgentOff() {
    await expect(this.urgentToggleInput).not.toBeChecked();
  }

async expectOnlyUrgentCards() {
    const cardCount = await this.cards.count();
    const urgentCount = await this.cardPriorities.count();
    expect(urgentCount, "Отображаются не срочные карточки").toBe(cardCount);
}


async expectAllCards() {
    const cardCount = await this.cards.count();
    const urgentCount = await this.cardPriorities.count();
    
    expect(urgentCount, "Должны быть срочные карточки").toBeGreaterThan(0);
    expect(urgentCount, "Должны быть обычные карточки").toBeLessThan(cardCount);
}


    async toggleTheme() {
    await this.themeToggleButton.click();
    }
    
    async expectPricesNotBelow(min: number) {
        const prices = await this.getNumbers(this.cardPrices);
        for (const price of prices) {
            expect(price, `Найдена цена ниже ${min}: ${price}`).toBeGreaterThanOrEqual(min);
        }
    }

    async expectPricesNotAbove(max: number) {
        const prices = await this.getNumbers(this.cardPrices);
        for (const price of prices) {
            expect(price, `Найдена цена выше ${max}: ${price}`).toBeLessThanOrEqual(max);
        }
    }

    async expectPricesSortedAsc() {
        const prices = await this.getNumbers(this.cardPrices);
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    }

    async expectPricesSortedDesc() {
        const prices = await this.getNumbers(this.cardPrices);
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
    }


    // Для проверки фильтра по категории
    async expectCategory(expectedCategory: string) {
        const categories = await this.cardCategories.allTextContents();
        
        for (const category of categories) {
            expect(
                category,
                `Ожидалась категория "${expectedCategory}", но найдена "${category}"`
            ).toBe(expectedCategory);
        }
    }

    async expectTheme(label: 'Светлая' | 'Темная') {
        await expect(this.themeLabel).toHaveText(label);
        if (label === 'Светлая') {
            await expect(this.themeIcon).toHaveClass(/_icon--dark/);
        } else {
            await expect(this.themeIcon).toHaveClass(/_icon--light/);
        }

        await this.page.waitForTimeout(500);

        const rootBackgroundColor = await this.page.locator('#root').evaluate(el => getComputedStyle(el).backgroundColor);
    
        if (label === 'Темная') {
        expect(rootBackgroundColor).toBe('rgb(255, 255, 255)');
        } else {
        expect(rootBackgroundColor).toBe('rgb(26, 26, 26)');
        }
    }

}

    

