//createNewClient.ts
import { expect, type Locator, type Page } from '@playwright/test';
import {faker} from "@faker-js/faker";

export class CreateNewClient {
  //Attributes
  readonly page: Page;
  readonly viewButton: Locator;
  readonly creteClientButtion: Locator;
  readonly nameTextfield: Locator; 
  readonly emailTextfield: Locator;
  readonly telephoneTextfield: Locator;
  readonly saveButton: Locator;
    fullname: string;
    emailaddress: string;
    telephonenummber: string;
  

  //Const
  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.locator("#app > div > div > div:nth-child(2) > a")
    this.creteClientButtion = page.getByRole('link', { name: 'Create Client' })

    this.nameTextfield = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
    this.emailTextfield = page.locator('input[type="email"]');
    this.telephoneTextfield = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
    this.saveButton = page.getByText("save");
  }

  // Methods / functions
  async logToClient(){

    await this.viewButton.click();
    await this.creteClientButtion.click();
    this.fullname = faker.person.fullName();
    await this.nameTextfield.fill(this.fullname);
    this.emailaddress = faker.internet.email();
    await this.emailTextfield.fill(this.emailaddress);
    this.telephonenummber = faker.phone.number();
    await this.telephoneTextfield.fill(this.telephonenummber);
    await this.saveButton.click();


  }
 async createClient(){
    this.creteClientButtion.click()

 } 


  async performCreateClient(name: string, email:string, telephone: string) {
    //fill out the form - 2 textfields and click the submit button
    const fakeName = faker.person.fullName();
    const fakerEmail = faker.internet.email();
    const fakerTelephone = faker.phone.number(); 
    
    await this.nameTextfield.fill(this.fullname);
    await this.emailTextfield.fill(email);
    await this.telephoneTextfield.fill(this.telephonenummber);
    await this.saveButton.click();

    return{
        fullname: this.fullname,
        email: this.emailaddress,
        telephone: this.telephonenummber,
    }


  }
}