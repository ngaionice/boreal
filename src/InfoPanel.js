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

function TabPanel(props) {
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
}

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
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        title={<Typography variant="h6">{sectionCode}</Typography>}
        subheader={
          <Typography variant="body1">{`Instructor: ${instructorNames(
            meetingData.instructors
          )}`}</Typography>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>hi</Typography>
        </CardContent>
      </Collapse>
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
      <Grid container xs={12} spacing={1}>
        {Object.keys(courseData.meetings).map((key) => {
          return (
            <Grid item xs={12}>
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
