//dashboard-page.ts

import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  //Attributes
  readonly page: Page;
  readonly redRoomViewButton: Locator;
  readonly clientRoomViewButton: Locator;
  readonly logoutButton: Locator; 

  
  constructor(page: Page) {
    this.page = page;
    this.redRoomViewButton = page.locator('.block:nth-child(1) > .btn')
    this.clientRoomViewButton = page.locator('.block:nth-child(2) > .btn')
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async verifyRedRoomButton() {
    await this.redRoomViewButton.isVisible()
  }

  async verifyClientRoomButton() {
    await this.clientRoomViewButton.isVisible()
  }

   async performLogout() {
    await this.logoutButton.click();
  }
}