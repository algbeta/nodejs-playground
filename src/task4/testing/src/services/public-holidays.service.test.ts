const axios = require("axios");
const {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} = require("./public-holidays.service");
const { PUBLIC_HOLIDAYS_API_URL } = require("../config");
const helpers = require("../helpers");

jest.mock("axios");
jest.mock("../helpers");

describe("PublicHoliday service tests", () => {
  let validateInputMock: jest.SpyInstance<any, unknown[], any>;
  let shortenPublicHolidayMock: jest.SpyInstance<any, unknown[], any>;

  beforeAll(() => {
    validateInputMock = jest.spyOn(helpers, "validateInput");
    shortenPublicHolidayMock = jest
      .spyOn(helpers, "shortenPublicHoliday")
      .mockImplementation((val) => val);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("getListOfPublicHolidays", () => {
    test("failed network call, should return empty array", async () => {
      axios.get.mockRejectedValueOnce(new Error("Unexpected error"));
      const result = await getListOfPublicHolidays(2023, "GB");
      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2023/GB`
      );
      expect(validateInputMock).toBeCalledTimes(1);
      expect(validateInputMock).toHaveBeenCalledWith({
        year: 2023,
        country: "GB",
      });
      expect(result).toEqual([]);
    });

    test("should return array of holidays", async () => {
      axios.get.mockResolvedValueOnce({ data: ["publicHolidayMock"] });
      const result = await getListOfPublicHolidays(2023, "GB");
      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2023/GB`
      );
      expect(validateInputMock).toBeCalledTimes(1);
      expect(validateInputMock).toHaveBeenCalledWith({
        year: 2023,
        country: "GB",
      });

      expect(shortenPublicHolidayMock).toHaveBeenCalledTimes(1);
      expect(shortenPublicHolidayMock).toHaveBeenCalledWith(
        "publicHolidayMock"
      );
      expect(result).toEqual(["publicHolidayMock"]);
    });
  });

  describe("getNextPublicHolidays", () => {
    test("failed network call, should return empty array", async () => {
      axios.get.mockRejectedValueOnce(new Error("Unexpected error"));
      const result = await getNextPublicHolidays("GB");
      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/GB`
      );
      expect(validateInputMock).toBeCalledTimes(1);
      expect(validateInputMock).toHaveBeenCalledWith({
        country: "GB",
      });
      expect(result).toEqual([]);
    });

    test("should return array of holidays", async () => {
      axios.get.mockResolvedValueOnce({ data: ["publicHolidayMock"] });
      const result = await getNextPublicHolidays("GB");
      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/GB`
      );
      expect(validateInputMock).toBeCalledTimes(1);
      expect(validateInputMock).toHaveBeenCalledWith({
        country: "GB",
      });

      expect(shortenPublicHolidayMock).toHaveBeenCalledTimes(1);
      expect(shortenPublicHolidayMock).toHaveBeenCalledWith(
        "publicHolidayMock"
      );
      expect(result).toEqual(["publicHolidayMock"]);
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {
    test("failed network call, should return false", async () => {
      axios.get.mockRejectedValueOnce(new Error("Unexpected error"));
      const result = await checkIfTodayIsPublicHoliday("GB");
      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/GB`
      );
      expect(result).toBeFalsy();
    });

    test("should return true", async () => {
      axios.get.mockResolvedValueOnce({status: 200});
      const result = await checkIfTodayIsPublicHoliday("GB");
      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/GB`
      );
      expect(result).toBeTruthy();
    });
  })
});
