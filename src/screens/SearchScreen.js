import {
  Autocomplete,
  Box,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Collapse,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import _ from "lodash";

import {
  breadth,
  daytime,
  deliveryModes,
  departments as deptOptions,
  sections as sectionOptions,
  studyYears,
  weekdays,
  years,
} from "../utilities/searchOptions";
import { getSearchInstance } from "../utilities/fetcher";
import { Loader } from "../components/Loader";
import { extractInstructorsAndOccupancy } from "../utilities/courseFormatter";

const defaultSearchState = {
  title: "",
  courseCode: "",
  sections: [],
  departments: [],
  levels: [],
  lastName: "",
  days: [],
  times: [],
  breadths: [],
  year: _.last(years),
  modes: [],
  online: false,
  hasSpace: false,
  waitlist: false,
  fyf: false,
  allowModes: true,
};

const SearchScreen = ({
  currFetchedData,
  setCurrFetchedData,
  setCurrDisplayedData,
  searchFields,
  setSearchFields,
}) => {
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  return (
    <Container maxWidth="lg">
      <Stack spacing={3} divider={<Divider />}>
        <Typography variant="h4">Search</Typography>
        <SearchOptions
          setCurrFetchedData={setCurrFetchedData}
          setLoading={setLoading}
          searchFields={searchFields}
          setSearchFields={setSearchFields}
          setSearched={setSearched}
        />
        <SearchResults
          currFetchedData={currFetchedData}
          setCurrDisplayedData={setCurrDisplayedData}
          loading={loading}
          searched={searched}
        />
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
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const SearchOptions = ({
  setCurrFetchedData,
  setLoading,
  searchFields,
  setSearchFields,
  setSearched,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded(!expanded);
  const mounted = useRef(true);

  const [allowModes, setAllowModes] = useState(true);

  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [sections, setSections] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [lastName, setLastName] = useState("");
  const [days, setDays] = useState([]);
  const [times, setTimes] = useState([]);
  const [breadths, setBreadths] = useState([]);
  const [year, setYear] = useState(_.last(years));
  const [modes, setModes] = useState([]);
  const [online, setOnline] = useState(false);
  const [hasSpace, setHasSpace] = useState(false);
  const [waitlist, setWaitlist] = useState(false);
  const [fyf, setFyf] = useState(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });

  useEffect(() => {
    setTitle(searchFields.title);
    setCourseCode(searchFields.courseCode);
    setSections(searchFields.sections);
    setDepartments(searchFields.departments);
    setLevels(searchFields.levels);
    setLastName(searchFields.lastName);
    setDays(searchFields.days);
    setTimes(searchFields.times);
    setBreadths(searchFields.breadths);
    setYear(searchFields.year);
    setModes(searchFields.modes);
    setOnline(searchFields.online);
    setHasSpace(searchFields.hasSpace);
    setWaitlist(searchFields.waitlist);
    setFyf(searchFields.fyf);
  }, [searchFields]);

  const search = () => {
    setLoading(true);
    setSearched(true);
    const instance = getSearchInstance();
    const retrievedOn = new Date();

    const format = (param) => {
      if (typeof param === "boolean") {
        return param ? "t" : null;
      }
      if (typeof param === "string") {
        return param ? param : null;
      }
      if (Array.isArray(param)) {
        return !_.isEmpty(param) ? param.map((v) => v.value).join(",") : null;
      }
      throw new Error("Unaccounted for param type.");
    };

    instance
      .get(`${year.value}/courses/`, {
        params: {
          // note that nulls are not rendered in URL, which is the goal here
          title: format(title),
          code: format(courseCode),
          section: format(sections),
          org: format(departments),
          studyyear: format(levels),
          prof: format(lastName),
          weekday: format(days),
          daytime: format(times),
          breadth: format(breadths),
          deliverymode: online ? null : format(modes),
          online: format(online),
          waitlist: format(waitlist),
          available: format(hasSpace),
          fyfcourse: format(fyf),
        },
      })
      .then((res) => {
        const { data } = res;
        Object.keys(data).forEach((key) => {
          data[key]["updated"] = retrievedOn;
        });

        if (mounted.current) {
          setCurrFetchedData(data);
        }
      })
      .then(() => {
        setLoading(false);
        setSearchFields({
          title,
          courseCode,
          sections,
          departments,
          levels,
          lastName,
          days,
          times,
          breadths,
          year,
          modes,
          online,
          hasSpace,
          waitlist,
          fyf,
        });
      });
  };

  const clear = () => {
    setSearchFields(defaultSearchState);
    setSearched(false);
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Course title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3} lg={4}>
            <TextField
              label="Course code"
              fullWidth
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={9} lg={8}>
            <Autocomplete
              multiple
              options={sectionOptions}
              getOptionLabel={(option) => option.label}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Section(s)" />
              )}
              value={sections}
              onChange={(e, nv) => setSections(nv)}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={deptOptions}
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
                value={levels}
                onChange={(e, nv) => setLevels(nv)}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label="Instructor's last name"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
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
                value={days}
                onChange={(e, nv) => setDays(nv)}
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
                value={times}
                onChange={(e, nv) => setTimes(nv)}
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
                value={breadths}
                onChange={(e, nv) => setBreadths(nv)}
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
                value={year}
                onChange={(e, nv) => setYear(nv)}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Autocomplete
                multiple
                options={deliveryModes}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      allowModes
                        ? "Delivery modes (lectures)"
                        : "Disabled as online only is selected"
                    }
                  />
                )}
                value={modes}
                onChange={(e, nv) => setModes(nv)}
                disabled={!allowModes}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={online}
                      onChange={(e) => {
                        setOnline(e.target.checked);
                        setAllowModes(!e.target.checked);
                        if (e.target.checked) {
                          setModes([]);
                        }
                      }}
                    />
                  }
                  label={"Online only"}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasSpace}
                      onChange={(e) => setHasSpace(e.target.checked)}
                    />
                  }
                  label={"Meetings with space only"}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={waitlist}
                    onChange={(e) => setWaitlist(e.target.checked)}
                  />
                }
                label={"Waitlistable courses only"}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fyf}
                    onChange={(e) => setFyf(e.target.checked)}
                  />
                }
                label={"First-year foundations courses"}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      <CardActions>
        <Tooltip title="Clear options">
          <IconButton sx={{ marginRight: "auto" }} onClick={clear}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
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
        <Tooltip title="Search">
          <IconButton sx={{ marginLeft: "auto" }} onClick={search}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

const SearchResults = ({
  currFetchedData,
  setCurrDisplayedData,
  loading,
  searched,
}) => {
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setPage(1);
    setNoOfPages(Math.ceil(Object.keys(currFetchedData).length / itemsPerPage));
  }, [currFetchedData]);

  const onCourseClick = (data) => {
    setCurrDisplayedData(data);
  };

  if (loading) {
    return <Loader />;
  }

  if (!searched) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="body1">
          Configure your options above, then hit search!
        </Typography>
      </Box>
    );
  }

  if (_.isEmpty(currFetchedData)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="body1">No results found.</Typography>
      </Box>
    );
  }

  return (
    <Stack display="flex" divider={<Divider />} spacing={3}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Pagination
          count={noOfPages}
          page={page}
          onChange={(e, v) => setPage(v)}
        />
      </Box>
      <List>
        {Object.keys(currFetchedData)
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((key) => {
            const result = currFetchedData[key];
            const { courseTitle, code, section, session, meetings } = result;
            return (
              <ListItem
                button
                key={key}
                onClick={() => onCourseClick(result)}
                component={RouterLink}
                to={`/course/${session}/${section.toLowerCase()}/${code.toLowerCase()}`}
              >
                <Stack>
                  <ListItemText primary={courseTitle} />
                  <ListItemSecondary
                    code={code}
                    section={section}
                    meetings={meetings}
                  />
                </Stack>
              </ListItem>
            );
          })}
      </List>
    </Stack>
  );
};

const ListItemSecondary = ({ code, section, meetings }) => {
  const instructors = extractInstructorsAndOccupancy(meetings)[0];

  return (
    <Stack
      spacing={1}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Typography variant="body2">{`${code}${section}`}</Typography>
      <Typography variant="body2">
        {instructors ? instructors : "TBA"}
      </Typography>
    </Stack>
  );
};

export { SearchScreen, defaultSearchState };
