import test from "@playwright/test";
import { LoginPage } from "../page/LoginPage";
import { HomePage } from "../page/HomePage";
import { ProfilePage } from "../page/ProfilePage";
import { AccountPage } from "../page/AccountPage";
import { ValidAccount, EditAccount } from "../test-data/account.json";

test('Edit personal information', async ({ page }) => {
    const login = new LoginPage(page);
    const home  = new HomePage(page);
    const profile = new ProfilePage(page);
    const account = new AccountPage(page);

    await login.navigateToLoginPage();
    await login.loginUser(ValidAccount.email, ValidAccount.password);

    await page.waitForTimeout(1000);
    await home.navigateToProfile();

    await profile.clickOnEditProfileButton();

    await account.editUsername(EditAccount.username);

    await account.navigateToProfilePage(EditAccount.username);

    await test.expect(await profile.isMyFullNameAppear()).toBeTruthy();
});