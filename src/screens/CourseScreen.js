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
import { fetchPastOfferings as fetchHistoricalData } from "../utilities/data-scraper";

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
  const [loadingHistorical, setLoadingHistorical] = useState(true);
  const [historicalData, setHistoricalData] = useState({});
  const online = useRef(true);
  const pathname = useRef("");

  const themeFunction = useTheme();
  const singleColumn = useMediaQuery(themeFunction.breakpoints.down("lg"));

  // summary: on url change, try to load from current data, if not then
  // 1) if offline: try to load from favorites
  // 2) if online: fetch from api
  // then push to curr displayed data
  useEffect(() => {
    if (location.pathname === pathname.current) {
      setLoading(false);
      setLoadingHistorical(false);
      return;
    }

    pathname.current = location.pathname;
    setCurrDisplayedData({});
    setHistoricalData({});
    online.current = window.navigator.onLine;
    const pathData = pathnameSplitter(location.pathname);

    const setCurrentData = async () => {
      if (pathData.length !== 3) {
        throw new Error("Invalid URL.");
      } else {
        const [session, section, code] = pathData;
        const currDisplayedId = `${code}-${section}-${session}`;

        if (currFetchedData.hasOwnProperty(currDisplayedId)) {
          setCurrDisplayedData(currFetchedData[currDisplayedId]);
        } else if (online.current) {
          await fetchAndSetDisplayedData(pathData, setCurrDisplayedData);
        } else {
          if (favorites.hasOwnProperty(currDisplayedId)) {
            setCurrDisplayedData(favorites[currDisplayedId]);
          } else {
            throw new Error("Offline and not favorited.");
          }
        }
        return [session, section, code];
      }
    };

    const setPastOfferingsData = async ([session, section, code]) => {
      const results = await fetchHistoricalData(code, {
        session,
        section,
      });
      setHistoricalData(results);
    };

    setCurrentData()
      .then(async (info) => {
        setLoading(false);
        await setPastOfferingsData(info);
      })
      .then(() => setLoadingHistorical(false))
      .catch(() => {
        setLoading(false);
        setLoadingHistorical(false);
      });

    return () => {
      setLoading(true);
      setLoadingHistorical(true);
    };
  }, [location, setCurrDisplayedData, currFetchedData, favorites]);

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
                data={historicalData}
                loading={loadingHistorical}
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
              data={historicalData}
              loading={loadingHistorical}
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
