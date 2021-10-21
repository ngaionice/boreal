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
import { formatDate } from "../utilities/courseFormatter";
import { getSearchInstance } from "../utilities/fetcher";
import { Loader } from "../components/Loader";
import { PastOfferings } from "../components/course/PastOfferings";

const CourseScreen = ({
  currDisplayedDataControl,
  currFetchedData,
  favorites,
}) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [currDisplayedData, setCurrDisplayedData] = currDisplayedDataControl;
  const online = useRef(true);

  const themeFunction = useTheme();
  const pastOfferingsOnSide = useMediaQuery(
    themeFunction.breakpoints.down("lg")
  );

  // summary: try to load from current data, if not then
  // 1) if offline: try to load from favs
  // 2) if online: fetch from api
  // then push to curr displayed data
  useEffect(() => {
    const pathSplit = location.pathname
      .replace("/course", "")
      .toUpperCase()
      .split("/")
      .filter((val) => val);

    if (pathSplit.length !== 3) {
      setCurrDisplayedData({});
      setLoading(false);
    }

    const code = pathSplit[2],
      section = pathSplit[1],
      session = pathSplit[0];
    const currDisplayedId = `${code}-${section}-${session}`;

    if (currFetchedData.hasOwnProperty(currDisplayedId)) {
      setCurrDisplayedData(currFetchedData[currDisplayedId]);
      setLoading(false);
    } else {
      setLoading(true);
      if (!window.navigator.onLine) {
        online.current = false;
        if (favorites.hasOwnProperty(currDisplayedId)) {
          setCurrDisplayedData(favorites[currDisplayedId]);
        } else {
          setCurrDisplayedData({});
        }
        setLoading(false);
        return;
      }
      const retrievedOn = new Date();
      getSearchInstance()
        .get(`${session}/courses/`, {
          params: { code, section },
        })
        .then((res) => {
          setCurrDisplayedData(
            !res.data[currDisplayedId]
              ? {}
              : {
                  ...res.data[currDisplayedId],
                  updated: retrievedOn,
                }
          );
          setLoading(false);
        })
        .catch(() => {
          setCurrDisplayedData({});
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [location]);

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
            <Meetings data={meetings} />
            {pastOfferingsOnSide ? (
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

      {pastOfferingsOnSide ? null : (
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

export { CourseScreen };
