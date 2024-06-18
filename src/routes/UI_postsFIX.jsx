import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

import Flowers from "../images/flowers.jpeg";

function Test() {
  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Grid container spacing={8} sx={{ border: 4 }}>
        {Array.from(new Array(6)).map((el, index) => (
          <Grid item key={index} xs={6} sx={{ mb: 2 }}>
            <Card sx={{ maxWidth: 350, borderRadius: "2%", pb: 1 }}>
              <CardActionArea>
                <Box>
                  <CardMedia
                    component="img"
                    height="350"
                    image={Flowers}
                    alt="green iguana"
                  />
                  <Box title="Make featured">
                    <StarOutlineRoundedIcon
                      sx={{
                        position: "absolute",
                        fontSize: 40,
                        top: 0,
                        right: 0,
                        cursor: "pointer",
                        color: "orange",
                        ":hover": {
                          transform: "scale(1.4)",
                        },
                        WebkitTransition: "transform 0.3s ease-in-out",
                      }}
                    />
                  </Box>
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    TITLE
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica..
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Box>READ MORE</Box>
                  <Box>
                    <Stack direction={"row"} spacing={2}>
                      <EditIcon />
                      <DeleteIcon />
                    </Stack>
                  </Box>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Test;
