import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemInventory } from '@prisma/client';
import { AdjustmentInput, CreateItemInventoryInput } from './item.input';

@Injectable()
export class ItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllItems(): Promise<ItemInventory[]> {
    return this.prismaService.itemInventory.findMany();
  }

  async saveAdjustment(input: AdjustmentInput, itemInventoryId: number) {
    return this.prismaService.adjustment.create({
      data: {
        amount: input.amount,
        item: { connect: { id: itemInventoryId } },
        reason: input.reason,
      },
    });
  }

  updateItemQuantity(itemInventoryId: number, quantity: number) {
    return this.prismaService.itemInventory.update({
      where: { id: itemInventoryId },
      data: { quantity: quantity },
    });
  }

  async findItemInventoryByItemId(itemId: number) {
    return this.prismaService.itemInventory.findFirst({
      where: { itemId: itemId },
    });
  }

  async createItem(input: CreateItemInventoryInput): Promise<ItemInventory> {
    return this.prismaService.itemInventory.create({
      data: {
        itemId: input.itemId,
        name: input.name,
      },
    });
  }

  getAdjustmentsByItemId(itemId: number) {
    return this.prismaService.adjustment.findMany({
      where: { item: { itemId: itemId } },
    });
  }
}
