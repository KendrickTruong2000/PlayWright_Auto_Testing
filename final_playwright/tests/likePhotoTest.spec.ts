import test from "@playwright/test";
import { LoginPage } from "../page/LoginPage";
import { HomePage } from "../page/HomePage";
import { ValidAccount } from "../test-data/account.json";
import { ProfilePage } from "../page/ProfilePage";

test('Like 3 randoms photos on homepage', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const profile = new ProfilePage(page);

    await login.navigateToLoginPage();
    await login.loginUser(ValidAccount.email, ValidAccount.password);

    const randomNumbers = await home.getRandomNumbrs();
    
    for(let i = 0; i < randomNumbers.length; i++){
        await home.clickOnRandomImage(randomNumbers[i]);
        // console.log(randomNumbers[i]);
        await home.clickOnLikeButton();
        await home.pressEscapeKey();
    }

    await profile.goToLikeProfilePage();
    test.expect(await profile.getNumberOfLikedPhoto()).toBe(3);
});