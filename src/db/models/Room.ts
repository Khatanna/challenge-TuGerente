import {
  Table,
  Column,
  Model,
  AllowNull,
  PrimaryKey,
  BelongsTo,
  BelongsToMany,
  ForeignKey
} from 'sequelize-typescript';
import { Hotel } from './Hotel';
import { Reservation } from './Reservation';
import { User } from './User';

@Table({
  timestamps: false,
  tableName: 'Room'
})
export class Room extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({ field: 'room_number' })
  roomNumber!: number;

  @AllowNull(false)
  @Column
  capacity!: number;

  @AllowNull(false)
  @Column({ field: 'number_of_beds' })
  numberOfBeds!: number;

  @AllowNull(false)
  @Column({ field: 'reserve_price' })
  reservePrice!: number;

  @ForeignKey(() => Hotel)
  @Column({ field: 'hotel_id' })
  hotelId!: number;

  @BelongsTo(() => Hotel)
  hotel!: Hotel;

  @BelongsToMany(() => Room, () => Reservation)
  rooms!: Room[];
}

// get name(): string {
//   return 'My name is ' + this.getDataValue('name')
// }

// set name(value: string) {
//   this.setDataValue('name', value)
// }
