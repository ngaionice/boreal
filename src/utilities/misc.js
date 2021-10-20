import _ from "lodash";

import { years } from "./searchOptions";

const getPageTitle = (pathname, currDisplayedCourse, mobile) => {
  if (pathname === "/search") {
    return "Search";
  } else if (pathname === "/favorites") {
    return "Favorites";
  } else if (pathname === "/timetable") {
    return "Timetable";
  } else if (pathname === "/settings") {
    return "Settings";
  } else if (pathname.startsWith("/course")) {
    if (_.isEmpty(currDisplayedCourse)) return "";
    if (currDisplayedCourse.session !== _.last(years).value) {
      const session = years.filter(
        (obj) => obj.value === currDisplayedCourse.session
      );
      return `${currDisplayedCourse.code}${currDisplayedCourse.section} (${
        !mobile ? "Session: " : ""
      }${
        !_.isEmpty(session)
          ? session[0].short_label
          : currDisplayedCourse.session
      })`;
    }
    return `${currDisplayedCourse.code}${currDisplayedCourse.section}`;
  } else {
    return "Boreal";
  }
};

export { getPageTitle };
