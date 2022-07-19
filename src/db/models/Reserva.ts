import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  PrimaryKey,
  AutoIncrement,
  HasMany
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'Reserva'
})
export class Reserva extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Default('pending')
  @AllowNull(false)
  @Column({
    type: DataType.ENUM('pending', 'paid', 'deleted')
  })
  state!: string;

  @Column
  date!: Date;
}
