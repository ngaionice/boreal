import _ from "lodash";

const formatDate = (date) => {
  switch (date) {
    case "MO":
      return "M";
    case "TU":
      return "T";
    case "WE":
      return "W";
    case "TH":
      return "R";
    case "FR":
      return "F";
    default:
      return null;
  }
};

const formatInstructors = (instructors) => {
  if (_.isEmpty(instructors)) return "TBA";
  let string = "";
  Object.entries(instructors).forEach(([, value]) => {
    string += value.firstName + ". " + value.lastName + ", ";
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

const formatSessionInfo = (meetingSession, fullForm) => {
  const {
    meetingDay,
    meetingStartTime,
    meetingEndTime,
    assignedRoom1,
    assignedRoom2,
  } = meetingSession;

  const date = formatDate(meetingDay);

  const time =
    meetingStartTime.replace(":", "") + "-" + meetingEndTime.replace(":", "");

  if (!fullForm) {
    return date + " " + time;
  }

  const room = formatLocation(assignedRoom1, assignedRoom2);
  return date + " " + time + " " + room;
};

const formatCapacity = (
  enrollmentCapacity,
  actualEnrolment,
  actualWaitlist,
  waitlistable
) => {
  const spotsLeft = Number(enrollmentCapacity) - Number(actualEnrolment);

  if (spotsLeft > 0) return "Available: " + spotsLeft;

  if (!waitlistable) return "Full, no waitlisting";

  return "Waitlist: " + actualWaitlist;
};

const formatDeliveryMode = (deliveryMode) => {
  switch (deliveryMode) {
    case "CLASS":
      return "In person";
    case "ONLSYNC":
      return "Online Sync";
    case "ONLASYNC":
      return "Online Async";
    default:
      return null;
  }
};

export {
  formatDeliveryMode,
  formatInstructors,
  formatCapacity,
  formatSessionInfo,
};
