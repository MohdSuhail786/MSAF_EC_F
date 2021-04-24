import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Card, CardActionArea, CardContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Form from "./Form";
import SnackBarComponent from "../CommonComponents/SnackBarComponent";
import ListComponent from "../ListComponent/ListComponent";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    // width: "auto"
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
  },
  title: {
    flexGrow: 1,
  },
});

export default function CustomForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const [tabName, setTabName] = useState("Form");
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setOpen(true);
    setTimeout(() => {
      history.push("/");
    }, 2000);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const formClick = () => {
    setTabName("Form");
  };

  const recentClick = () => {
    setTabName("Recent");
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {localStorage.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {localStorage.email} 
              <br></br>
              Hi {localStorage.name}, Thanks for choosing us
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Divider />
      <List>
        <ListItem button key={"Form"} onClick={formClick}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary={"Form"} />
        </ListItem>
        <ListItem button key={"Recent"} onClick={recentClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Recent"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="sticky" style={{background : "rgb(47 123 255)"} }>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={toggleDrawer("left", true)}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {tabName}
          </Typography>
          <Button color="inherit" onClick={logOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <React.Fragment key={"left"}>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
      {tabName === "Form" && <Form />}
      {tabName === "Recent" && <ListComponent />}
      { open && <SnackBarComponent setOpen = {(e) => {setOpen(false)}} message="Logout successfully" severity="success"/> }
    </div>
  );
}
