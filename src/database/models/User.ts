import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  IsEmail,
  AllowNull,
  BelongsToMany,
  Unique,
  HasMany
} from 'sequelize-typescript';
import { Reservation } from './Reservation';
import bcrypt from 'bcryptjs';

@Table({
  timestamps: false,
  tableName: 'User'
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Unique
  @AllowNull(false)
  @IsEmail
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  set password(value: string) {
    const encryptedPassword: string = bcrypt.hashSync(value, 10);
    this.setDataValue('password', encryptedPassword);
  }

  @HasMany(() => Reservation)
  reservations!: Reservation[];
}
