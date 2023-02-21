import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bank } from '../bank.type';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';

@Entity({ name: 'banks' })
export class BankEntity implements Bank {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public readonly id: string;

  @Column({ type: 'varchar', name: 'name', nullable: false })
  public readonly name: string;

  @Column({ type: 'int', name: 'balance' })
  public readonly balance: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.bank)
  transactions: TransactionEntity[];
}
