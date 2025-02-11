import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  url: string;

  @Column()
  title: string;

  @Column('text', { array: true })
  links: string[];

  @Column('text', { array: true })
  words: string[];

  @CreateDateColumn()
  indexedAt: Date;
}
