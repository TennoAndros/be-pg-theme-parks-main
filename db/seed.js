const format = require("pg-format");
const { parks, rides, stalls } = require("./data/index.js");

const db = require("./connection");

function seed() {
  return db
    .query("DROP TABLE IF EXISTS rides;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls_foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS parks;");
    })
    .then(() => {
      return createParks();
    })
    .then(() => {
      return createRides();
    })
    .then(() => {
      return insertParks();
    });
}

function createParks() {
  /* Create your parks table in the query below */
  return db.query(
    "CREATE TABLE parks(park_id SERIAL PRIMARY KEY, park_name VARCHAR NOT NULL, year_opened INT NOT NULL, annual_attendance INT NOT NULL);"
  );
}
function createRides() {
  return db.query(
    "CREATE TABLE rides(ride_id SERIAL PRIMARY KEY, park_id INT REFERENCES parks(park_id), ride_name VARCHAR, year_opened INT, votes INT);"
  );
}

function arrangeParksData(parksData) {
  const parks = [];
  parksData.forEach((park) => {
    parks.push(Object.values(park));
  });
  return parks;
}

function insertParks() {
  const formatedData = arrangeParksData(parks);
  const query = format(
    "INSERT INTO parks (park_name, year_opened, annual_attendance) VALUES %L RETURNING * ;",
    formatedData
  );
  return db.query(query);
}

function prepareRidesData(ridesArr, parksArr) {
  return [];
}

module.exports = { seed, prepareRidesData };