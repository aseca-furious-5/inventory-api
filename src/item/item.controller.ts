import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { AdjustmentInput, CreateItemInventoryInput } from './item.input';
import { ItemInventory } from '@prisma/client';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('all')
  async getAllItems(): Promise<ItemInventory[]> {
    return this.itemService.getAllItems();
  }

  @Post('adjust')
  async adjustItem(@Body() body: AdjustmentInput) {
    return this.itemService.adjustItem(body);
  }

  @Post()
  async createItem(@Body() body: CreateItemInventoryInput) {
    return this.itemService.createItem(body);
  }

  @Get('adjustments/:itemId')
  async getAdjustmentsByItemId(itemId: number) {
    return this.itemService.getAdjustmentsByItemId(itemId);
  }
}
