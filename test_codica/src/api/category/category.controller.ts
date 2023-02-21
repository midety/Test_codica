import {
  Body,
  Get,
  Controller,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Post,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  GetCategoryStatisticsQueryDto,
} from './dto/category';
import { CategoryService } from './category.service';

@Controller()
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get statistics ' })
  @ApiOkResponse({
    description: 'Statistics',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.OK)
  @Get('/statistics')
  async getStatistics(@Query() query: GetCategoryStatisticsQueryDto) {
    const statistics = await this.categoryService.getStatistics(query);

    return statistics;
  }

  @ApiOperation({ summary: 'Get Categories' })
  @ApiOkResponse({
    description: 'Categories',
    type: CategoryDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Categories does not exist' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getCategories(): Promise<Array<CategoryDto>> {
    const categories = await this.categoryService.getCategories();

    return categories.map((category) => new CategoryDto(category));
  }

  @ApiOperation({ summary: 'Create new Category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse({
    description: 'Created Category',
    type: CategoryDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createCategory(@Body() body: CreateCategoryDto): Promise<CategoryDto> {
    const category = await this.categoryService.createCategory(body);

    return new CategoryDto(category);
  }

  @ApiOperation({ summary: 'Get Category' })
  @ApiOkResponse({
    description: 'Category',
    type: CategoryDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Category does not exist' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getCategory(@Param('id', ParseUUIDPipe) id: string) {
    const category = await this.categoryService.getCategory({
      id,
    });

    return new CategoryDto(category);
  }

  @ApiOperation({ summary: 'Delete Category' })
  @ApiOkResponse({
    description: 'Category deleted',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deleteCategory(@Param('id', ParseUUIDPipe) id: string) {
    await this.categoryService.deleteCategory({ id });
  }

  @ApiOperation({ summary: 'Update Category' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiOkResponse({
    description: 'Category updated',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  async updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCategoryDto,
  ) {
    await this.categoryService.updateCategory({ id, ...body });
  }
}
