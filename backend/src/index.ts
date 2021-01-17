import 'dotenv/config';
import * as express from 'express';
import config from './config/config';
import * as cors from 'cors';
import routes from './routes';
import { handle404, catchErrors } from './middleware/error-handlers';
import { startDB } from './utils/start-db';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api', routes());

app.use(handle404);
app.use(catchErrors);

export const start = async () => {
  try {
    await startDB();
    app.listen(config.server.port, () => {
      console.log(
        'server started at http://localhost:' + config.server.port,
      );
    });
  } catch (e) {
    console.error(e);
  }
};
start();

export default app;
