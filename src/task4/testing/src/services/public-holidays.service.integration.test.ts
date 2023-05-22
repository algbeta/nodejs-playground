const { getListOfPublicHolidays } = require("./public-holidays.service");
describe("PublicHoliday service integration tests", () => {
  test("should contain new year holiday", async () => {
    const result = await getListOfPublicHolidays(
      new Date().getFullYear(),
      "GB"
    );
    expect(result).toContainEqual({
      date: `${new Date().getFullYear()}-01-01`,
      localName: "New Year's Day",
      name: "New Year's Day",
    });
  });
});
