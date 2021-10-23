import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Link as RouterLink } from "react-router-dom";
import _ from "lodash";

import { styles } from "../theme";
import { Loader } from "./Loader";

const Search = ({
  fetchedData,
  setFetchedData,
  onCourseSelection,
  onButtonClick,
}) => {
  // search
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const retrievedOn = useRef(new Date());

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
      const url = `https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/20219/courses?code=${searchTerm}`;
      retrievedOn.current = new Date();
      const { data } = await axios.get(url, { headers: {} });

      if (!didCancel) {
        Object.keys(data).forEach((key) => {
          data[key]["updated"] = retrievedOn.current;
        });
        setFetchedData(data);
        setNoOfPages(Math.ceil(Object.keys(data).length / itemsPerPage));
      }
    };

    const execute = () => {
      setLoading(true);
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
        onButtonClick={onButtonClick}
      />
      <Results
        loading={loading}
        data={fetchedData}
        onCourseClick={onCourseClick}
        pageControl={[page, setPage]}
        noOfPages={noOfPages}
        itemsPerPage={itemsPerPage}
        searchTerm={searchTerm}
      />
    </Stack>
  );
};

const SearchOptions = ({ searchTerm, setSearchTerm, onButtonClick }) => {
  return (
    <form noValidate autoComplete="off">
      <Stack spacing={1}>
        <TextField
          id="code-input"
          label="Course Code"
          variant="outlined"
          placeholder="Quick search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
          fullWidth
          size="small"
          flex={1}
        />
        <Typography variant="caption">
          Quick search shows courses for the current year. For more options, use
          advanced search.
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<ManageSearchIcon />}
          component={RouterLink}
          to="/search"
          onClick={onButtonClick}
        >
          Advanced Search
        </Button>
      </Stack>
    </form>
  );
};

const Results = ({
  loading,
  data,
  onCourseClick,
  pageControl,
  itemsPerPage,
  noOfPages,
  searchTerm,
}) => {
  // only show results if not loading, search term is not empty, and there are actually results
  if (loading) {
    return <Loader />;
  }

  if (!searchTerm) {
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
