import { Page } from '@playwright/test';
import { Element } from '../core/Element';
import { Likes } from '../config/appsetting.json';

export class ProfilePage {
    
    readonly page: Page;
    private editProfileButton: Element;
    private userName: Element;
    private numberOfLike: Element;
    
    constructor(page: Page){
        this.page = page;
        this.editProfileButton = new Element(page, "//a[text()='Edit profile']");
        this.userName = new Element(page, "//a[text()='Edit profile']/../preceding-sibling::div");
        this.numberOfLike = new Element(page, "//a[@data-test='user-nav-link-likes']/span/span");
    }

    async goToLikeProfilePage(){
        await this.page.goto(Likes);
    }

    async clickOnEditProfileButton(){
        await this.editProfileButton.waitForElementToBeClickable();
        await this.editProfileButton.click();
    }

    async isMyFullNameAppear(): Promise<boolean>{
        const expectedUserName = "Khang Truong";
        const actualUserName = await this.userName.getText();
        return await actualUserName === expectedUserName;
    }

    async getNumberOfLikedPhoto(): Promise<number>{
        const actualLike = await this.numberOfLike.getText();
        return Number(actualLike);
    }
}