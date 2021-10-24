import _ from "lodash";

const favoritesKey = "dfsoudfhsud";
const timetablesKey = "asfoahfisd";

const timetableReducer = (state, action) => {
  if (action.type === "reset") {
    localStorage.setItem(timetablesKey, JSON.stringify(action.payload));
    return action.payload;
  }

  let { session, code, section, meeting } = action.payload;
  const { teachingMethod } = meeting;
  let updatedTimetable = { ...state };
  code = code.toUpperCase();
  section = section.toUpperCase();

  switch (action.type) {
    case "add":
      if (!Object.keys(updatedTimetable).includes(session)) {
        updatedTimetable[session] = {};
      }
      if (
        !Object.keys(updatedTimetable[session]).includes(`${code}${section}`)
      ) {
        updatedTimetable[session][`${code}${section}`] = {};
      }
      updatedTimetable[session][`${code}${section}`][teachingMethod] = meeting;
      break;
    case "remove":
      if (
        Object.keys(updatedTimetable).includes(session) &&
        Object.keys(updatedTimetable[session]).includes(`${code}${section}`) &&
        Object.keys(updatedTimetable[session][`${code}${section}`]).includes(
          teachingMethod
        )
      ) {
        delete updatedTimetable[session][`${code}${section}`][teachingMethod];
      }
      break;
    default:
      throw new Error(
        `Called timetableReducer with unknown action type ${action.type}`
      );
  }
  localStorage.setItem(timetablesKey, JSON.stringify(updatedTimetable));
  return updatedTimetable;
};

const favoritesReducer = (state, action) => {
  const { type, payload, courseId } = action;
  if (!courseId && type !== "reset") {
    throw new Error("Called favoritesReducer while course ID is invalid.");
  }
  let updatedState;
  switch (type) {
    case "add":
      updatedState = {
        ...state,
        [courseId]: payload,
      };
      break;
    case "remove":
      updatedState = _.omit(state, courseId);
      break;
    case "reset":
      updatedState = payload;
      break;
    default:
      throw new Error(
        `Called favoritesReducer with invalid action.type: ${type}`
      );
  }
  localStorage.setItem(favoritesKey, JSON.stringify(updatedState));
  return updatedState;
};

export { timetableReducer, favoritesReducer, favoritesKey, timetablesKey };
