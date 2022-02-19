import _ from "lodash";

const formatDayOfWeek = (date, full) => {
  switch (date) {
    case "MO":
      return full ? "Mon" : "M";
    case "TU":
      return full ? "Tue" : "T";
    case "WE":
      return full ? "Wed" : "W";
    case "TH":
      return full ? "Thu" : "R";
    case "FR":
      return full ? "Fri" : "F";
    default:
      return null;
  }
};

const formatInstructors = (instructors) => {
  if (_.isEmpty(instructors)) return "TBA";
  let string = "";
  Object.entries(instructors).forEach(([, value]) => {
    const { lastName, firstName } = value;
    string += firstName + ". " + lastName + ", ";
  });
  return string.substring(0, string.length - 2);
};

const formatLocation = (assignedRoom1, assignedRoom2) => {
  // both rooms N/A
  if (!assignedRoom1 && !assignedRoom2) {
    return "TBA";
  }

  // both rooms are used
  if (assignedRoom1 && assignedRoom2) {
    if (assignedRoom1 === assignedRoom2) {
      return assignedRoom1;
    }
    return assignedRoom1 + "/" + assignedRoom2;
  }

  // only 1 room is used
  return assignedRoom1 ? assignedRoom1 : assignedRoom2;
};

const formatSessionInfo = (meetingSession, full) => {
  const {
    meetingDay,
    meetingStartTime,
    meetingEndTime,
    assignedRoom1,
    assignedRoom2,
  } = meetingSession;

  const date = formatDayOfWeek(meetingDay, full);

  const time = full
    ? meetingStartTime + " – " + meetingEndTime
    : meetingStartTime.replace(":", "") + "–" + meetingEndTime.replace(":", "");

  if (!full) {
    return date + " " + time;
  }

  const room = formatLocation(assignedRoom1, assignedRoom2);
  return date + " " + time + " " + (full ? "at " : "") + room;
};

const formatCapacity = (capacity, enrollment, waitlist, waitlistable, full) => {
  const spotsLeft = Number(capacity) - Number(enrollment);

  if (!full) {
    if (spotsLeft > 0) return "Available: " + spotsLeft;
    if (!waitlistable) return "Full, no waitlisting";
    return "Waitlist: " + waitlist;
  }

  if (spotsLeft > 0)
    return `Remaining capacity: ${spotsLeft + " out of " + capacity}`;
  if (!waitlistable) return `Full, no waitlisting. (capacity: ${capacity})`;
  return `Waitlist: ${waitlist} (capacity: ${capacity})`;
};

const formatDeliveryMode = (deliveryMode, full) => {
  switch (deliveryMode) {
    case "CLASS":
    case "INPER":
      return "In person";
    case "ONLSYNC":
      return full ? "Online — Synchronous" : "Online Sync";
    case "ONLASYNC":
      return full ? "Online — Asynchronous" : "Online Async";
    case "ONL":
      return "Online";
    default:
      return null;
  }
};

const formatPriorityGroup = (groupData) => {
  // note that restrictedGroup can be undefined
  const { postCode, postName, restrictedGroup } = groupData;
  const group = restrictedGroup ? `Group ${restrictedGroup} — ` : "";
  if (postCode && postName) return group + postCode + " " + postName;

  const {
    yearOfStudy,
    primaryOrgName,
    secondaryOrgName,
    assocOrgName,
    adminOrgName,
  } = groupData;

  const year =
    !yearOfStudy || yearOfStudy === "*" ? "" : `Year ${yearOfStudy} `;
  const dept = adminOrgName
    ? adminOrgName
    : secondaryOrgName
    ? secondaryOrgName
    : "";

  const college = assocOrgName ? assocOrgName : "";
  const faculty = primaryOrgName
    ? primaryOrgName + (year + (dept ? dept : college) ? ": " : "")
    : "";

  return group + faculty + year + (dept ? dept : college);
};

const getPriorityCodeDescription = (code) => {
  switch (code) {
    case "P":
      return "Some students are given priority access until a specific date.";
    case "E":
      return "Students must contact the sponsoring Department to enrol.";
    case "AE":
      return "Students must request enrolment on ACORN and await Departmental review of their request.";
    case "PE":
      return "Some students are given priority access until a specific date, after which time another group of students is also able to enrol by contacting the sponsoring Department.";
    case "R1":
      return "Course/section is restricted at all times for specific students.";
    case "R2":
      return "Course/section is restricted to a group of students until a specific date, after which time another group of students is also able to enrol.";
    default:
      return "";
  }
};

const formatDate = (date) => {
  if (!date) {
    return null;
  }
  const sections = date.toString().split(" ");
  return `${sections[1]} ${sections[2]} ${sections[3]} ${sections[4]} ${sections[6]} ${sections[7]} ${sections[8]}`;
};

const getYearLabel = (session, section) => {
  const seasonLabel = session.substring(4);
  section = section.toLowerCase();

  const year =
    (seasonLabel === "9" && section === "f") || seasonLabel === "5"
      ? session.substring(2, 4)
      : Number(session.substring(2, 4)) + 1;
  let season;
  if (seasonLabel === "9") {
    if (section === "f") {
      season = "Fall";
    } else if (section === "s") {
      season = "Winter";
    } else {
      season = "Year-long";
    }
  } else {
    season = "Summer ";
    season +=
      section === "f"
        ? "(1st half)"
        : section === "s"
        ? "(2nd half)"
        : "(full session)";
  }

  return `'${year} ${season}`;
};

const extractInstructorsAndOccupancy = (meetings) => {
  const lectures = Object.entries(meetings).filter(
    ([, v]) => v["teachingMethod"] === "LEC"
  );

  const instructorsSet = new Set();
  const instructors = [];
  let ratio = 0;
  lectures.forEach(([, v]) => {
    Object.entries(v["instructors"]).forEach(([, instructor]) => {
      const name = `${instructor["firstName"]}. ${instructor["lastName"]}`;
      if (!instructorsSet.has(name)) {
        instructors.push(name);
        instructorsSet.add(name);
      }
    });
    if (!v["cancel"] && Number(v["enrollmentCapacity"] > 0)) {
      ratio += Number(v["actualEnrolment"]) / Number(v["enrollmentCapacity"]);
    }
  });

  return [
    instructors
      .sort((a, b) => (a.split(" ")[1] > b.split(" ")[1] ? 1 : -1))
      .join(", "),
    lectures.length !== 0 ? ratio / lectures.length : 0,
  ];
};

export {
  formatDate,
  formatDeliveryMode,
  formatInstructors,
  formatCapacity,
  formatPriorityGroup,
  formatSessionInfo,
  getPriorityCodeDescription,
  getYearLabel,
  extractInstructorsAndOccupancy,
};
