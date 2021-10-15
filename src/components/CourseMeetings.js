import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import {
  formatCapacity,
  formatDeliveryMode,
  formatInstructors,
  formatSessionInfo,
} from "../utilities";

const MeetingListing = ({ meeting, onClick }) => {
  const {
    schedule,
    instructors,

    teachingMethod, // LEC, TUT, PRA
    sectionNumber,

    enrollmentCapacity,
    actualEnrolment,
    actualWaitlist,
    waitlist, // Y, N

    deliveryMode, // CLASS, ONLSYNC, ONLASYNC

    enrollmentIndicator, // P, E, AE, PE, R1, R2
    // enrollmentControls,

    cancel,
  } = meeting;

  const ListItemSecondary = () => {
    if (cancel) {
      return <Typography variant="body2">Cancelled</Typography>;
    }

    return (
      <Stack
        spacing={1}
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Typography variant="body2">
          {formatCapacity(
            enrollmentCapacity,
            actualEnrolment,
            actualWaitlist,
            waitlist
          )}
        </Typography>

        <Typography variant="body2">
          {formatDeliveryMode(deliveryMode)}
        </Typography>

        <Typography variant="body2">
          {formatInstructors(instructors)}
        </Typography>

        {Object.entries(schedule).map(([k, v]) => {
          if (k === "-") return null;
          return (
            <Typography variant="body2">
              {formatSessionInfo(v, false)}
            </Typography>
          );
        })}

        <Typography variant="body2">{enrollmentIndicator}</Typography>
      </Stack>
    );
  };

  return (
    <ListItem disableGutters>
      <ListItemButton onClick={onClick}>
        <ListItemText
          primary={`${teachingMethod + sectionNumber}`}
          secondary={<ListItemSecondary />}
        />
      </ListItemButton>
    </ListItem>
  );
};

const MeetingListings = ({ data, onListEntryClick }) => (
  <List dense>
    {Object.entries(data).map(([, v]) => {
      return <MeetingListing meeting={v} onClick={onListEntryClick} />;
    })}
  </List>
);

const CourseMeetings = ({ data }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!data) {
    return null;
  }

  const entryClick = () => {
    setDialogOpen(true);
  };

  return (
    <Stack>
      <Typography variant="h5" paragraph>
        Meeting Sections
      </Typography>
      <MeetingListings data={data} onListEntryClick={entryClick} />
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>test title</DialogTitle>
        <DialogContent>test content</DialogContent>
      </Dialog>
    </Stack>
  );
};

export { CourseMeetings };
