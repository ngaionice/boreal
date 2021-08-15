import React from "react";
import { Box, Typography } from "@material-ui/core";

import { useStyles } from "./Theme";

const InfoPanel = ({ courseData }) => {
  const classes = useStyles();

  if (Object.keys(courseData).length === 0) {
    return (
      <Typography variant="h5">
        Search for a course for data to show up here!
      </Typography>
    );
  }

  return (
    <Box
      flexDirection="column"
      className={classes.root}
      paddingX={5}
      paddingY={10}
    >
      <Typography variant="h4">
        {courseData.code}
        {courseData.section} — {courseData.courseTitle}
      </Typography>

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

export default InfoPanel;
