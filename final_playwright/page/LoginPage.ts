import { Page } from "@playwright/test";
import { Element } from "../core/Element";
import { LoginUrl } from "../config/appsetting.json";

export class LoginPage {

    readonly page: Page;
    private _username: Element;
    private _password: Element;
    private _loginButton: Element;

    constructor(page: Page){
        this.page = page;
        this._username = new Element(page, "//input[@type='email']");
        this._password = new Element(page, "//input[@type='password']");
        this._loginButton = new Element(page, "//button[@value='Login']");
    }

    async navigateToLoginPage(){
        await this.page.goto(LoginUrl);
    }

    async loginUser(email: string, password: string){
        await this._username.enter(email);
        await this._password.enter(password);
        await this._loginButton.click();
    }
}