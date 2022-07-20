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
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany
} from 'sequelize-typescript';
import { RoomModel } from '../../types';
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
  set state(value: string) {
    this.setDataValue('state', value.toLowerCase());
  }

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId!: number;

  @AllowNull(false)
  @Column({ field: 'reserve_price' })
  reservePrice!: number;

  @AllowNull(false)
  @Column({ field: 'days_of_stay' })
  daysOfStay!: number;

  @BelongsTo(() => User)
  user!: User;

  @AllowNull(false)
  @ForeignKey(() => Room)
  @Column({ field: 'room_id' })
  roomId!: number;

  @BelongsTo(() => Room)
  room!: Room<RoomModel>;
}
