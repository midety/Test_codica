import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Category } from '../category.type';

export class CreateCategoryDto implements Omit<Category, 'id'> {
  @ApiProperty({
    required: true,
    minLength: 3,
    example: 'food',
  })
  @IsString()
  @MinLength(3)
  public readonly name: string;
}

export class UpdateCategoryDto implements Omit<Category, 'id'> {
  @ApiProperty({
    required: true,
    minLength: 3,
    example: 'food',
  })
  @IsString()
  @MinLength(3)
  public readonly name: string;
}

export class CategoryDto implements Category {
  @ApiProperty({
    example: 'c58f025f-21a2-41a0-b71e-684a9eeed59b',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'food',
  })
  public readonly name: string;

  constructor(partial: Partial<CategoryDto>) {
    Object.assign(this, partial);
  }
}
export class GetCategoryStatisticsQueryDto {
  @ApiPropertyOptional({
    example: '2023-02-21 20:47:08.671',
  })
  @IsOptional()
  @IsDateString()
  public readonly fromPeriod?: string;

  @ApiPropertyOptional({
    example: '2023-02-21 20:47:08.671',
  })
  @IsOptional()
  @IsDateString()
  public readonly toPeriod?: string;

  @ApiPropertyOptional({
    example: ['c58f025f-21a2-41a0-b71e-684a9eeed59b'],
    isArray: true,
  })
  @IsOptional()
  @IsString({ each: true })
  public readonly categoryIds?: Array<string>;
}
