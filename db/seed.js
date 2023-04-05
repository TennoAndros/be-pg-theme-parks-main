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
    })
    .then(({ rows }) => {
      return insertRides(rides, rows);
    });
}

const ena = await insertParks();
const duo = await createRides();




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
  const copyRidesArr = ridesArr.map((ride) => {
    return { ...ride };
  });
  copyRidesArr.forEach((ride) => {
    const correctPark = parksArr.filter(
      (park) => ride.park_name === park.park_name
    );
    ride.park_id = correctPark[0].park_id;
    delete ride.park_name;
  });

  return copyRidesArr;
}

function arrangeRidesData(ridesData) {
  const rides = [];
  ridesData.forEach((ride) => {
    rides.push(Object.values(ride));
  });
  return rides;
}

function insertRides(rides, parksArrDataReturned) {
  const preparedDataRides = prepareRidesData(rides, parksArrDataReturned);
  const formatedDataRides = arrangeRidesData(preparedDataRides);
  const query = format(
    "INSERT INTO rides (ride_name, year_opened, votes, park_id) VALUES %L RETURNING * ;",
    formatedDataRides
  );
  return db.query(query);
}
module.exports = { seed, prepareRidesData, arrangeRidesData };
