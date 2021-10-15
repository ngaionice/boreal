import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
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

import { styles } from "../theme";
import _ from "lodash";

const Loader = () => {
  const classes = styles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={classes.loader}
    >
      <CircularProgress />
    </Box>
  );
};

const SearchOptions = ({ searchTermControl, onButtonClick }) => {
  const [searchTerm, setSearchTerm] = searchTermControl;

  return (
    <form noValidate autoComplete="off">
      <Stack spacing={1}>
        <TextField
          id="code-input"
          label="Course Code"
          variant="filled"
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
}) => {
  if (loading) {
    return <Loader />;
  }

  if (data === null || _.isEmpty(data)) {
    return (
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Divider flexItem />
        <Typography variant="body2">
          Start searching to see courses here!
        </Typography>
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
            return (
              <ListItem button key={key} onClick={() => onCourseClick(result)}>
                <ListItemText
                  primary={result.courseTitle}
                  secondary={`${result.code}${result.section}`}
                />
              </ListItem>
            );
          })}
      </List>
    </Stack>
  );
};

const Search = ({ setData, onCourseSelectionAction, onButtonClick }) => {
  // search
  const [searchTerm, setSearchTerm] = useState("");
  const searchInstance = useRef(0);

  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  // pagination
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(
    Math.ceil(Object.keys(results).length / itemsPerPage)
  );

  const onCourseClick = (result) => {
    setData(result);
    onCourseSelectionAction();
  };

  useEffect(() => {
    const search = async (currSearchInstance) => {
      const url = `https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/20219/courses?code=${searchTerm}`;
      const { data } = await axios.get(url, { headers: {} });

      if (searchInstance.current === currSearchInstance) {
        setResults(data);
        setNoOfPages(Math.ceil(Object.keys(data).length / itemsPerPage));
      }
    };

    const execute = () => {
      searchInstance.current += 1;
      setLoading(true);
      setPage(1);
      search(searchInstance.current).then(() => setLoading(false));
    };

    if (searchTerm && !results) {
      execute();
    } else {
      const timerId = setTimeout(() => {
        if (searchTerm) {
          execute();
        }
      }, 500);

      return () => {
        clearTimeout(timerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <Stack flex={1} spacing={1}>
      <SearchOptions
        searchTermControl={[searchTerm, setSearchTerm]}
        onButtonClick={onButtonClick}
      />
      <Results
        loading={loading}
        data={results}
        onCourseClick={onCourseClick}
        pageControl={[page, setPage]}
        noOfPages={noOfPages}
        itemsPerPage={itemsPerPage}
      />
    </Stack>
  );
};

export { Search as BasicSearch };
