import { Stack, Typography } from "@mui/material";

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

const Description = ({ description }) => {
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

const Limitations = ({
  prerequisite,
  corequisite,
  exclusion,
  recommendedPreparation,
}) => {
  if (!prerequisite && !corequisite && !exclusion && !recommendedPreparation) {
    return null;
  }

  return (
    <Stack spacing={1}>
      <SectionSubheader subheader="Enrollment limitations" />
      <Prerequisites prerequisite={prerequisite} />
      <Corequisites corequisite={corequisite} />
      <Exclusions exclusion={exclusion} />
      <RecommendedPreparation recommendedPreparation={recommendedPreparation} />
    </Stack>
  );
};

const BreadthClassifications = ({
  breadthCategories,
  distributionCategories,
}) => {
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

const AdditionalInstructions = ({
  webTimetableInstructions,
  deliveryInstructions,
}) => {
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

export {
  Title,
  Description,
  Limitations,
  BreadthClassifications,
  AdditionalInstructions,
};
