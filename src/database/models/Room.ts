import {
  Table,
  Column,
  Model,
  AllowNull,
  PrimaryKey,
  BelongsTo,
  BelongsToMany,
  ForeignKey,
  HasOne,
  HasMany,
  Unique
} from 'sequelize-typescript';
import { Hotel } from './Hotel';
import { Reservation } from './Reservation';
import { User } from './User';
import { RoomModel } from '../../types';

@Table({
  timestamps: false,
  tableName: 'Room'
})
export class Room<RoomModel> extends Model {
  @PrimaryKey
  @Unique
  @AllowNull(false)
  @Column({ field: 'room_number' })
  roomNumber!: number;

  @AllowNull(false)
  @Column
  capacity!: number;

  @AllowNull(false)
  @Column({ field: 'number_of_beds' })
  numberOfBeds!: number;

  @ForeignKey(() => Hotel)
  @Column({ field: 'hotel_id' })
  hotelId!: number;

  @BelongsTo(() => Hotel)
  hotel!: Hotel;

  @HasMany(() => Reservation)
  rooms!: Reservation[];
}
