import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Bank } from '../bank.type';

export class CreateBankDto implements Pick<Bank, 'name'> {
  @ApiProperty({
    required: true,
    minLength: 3,
    example: 'PrivatBank',
  })
  @IsString()
  @MinLength(3)
  public readonly name: string;
}

export class UpdateBankDto implements Pick<Bank, 'name'> {
  @ApiProperty({
    required: true,
    minLength: 3,
    example: 'PrivatBank',
  })
  @IsString()
  @MinLength(3)
  public readonly name: string;
}

export class BankDto implements Bank {
  @ApiProperty({
    example: 'c58f025f-21a2-41a0-b71e-684a9eeed59b',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'PrivatBank',
  })
  public readonly name: string;

  @ApiProperty({
    example: '0',
  })
  public readonly balance: number;

  constructor(partial: Partial<BankDto>) {
    Object.assign(this, partial);
  }
}
