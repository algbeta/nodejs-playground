import axios from "axios";
import { PUBLIC_HOLIDAYS_API_URL } from "./config";

const publicHolidaysGB2022 = [
  {
    date: "2022-01-01",
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-NIR"],
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-01-03",
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-ENG", "GB-WLS"],
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-01-03",
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-SCT"],
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-01-04",
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-SCT"],
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-03-17",
    localName: "Saint Patrick's Day",
    name: "Saint Patrick's Day",
    countryCode: "GB",
    fixed: true,
    global: false,
    counties: ["GB-NIR"],
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-04-15",
    localName: "Good Friday",
    name: "Good Friday",
    countryCode: "GB",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-04-18",
    localName: "Easter Monday",
    name: "Easter Monday",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-ENG", "GB-WLS", "GB-NIR"],
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-05-02",
    localName: "Early May Bank Holiday",
    name: "Early May Bank Holiday",
    countryCode: "GB",
    fixed: false,
    global: true,
    counties: null,
    launchYear: 1978,
    types: ["Public"],
  },
  {
    date: "2022-06-02",
    localName: "Spring Bank Holiday",
    name: "Spring Bank Holiday",
    countryCode: "GB",
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-06-03",
    localName: "Queen’s Platinum Jubilee",
    name: "Queen’s Platinum Jubilee",
    countryCode: "GB",
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-07-12",
    localName: "Battle of the Boyne",
    name: "Battle of the Boyne",
    countryCode: "GB",
    fixed: true,
    global: false,
    counties: ["GB-NIR"],
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-08-01",
    localName: "Summer Bank Holiday",
    name: "Summer Bank Holiday",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-SCT"],
    launchYear: 1971,
    types: ["Public"],
  },
  {
    date: "2022-08-29",
    localName: "Summer Bank Holiday",
    name: "Summer Bank Holiday",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-ENG", "GB-WLS", "GB-NIR"],
    launchYear: 1971,
    types: ["Public"],
  },
  {
    date: "2022-09-19",
    localName: "Queen’s State Funeral",
    name: "Queen’s State Funeral",
    countryCode: "GB",
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-11-30",
    localName: "Saint Andrew's Day",
    name: "Saint Andrew's Day",
    countryCode: "GB",
    fixed: true,
    global: false,
    counties: ["GB-SCT"],
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-12-26",
    localName: "Boxing Day",
    name: "St. Stephen's Day",
    countryCode: "GB",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2022-12-27",
    localName: "Christmas Day",
    name: "Christmas Day",
    countryCode: "GB",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
];

describe("api tests", () => {
  test("LongWeekend: should return a proper list", async () => {
    const limit = 2;
    const { status, data } = await axios.get(
      `${PUBLIC_HOLIDAYS_API_URL}/LongWeekend/2023/GB`
    );

    expect(status).toEqual(200);

    // verify body structure
    data.forEach((weekend: any) => {
      expect(weekend).toEqual({
        dayCount: expect.any(Number),
        endDate: expect.any(String),
        needBridgeDay: expect.any(Boolean),
        startDate: expect.any(String),
      });
    });
  });

  test("PublicHolidays: should return 200 and list of holidays", async () => {
    const { status, data } = await axios.get(
      `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2022/GB`
    );

    expect(status).toEqual(200);
    expect(data).toEqual(publicHolidaysGB2022);
  });

  test("LongWeekend: invalid year, should throw", async () => {
    await expect(
      axios.get(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/20222/GB`)
    ).rejects.toThrow();
  });

  test("LongWeekend: invalid country, should throw", async () => {
    await expect(
      axios.get(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/20222/BU`)
    ).rejects.toThrow();
  });
});
