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
    await expect(dashboardPage.pageTitle).toBeVisible();
 
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

  test('Tase case 08, edit en old bill and assert the update', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const billsPage = new BillsPage(page);

    await dashboardPage.gotoBillsView();
    await billsPage.gotoEditBill(0);
    await expect(billsPage.page).toHaveURL(/.*bill/);
    
  });
  
  test('Tase case 09: delete an old reservation and assert', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);

    await dashboardPage.gotoReservationsView();
    await reservationsPage.deleteReservation(0);
  
    const reservationNameLocator = page.locator('text=Client: 1'); 
    await expect(reservationNameLocator).toHaveCount(0); 
  });

  test('Tase case 10, create client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const createClient = new CreateClientPage(page);

    await dashboardPage.gotoClientsView();
    await page.locator("#app > div > h2 > a").click();
    // await page.getByRole('link', { name: 'Create Client' }).click();
    await createClient.createClient();

  });




});









