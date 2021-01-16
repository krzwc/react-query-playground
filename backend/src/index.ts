import "dotenv/config";
import * as express from "express";
import config from "./config/config";
import * as cors from "cors";
import * as mongoose from "mongoose";
import routes from "./routes";
import models from "./models";
import { handle404, catchErrors } from "./middleware/errorHandlers";

//checking db
const createTechnologyWithSnippets = async () => {
  const department = new models.Department({
    name: "Desktop Apps",
  });

  const product1 = new models.Product({
    name: "b0006se5bq",
    number: "singing coach unlimited",
    description:
      "singing coach unlimited - electronic learning products (win me nt 2000 xp)",
    images: [
      { url: "http://lorempixel.com/200/200/technics/", name: "singing coach" },
      { url: "http://lorempixel.com/200/200/abstract/", name: "front side" },
    ],
    department: department.id,
  });

  const product2 = new models.Product({
    name: "b00021xhzw",
    number:
      "adobe after effects professional 6.5 upgrade from standard to professional",
    description:
      "upgrade only; installation of after effects standard new disk caching tools speed up your interactive work save any combination of animation parameters as presets",
    images: [],
    department: department.id,
  });

  const product3 = new models.Product({
    name: "b00021xhzw1",
    number: "domino designer/developer v5.0",
    description:
      "reference domino designer/developer r5 doc pack includes the following titles: application development with domino designer (intermediate-advanced) 536 pages it explains building applications creating databases using forms fields views folders navi",
    images: [{ url: "http://lorempixel.com/200/200/people/", name: "cover" }],
    department: department.id,
  });

  await product1.save();
  await product2.save();
  await product3.save();

  await department.save();

  // const fn = async () =>
  //   await mongoose.model("Technology").findById(tech1.id, function(err, obj) {
  //     console.log(obj.name);
  //   });

  // console.log(fn());
};
// end checking db

const eraseDatabaseOnSync = true;

mongoose
  .connect(config.database, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(async () => {
    if (eraseDatabaseOnSync) {
      await Promise.all([
        models.Department.deleteMany({}),
        models.Product.deleteMany({}),
      ]);
    }
    createTechnologyWithSnippets();
  });

mongoose.connection.on("error", (err) => {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", routes());

app.use(handle404);
app.use(catchErrors);

if (require.main === module) {
  app.listen(config.server.port, () => {
    console.log("server started at http://localhost:" + config.server.port);
  });
}

export default app;
