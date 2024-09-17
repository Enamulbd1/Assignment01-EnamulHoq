import { expect, type Locator, type Page } from '@playwright/test';

export class ReservationsPage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly createReservationButton: Locator;
    readonly resevationOptionButtion: Locator;
    readonly editReservationOption: Locator;
    readonly deleteReservationOption: Locator;
    readonly backButton: Locator;
  
    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.getByText('Reservations');
        this.createReservationButton = page.getByRole('link', { name: 'Create Reservation' });
        this.resevationOptionButtion = page.getByRole('img');
        this.editReservationOption = page.getByText('Edit');
        this.deleteReservationOption = page.getByText('Delete');
        this.backButton = page.getByRole('link', { name: 'Back' });
    }

    async gotoCreateReservation() {
        await this.createReservationButton.click();
    }

    async deleteReservation(index: number){
        await this.resevationOptionButtion.nth(index).click();
        await this.deleteReservationOption.click();
    }

    async goBackFromReservationsPage() {
        await this.backButton.click();
    }
}
