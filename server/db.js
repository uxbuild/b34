//client db
const { client } = require("./common");
//uuid
const uuid = require("uuid");

//create tables
const createTables = async () => {
  // SQL
  const SQL = `
    DROP TABLE IF EXISTS Customers;
    DROP TABLE IF EXISTS Restaurants;
    DROP TABLE IF EXISTS Reservations;

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

// create user
const createUser = async ({ name }) => {
  // SQL
  const SQL = ``;
  await client.query(SQL);
};

// create customer
const createCustomer = async (name) => {};

// create restaurant
const createRestaurant = async (name) => {};

// fetch customer
const fetchCustomer = async (id) => {};

// fetch restaurant
const fetchRestaurant = async (id) => {};

// create reservation
const createReservation = async (
  date,
  party_count,
  restaurant_id,
  customer_id
) => {};

// destroy reservation
const destroyReservation = async (id) => {};
