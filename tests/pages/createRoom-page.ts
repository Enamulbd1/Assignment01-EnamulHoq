import { expect, type Locator, type Page } from "@playwright/test";
// import { faker, Faker, th } from '@faker-js/faker';
import { faker } from '@faker-js/faker';


export class CreateRoomPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly categoryOptionsField: Locator;
  readonly roomNumberTextField: Locator;
  readonly floorNumberTextField: Locator;
  readonly availableCheckOption: Locator;
  readonly priceTextField: Locator;
  readonly featuresOptionsField: Locator;
  readonly backButton: Locator;
  readonly saveButton: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByText('New Room');
    this.categoryOptionsField = page.getByRole('combobox'); 
    this.roomNumberTextField = page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton') 
    this.floorNumberTextField = page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton') 
    this.availableCheckOption = page.locator('.checkbox')
    this.priceTextField = page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton')
    this.featuresOptionsField = page.getByRole('listbox')
    this.backButton = page.getByRole('link', { name: 'Back' })
    this.saveButton = page.getByText('Save')

  }
  

  async createRoom() {
    const roomNumber = faker.number.int({ min: 100, max: 999 }).toString();
    const floorNumber = faker.number.int({ min: 1, max: 10 }).toString();
    const price = faker.commerce.price({ min: 100, max: 200, dec: 0 }); 
    const categoryIndex = faker.number.int({ min: 1, max: 3 });
    const featureIndex = faker.number.int({ min: 1, max: 4 }); 

    await this.categoryOptionsField.selectOption({ index: categoryIndex });
    await this.roomNumberTextField.fill(roomNumber);
    await this.floorNumberTextField.fill(floorNumber);
    await this.priceTextField.fill(price);
    await this.featuresOptionsField.selectOption({ index: featureIndex });
    await this.saveButton.click();

  }

}
