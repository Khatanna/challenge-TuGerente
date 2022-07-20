import app from './app';
import { sequelize } from './database';
import { Reservation } from './database/models/Reservation';
import { User } from './database/models/User';
import { Room } from './database/models/Room';
import { Hotel } from './database/models/Hotel';

const { PORT, DEV, DB_DATABASE } = process.env;

sequelize
  .sync({
    force: false,
    match: DEV ? new RegExp(DB_DATABASE as string) : /_test$/
  })
  .then(() => {
    // (async () => {
    //   const user = await User.create({
    //     email: 'user@gmail.com',
    //     password: '71264652'
    //   });
    //   const hotel = await Hotel.create({
    //     name: 'newHotel',
    //     direction: 'directionOfHotel'
    //   });
    //   await Room.create({
    //     roomNumber: 45,
    //     capacity: 4,
    //     numberOfBeds: 4,
    //     hotelId: hotel.id
    //   });
    //   await Room.create({
    //     roomNumber: 15,
    //     capacity: 4,
    //     numberOfBeds: 4,
    //     hotelId: hotel.id
    //   });
    //   await Reservation.create({
    //     state: 'paid',
    //     daysOfStay: 14,
    //     userId: user.id,
    //     reservePrice: 2500,
    //     roomId: 45
    //   });
    //   await Reservation.create({
    //     daysOfStay: 31,
    //     userId: user.id,
    //     reservePrice: 3500,
    //     roomId: 15
    //   });
    // })();

    app.listen(PORT, () => {
      console.log(`Server ready in the port: [${PORT}]`);
    });
  })
  .catch(console.log);
