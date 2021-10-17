import _ from "lodash";

const formatDate = (date, full) => {
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

  const date = formatDate(meetingDay, full);

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
      return "In person";
    case "ONLSYNC":
      return full ? "Online — Synchronous" : "Online Sync";
    case "ONLASYNC":
      return full ? "Online — Asynchronous" : "Online Async";
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
  const faculty = primaryOrgName ? primaryOrgName + ": " : "";
  const dept = adminOrgName
    ? adminOrgName
    : secondaryOrgName
    ? secondaryOrgName
    : "";

  const college = assocOrgName ? assocOrgName : "";

  return group + faculty + year + (dept ? dept : college);
};

const getPriorityCodeDescription = (code) => {
  switch (code) {
    case "P":
      return "Priority: Some students are given priority access until a specific date.";
    case "E":
      return "Enrol at Department: Students must contact the sponsoring Department to enrol.";
    case "AE":
      return "Department Approval Required: Students must request enrolment on ACORN and await Departmental review of their request.";
    case "PE":
      return "Priority, then Enrol at Department: Some students are given priority access until a specific date, after which time another group of students is also able to enrol by contacting the sponsoring Department.";
    case "R1":
      return "Restricted: Course/section is restricted at all times for specific students.";
    case "R2":
      return "Restricted: Course/section is restricted to a group of students until a specific date, after which time another group of students is also able to enrol.";
    default:
      return "";
  }
};

export {
  formatDeliveryMode,
  formatInstructors,
  formatCapacity,
  formatPriorityGroup,
  formatSessionInfo,
  getPriorityCodeDescription,
};