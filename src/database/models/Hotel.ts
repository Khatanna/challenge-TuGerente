import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  HasMany,
  Unique
} from 'sequelize-typescript';
import { RoomModel } from '../../types';
import { Room } from './Room';

@Table({
  timestamps: false,
  tableName: 'Hotel'
})
export class Hotel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Unique
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  direction!: string;

  @HasMany(() => Room)
  rooms!: Room<RoomModel>[];
}
