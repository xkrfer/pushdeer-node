import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PushDeerDevices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: number;

  @Column()
  device_id: string;

  @Column({ default: 'ios' })
  type: string;

  @Column({ default: 0 })
  is_clip: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
