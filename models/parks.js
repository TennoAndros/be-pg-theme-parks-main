const db = require("../db/connection");

exports.selectParks = () => {
  return db.query(`SELECT * FROM parks;`).then((response) => {
    return response.rows;
  });
};

exports.updateParkById = (park) => {
  return db
    .query(
      "UPDATE parks SET park_name =$1, annual_attendance=$2, year_opened=$3 WHERE park_id=$4",
      [park_name, annual_attendance, year_opened, park_id]
    )
    .then((response) => response.rows);
};

exports.removeParkById = () => {
  return db
    .query("DELETE FROM parks WHERE park_id=$1", [park_id])
    .then((response) => response.rows);
};
