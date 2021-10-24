import axios from "axios";

const instance = () => {
  return axios.create({
    baseURL:
      "https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/",
    headers: {},
  });
};

// valid params
// org:code:section:studyyear:daytime:weekday:prof:breadth:deliverymode:online:waitlist:available:fyfcourse:title:

const fetchAndSetDisplayedData = async (
  [session, section, code],
  setCurrDisplayedData
) => {
  const currDisplayedId = `${code}-${section}-${session}`;
  const retrievedOn = new Date();

  await instance()
    .get(`${session}/courses/`, {
      params: { code, section },
    })
    .then((res) => {
      setCurrDisplayedData(
        !res.data[currDisplayedId]
          ? {}
          : {
              ...res.data[currDisplayedId],
              updated: retrievedOn,
            }
      );
    })
    .catch(() => {
      setCurrDisplayedData({});
    });
};

export { instance as getSearchInstance, fetchAndSetDisplayedData };
