import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/login-page";
import { LoginUrl } from "../helper/configuration/appsetting.json";
import { validAccount, missingPassword, missingUsername, missingBoth, invalidBoth } from "../helper/utilities/test-data/account.json";
import { log } from 'console';

test('login with valid username and password', async ({ page }) => {
  const login = new LoginPage(page);

  page.goto(LoginUrl);
  await login.loginUser(validAccount.username,validAccount.password);
  await login.clickLoginButton();

  // await expect(page.locator(login._profileButton)).toBeVisible();
  // await expect(login.getProfileButton).toEqual(validAccount.username);
});


test('login with missing password', async ({ page }) => {
  const login = new LoginPage(page);
  

  page.goto(LoginUrl);
  await login.enterUserName(missingPassword.username);
  await login.enterPassword(missingPassword.password);
  await login.clickLoginButton();

  const warningMessage = await login.getErrorMessageOfPassword();
  expect(warningMessage).toEqual("This is a required field.");
  // await expect(login.getErrorMessageOfUsername()).toEqual("This is a required field.");
});

test('login with missing username', async ({ page }) => {
  const login = new LoginPage(page);

  page.goto(LoginUrl);
  await login.enterUserName(missingUsername.username);
  await login.enterPassword(missingUsername.password);
  await login.clickLoginButton();

  const warningMessage = await login.getErrorMessageOfUsername();
  expect(warningMessage).toEqual("This is a required field.");
  // await expect(login.getErrorMessageOfPassword()).toEqual("This is a required field.");
});

test('login with missing both username and password', async ({ page }) => {
  const login = new LoginPage(page);

  page.goto(LoginUrl);
  await login.enterUserName(missingBoth.username);
  await login.enterPassword(missingBoth.password);
  await login.clickLoginButton();

  const warningMessageUsername = await login.getErrorMessageOfUsername();
  const warningMessagePassword = await login.getErrorMessageOfPassword();

  expect(warningMessageUsername).toEqual("This is a required field.");
  expect(warningMessagePassword).toEqual("This is a required field.");
  
  // await expect(login.getErrorMessageOfUsername()).toEqual("This is a required field.");
  // await expect(login.getErrorMessageOfPassword()).toEqual("This is a required field.");
});

test('login with invalid username and password', async ({ page }) => {
  const login = new LoginPage(page);

  page.goto(LoginUrl);
  await login.loginUser(invalidBoth.username, invalidBoth.password);
  await login.clickLoginButton();

  const alertMessage = await login.getAlertMessage();
  expect(alertMessage).toEqual("The Username or Password you entered is incorrect");
  // await expect(login.getAlertMessage()).toEqual("The Username or Password you entered is incorrect");
});
