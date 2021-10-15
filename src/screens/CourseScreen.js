import { Container, Divider, Stack, Typography } from "@mui/material";

import { CourseMeetings as Meetings } from "../components/CourseMeetings";

const SectionSubheader = ({ subheader }) => (
  <Typography variant="h5" paragraph>
    {subheader}
  </Typography>
);

const Title = ({ title }) => {
  return <Typography variant="h4">{title}</Typography>;
};

const Description = ({ description }) => {
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

const CourseScreen = ({ data }) => {
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
  } = data;

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
        <Title title={courseTitle} />
        <Description description={courseDescription} />
        {Limitations()}
        {BreadthClassifications()}
        {AdditionalInstructions()}
        <Meetings data={meetings} />
      </Stack>
    </Container>
  );
};

export { CourseScreen };
