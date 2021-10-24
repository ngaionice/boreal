import {
  Autocomplete,
  Card,
  Container,
  Divider,
  TextField,
  Grid,
  List,
  Stack,
  Typography,
  CardContent,
  CardActions,
  IconButton,
  Collapse,
  Tooltip,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

import {
  breadth,
  daytime,
  deliveryModes,
  departments,
  sections,
  studyYears,
  weekdays,
  years,
} from "../utilities/searchOptions";

const SearchScreen = ({ currFetchedData, setCurrFetchedData }) => {
  return (
    <Container maxWidth="lg">
      <Stack spacing={3} divider={<Divider />}>
        <Typography variant="h4">Search</Typography>
        <SearchOptions setCurrFetchedData={setCurrFetchedData} />
        <SearchResults currFetchedData={currFetchedData} />
      </Stack>
    </Container>
  );
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  marginRight: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const SearchOptions = ({ setCurrFetchedData }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded(!expanded);
  return (
    <Card elevation={0}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Course title" fullWidth />
          </Grid>
          <Grid item xs={12} sm={3} lg={4}>
            <TextField label="Course code" fullWidth />
          </Grid>
          <Grid item xs={12} sm={9} lg={8}>
            <Autocomplete
              multiple
              options={sections}
              getOptionLabel={(option) => option.label}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Section(s)" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={departments}
              getOptionLabel={(option) => option.label}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Offering department(s)" />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Collapse in={expanded}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Advanced options</Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Autocomplete
                multiple
                options={studyYears}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Course level(s)" />
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Instructor's last name" fullWidth />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Autocomplete
                multiple
                options={weekdays}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Day(s) of week" />
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Autocomplete
                multiple
                options={daytime}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Time(s) of day" />
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Autocomplete
                multiple
                options={breadth}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Breadth requirement(s)" />
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Autocomplete
                options={years}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Offering year" />
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Autocomplete
                multiple
                options={deliveryModes}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Delivery modes (lectures)" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControlLabel control={<Checkbox />} label={"Online only"} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControlLabel
                control={<Checkbox />}
                label={"Meetings with space only"}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControlLabel
                control={<Checkbox />}
                label={"Waitlistable courses only"}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControlLabel
                control={<Checkbox />}
                label={"First-year foundations courses"}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      <CardActions sx={{ justifyContent: "center", alignItems: "center" }}>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Tooltip title={`${expanded ? "Hide" : "Show"} advanced options`}>
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMore>
      </CardActions>
    </Card>
  );
};

const SearchResults = ({ currFetchedData }) => {
  return (
    <List dense>
      <div />
    </List>
  );
};

export { SearchScreen };
