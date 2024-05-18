import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Header from "../components/header.component";
import { Link } from "react-router-dom";

function RestorePost() {
  return (
    <Container maxWidth="lg">
      <Header title="RESTORE POST" />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {[1, 2, 3].map((value) => (
          <ListItem
            key={value}
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment">Delete</IconButton>
            }
          >
            <ListItemText primary={`Line item ${value}`} />
          </ListItem>
        ))}
      </List>
      <Button
        component={Link}
        to="/"
        color="secondary"
        size="medium"
        variant="outlined"
        sx={{ px: 5, ml: 5, my: 3 }}
      >
        Go Back
      </Button>
    </Container>
  );
}

export default RestorePost;
