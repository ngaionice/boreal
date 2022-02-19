import { useEffect, useState } from "react";
import axios from "axios";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import _ from "lodash";

import { styles } from "../theme";
import { Loader } from "./Loader";
import { years } from "../utilities/searchOptions.js";

const Search = ({ fetchedData, setFetchedData, onCourseSelection }) => {
  // search
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // pagination
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(
    Math.ceil(Object.keys(fetchedData).length / itemsPerPage)
  );

  const onCourseClick = () => {
    onCourseSelection();
  };

  useEffect(() => {
    let didCancel = false;
    const search = async () => {
      const url = `https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/${
        years.slice(-1)[0]["value"]
      }/courses?code=${searchTerm}`;
      const retrievedOn = new Date();
      const { data } = await axios.get(url, { headers: {} });

      Object.keys(data).forEach((key) => {
        data[key]["updated"] = retrievedOn;
      });

      if (!didCancel) {
        setFetchedData(data);
        setNoOfPages(Math.ceil(Object.keys(data).length / itemsPerPage));
      }
    };

    const execute = () => {
      setLoading(true);
      setSearched(true);
      setPage(1);
      search().then(() => setLoading(false));
    };

    const timerId = setTimeout(() => {
      if (searchTerm) {
        execute();
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
      didCancel = true;
    };
  }, [searchTerm, setFetchedData]);

  return (
    <Stack flex={1} spacing={1}>
      <SearchOptions
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearched={setSearched}
      />
      <Results
        loading={loading}
        data={fetchedData}
        onCourseClick={onCourseClick}
        pageControl={[page, setPage]}
        noOfPages={noOfPages}
        itemsPerPage={itemsPerPage}
        searched={searched}
      />
    </Stack>
  );
};

const SearchOptions = ({ searchTerm, setSearchTerm, setSearched }) => {
  return (
    <form noValidate autoComplete="off">
      <Stack spacing={1}>
        <TextField
          id="code-input"
          label="Course Code"
          variant="outlined"
          placeholder="Quick search"
          value={searchTerm}
          onChange={(e) => {
            if (!e.target.value) {
              setSearched(false);
            }
            setSearchTerm(e.target.value.toUpperCase());
          }}
          fullWidth
          size="small"
          flex={1}
        />
        <Typography variant="caption">
          Quick search shows courses for the latest timetable only. For more
          options, use the regular search function.
        </Typography>
      </Stack>
    </form>
  );
};

const Results = ({
  loading,
  searched,
  data,
  onCourseClick,
  pageControl,
  itemsPerPage,
  noOfPages,
}) => {
  // only show results if not loading, search term is not empty, and there are actually results
  if (loading) {
    return <Loader />;
  }

  if (!searched) {
    return (
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Divider flexItem />
        <Typography variant="body2">
          Start searching to see courses here!
        </Typography>
      </Stack>
    );
  }

  if (data === null || _.isEmpty(data)) {
    return (
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Divider flexItem />
        <Typography variant="body2">No courses found.</Typography>
      </Stack>
    );
  }

  const classes = styles();

  const [page, setPage] = pageControl;
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={1}>
      <Divider />

      <Pagination
        count={noOfPages}
        page={page}
        onChange={handlePageChange}
        defaultPage={1}
        siblingCount={0}
        boundaryCount={1}
        color="primary"
        sx={{ ul: classes.paginator }}
      />

      <Divider />

      <List dense>
        {Object.keys(data)
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((key) => {
            const result = data[key];
            const { courseTitle, code, section, session } = result;
            return (
              <ListItem
                button
                key={key}
                onClick={() => onCourseClick(result)}
                component={RouterLink}
                to={`/course/${session}/${section.toLowerCase()}/${code.toLowerCase()}`}
              >
                <ListItemText
                  primary={courseTitle}
                  secondary={`${code}${section}`}
                />
              </ListItem>
            );
          })}
      </List>
    </Stack>
  );
};

export { Search as QuickSearchPanel };
