import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  price: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({ type: 'bytea' })
  image: Buffer; 
}
