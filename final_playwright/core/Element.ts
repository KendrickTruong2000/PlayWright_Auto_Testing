import { Page, Locator } from '@playwright/test';

export class Element {
  private locator: Locator;

  constructor(private page: Page, selector: string) {
    this.locator = page.locator(selector);
  }

  async waitForElementToBeVisible(): Promise<Locator> {
    await this.locator.waitFor({ state: 'visible' });
    return this.locator;
  }

  async waitForElementToBeClickable(): Promise<Locator> {
    await this.locator.waitFor({ state: 'visible' }); // Playwright combines visibility and clickability checks
    return this.locator;
  }

  async enter(value: string): Promise<void> {
    const element = await this.waitForElementToBeVisible();
    await element.fill(value);
  }

  async clear(): Promise<void> {
    const element = await this.waitForElementToBeVisible();
    await element.fill('');
  }

  async click(): Promise<void> {
    const element = await this.waitForElementToBeClickable();
    await element.click();
  }

  async hover(): Promise<void>{
    const element = await this.waitForElementToBeVisible();
    await element.hover();
  }

  async getText(): Promise<string> {
    const element = await this.waitForElementToBeVisible();
    return (await element.textContent()) ?? '';
  }

  async scroll(): Promise<void>{
    const element = await this.waitForElementToBeVisible();
    await element.scrollIntoViewIfNeeded;
  }

  // Playwright does not have a built-in SelectElement like Selenium, so handling dropdowns might require custom logic
  async selectOption(option: string): Promise<void> {
    await this.locator.selectOption({ label: option });
  }

  async enterKey(): Promise<void> {
    const element = await this.waitForElementToBeVisible();
    await element.press('Enter');
  }

  async getAttribute(attributeName: string): Promise<string | null>{
    const element = await this.waitForElementToBeVisible();
    return element.getAttribute(attributeName);
  } 

  async waitUntilVisible(){
      await this.waitUntilVisible();
  }
}