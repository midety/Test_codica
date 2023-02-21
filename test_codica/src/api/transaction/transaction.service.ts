import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Transaction, Pagination } from './transaction.type';
import { TransactionEntity } from './entities/transaction.entity';
import { BankService } from '../bank/bank.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @Inject(forwardRef(() => BankService))
    private readonly bankService: BankService,
  ) {}

  async createTransaction(args: Omit<Transaction, 'id'>): Promise<Transaction> {
    const transaction = await this.transactionRepository.save(
      this.transactionRepository.create(args),
    );

    await this.bankService.updateBalance({
      id: transaction.bankId,
      amount: transaction.amount,
      type: transaction.type,
    });

    return transaction;
  }

  getTransactions(args: Pagination): Promise<Array<Transaction>> {
    const { page, perPage } = args;

    return this.transactionRepository.find({
      take: perPage,
      skip: perPage * (page - 1),
    });
  }

  findTransaction(
    args:
      | FindOptionsWhere<TransactionEntity>[]
      | FindOptionsWhere<TransactionEntity>,
  ): Promise<Transaction | undefined> {
    return this.transactionRepository.findOne({
      where: args,
    });
  }

  async getTransaction(
    args:
      | FindOptionsWhere<TransactionEntity>[]
      | FindOptionsWhere<TransactionEntity>,
  ): Promise<Transaction> {
    const transaction = await this.findTransaction(args);

    if (!transaction) {
      throw new NotFoundException();
    }

    return transaction;
  }

  async deleteTransaction(args: Partial<Transaction>): Promise<void> {
    await this.transactionRepository.delete(args);
  }
}
