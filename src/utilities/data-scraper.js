import { instances as sessions } from "./searchOptions.js";
import { getSearchInstance } from "./fetcher.js";

const fetchPastOfferings = async (courseCode, omit = null) => {
  const instance = getSearchInstance();

  const pastSessions = omit
    ? sessions.filter(({ session, section }) => {
        if (session > omit["session"]) return false;
        return !(session === omit["session"] && section >= omit["section"]);
      })
    : sessions;

  const exclude = omit ? omit["session"] + omit["section"] : "";

  const store = {};
  const promises = pastSessions.map(({ session }) =>
    instance.get(`${session}/courses/`, { params: { code: courseCode } })
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
    .catch((error) => console.log(error));
};

// const fetchPastOfferings = async (deptCode) => {
//   const instance = getSearchInstance();
//
//   const store = {};
//   const promises = sessions.map((session) =>
//     instance.get(`${session}/courses/`, { params: { code: deptCode } })
//   );
//   Promise.all(promises)
//     .then((values) => {
//       // each of the responses
//       values.forEach((v) => {
//         if (!Array.isArray(v.data)) {
//           // each of the course data object
//           Object.entries(v.data).forEach(([, cd]) => {
//             const { code, session } = cd;
//             if (!store.hasOwnProperty(code)) {
//               store[code] = {};
//             }
//             store[code][session] = cd;
//           });
//         }
//       });
//       // save store to json
//       // console.log(`${deptCode}.json`);
//       // console.log(JSON.stringify(store));
//       console.log("returning data");
//       return JSON.stringify(store);
//     })
//     .catch((error) => console.log(error));
// };

// const fetchRateLimited = async () => {
//   const instance = getSearchInstance();
//
//   function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }
//
//   for (let i = 0; i < deptCodes.length; i++) {
//     const store = {};
//     const deptCode = deptCodes[i];
//     Promise.all(
//       sessions.map((session) =>
//         instance.get(`${session}/courses/`, { params: { code: deptCode } })
//       )
//     )
//       .then((values) => {
//         // each of the responses
//         values.forEach((v) => {
//           if (!Array.isArray(v.data)) {
//             // each of the course data object
//             Object.entries(v.data).forEach(([, cd]) => {
//               const { code, session } = cd;
//               if (!store.hasOwnProperty(code)) {
//                 store[code] = {};
//               }
//               store[code][session] = cd;
//             });
//           }
//         });
//         // save store to json
//         console.log(`${deptCode}.json`);
//         console.log(JSON.stringify(store));
//       })
//       .catch((error) => console.log(error));
//     await sleep(15000);
//   }
//   console.log("Scraping complete.");
// };

export { fetchPastOfferings };
