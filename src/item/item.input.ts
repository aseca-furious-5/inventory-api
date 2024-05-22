import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AdjustmentInput {
  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsString()
  reason: string;
}

export class CreateItemInventoryInput {
  @IsNotEmpty()
  @IsInt()
  itemId: number;

  @IsNotEmpty()
  name: string;
}
