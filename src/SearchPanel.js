import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import yearOptions from "./yearOptions";
import { useStyles } from "./Theme";

const Loader = () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.loader}
    >
      <CircularProgress />
    </Box>
  );
};

const SearchPanel = (props) => {
  const { setData } = props;

  // search
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState(
    yearOptions[yearOptions.length - 1]["value"]
  );
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  // pagination
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(
    Math.ceil(Object.keys(results).length / itemsPerPage)
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const classes = useStyles();

  useEffect(() => {
    const search = async () => {
      const url = `https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/${year}/courses?code=${searchTerm}`;
      const { data } = await axios.get(url, { headers: {} });

      setResults(data);
      setNoOfPages(Math.ceil(Object.keys(data).length / itemsPerPage));
    };

    const execute = () => {
      setLoading(true);
      setPage(1);
      search().then(() => setLoading(false));
    };

    if (searchTerm && year && !results) {
      execute();
    } else {
      const timerId = setTimeout(() => {
        if (searchTerm && year) {
          execute();
        }
      }, 500);

      return () => {
        clearTimeout(timerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, year]);

  const renderedResults = Object.keys(results)
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((key) => {
      const result = results[key];
      return (
        <ListItem button key={key} onClick={() => setData(result)}>
          <ListItemText
            primary={result.courseTitle}
            secondary={`${result.code}${result.section}`}
          />
        </ListItem>
      );
    });

  return (
    <div>
      <form noValidate autoComplete="off">
        <Box className={classes.searchBox}>
          <TextField
            id="year-input"
            select
            label="Academic Year"
            variant="filled"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
          >
            {yearOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="code-input"
            label="Course Code"
            variant="filled"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
            fullWidth
          />
        </Box>
      </form>
      <Divider />
      {loading ? <Loader /> : null}
      {!loading ? (
        <Fragment>
          <Box padding="10px">
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handlePageChange}
              defaultPage={1}
              siblingCount={0}
              boundaryCount={1}
              color="primary"
              classes={{ ul: classes.paginator }}
            />
          </Box>
          <Divider />
          <Box>
            <List dense>{renderedResults}</List>
          </Box>
        </Fragment>
      ) : null}
    </div>
  );
};

export default SearchPanel;
