import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
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

const SearchPanel = ({ setData }) => {
  const [term, setTerm] = useState("");
  const [year, setYear] = useState(
    yearOptions[yearOptions.length - 1]["value"]
  );
  const [results, setResults] = useState({});

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(
    Math.ceil(Object.keys(results).length / itemsPerPage)
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  const classes = useStyles();

  useEffect(() => {
    const search = async () => {
      const url = `https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/${year}/courses?code=${term}`;
      const { data } = await axios.get(url, { headers: {} });

      setResults(data);
      setNoOfPages(Math.ceil(Object.keys(data).length / itemsPerPage));
    };

    if (term && year && !results) {
      search();
    } else {
      const timerId = setTimeout(() => {
        if (term && year) {
          search();
        }
      }, 500);

      return () => {
        clearTimeout(timerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, year]);

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
      <form className={classes.selectionBox} noValidate autoComplete="off">
        <TextField
          id="year-input"
          select
          label="Academic Year"
          variant="filled"
          value={year}
          onChange={(e) => setYear(e.target.value)}
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
          value={term}
          onChange={(e) => setTerm(e.target.value.toUpperCase())}
        />
      </form>
      <Divider />
      <Box padding="10px">
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
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
    </div>
  );
};

export default SearchPanel;
