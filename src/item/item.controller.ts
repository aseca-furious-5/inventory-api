import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

  @Get('adjustments/:id')
  async getAdjustmentsByItemInventoryId(
    @Param('id', ParseIntPipe) itemInventoryId: number,
  ) {
    return this.itemService.getAdjustmentsByItemId(itemInventoryId);
  }

  @Get('has-enough-stock/:itemId')
  async hasStock(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Query('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.itemService.hasStock(itemId, quantity);
  }

  @Put('update')
  async updateItemQuantity(@Body() body: { itemId: number; amount: number }) {
    return this.itemService.updateItemQuantity(body.itemId, body.amount);
  }
}
