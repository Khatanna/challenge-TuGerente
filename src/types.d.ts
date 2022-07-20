import { Room } from './database/models/Room';

export interface UserLogged {
  id: number;
}

export interface HoteModel {
  name: string;
  direction: string;
}
export interface RoomModel {
  roomNumber: number;
  capacity: number;
  numberOfBeds: number;
  reservePrice: number;
}
