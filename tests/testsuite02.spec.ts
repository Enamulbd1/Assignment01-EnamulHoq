//testsuite01.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { CreateNewRoom } from './pages/createnewroom-page';

test.beforeEach(async ({ page }) => {
  //await page.goto('https://demo.playwright.dev/todomvc');
  console.log('Running before each')
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
});


test.describe('Test suite 01 - verifyRedRoomButton', () => {
  test('Test case 01', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.verifyRedRoomButton();
  });

  test('Test case 02 - verifyClientRoomButton', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.verifyClientRoomButton();
  });

  test.afterEach(async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);  });
});

test.describe('Test suite 03 - verifycreatenewroom', () => {
  test('Test case 01', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.verifyRedRoomButton();
  });

  test('Test case 02 - verifyClientRoomButton', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.verifyClientRoomButton();
  });

  test('create new room', async ({ page }) => {
    const createnewroom = new CreateNewRoom(page);
    await createnewroom.clickontheviewbutton();
  });

  test.afterEach(async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);  });
});
