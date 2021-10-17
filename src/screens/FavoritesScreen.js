import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

const Title = () => {
  return <Typography variant="h4">Saved Courses</Typography>;
};

const FavoritesList = ({ data }) => {
  const ListEntry = ({ entry }) => {
    return (
      <ListItem>
        <ListItemButton>
          <ListItemText primary={entry} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <List>
      {/* figure out how to store data into favorites and make use of the last updated */}
      {Object.entries(data).map(([k]) => (
        <ListEntry entry={k} />
      ))}
    </List>
  );
};

const FavoritesScreen = ({ favorites }) => {
  return (
    <Container maxWidth="lg">
      <Stack spacing={3} divider={<Divider />}>
        <Title />
        <FavoritesList data={favorites} />
      </Stack>
    </Container>
  );
};

export { FavoritesScreen };
