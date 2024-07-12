import { Page } from "@playwright/test";
import { Element } from "../core/Element";

export class HomePage{

    readonly page: Page;
    private image: string;
    private icon_user: Element;
    private view_profile_button: Element;
    private profile: Element;
    private viewProfile: Element;
    private likeButton: Element;
    private closeButton: Element;
    private randomImages: Element;

    constructor(page: Page){
        this.page = page;
        this.image = "//figure[@data-masonryposition='2']";
        this.icon_user = new Element(page, "div[data-test='photos-route'] header img");
        this.view_profile_button = new Element(page, "//a[text()='View profile']");
        this.profile = new Element(page, "//button[@title='Your personal menu button']");
        this.viewProfile = new Element(page, "//a[text()='View profile']");
        this.likeButton = new Element(page, "div[data-test='photos-route'] header button[title='Like this image']");
        this.closeButton = new Element(page, "//div[@aria-label='Modal']/div/button");
    }

    async clickOnImage(){
        await this.page.locator(this.image).first().click();
    }

    async navigateToUserProfile(){
        await this.icon_user.hover()
        await this.view_profile_button.waitForElementToBeClickable();
        await this.view_profile_button.click();
    }

    async navigateToProfile(){
        await this.profile.waitForElementToBeVisible();
        await this.profile.click();
        await this.viewProfile.waitForElementToBeVisible();
        await this.viewProfile.click();
    }

    async getRandomNumbrs(): Promise<number[]> {
        let randomNumbers: number[] = [];
        for(let i = 0; i < 3; i++){
            randomNumbers.push(Math.floor(Math.random() * 10) + 1);
        }

        return randomNumbers;
    }

    async clickOnRandomImage(number: number){
        const randomImage = "//figure[@data-masonryposition=";
        const randomImageLocator = `${randomImage}'${number}']`;
        await this.page.locator(randomImageLocator).first().click();
    }

    async clickOnLikeButton(){
        await this.likeButton.click();
    }

    async clickOnCloseButton(){
        await this.closeButton.click();
    }

    async pressEscapeKey() {
        await this.page.keyboard.press('Escape');
    }
}