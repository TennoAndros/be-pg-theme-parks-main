const db = require("../db/connection");

exports.selectParks = () => {
  return db.query(`SELECT * FROM parks;`).then((response) => {
    return response.rows;
  });
};

exports.updateParkById = (id, parkUpdates) => {
  const { park_name, annual_attendance } = parkUpdates;
  return db
    .query(
      "UPDATE parks SET park_name = $1, annual_attendance = $2 WHERE park_id = $3 RETURNING *;",
      [park_name, annual_attendance, id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeParkById = (parkIdToBeDeleted) => {
  return db
    .query("DELETE FROM parks WHERE park_id=$1", [parkIdToBeDeleted])
    .then(() => undefined);
};

/*
updatedParkById(5, {park_name: "werewolf77"})

*/
