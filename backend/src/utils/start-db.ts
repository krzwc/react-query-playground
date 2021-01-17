import * as mongoose from 'mongoose';
import config from '../config/config';
import models from '../models';
import { populateDB } from './populate-db';

const eraseDatabaseOnSync = true;

export const startDB = (url = config.database) => {
  return mongoose
    .connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(async () => {
      if (eraseDatabaseOnSync) {
        await Promise.all([
          models.Category.deleteMany({}),
          models.Product.deleteMany({}),
        ]);
      }
      populateDB();
    });
};
