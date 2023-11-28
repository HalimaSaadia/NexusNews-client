import { Box, Container, Divider, Typography } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Link } from "react-router-dom";

const options = [
  "Create a merge commit",
  "Squash and merge",
  "Rebase and merge",
];

const Subscription = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{
          background:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=600') center/cover no-repeat",
          minHeight: "400px",
          mb: 5,
          py: 5,
          pl: 5,
        }}
      >
        <Typography variant="h2" color="white">
          Your Window to World
        </Typography>
        <Typography variant="h2" color="white" sx={{ my: 3 }}>
          Subscribe for unmatched perspective
        </Typography>

        <>
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="split button"
          >
            <Button color="secondary">{`Select Your Pack `}</Button>
            <Button
              size="small"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
            sx={{
              zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      sx={{ width: 230 }}
                      id="split-button-menu"
                      autoFocusItem
                    >
                    <Link to={`/payment/${1}`}>  <MenuItem>$2 for 1 minute </MenuItem></Link>
                      <Divider />
                     <Link to={`/payment/${2}`}> <MenuItem>$14.99 for 5 Days</MenuItem></Link>
                      <Divider />
                     <Link to={`/payment/${3}`}> <MenuItem>$16.99 for 10 Days</MenuItem></Link>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      </Box>
    </Box>
  );
};

export default Subscription;
