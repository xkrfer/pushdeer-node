import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PushDeerMessages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column({ type: 'varchar', length: 1000 })
  text: string;

  @Column({ type: 'varchar', length: 14000, nullable: true })
  desp: string;

  @Column({ nullable: true, default: 'markdown' })
  type: string;

  @Column()
  readkey: string;

  @Column({ nullable: true })
  url: string;

  @Column()
  pushkey_name: string;

  @Column({ type: 'text', nullable: true })
  html: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
