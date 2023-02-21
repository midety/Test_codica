import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.type';
import { CategoryEntity } from './entities/category.entity';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly transactionService: TransactionService,
  ) {}

  createCategory(args: Omit<Category, 'id'>): Promise<Category> {
    return this.categoryRepository.save(this.categoryRepository.create(args));
  }

  getCategories(): Promise<Array<Category>> {
    return this.categoryRepository.find({});
  }

  findCategory(args: Partial<Category>): Promise<Category | undefined> {
    return this.categoryRepository.findOne({ where: args });
  }

  async getCategory(args: Partial<Category>): Promise<Category> {
    const category = await this.findCategory(args);

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async deleteCategory(args: Partial<Category>): Promise<void> {
    const transaction = await this.transactionService.findTransaction({
      categories: args,
    });

    if (transaction) {
      throw new BadRequestException({
        message: 'Cannot delete category with existing transactions',
        error: 'Cannot delete',
      });
    }

    await this.categoryRepository.delete(args);
  }

  async updateCategory(
    args: Required<Pick<Category, 'id'>> & Partial<Omit<Category, 'id'>>,
  ): Promise<void> {
    const { id, ...rest } = args;

    await this.categoryRepository.update({ id }, rest);
  }

  async getStatistics(
    args?: Partial<Record<'fromPeriod', string>> &
      Partial<Record<'toPeriod', string>> &
      Partial<Record<'categoryIds', Array<string>>>,
  ): Promise<Record<string, number>> {
    const { categoryIds, fromPeriod, toPeriod } = args || {};

    let query = this.categoryRepository
      .createQueryBuilder('categories')
      .select('name')
      .addSelect(
        `sum(CASE WHEN "transactions"."type"='profitable'` +
          `THEN "transactions"."amount" else "transactions"."amount"*-1 END)`,
      )
      .leftJoin('categories.transactions', 'transactions')
      .groupBy('categories.name');

    if (categoryIds && categoryIds.length && Array.isArray(categoryIds)) {
      query = query.andWhere('categories.id IN(:...ids)', { ids: categoryIds });
    }

    if (fromPeriod) {
      query = query.andWhere('transactions.created_at >= :fromPeriod', {
        fromPeriod,
      });
    }

    if (toPeriod) {
      query = query.andWhere('transactions.created_at <= :toPeriod', {
        toPeriod,
      });
    }

    const statistic = await query.getRawMany<
      Pick<Category, 'name'> & Record<'sum', string>
    >();

    return statistic.reduce((acc, red) => {
      Object.assign(acc, { [red.name]: +red.sum });

      return acc;
    }, {});
  }
}
