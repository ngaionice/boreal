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

const Search = ({ fetchedDataControl, onCourseSelection, onButtonClick }) => {
  // search
  const [searchTerm, setSearchTerm] = useState("");
  const searchInstance = useRef(0);

  const [fetchedData, setFetchedData] = fetchedDataControl;
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
    const search = async (currSearchInstance) => {
      const url = `https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/20219/courses?code=${searchTerm}`;
      retrievedOn.current = new Date();
      const { data } = await axios.get(url, { headers: {} });

      if (searchInstance.current === currSearchInstance) {
        Object.keys(data).forEach((key) => {
          data[key]["updated"] = retrievedOn.current;
        });
        setFetchedData(data);
        setNoOfPages(Math.ceil(Object.keys(data).length / itemsPerPage));
      }
    };

    const execute = () => {
      searchInstance.current += 1;
      setLoading(true);
      setPage(1);
      search(searchInstance.current).then(() => setLoading(false));
    };

    if (searchTerm && !fetchedData) {
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
        data={fetchedData}
        onCourseClick={onCourseClick}
        pageControl={[page, setPage]}
        noOfPages={noOfPages}
        itemsPerPage={itemsPerPage}
      />
    </Stack>
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
