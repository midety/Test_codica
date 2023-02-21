import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BankEntity } from '../../bank/entities/bank.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { Transaction, TransactionType } from '../transaction.type';

@Entity({ name: 'transactions' })
export class TransactionEntity implements Transaction {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public readonly id: string;

  @Column({ type: 'int', name: 'amount', nullable: false })
  public readonly amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    name: 'type',
    nullable: false,
  })
  public readonly type: TransactionType;

  @Column({ type: 'uuid', name: 'bank_id', nullable: false })
  public readonly bankId: string;

  @ManyToOne(() => BankEntity, (bank) => bank.transactions)
  @JoinColumn({ name: 'bank_id' })
  bank: BankEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.transactions)
  @JoinTable({
    name: 'transactions_categories',
    joinColumn: {
      name: 'transaction_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: CategoryEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public readonly createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public readonly updatedAt: Date;
}
