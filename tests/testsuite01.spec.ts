import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { BillsPage } from './pages/bills-page';
import { RoomsPage } from './pages/rooms-page';
import { ClientsPage } from './pages/clients-page';
import { CreateClientPage } from './pages/createClient-page';
import { CreateBillPage } from './pages/createNewBill-page';
import { ReservationsPage } from './pages/reservations-page';
import { CreateRoomPage } from './pages/createRoom-page';



test.describe('Test suite 01', () => {
  
   test('Test Case 01, Title overview ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
  
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.pageHeading).toBeVisible();
 
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);   

   });

  test('Tase case 02, creating a new room and asserting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const roomsPage = new RoomsPage(page);
    const createRoomPage = new CreateRoomPage(page);
    
    await dashboardPage.gotoRoomsView();
    await roomsPage.gotoCreateRoom();
    await createRoomPage.createRoom();
    await expect(roomsPage.page).toHaveURL(/.*rooms/);

  });

  test('Tase Case 03 : creating a new client and asserting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
  
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);

    await dashboardPage.gotoClientsView();
    await clientsPage.gotoEditClient(0);
    await clientsPage.goBack();
    await expect(clientsPage.page).toHaveURL(/.*clients/);
  });

   test('Tase Case 04, creating the bill', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const billsPage = new BillsPage(page);
    const createBillPage = new CreateBillPage(page);
  
    await dashboardPage.gotoBillsView();
    await billsPage.gotoCreateBill();

    const randomCreateBill = await createBillPage.createBill();
    const billRow = page.locator(`text=${randomCreateBill}`);
    await expect(billRow).toBeVisible(); 

  });

  test('Tase case 05, creating a new reservation and asserting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);

    await dashboardPage.gotoReservationsView();
    await reservationsPage.gotoCreateReservation();
    await reservationsPage.goBackFromReservationsPage();
    await expect(reservationsPage.page).toHaveURL(/.*reservations/);
  });

  
  test('Tase case 06, delete an existing room and assert', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const roomsPage = new RoomsPage(page);
    
    await dashboardPage.gotoRoomsView();
    await roomsPage.deleteRoom(0); 

    const roomLocator = page.locator('text="Room 101"'); 
    await expect(roomLocator).toHaveCount(0);
  });

  test('Tase case 07: delete an existing client and assert', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);

    await dashboardPage.gotoClientsView();
    await clientsPage.deleteClient(0); 

    const clientNameLocator = page.locator('text=Jonas Hellman'); 
    await expect(clientNameLocator).toHaveCount(0);
    
  });





});






















/* //testsuite01.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { CreatClientPage } from './pages/createClient-page';
import { CreateBillPage} from './pages/createBill-page';
import { CreateRoomPage } from './pages/createRoom-page';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
  // await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

  const dashboardPage = new DashboardPage(page);
await expect(dashboardPage.pageHeading).toBeVisible();
});

test.afterEach(async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.performLogout();
  await expect(dashboardPage.pageHeading).not.toBeVisible();
});

test.describe('Test suite 01', () => {
  test('Test case 01 - Login Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // await loginPage.goto();
    // await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(2000);
  });


  test('Test case 02 - Create New Room', async ({ page }) => {
    // const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const createNewRoom2 = new CreateNewRoom2(page);

     await loginPage.goto();
     await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
     await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible(); 

    //asertions
    await createNewRoom2.logToRoom();
    await createNewRoom2.createRoom();

    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);

  });

    test('Test case 03 Create New bills', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);
      const createNewBills = new CreateNewbills(page);

      await loginPage.goto();
      await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
      await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible(); 
      await createNewBills.goToBills();

      await createNewBills.goToCreateBills();
      await createNewBills.saveBills();

      const filledValue = await createNewBills.fillUpBillForm();
      const element = page.locator('#app > div > div.bills > div:nth-last-child(1)')
      
      //Assertions
      expect(element).toContainText('ID');
      expect(element).toContainText(filledValue);
      await dashboardPage.performLogout();
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
      await page.waitForTimeout(5000);

    });

      test('test case 04 - create new client', async ({ page }) =>{
        const createNewClient = new CreateNewClient(page);
        const element = page.locator(
            "#app > div > div.clients > div:nth-last-child(1)");
    
        //asertions
        await createNewClient.logToClient();
        await createNewClient.createClient();
        await expect(element).toContainText(createNewClient.fullname);
        await expect(element).toContainText(createNewClient.emailaddress);
        await expect(element).toContainText(createNewClient.telephonenummber);
        await page.waitForTimeout(5000);
    
        });
  });
 */