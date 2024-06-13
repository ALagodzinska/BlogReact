import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Image from "../images/flowers.jpeg";

function MainPage() {
  return (
    <Container maxWidth="md" sx={{ border: 1, mt: 2 }}>
      <Grid item xs={12} md={8} pb={3} mt={5}>
        <Stack direction="row">
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              DATE
            </Typography>
            <Typography variant="h4" gutterBottom mb={3}>
              FEATURED POST
            </Typography>
            <Typography mr={4}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting type and scrambled it to make a type
              specimen book. It has survived has survived has survived survived
              ...
            </Typography>
            <Box mt={4}>
              <Link>Read More...</Link>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                width: "450px",
                height: "350px",
                outline: "5px solid black",
                textAlign: "center",
                borderRadius: "10%",
              }}
            >
              <img
                src={Image}
                alt="preview"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  borderRadius: "10%",
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontStyle: "italic",
                display: "flex",
                float: "right",
                mt: 1,
              }}
            >
              AUTHOR
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Box
        sx={{
          border: 1,
          p: 3,
          mb: 2,
          borderRadius: "10px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" mb={2}>
            Latest Posts
          </Typography>
          <Box>
            <Link>See all...</Link>
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
          spacing={2}
        >
          {/* ONE POST */}
          <Stack border={1} p={2} sx={{ width: "25%" }}>
            <Box
              sx={{
                width: "125px",
                height: "150px",
                outline: "1px solid",
                textAlign: "center",
                borderRadius: "10%",
              }}
            >
              <img
                src={Image}
                alt="preview"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  borderRadius: "10%",
                }}
              />
            </Box>
            <Link sx={{ textAlign: "center" }}>
              LONGEST TIOTLE BLS BLA BAL ABLA BAL
            </Link>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              DATE
            </Typography>
          </Stack>
          {/* ONE POST */}
          <Stack border={1} p={2} sx={{ width: "25%" }}>
            <Box
              sx={{
                width: "125px",
                height: "150px",
                outline: "1px solid",
                textAlign: "center",
                borderRadius: "10%",
              }}
            >
              <img
                src={Image}
                alt="preview"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  borderRadius: "10%",
                }}
              />
            </Box>
            <Link sx={{ textAlign: "center" }}>TITLE</Link>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              DATE
            </Typography>
          </Stack>
          <Stack border={1} p={2} sx={{ width: "25%" }}>
            <Box
              sx={{
                width: "125px",
                height: "150px",
                outline: "1px solid",
                textAlign: "center",
                borderRadius: "10%",
              }}
            >
              <img
                src={Image}
                alt="preview"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  borderRadius: "10%",
                }}
              />
            </Box>
            <Link sx={{ textAlign: "center" }}>TITLE</Link>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              DATE
            </Typography>
          </Stack>
          <Stack border={1} p={2} sx={{ width: "25%" }}>
            <Box
              sx={{
                width: "125px",
                height: "150px",
                outline: "1px solid",
                textAlign: "center",
                borderRadius: "10%",
              }}
            >
              <img
                src={Image}
                alt="preview"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  borderRadius: "10%",
                }}
              />
            </Box>
            <Link sx={{ textAlign: "center" }}>TITLE</Link>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              DATE
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}

export default MainPage;
