import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  IsEmail,
  AllowNull,
  BelongsToMany
} from 'sequelize-typescript';
import { Reservation } from './Reservation';
import { Room } from './Room';

@Table({
  timestamps: false,
  tableName: 'User'
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @AllowNull(false)
  @IsEmail
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @BelongsToMany(() => User, () => Reservation)
  users!: User[];
}
