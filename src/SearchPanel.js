import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";

import yearOptions from "./yearOptions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SearchPanel = () => {
  const [term, setTerm] = useState("");
  const [year, setYear] = useState(
    yearOptions[yearOptions.length - 1]["value"]
  );
  const [results, setResults] = useState({});

  const classes = useStyles();

  useEffect(() => {
    const search = async () => {
      const url = `https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/${year}/courses?code=${term}`;
      const { data } = await axios.get(url, { headers: {} });

      setResults(data);
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

  const renderedResults = Object.keys(results).map((key) => {
    const result = results[key];
    return (
      <ListItem button>
        <ListItemText
          key={key}
          primary={result.courseTitle}
          secondary={`${result.code}${result.section}`}
        />
      </ListItem>
    );
  });

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
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
      <List dense>{renderedResults}</List>
    </div>
  );
};

export default SearchPanel;
