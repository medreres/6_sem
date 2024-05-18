import { Box, Container, Paper, Typography } from "@mui/material";

export function Footer() {
  return (
    <Paper
      sx={{ width: "100vw", marginTop: 10, boxSizing: "border-box" }}
      component="footer"
      square
      variant="outlined">
      <Container>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            my: 1,
          }}></Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}>
          <Typography
            variant="caption"
            color="initial">
            Copyright ©2022. [] Limited
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
