import React, { Fragment } from "react";
import { Box, Typography } from "@material-ui/core";

import { useStyles } from "./Theme";

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
    <Box flexDirection="column" className={classes.root}>
      <Typography variant="h4">{courseData.courseTitle}</Typography>

      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: courseData.courseDescription,
        }}
      />

      <Typography variant="h5">Additional course information:</Typography>
      {courseData.prerequisite ? (
        <Typography variant="body1">
          {`Pre-requisites: ${courseData.prerequisite}`}
        </Typography>
      ) : null}

      {courseData.corequisite ? (
        <Typography variant="body1">
          {`Co-requisites: ${courseData.corequisite}`}
        </Typography>
      ) : null}

      {courseData.recommendedPreparation ? (
        <Typography variant="body1">
          {`Recommended preparation: ${courseData.recommendedPreparation}`}
        </Typography>
      ) : null}

      <Typography variant="body1">
        {`Breadth categories: ${courseData.breadthCategories}`}
      </Typography>

      <Typography variant="body1">
        {`Distribution categories: ${courseData.distributionCategories}`}
      </Typography>
    </Box>
  );
};

const MeetingPanel = ({ courseData }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box flexDirection="column">
        {Object.keys(courseData.meetings).map((v) => {
          return <div>{v}</div>;
        })}
      </Box>
    </div>
  );
};

export { MainPanel as InformationPanel };
