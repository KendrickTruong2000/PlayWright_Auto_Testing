import { expect, Locator, Page } from "@playwright/test";
import { LoginUrl } from "../helper/configuration/appsetting.json";
import { Element } from "../helper/wrapper/Element";

export class LoginPage {

    readonly page: Page;
    private _username: Element;
    private _password: Element;
    private _loginButton: Element;
    public _profileButton: string;
    public _errorMessageUsername: string;
    public _errorMessagePassword: string;
    public _alertMessage: string;
    private _userName: string;
   

    constructor(page: Page) {
        this.page = page;
        this._username = new Element(page,"//input[@id='username']");
        this._password = new Element(page,"//input[@id='password']");
        this._loginButton = new Element(page,"//input[@value='Login']");
        this._profileButton = "//a[text()=' {0} ']";
        this._errorMessageUsername = "//div[@ng-messages='submitted && loginForm.username.$error']/p[text()='This is a required field.']";
        this._errorMessagePassword = "//div[@ng-messages='submitted && loginForm.password.$error']/p[text()='This is a required field.']";
        this._alertMessage = "//div[contains(text(),'incorrect')]";
    }

    async navigateToLoginPage() {
        await this.page.goto(LoginUrl);
    }

    async enterUserName(username: string) {
        this._userName = username;
        await this._username.enter(username);
    }

    async enterPassword(password: string) {
        await this._password.enter(password);
    }

    async clickLoginButton() {
        await this._loginButton.click();
    }

    // async getProfileButton(){
    //     console.log(this._profileButton.getText());
    //     return await this._profileButton.getText();
    // }

    async getErrorMessageOfUsername(): Promise<string> {
        const errorMessage = await this.page.locator(this._errorMessageUsername).textContent();
        return errorMessage ?? '';
    }

    async getErrorMessageOfPassword(): Promise<string>{
        const errorMessage = await this.page.locator(this._errorMessagePassword).textContent();
        return errorMessage ?? '';
    }

    async getAlertMessage(){
        const errorMessage = await this.page.locator(this._alertMessage).textContent();
        return errorMessage?.trim() ?? '';
    }

    async loginUser(user: string, password: string) {
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}