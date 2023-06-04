import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function Error() {
  return (
    <Sheet
      sx={{
        bgcolor: "background.body",
        flex: 1,
        maxWidth: 1200,
        width: "100%",
        height: "100vh",
        mx: "auto",
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="column"
        height="100%"
      >
        <Typography fontSize={41}>404</Typography>
        <Typography component={RouterLink} to="/">
          Go back to homapage
        </Typography>
      </Stack>
    </Sheet>
  );
}
