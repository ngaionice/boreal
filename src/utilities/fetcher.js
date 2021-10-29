import axios from "axios";
import { instances as sessions } from "./searchOptions";

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

const fetchCourseData = async ([session, section, code]) => {
  const currDisplayedId = `${code}-${section}-${session}`;
  const retrievedOn = new Date();

  return await instance()
    .get(`${session}/courses/`, {
      params: { code, section },
    })
    .then((res) => {
      return !res.data[currDisplayedId]
        ? {}
        : {
            ...res.data[currDisplayedId],
            updated: retrievedOn,
          };
    })
    .catch(() => {
      return {};
    });
};

const fetchPastOfferings = async (courseCode, omit = null) => {
  const searchInstance = instance();

  const pastSessions = omit
    ? sessions.filter(({ session, section }) => {
        if (session > omit["session"]) return false;
        return !(session === omit["session"] && section >= omit["section"]);
      })
    : sessions;

  const exclude = omit ? omit["session"] + omit["section"] : "";

  const store = {};
  const promises = pastSessions.map(({ session }) =>
    searchInstance.get(`${session}/courses/`, { params: { code: courseCode } })
  );
  return Promise.all(promises)
    .then((values) => {
      // each of the responses
      values.forEach((v) => {
        if (!Array.isArray(v.data)) {
          // each of the course data object
          Object.entries(v.data).forEach(([, cd]) => {
            const { session, section } = cd;
            if (
              !store.hasOwnProperty(session + section) &&
              session + section !== exclude
            ) {
              store[session + section] = cd;
            }
          });
        }
      });
      return store;
    })
    .catch((error) => {
      console.log(error);
      return {};
    });
};

export { instance as getSearchInstance, fetchCourseData, fetchPastOfferings };
