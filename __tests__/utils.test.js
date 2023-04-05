/* make sure you write your tests for your utils functions in here :eyes: */
const { prepareRidesData, arrangeRidesData } = require("../db/seed");

const rides = [
  {
    ride_name: "Tidal Wave",
    year_opened: 2000,
    park_name: "Thorpe Park",
    votes: 1,
  },
];

const parks = [{ park_id: 1, park_name: "Thorpe Park" }];

describe("prepareRidesData", () => {
  test("return an array", () => {
    expect(prepareRidesData(rides, parks)).toBeInstanceOf(Array);
  });
  test("should first", () => {
    expect(prepareRidesData(rides, parks)).toEqual([
      {
        ride_name: "Tidal Wave",
        year_opened: 2000,
        park_id: 1,
        votes: 1,
      },
    ]);
  });
});
describe("arrangeRidesData", () => {
  const rides = [
    {
      ride_name: "Tidal Wave",
      year_opened: 2000,
      park_id: 1,
      votes: 1,
    },
  ];
  test("should return an array", () => {
    expect(arrangeRidesData(rides)).toBeInstanceOf(Array);
  });
  test("should return an array with nested arrays", () => {
    expect(arrangeRidesData(rides)).toEqual([["Tidal Wave", 2000, 1, 1]]);
  });
});
