// express, client(db), port(db)
const { express, client, PORT } = require("./common");

// db functions..
const {
  createTables,
  createCustomer,
  createRestaurant,
  createReservation,
  fetchCustomers,
  fetchRestaurants,
  fetchReservations,
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
  console.log("created tables");

  // test: create customer
  console.log(await createCustomer("Bob Dylan"));
  console.log(await createCustomer("Bob Marley"));
  console.log(await createCustomer("Bobby McFerrin"));

  // test: create restaurant
  console.log(await createRestaurant("White Castle"));
  console.log(await createRestaurant("McDonald's"));
  console.log(await createRestaurant("Kentucky Fried Chicken (KFC)"));

  // test: create reservation
  // console.log(await createReservation());

  // middleware
  // note: middleware run in order they are defined
  // note: error-handling at end

  // JSON
  app.use(express.json());

  //morgan
  app.use(require("morgan")("dev"));

  // ROUTES **

  // index route
  app.get("/", (req, res) => {
    res.send("B34 Workshop: ACME Restaurant Planner");
  });

  // GET customers
  app.get("/api/customers", async (req, res, next) => {
    try {
      console.log("GET /api/customers");
      res.status(200).json(await fetchCustomers());
    } catch (error) {
      next(error);
    }
  });
  // GET restaurants
  app.get("/api/restaurants", async (req, res, next) => {
    try {
      console.log("GET /api/restaurants");
      res.status(200).json(await fetchRestaurants());
    } catch (error) {
      next(error);
    }
  });
  // GET reservations
  app.get("/api/reservations", async (req, res, next) => {
    try {
      console.log("GET /api/reservations");
      res.status(200).json(await fetchReservations());
    } catch (error) {
      next(error);
    }
  });

  // POST reservation:
  app.post(
    "/api/customers/:customer_id/reservations",
    async (req, res, next) => {
      try {
        console.log("DATE:", req.body.date);
        console.log("PARTY:", req.body.party_count);
        console.log("RESTAURANT:", req.body.restaurant_id);
        console.log("CUSTOMER:", req.params.customer_id);

        res.status(201).json(
          await createReservation({
            date: req.body.date,
            party_count: req.body.party_count,
            restaurant_id: req.body.restaurant_id,
            customer_id: req.params.customer_id,
          })
        );
      } catch (error) {
        next(error);
      }
    }
  );
  // DELETE reservation
app.delete('/api/customers/:customer_id/reservations/:reservation_id', async (req, res, next) => {
    try {

        console.log('DELETE reservation..');
        console.log('******');
        console.log('REQUEST PARAMS ', req.params);
        console.log('******');
        console.log('RESERVATION ', req.params.reservationId);
        console.log('CUSTOMER ', req.params.customerId);
        console.log('******');
        
        await destroyReservation({reservation_id:req.params.reservation_id, customer_id: req.params.customer_id});
        res.status(204).send("reservation deleted..??");
    } catch (error) {
        next(error);
    }
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
