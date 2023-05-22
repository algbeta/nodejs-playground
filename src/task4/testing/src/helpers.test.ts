import { SUPPORTED_COUNTRIES } from "./config";
import { validateInput, shortenPublicHoliday } from "./helpers";
describe("helpers tests", () => {
  describe("validateCountry", () => {
    test("country is not supported, should throw", () => {
      expect(() => validateInput({ year: 2023, country: "RANDOM" })).toThrow(
        "Country provided is not supported, received: RANDOM"
      );
    });

    test("no country, should return true", () => {
      expect(() => validateInput({ year: 2023, country: "" })).toBeTruthy();
    });

    test("not current year, should throw", () => {
      expect(() =>
        validateInput({ year: 2020, country: SUPPORTED_COUNTRIES[0] })
      ).toThrow(`Year provided not the current, received: 2020`);
    });

    test("no year, should return true", () => {
      expect(() =>
        validateInput({ country: SUPPORTED_COUNTRIES[0] })
      ).toBeTruthy();
    });

    test("valid input, should return true", () => {
      expect(() =>
        validateInput({ year: 2021, country: SUPPORTED_COUNTRIES[0] })
      ).toBeTruthy();
    });
  });

  describe("shortenPublicHoliday", () => {
    test("should shorten", () => {
      expect(
        shortenPublicHoliday({
          name: "new year",
          localName: "new year eve",
          date: new Date("31-12-2023").toDateString(),
          countryCode: "GB",
          fixed: true,
          global: true,
          counties: [],
          launchYear: 1000,
          types: ["public"],
        })
      ).toEqual({
        name: "new year",
        localName: "new year eve",
        date: new Date("31-12-2023").toDateString(),
      });
    });
  });
});
