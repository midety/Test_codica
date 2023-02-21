import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Bank } from './bank.type';
import { BankEntity } from './entities/bank.entity';
import { TransactionService } from '../transaction/transaction.service';
import { TransactionEntity } from '../transaction/entities/transaction.entity';
import { Transaction, TransactionType } from '../transaction/transaction.type';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(BankEntity)
    private readonly bankRepository: Repository<BankEntity>,
    private readonly transactionService: TransactionService,
  ) {}

  createBank(args: Pick<Bank, 'name'>): Promise<Bank> {
    return this.bankRepository.save(this.bankRepository.create(args));
  }

  getBanks(): Promise<Array<Bank>> {
    return this.bankRepository.find({});
  }

  findBank(args: Partial<Bank>): Promise<Bank | undefined> {
    return this.bankRepository.findOne({ where: args });
  }

  async getBank(args: Partial<Bank>): Promise<Bank> {
    const bank = await this.findBank(args);

    if (!bank) {
      throw new NotFoundException();
    }

    return bank;
  }

  async deleteBank(args: Partial<Bank>): Promise<void> {
    const transaction = await this.transactionService.findTransaction({
      bank: args,
    });

    if (transaction) {
      throw new BadRequestException({
        message: 'Cannot delete bank with existing transactions',
        error: 'Cannot delete',
      });
    }

    await this.bankRepository.delete(args);
  }

  async updateBalance(
    args: Pick<Bank, 'id'> & Pick<Transaction, 'type' | 'amount'>,
  ): Promise<void> {
    const { amount, type, id } = args;

    await this.bankRepository
      .createQueryBuilder()
      .update()
      .set({ balance: () => 'balance + :amount' })
      .setParameter(
        'amount',
        type === TransactionType.PROFITABLE ? amount : -amount,
      )
      .where('id = :bankId', { bankId: id })
      .returning('balance')
      .execute();
  }

  async updateBank(
    args: Required<Pick<Bank, 'id'>> & Partial<Omit<Bank, 'id'>>,
  ): Promise<void> {
    const { id, ...rest } = args;

    await this.bankRepository.update({ id }, rest);
  }
}
