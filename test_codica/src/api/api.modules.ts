import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { BankModule } from './bank/bank.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    BankModule,
    CategoryModule,
    TransactionModule,
    RouterModule.register([
      {
        path: 'banks',
        module: BankModule,
        children: [{ path: ':bankId/transactions', module: TransactionModule }],
      },
      {
        path: 'categories',
        module: CategoryModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
