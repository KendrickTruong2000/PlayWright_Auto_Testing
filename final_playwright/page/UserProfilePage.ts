import { Page } from "@playwright/test";
import { Element } from "../core/Element";

export class UserProfilePage{

    readonly page: Page;
    private _more_button: Element;
    private _follow_button: Element;
    private _unfollow_button: Element;

    constructor(page: Page){
        this.page = page;
        this._more_button = new Element(page, "//button[@title='More Actions']/..");
        this._follow_button = new Element(page, "//button[@role='menuitem']");
    }

    async clickOnMoreActionButton(){
        // await this._more_button.scroll();
        // await this._more_button.waitForElementToBeClickable();
        // await this._more_button.waitForElementToBeVisible();
        await this._more_button.click();
    }

    async clickOnFollowButton(){
        await this._follow_button.waitForElementToBeVisible();
        await this._follow_button.scroll();
        await this._follow_button.waitForElementToBeVisible();
        await this._follow_button.click();
    }

    async isButtonUnfollowApper(): Promise<boolean> {
        const isButtonAppear = await this._follow_button.getText();

        if(isButtonAppear.includes("Unfollow")){
            return true;
        }
        else{
            return false;
        }
    } 
}