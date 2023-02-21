import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsEnum, isArray } from 'class-validator';
import { Category } from 'src/api/category/category.type';
import { TransactionType } from '../transaction.type';
import { Transaction, Pagination } from '../transaction.type';

export class CreateTransactionCategoryDto implements Pick<Category, 'id'> {
  @ApiProperty({
    type: 'string',
  })
  public readonly id: Category['id'];
}

export class CreateTransactionDto implements Omit<Transaction, 'id'> {
  @ApiProperty({
    required: true,
    example: '100',
  })
  @IsNumber()
  public readonly amount: number;

  @ApiProperty({
    example: 'profitable',
    enum: ['profitable', 'consumable'],
  })
  @IsEnum(['profitable', 'consumable'])
  public readonly type: TransactionType;

  @ApiProperty({
    example: 'c58f025f-21a2-41a0-b71e-684a9eeed59b',
  })
  public readonly bankId: string;

  @ApiProperty({
    type: CreateTransactionCategoryDto,
    isArray: true,
  })
  public readonly categoryId: CreateTransactionCategoryDto;
}

export class TransactionDto implements Transaction {
  @ApiProperty({
    example: 'c58f025f-21a2-41a0-b71e-684a9eeed59b',
  })
  public readonly id: string;

  @ApiProperty({
    example: '100',
  })
  public readonly amount: number;

  @ApiProperty({
    example: 'profitable',
    enum: ['profitable', 'consumable'],
  })
  public readonly type: TransactionType;

  @ApiProperty({
    example: 'c58f025f-21a2-41a0-b71e-684a9eeed59b',
  })
  public readonly bankId: string;

  constructor(partial: Partial<TransactionDto>) {
    Object.assign(this, partial);
  }
}

export class GetTransactionQueryDto implements Pagination {
  @ApiProperty({
    required: true,
    minimum: 1,
    maximum: 50,
    example: 1,
  })
  @IsNumber()
  @Min(1)
  @Max(50)
  public readonly page: number;

  @ApiProperty({
    required: true,
    minimum: 1,
    maximum: 10,
    example: 1,
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  public readonly perPage: number;
}
