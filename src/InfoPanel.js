import React, { Fragment, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  Typography,
} from "@material-ui/core";

import { useStyles } from "./Theme";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";

const dateConverter = (date) => {
  switch (date) {
    case "MO":
      return "Mon";
    case "TU":
      return "Tue";
    case "WE":
      return "Wed";
    case "TH":
      return "Thu";
    case "FR":
      return "Fri";
    default:
      return (
        date +
        ": this date is unformatted; please report this to the developer."
      );
  }
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

const InfoCard = ({ title, subtitle, children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined">
      <CardHeader
        action={
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={<Typography variant="h6">{title}</Typography>}
        subheader={<Typography variant="body1">{subtitle}</Typography>}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{children}</CardContent>
      </Collapse>
    </Card>
  );
};

const MeetingCard = ({ sectionCode, meetingData }) => {
  const classes = useStyles();

  const instructorNames = (namesObject) => {
    if (_.isEmpty(namesObject)) return "Not available yet";
    let string = "";
    for (const [, value] of Object.entries(namesObject)) {
      string += value.firstName;
      string += ". ";
      string += value.lastName;
      string += ", ";
    }
    return string.substring(0, string.length - 2);
  };

  const spotsLeft =
    Number(meetingData.enrollmentCapacity) -
    Number(meetingData.actualEnrolment);
  const waitlist = Number(meetingData.actualWaitlist);
  const capacityString =
    (spotsLeft > 0
      ? "Remaining spots: " + String(spotsLeft)
      : meetingData.waitlist === "Y"
      ? "Waitlist size: " + String(waitlist)
      : "Full, no waitlisting allowed") +
    ` (capacity: ${meetingData.enrollmentCapacity})`;

  const ScheduleSections = ({ schedule }) => {
    return (
      <Grid container>
        <Typography variant="body1">Schedule:</Typography>
        {Object.entries(schedule).map((obj) => {
          const val = obj[1];
          return (
            <Grid item xs={12}>
              <Typography variant="body1">{`${dateConverter(val.meetingDay)} ${
                val.meetingStartTime
              }-${val.meetingEndTime}`}</Typography>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Card variant="outlined" className={classes.gridItem}>
      <CardHeader
        title={
          <Typography variant="h6" color={spotsLeft > 0 ? "initial" : "error"}>
            {sectionCode}
          </Typography>
        }
        subheader={
          <Fragment>
            <Typography variant="body1">{capacityString}</Typography>
            {meetingData.online !== null ? (
              <Typography variant="body1">
                {`Delivery mode: ${meetingData.online}`}
              </Typography>
            ) : null}
          </Fragment>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">{`Instructor(s): ${instructorNames(
              meetingData.instructors
            )}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <ScheduleSections schedule={meetingData.schedule} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const MainPanel = ({ courseData, selectedIndex }) => {
  return (
    <Fragment>
      <TabPanel value={selectedIndex} index={0}>
        <InfoPanel courseData={courseData} />
      </TabPanel>
      <TabPanel value={selectedIndex} index={1}>
        <MeetingPanel courseData={courseData} />
      </TabPanel>
    </Fragment>
  );
};

const InfoPanel = ({ courseData }) => {
  const classes = useStyles();

  if (Object.keys(courseData).length === 0) {
    return (
      <Typography variant="h6">
        Search for a course for data to show up here!
      </Typography>
    );
  }

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h4">{courseData.courseTitle}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: courseData.courseDescription,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <InfoCard
          title="Additional course information:"
          subtitle="Pre/co-requisites, exclusions and recommended preparation"
        >
          <Fragment>
            <Typography variant="body2" paragraph>
              {`Pre-requisites: ${
                courseData.prerequisite ? courseData.prerequisite : "N/A"
              }`}
            </Typography>

            <Typography variant="body2" paragraph>
              {`Co-requisites: ${
                courseData.corequisite ? courseData.corequisite : "N/A"
              }`}
            </Typography>

            <Typography variant="body2" paragraph>
              {`Exclusions: ${
                courseData.exclusion ? courseData.exclusion : "N/A"
              }`}
            </Typography>

            <Typography variant="body2">
              {`Recommended preparation: ${
                courseData.recommendedPreparation
                  ? courseData.recommendedPreparation
                  : "N/A"
              }`}
            </Typography>
          </Fragment>
        </InfoCard>
      </Grid>

      <Grid item xs={12}>
        <InfoCard title={"Breadth & distribution classifications:"}>
          <Typography variant="body2" paragraph>
            {`Breadth categories: ${courseData.breadthCategories}`}
          </Typography>

          <Typography variant="body2" paragraph>
            {`Distribution categories: ${
              courseData.distributionCategories
                ? courseData.distributionCategories
                : "N/A"
            }`}
          </Typography>
        </InfoCard>
      </Grid>
      {courseData.webTimetableInstructions ? (
        <Grid item xs={12}>
          <InfoCard title={"Timetable instructions:"}>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{
                __html: courseData.webTimetableInstructions,
              }}
            />
          </InfoCard>
        </Grid>
      ) : null}

      {courseData.deliveryInstructions ? (
        <Grid item xs={12}>
          <InfoCard title={"Delivery instructions:"}>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{
                __html: courseData.deliveryInstructions,
              }}
            />
          </InfoCard>
        </Grid>
      ) : null}
    </Grid>
  );
};

const MeetingPanel = ({ courseData }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {Object.keys(courseData.meetings).map((key) => {
          return (
            <Grid item xs={12} md={6} lg={3}>
              <MeetingCard
                sectionCode={key}
                meetingData={courseData.meetings[key]}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export { MainPanel as InformationPanel };
