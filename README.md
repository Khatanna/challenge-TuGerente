## Challenge-TuGerente

- ### Environment Variables

  ```bash
  PORT = numberOfPort
  DB_USERNAME = 'username'
  DB_PASSWORD = 'passwordOfDatabase'
  DB_DATABASE = 'nameOfDatabase'
  DB_DATABASE_TEST = 'nameOfDatabaseForTests'
  DB_DATABASE_HOST = 'HostForRunServer'
  DB_DIALECT= 'postgres' | 'mysql' | 'sqlite' | ...
  DB_PORT = 'databasePort'
  API_URL='http://${HOST}:${PORT}'
  ```

- ### Scripts

  - Run the server in mode (development)

    ```bash
      npm run dev
    ```

  - Run all test

    ```bash
      npm run test
    ```

  - Run the server in mode (production)

    ```bash
      npm start
    ```

---

- ### Routes
  - [User](#user)
  - [Hotel](#hotel)
  - [Auth](#auth)

## user

### Get

- getUserProfile
- getAllUsers

  | description                  | params | query |        route example        | body | result  |
  | :--------------------------- | :----: | :---: | :-------------------------: | :--: | :-----: |
  | returns all user of database |  none  | none  | http://localhost:3001/users | none | users[] |

- getAllUserById

  | description                                                                                             | params | query |         route example         | body | result |
  | :------------------------------------------------------------------------------------------------------ | :----: | :---: | :---------------------------: | :--: | ------ |
  | returns a user from the database by means of the (id), if the user does not exist, it returns a message |  /:id  | none  | http://localhost:3001/users/1 | none | user{} |

- getAllUserByEmail

  | description                                                                                            | params | query |                  route example                   | body | result |
  | :----------------------------------------------------------------------------------------------------- | :----: | :---: | :----------------------------------------------: | :--: | :----: |
  | returns a user from the database by means of (email), if the user does not exist, it returns a message |  none  | email | http://localhost:3001/users?email=user@gmail.com | none | user{} |

### Post

- createUser

  | description                                   | params | query |        route example        |        body         | result |
  | :-------------------------------------------- | :----: | :---: | :-------------------------: | :-----------------: | ------ |
  | creates a user in the database and returns it |  none  | none  | http://localhost:3001/users | { email, password } | user{} |

- createReservation

  | description                                   |  params  | query |               route example                |                    body                     | result |
  | :-------------------------------------------- | :------: | :---: | :----------------------------------------: | :-----------------------------------------: | ------ |
  | creates a user in the database and returns it | /:userId | none  | http://localhost:3001/users/reservations/1 | { state, daysOfStay, reservePrice, roomId } | user{} |

### Put

- updateUser

  | description                                                                                      | params | query |         route example         |        body         | result |
  | :----------------------------------------------------------------------------------------------- | :----: | :---: | :---------------------------: | :-----------------: | ------ |
  | search and update the user by means of the (id), if it does not exist the user returns a message |  /:id  | none  | http://localhost:3001/users/1 | { email, password } | user{} |

- updateReservationUser

  | description                                                                        |         params          | query |                 route example                 |                 body                 | result |
  | :--------------------------------------------------------------------------------- | :---------------------: | :---: | :-------------------------------------------: | :----------------------------------: | ------ |
  | search for the reservation and the user by (id), update and return the reservation | /:reservationId/:userId | none  | http://localhost:3001/users/reservations/1/10 | { roomId, reservePrice, daysOfStay } | user{} |

### Delete

- deletedUser

  | description                                                                                       |  params  | query |         route example         | body | result |
  | :------------------------------------------------------------------------------------------------ | :------: | :---: | :---------------------------: | :--: | ------ |
  | search and deleted the user by means of the (id), if it does not exist the user returns a message | /:userId | none  | http://localhost:3001/users/1 | none | none   |

- deleteReservationUser

  | description                                                                         |         params          | query |                 route example                 | body | result |
  | :---------------------------------------------------------------------------------- | :---------------------: | :---: | :-------------------------------------------: | :--: | ------ |
  | search for the reservation and the user by (id), deleted and return the reservation | /:reservationId/:userId | none  | http://localhost:3001/users/reservations/1/10 | none | none   |

## hotel

### Get

- getAllHotels

  | description                    | params | query |        route example         | body |  result  |
  | :----------------------------- | :----: | :---: | :--------------------------: | :--: | :------: |
  | returns all hotels of database |  none  | none  | http://localhost:3001/hotels | none | hotels[] |

- getHotelByName

  | description                                                                                                 | params | query |                route example                | body | result  |
  | :---------------------------------------------------------------------------------------------------------- | :----: | :---: | :-----------------------------------------: | :--: | ------- |
  | returns a hotel from the database by means of the (name), if the hotel does not exist, it returns a message |  none  | name  | http://localhost:3001/hotels?name=hotelName | none | hotel{} |

- getHotelById

  | description                                                                                               | params | query |         route example          | body | result  |
  | :-------------------------------------------------------------------------------------------------------- | :----: | :---: | :----------------------------: | :--: | :-----: |
  | returns a hotel from the database by means of the (id), if the hotel does not exist, it returns a message |  /:id  | none  | http://localhost:3001/hotels/1 | none | hotel{} |

### Post

- createHotel

  | description                                    | params | query |        route example         |        body         | result  |
  | :--------------------------------------------- | :----: | :---: | :--------------------------: | :-----------------: | ------- |
  | creates a hotel in the database and returns it |  none  | none  | http://localhost:3001/hotels | { name, direction } | hotel{} |

- createRoom

  | description                                   | params | query |            route example             |                  body                  | result |
  | :-------------------------------------------- | :----: | :---: | :----------------------------------: | :------------------------------------: | ------ |
  | creates a room in the database and returns it |  /:id  | none  | http://localhost:3001/hotels/rooms/1 | { roomNumber, capacity, numberOfBeds } | room{} |

### Put

- updateHotel

  | description                                                                                        | params | query |         route example          |        body         | result  |
  | :------------------------------------------------------------------------------------------------- | :----: | :---: | :----------------------------: | :-----------------: | ------- |
  | search and update the hotel by means of the (id), if it does not exist the hotel returns a message |  /:id  | none  | http://localhost:3001/hotels/1 | { name, direction } | hotel{} |

- updateRoom

  | description                                                           |    params    | query |              route example              |                  body                  | result |
  | :-------------------------------------------------------------------- | :----------: | :---: | :-------------------------------------: | :------------------------------------: | ------ |
  | search for the hotel and the room by (id), update and return the room | /:id/:roomId | none  | http://localhost:3001/hotels/rooms/1/10 | { roomNumber, capacity, numberOfBeds } | room{} |

### Delete

- deleteHotel

  | description                                                                                         | params | query |         route example          | body | result |
  | :-------------------------------------------------------------------------------------------------- | :----: | :---: | :----------------------------: | :--: | ------ |
  | search and deleted the hotel by means of the (id), if it does not exist the hotel returns a message |  /:id  | none  | http://localhost:3001/hotels/1 | none | none   |

- deleteRoom

  | description                                                            |    params    | query |              route example              | body | result |
  | :--------------------------------------------------------------------- | :----------: | :---: | :-------------------------------------: | :--: | ------ |
  | search for the room and the hotel by (id), deleted and return the room | /:id/:roomId | none  | http://localhost:3001/hotels/rooms/1/10 | none | none   |
