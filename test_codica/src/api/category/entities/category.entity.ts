import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Category } from '../category.type';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';

@Entity({ name: 'categories' })
export class CategoryEntity implements Category {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public readonly id: string;

  @Column({ type: 'varchar', name: 'name', nullable: false, unique: true })
  public readonly name: string;

  @ManyToMany(() => TransactionEntity, (transaction) => transaction.categories)
  transactions: TransactionEntity[];
}
