import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index,
} from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

  @Index({ unique: true })
  @Column('char', { length: 36, nullable: false, unique: true })
    uuid: string;

  @Column('varchar', { length: 255, nullable: false })
    title: string;

  @Column({ nullable: false })
    price: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;
}
