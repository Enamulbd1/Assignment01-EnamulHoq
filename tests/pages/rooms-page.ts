import { expect, type Locator, type Page } from '@playwright/test';

export class RoomsPage{
    readonly page: Page;
    readonly pageTittle: Locator;
    readonly createRoomButton: Locator;
    readonly roomOptionButtons: Locator;
    readonly editRoomOption: Locator;
    readonly deleteRoomOption: Locator;
    readonly backButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.pageTittle = page.getByText('Rooms');
        this.createRoomButton  = page.getByRole('link', { name: 'Create Room' });
        this.roomOptionButtons  = page.getByRole('img');
        this.editRoomOption  = page.getByText('Edit');
        this.deleteRoomOption  = page.getByText('Delete');
        this.backButton  = page.getByRole('link', { name: 'Back' });
    }

    async gotoCreateRoom(){
        await this.createRoomButton.click();
    }

    async gotoEditRoom(index: number){
        await this.roomOptionButtons.nth(index).click();
        await this.editRoomOption.click();
    }

    async deleteRoom(index: number){
        await this.roomOptionButtons.nth(index).click();
        await this.deleteRoomOption.click();
    }

    async goBack(){
        await this.backButton.click();
    }

} 