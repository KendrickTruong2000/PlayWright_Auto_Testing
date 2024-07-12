import { Page } from "@playwright/test";
import { Element } from "../core/Element";

export class AccountPage{

    readonly page: Page;
    private username: Element;
    private updateButton: Element;
    private pageNotFound: Element;

    constructor(page: Page){
        this.page = page;
        this.username = new Element(page, "//input[@id='user_username']");
        this.updateButton = new Element(page, "//input[@value='Update account']");
        this.pageNotFound = new Element(page, "//p[contains(text(),'Hmm, the page you were looking for ')]");
    }

    async editUsername(username: string){
        await this.username.waitForElementToBeVisible();
        await this.username.clear();
        await this.username.enter(username);
        await this.updateButton.waitForElementToBeClickable();
        await this.updateButton.click();
    }

    async navigateToProfilePage(username: string){
        const baseUrl = "https://unsplash.com";
        const profilePageUrl = `${baseUrl}/@${username}`;
        await this.page.goto(profilePageUrl);
    }
}