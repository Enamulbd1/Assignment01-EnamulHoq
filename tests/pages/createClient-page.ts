import { expect, type Locator, type Page } from "@playwright/test";
import { faker, Faker } from '@faker-js/faker';
import { ClientsPage } from "./clients-page";


export class CreateClientPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly clientNameTextField: Locator;
  readonly clientEmailTextField:Locator;
  readonly clientTelephoneTextField:Locator;
  readonly clientSaveButton: Locator;
  readonly clientBackButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText('New Client');
    this.clientNameTextField = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
    this.clientEmailTextField = page.locator('input[type="email"]');
    this.clientTelephoneTextField = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
    this.clientSaveButton = page.getByText('Save');
    this.clientBackButton = page.getByRole('link', { name: 'Back' }) ;
    
  }

  async createClient(){
    
    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();
    const randomTelephone = faker.phone.number();
    await this.clientNameTextField.fill(randomName);
    await this.clientEmailTextField.fill(randomEmail);
    await this.clientTelephoneTextField.fill(randomTelephone);
    await this.clientSaveButton.click();
  }

}
