import {
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

const PastOfferings = ({ courseCode, currSection, currSession, mobile }) => {
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

  return (
    <Stack divider={mobile ? null : <Divider />} spacing={mobile ? 0 : 2}>
      <Typography variant="h5" paragraph={mobile}>
        Past offerings
      </Typography>
      <Content data={data} loading={loading} mobile={mobile} />
    </Stack>
  );
};

const Content = ({ data, loading, mobile }) => {
  if (!window.navigator.onLine) {
    return (
      <Typography variant="body2">
        Past offerings data is not available when offline.
      </Typography>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (!data || _.isEmpty(data)) {
    return (
      <Typography variant="body2">
        This course code has no past offerings.
      </Typography>
    );
  }

  return (
    <List dense={!mobile}>
      {Object.entries(data)
        .reverse()
        .map(([k, v]) => (
          <Listing data={v} key={k} />
        ))}
    </List>
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
