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
  uid: string;

  @Column()
  device_id: string;

  @Column({ default: 'ios' })
  type: 'ios' | 'github';

  @Column({ default: 0 })
  is_clip: 0 | 1;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  fcm: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
