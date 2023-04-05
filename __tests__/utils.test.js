/* make sure you write your tests for your utils functions in here :eyes: */
const { prepareRidesData } = require("../db/seed");

describe.only("prepareRidesData", () => {
  test("return an array", () => {
    expect(prepareRidesData()).toBeInstanceOf(Array);
  });
});
