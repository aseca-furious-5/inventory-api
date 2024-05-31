import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemInventory } from '@prisma/client';
import { ItemRepository } from './item.repository';
import { AdjustmentInput, CreateItemInventoryInput } from './item.input';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async getAllItems(): Promise<ItemInventory[]> {
    return this.itemRepository.getAllItems();
  }

  async adjustItem(input: AdjustmentInput): Promise<ItemInventory> {
    const itemInventory = await this.itemRepository.findItemInventoryByItemId(
      input.itemId,
    );

    if (!itemInventory) {
      throw new NotFoundException('Item');
    }

    const adjustment = await this.itemRepository.saveAdjustment(
      input,
      itemInventory.id,
    );
    return this.itemRepository.updateItemQuantity(
      itemInventory.id,
      itemInventory.quantity + adjustment.amount,
    );
  }

  async createItem(input: CreateItemInventoryInput) {
    return this.itemRepository.createItem(input);
  }

  getAdjustmentsByItemId(itemInventoryId: number) {
    return this.itemRepository.getAdjustmentsByItemId(itemInventoryId);
  }

  async hasStock(itemId: number, quantity: number) {
    const item = await this.itemRepository.findItemInventoryByItemId(itemId);
    if (!item) {
      throw new NotFoundException('Item');
    }
    return item.quantity > quantity;
  }

  async updateItemQuantity(itemId: number, quantity: number) {
    const item = await this.itemRepository.findItemInventoryByItemId(itemId);
    if (!item) {
      throw new NotFoundException('Item');
    }
    return this.itemRepository.updateItemQuantity(
      item.id,
      item.quantity + quantity,
    );
  }
}
