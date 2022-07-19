import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  ForeignKey
} from 'sequelize-typescript';
import { Room } from './Room';
import { User } from './User';

@Table({
  timestamps: false,
  tableName: 'Reservation'
})
export class Reservation extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Default('pending')
  @Column({
    type: DataType.ENUM('pending', 'paid', 'deleted')
  })
  state!: string;

  @AllowNull(false)
  @Column({ field: 'days_of_stay' })
  daysOfStay!: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId!: number;

  @ForeignKey(() => Room)
  @Column({ field: 'room_id' })
  roomId!: number;
}
