import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { CreateNewClient } from './pages/createNewClient-pages'

test.beforeEach(async ({ page }) => {
    //await page.goto('https://demo.playwright.dev/todomvc');
    console.log('Running before each')
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  });



test('test case 02 - create new client', async ({ page }) =>{
    const createNewClient = new CreateNewClient(page);
    const element = page.locator(
        "#app > div > div.clients > div:nth-last-child(1)"
    );

    //asertions
    await createNewClient.logToClient();
    await createNewClient.createClient();
    await expect(element).toContainText(createNewClient.fullname);
    await expect(element).toContainText(createNewClient.emailaddress);
    await expect(element).toContainText(createNewClient.telephonenummber);
    await page.waitForTimeout(5000);

    });
