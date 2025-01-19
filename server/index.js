// express, client(db), port(db)
const { express, client, PORT } = require("./common");

// db functions..
const {
  createTables,
  createCustomer,
  createRestaurant,
  createReservation,
  destroyReservation,
} = require("./db");

// app
const app = express();

// path
const path = require("path");

//init
const init = async () => {
  // init
  console.log("init express");

  //connect db
  await client.connect();
  console.log("connected db");

  // create tables
  await createTables();
  console.log('created tables');
  

  // middleware
  // note: middleware run in order they are defined
  // note: error-handling at end

  // JSON
  app.use(express.json());

  //morgan
  app.use(require("morgan")("dev"));

  // index route
  app.get("/", (req, res) => {
    res.send("B34 Workshop: ACME Restaurant Planner");
  });

  // ERROR handling, invoked when there are 4 arguments.
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ error: err.message || err });
  });

  // APP listen
  app.listen(PORT, () => {
    console.log(`express listening on port ${PORT}`);
  });
};

// start
init();
