import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { CourseMeetings as Meetings } from "../components/CourseMeetings";
import { formatDate } from "../utilities/courseFormatter";
import { getSearchInstance } from "../utilities/fetcher";
import { Loader } from "../components/Loader";

const CourseScreen = ({ currDisplayedDataControl, currFetchedData }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [currDisplayedData, setCurrDisplayedData] = currDisplayedDataControl;

  useEffect(() => {
    const pathSplit = location.pathname
      .replace("/course", "")
      .toUpperCase()
      .split("/")
      .filter((val) => val);

    const currDisplayedId = `${pathSplit[2]}-${pathSplit[1]}-${pathSplit[0]}`;

    if (currFetchedData.hasOwnProperty(currDisplayedId)) {
      setCurrDisplayedData(currFetchedData[currDisplayedId]);
      setLoading(false);
    } else {
      setLoading(true);
      const [code, section, session] = currDisplayedId.split("-");
      const retrievedOn = new Date();
      getSearchInstance({ code, section, session })
        .get("")
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
        });
    }
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

  const Limitations = () => {
    if (
      !prerequisite &&
      !corequisite &&
      !exclusion &&
      !recommendedPreparation
    ) {
      return null;
    }

    return (
      <Stack spacing={1}>
        <SectionSubheader subheader="Enrollment limitations" />
        <Prerequisites prerequisite={prerequisite} />
        <Corequisites corequisite={corequisite} />
        <Exclusions exclusion={exclusion} />
        <RecommendedPreparation
          recommendedPreparation={recommendedPreparation}
        />
      </Stack>
    );
  };

  const BreadthClassifications = () => {
    if (!breadthCategories && !distributionCategories) {
      return null;
    }

    return (
      <Stack spacing={1}>
        <SectionSubheader subheader="Breadth classifications" />
        <Breadth breadthCategories={breadthCategories} />
        <Distribution distributionCategories={distributionCategories} />
      </Stack>
    );
  };

  const AdditionalInstructions = () => {
    if (!webTimetableInstructions && !deliveryInstructions) {
      return null;
    }

    return (
      <Stack spacing={1}>
        <SectionSubheader subheader="Additional instructions" />
        <TimetableInstructions
          webTimetableInstructions={webTimetableInstructions}
        />
        <DeliveryInstructions deliveryInstructions={deliveryInstructions} />
      </Stack>
    );
  };

  return (
    <Container maxWidth="lg">
      <Stack spacing={3} divider={<Divider />}>
        <Title title={courseTitle} retrievedOn={formatDate(updated)} />
        {Description(courseDescription)}
        {Limitations()}
        {BreadthClassifications()}
        {AdditionalInstructions()}
        <Meetings data={meetings} />
      </Stack>
    </Container>
  );
};

const SectionSubheader = ({ subheader }) => (
  <Typography variant="h5" paragraph>
    {subheader}
  </Typography>
);

const Title = ({ title, retrievedOn }) => {
  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body2">{`Retrieved on ${retrievedOn}`}</Typography>
    </>
  );
};

const Description = (description) => {
  if (!description) {
    return null;
  }

  return (
    <Typography
      variant="body1"
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  );
};

const Prerequisites = ({ prerequisite }) => {
  if (!prerequisite) {
    return null;
  }

  return (
    <Typography variant="body1">{`Pre-requisites: ${prerequisite}`}</Typography>
  );
};

const Corequisites = ({ corequisite }) => {
  if (!corequisite) {
    return null;
  }

  return (
    <Typography variant="body1">{`Co-requisites: ${corequisite}`}</Typography>
  );
};

const Exclusions = ({ exclusion }) => {
  if (!exclusion) {
    return null;
  }

  return <Typography variant="body1">{`Exclusions: ${exclusion}`}</Typography>;
};

const RecommendedPreparation = ({ recommendedPreparation }) => {
  if (!recommendedPreparation) {
    return null;
  }

  return (
    <Typography variant="body1">{`Recommended preparation: ${recommendedPreparation}`}</Typography>
  );
};

const Breadth = ({ breadthCategories }) => {
  if (!breadthCategories) {
    return null;
  }

  return (
    <Typography variant="body1">{`Breadth categories: ${breadthCategories}`}</Typography>
  );
};

const Distribution = ({ distributionCategories }) => {
  if (!distributionCategories) {
    return null;
  }

  return (
    <Typography variant="body1">{`Distribution categories: ${distributionCategories}`}</Typography>
  );
};

const TimetableInstructions = ({ webTimetableInstructions }) => {
  if (!webTimetableInstructions) {
    return null;
  }

  return (
    <>
      <Typography variant="body1">Timetable instructions:</Typography>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: webTimetableInstructions,
        }}
      />
    </>
  );
};

const DeliveryInstructions = ({ deliveryInstructions }) => {
  if (!deliveryInstructions) {
    return null;
  }

  return (
    <>
      <Typography variant="body1">Delivery instructions:</Typography>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: deliveryInstructions,
        }}
      />
    </>
  );
};

export { CourseScreen };
