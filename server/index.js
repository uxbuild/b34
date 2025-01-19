// express, client(db), port(db)
const { express, client, PORT } = require("./common");

// app
const app = express();

// path
const path = require("path");

//init
const init = async () => {
  // init
  console.log("init..");

  // middleware
  // note: middleware run in order they are defined
  // note: error-handling at end

  // JSON
  app.use(express.json());

  //morgan
  app.use(require("morgan")("dev"));

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
