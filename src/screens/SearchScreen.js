import {
  Container,
  Divider,
  Grid,
  List,
  Stack,
  Typography,
} from "@mui/material";

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

const SearchOptions = ({ setCurrFetchedData }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">
          WIP, use the side search panel for now.
        </Typography>
      </Grid>
    </Grid>
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
