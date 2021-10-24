import axios from "axios";

const instance = () => {
  return axios.create({
    baseURL:
      "https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/",
    headers: {},
  });
};

// valid params
// org:
// code:
// section: f,s,y
// studyyear: 1,2,3,4
// daytime: am,pm,eve
// weekday: MO,TU,WE,TH,FR
// prof:
// breadth: 1,2,3,4,5
// deliverymode: onlsync,onlasync,class
// online: t (if online is selected, delivery mode should be disabled)
// waitlist: t (or blank if false)
// available: t
// fyfcourse: t
// title:

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
