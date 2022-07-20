import app from './app';
import { sequelize } from './database';

const { PORT, DEV, DB_DATABASE } = process.env;

sequelize
  .sync({
    force: true,
    match: DEV ? new RegExp(DB_DATABASE as string) : /_test$/
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server ready in the port: [${PORT}]`);
    });
  })
  .catch(console.log);
