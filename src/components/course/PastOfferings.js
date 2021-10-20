import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import _ from "lodash";

import { fetchPastOfferings as fetch } from "../../utilities/data-scraper";
import {
  getYearLabel,
  extractInstructorsAndOccupancy,
} from "../../utilities/courseFormatter";
import { Loader } from "../Loader";

const PastOfferings = ({ courseCode, currSection, currSession }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const mounted = useRef(true);

  useEffect(() => {
    const search = async () => {
      const results = await fetch(courseCode, {
        session: currSession,
        section: currSection,
      });
      if (!mounted.current) return;
      setData(results);
    };

    const execute = () => {
      setLoading(true);
      search().then(() => setLoading(false));
    };

    mounted.current = true;
    execute();
    return () => {
      mounted.current = false;
    };
  }, [courseCode, currSession, currSection]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="sm">
      <Stack divider={<Divider />} spacing={2}>
        <Typography variant="h5">Past offerings</Typography>
        {!data || _.isEmpty(data) ? (
          <Typography variant="body2">
            This course code has no past offerings.
          </Typography>
        ) : (
          <List>
            {Object.entries(data)
              .reverse()
              .map(([k, v]) => (
                <Listing data={v} key={k} />
              ))}
          </List>
        )}
      </Stack>
    </Container>
  );
};

const Listing = ({ data }) => {
  const { session, code, section, meetings } = data;
  const [instructors, occupancy] = extractInstructorsAndOccupancy(meetings);

  const occupancyValue = occupancy ? Math.round(occupancy * 100) : 0;

  return (
    <ListItem disableGutters>
      <ListItemButton
        component={RouterLink}
        to={`/course/${session}/${section.toLowerCase()}/${code.toLowerCase()}`}
      >
        <Stack>
          <ListItemText primary={getYearLabel(session, section)} />
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
          >
            <Typography variant="caption">{`Occupancy: ${occupancyValue}%`}</Typography>
            <Typography variant="caption">{instructors}</Typography>
          </Stack>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export { PastOfferings };
