import { AppBar, Box, Toolbar } from "@mui/material";

import { Search } from "@/components";
import { useUserContext } from "@/features/auth/context";

import { Title } from "./Title";
import { UserTooltip } from "./UserTooltip";

export * from "./Title";

export function NavBar() {
  const { authenticated } = useUserContext();

  return (
    <AppBar position="static">
      <Toolbar>
        <Title />
        <Box sx={{ flexGrow: 1 }} />
        {authenticated && (
          <>
            <Search />
            <UserTooltip />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
