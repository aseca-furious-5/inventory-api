import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ItemRepository } from './item.repository';

@Module({
  providers: [ItemService, ItemRepository],
  controllers: [ItemController],
  imports: [PrismaModule],
})
export class ItemModule {}
