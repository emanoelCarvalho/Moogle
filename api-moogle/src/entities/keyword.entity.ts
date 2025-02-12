import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Page } from './page.entity';

@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  term: string;

  @ManyToOne(() => Page, (page) => page.id, { onDelete: 'CASCADE' })
  page: Page;
}
