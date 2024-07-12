import test from "@playwright/test";
import { LoginPage } from "../page/LoginPage";
import { HomePage } from "../page/HomePage";
import { UserProfilePage } from "../page/UserProfilePage";
import { ValidAccount } from "../test-data/account.json";


test('Follow an photographer', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const userProfile = new UserProfilePage(page);

    await login.navigateToLoginPage();
    await login.loginUser(ValidAccount.email, ValidAccount.password);
    
    await home.clickOnImage();
    await home.navigateToUserProfile();

    await page.waitForTimeout(1000);
    await userProfile.clickOnMoreActionButton();
    await userProfile.clickOnFollowButton();
    
    await test.expect(await userProfile.isButtonUnfollowApper()).toBeTruthy();
});