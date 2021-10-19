import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

const CourseScreen = ({
  currDisplayedDataControl,
  currFetchedData,
  favorites,
}) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [currDisplayedData, setCurrDisplayedData] = currDisplayedDataControl;

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
        if (favorites.hasOwnProperty(currDisplayedId)) {
          setCurrDisplayedData(favorites[currDisplayedId]);
          setLoading(false);
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (loading) {
    return <Loader />;
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
    <Container maxWidth="lg">
      <Stack spacing={3} divider={<Divider />}>
        <Title title={courseTitle} retrievedOn={formatDate(updated)} />
        {Description({ courseDescription })}
        {Limitations({
          prerequisite,
          corequisite,
          exclusion,
          recommendedPreparation,
        })}
        {BreadthClassifications({ breadthCategories, distributionCategories })}
        {AdditionalInstructions({
          webTimetableInstructions,
          deliveryInstructions,
        })}
        <Meetings data={meetings} />
      </Stack>
    </Container>
  );
};

export { CourseScreen };
