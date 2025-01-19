//client db
const { client } = require("./common");
//uuid
const uuid = require("uuid");

//create tables
const createTables = async () => {
  // SQL
  const SQL = `
    DROP TABLE IF EXISTS Customers CASCADE;
    DROP TABLE IF EXISTS Restaurants CASCADE;
    DROP TABLE IF EXISTS Reservations CASCADE;

    CREATE TABLE Customers(
        id UUID PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
    );
    CREATE TABLE Restaurants(
        id UUID PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
    );
    CREATE TABLE Reservations(
        id UUID PRIMARY KEY,
        date DATE NOT NULL,
        party_count INTEGER NOT NULL,
        restaurant_id UUID REFERENCES Restaurants(id) NOT NULL,
        customer_id UUID REFERENCES Customers(id) NOT NULL
    );
  `;

  await client.query(SQL);
};

// create customer
const createCustomer = async (name) => {
  const SQL = `
        INSERT INTO Customers(id, name) VALUES($1, $2) RETURNING *
    `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
};

// create restaurant
const createRestaurant = async (name) => {
  const SQL = `
        INSERT INTO Restaurants(id, name) VALUES($1, $2) RETURNING *
    `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
};

// fetch customers
const fetchCustomers = async (id) => {
    const SQL = `SELECT * FROM Customers`;
  const response = await client.query(SQL);
  return response.rows;
};

// fetch restaurants
const fetchRestaurants = async (id) => {
    const SQL = `SELECT * FROM Restaurants`;
  const response = await client.query(SQL);
  return response.rows;
};

// create reservation
const createReservation = async (
  date,
  party_count,
  restaurant_id,
  customer_id
) => {};

// destroy reservation
const destroyReservation = async (id) => {};

//export
module.exports = {
  createTables,
  createCustomer,
  createRestaurant,
  createReservation,
  fetchCustomers,
  fetchRestaurants,
  destroyReservation,
};
