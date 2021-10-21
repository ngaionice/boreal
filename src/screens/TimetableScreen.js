import { Container, Typography } from "@mui/material";

const TimetableScreen = ({ timetablesControl }) => {
  const { timetables, updateTimetables } = timetablesControl;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Work in progress, check back soon.</Typography>
    </Container>
  );
};

export { TimetableScreen };
