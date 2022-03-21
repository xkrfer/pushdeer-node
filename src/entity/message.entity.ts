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

  @Column()
  text: string;

  @Column({ nullable: true })
  desp: string;

  @Column({ nullable: true, default: 'markdown' })
  type: string;

  @Column()
  readkey: string;

  @Column({ nullable: true })
  url: string;

  @Column()
  pushkey_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
