import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  HasMany
} from 'sequelize-typescript';
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

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  direction!: string;

  @HasMany(() => Room)
  rooms!: Room[];
}
