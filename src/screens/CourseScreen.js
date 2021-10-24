import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";

import {
  Title,
  Description,
  Limitations,
  BreadthClassifications,
  AdditionalInstructions,
} from "../components/course/CourseInformation";
import { CourseMeetings as Meetings } from "../components/course/CourseMeetings";
import { Loader } from "../components/Loader";
import { PastOfferings } from "../components/course/PastOfferings";

import { formatDate } from "../utilities/courseFormatter";
import { fetchAndSetDisplayedData } from "../utilities/fetcher";

const CourseScreen = ({
  currDisplayedData,
  setCurrDisplayedData,
  currFetchedData,
  favorites,
  timetable,
  dispatchTimetable,
}) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const online = useRef(true);

  const themeFunction = useTheme();
  const singleColumn = useMediaQuery(themeFunction.breakpoints.down("lg"));

  // summary: on url change, try to load from current data, if not then
  // 1) if offline: try to load from favorites
  // 2) if online: fetch from api
  // then push to curr displayed data
  useEffect(() => {
    online.current = window.navigator.onLine;
    const pathData = pathnameSplitter(location.pathname);

    if (pathData.length !== 3) {
      setCurrDisplayedData({});
      setLoading(false);
    } else {
      const [session, section, code] = pathData;
      const currDisplayedId = `${code}-${section}-${session}`;

      if (currFetchedData.hasOwnProperty(currDisplayedId)) {
        setCurrDisplayedData(currFetchedData[currDisplayedId]);
        setLoading(false);
      } else if (online.current) {
        fetchAndSetDisplayedData(pathData, setCurrDisplayedData).then(() =>
          setLoading(false)
        );
      } else {
        if (favorites.hasOwnProperty(currDisplayedId)) {
          setCurrDisplayedData(favorites[currDisplayedId]);
        } else {
          setCurrDisplayedData({});
        }
        setLoading(false);
      }
    }

    return () => {
      setCurrDisplayedData({});
      setLoading(true);
    };
  }, [location, setCurrDisplayedData]);

  if (loading) {
    return <Loader />;
  }

  if (!online.current && _.isEmpty(currDisplayedData)) {
    return (
      <Typography>
        You are currently offline. Please try again later.
      </Typography>
    );
  }

  if (Object.keys(currDisplayedData).length === 0) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center">
          <Typography variant="h4">
            Invalid URL. Perhaps you visited a broken link?
          </Typography>
        </Box>
      </Container>
    );
  }

  const {
    code,
    section,
    session,
    courseTitle,
    courseDescription,
    prerequisite,
    corequisite,
    exclusion,
    recommendedPreparation,
    breadthCategories,
    distributionCategories,
    webTimetableInstructions,
    deliveryInstructions,
    meetings,
    updated,
  } = currDisplayedData;

  return (
    <Grid container>
      <Grid item xs={12} lg={9}>
        <Container maxWidth="lg">
          <Stack spacing={3} divider={<Divider />}>
            <Title title={courseTitle} retrievedOn={formatDate(updated)} />
            {Description({ description: courseDescription })}
            {Limitations({
              prerequisite,
              corequisite,
              exclusion,
              recommendedPreparation,
            })}
            {BreadthClassifications({
              breadthCategories,
              distributionCategories,
            })}
            {AdditionalInstructions({
              webTimetableInstructions,
              deliveryInstructions,
            })}
            <Meetings
              data={meetings}
              timetable={timetable}
              dispatchTimetable={dispatchTimetable}
              section={section}
              session={session}
              code={code}
            />
            {singleColumn ? (
              <PastOfferings
                courseCode={code}
                currSection={section}
                currSession={session}
                mobile={true}
              />
            ) : null}
          </Stack>
        </Container>
      </Grid>

      {singleColumn ? null : (
        <Grid item xs={12} lg={3}>
          <Container maxWidth="sm">
            <PastOfferings
              courseCode={code}
              currSection={section}
              currSession={session}
              mobile={false}
            />
          </Container>
        </Grid>
      )}
    </Grid>
  );
};

const pathnameSplitter = (pathname) =>
  pathname
    .replace("/course", "")
    .toUpperCase()
    .split("/")
    .filter((val) => val);

export { CourseScreen };
