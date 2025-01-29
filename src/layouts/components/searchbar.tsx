import type { BoxProps } from "@mui/material/Box";

import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClickAwayListener from "@mui/material/ClickAwayListener";

// ----------------------------------------------------------------------

export function Searchbar({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && <IconButton onClick={handleOpen}></IconButton>}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <Box
            sx={{
              top: 0,
              left: 0,
              zIndex: 99,
              width: "100%",
              display: "flex",
              position: "absolute",
              alignItems: "center",
              px: { xs: 3, md: 5 },
              boxShadow: theme.customShadows.z8,
              height: {
                xs: "var(--layout-header-mobile-height)",
                md: "var(--layout-header-desktop-height)",
              },
              ...sx,
            }}
            {...other}
          >
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
              sx={{ fontWeight: "fontWeightBold" }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </Box>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
