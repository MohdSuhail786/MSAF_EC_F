import React, { useEffect, useState } from "react";
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
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Card, CardActionArea, CardContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Form from "./Form";
import SnackBarComponent from "../CommonComponents/SnackBarComponent";
import ListComponent from "../ListComponent/ListComponent";
import ClearIcon from '@material-ui/icons/Clear';
import SearchBar from "../CommonComponents/SearchBar";

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
  const [globalData, setGlobalData] = useState([]);
  const [editForm, setEditForm] = useState(null);
  const [data, setData] = useState([]);
  const [reRenderData, setReRenderData] = useState([]);
  const [downloadData, setDownloadData] = useState([]);
  const [fab, setFab] = useState(false);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(()=>{
    if (window.innerWidth <=480) {
      setFab(false);
    }
    else setFab(true)
  },[])

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

  const filterData = (data) => {
    let filteredData = [];
    if (data)
      data.forEach((e) => {
        // delete e['id']
        let obj = {
          id: e["id"],
          "Consumer Name": e["consumerName"],
          "Father Name": e["fatherName"],
          Address: e["address"],
          District: e["district"],
          Subdivision: e["subdivision"],
          "Account Id": e["accountId"],
          "Meter Id": e["meterId"],
          "Meter Position": e["meterPosition"],
          "Selling Book Number": e["sellingBookNo"],
          "Selling Page Number": e["sellingPageNo"],
          "Installation Date": e["installationDate"],
          "Plastic Seal": e["plasticSeal"],
        };
        filteredData.push(obj);
      });
    setData(filteredData);
  };

  const filterReRenderData = (data) => {
    let filteredData = [];
    if (data)
      data.forEach((e) => {
        // delete e['id']
        let obj = {
          id: e["id"],
          "Consumer Name": e["consumerName"],
          "Father Name": e["fatherName"],
          Address: e["address"],
          District: e["district"],
          Subdivision: e["subdivision"],
          "Account Id": e["accountId"],
          "Meter Id": e["meterId"],
          "Meter Position": e["meterPosition"],
          "Selling Book Number": e["sellingBookNo"],
          "Selling Page Number": e["sellingPageNo"],
          "Installation Date": e["installationDate"],
          "Plastic Seal": e["plasticSeal"],
        };
        filteredData.push(obj);
      });
    setDownloadData(filteredData);
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
    setData([])
    setGlobalData([])
    setReRenderData([]);
    setEditForm([])
    setTabName("Form");
  };

  const recentClick = () => {
    if (tabName === "Recent") {
      return;
    }
    setReRenderData([]);
    setData([]);
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
      <AppBar position="sticky" style={{ background: "rgb(47 123 255)" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
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
          </div>
          {/* { data.length>0 &&
            <SearchBar
              data={globalData}
              reRenderList={(data) => {
                console.log(data, "returned data");
                filterReRenderData(data);
                setReRenderData(data);
              }}
            />
          } */}
          {(window.innerWidth >480 && data.length > 0) && (
            <SearchBar
              data={globalData}
              reRenderList={(data) => {
                console.log(data, "returned data");
                filterReRenderData(data);
                setReRenderData(data);
              }}
            />
          )}
          {(window.innerWidth <=480 && fab && data.length > 0) && (
            
            <SearchBar
              style={{position:"fixed",width:"100%",margin:0,top:0,left:0,zIndex:100}}
              data={globalData}
              reRenderList={(data) => {
                console.log(data, "returned data");
                filterReRenderData(data);
                setReRenderData(data);
              }}
            />
            
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
          <Button color="inherit" onClick={logOut}>
            Logout
          </Button>
          </div>
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
      {tabName === "Recent" && (
        <ListComponent
          callback={(data) => {
            setGlobalData(data);
            filterData(data);
          }}
          reRenderData={reRenderData}
          loadForm={(e) => {
            setEditForm(e);
            setTabName("Edit Form");
            // setEmployeeId(null);
            // setPreserveEmployeeId(null);
            // setPreserveFilterFlag(false)
            // setPreserveEmployeeName(null);
            setData([]);
          }}
        />
      )}
      {tabName === "Edit Form" && (
        <Form
          formData={editForm}
          callback={() => {
              setFab(false)
              setReRenderData([]);
              setData([]);
              setTabName("Recent");           
          }}
        />
      )}
      {open && (
        <SnackBarComponent
          setOpen={(e) => {
            setOpen(false);
          }}
          message="Logout successfully"
          severity="success"
        />
      )}
      {window.innerWidth <= 480 && data.length > 0 && (
        <Fab
          color="secondary"
          aria-label="add"
          onClick={() => {
            setReRenderData(globalData)
            filterReRenderData(globalData)
            if (fab)
            setFab(false)
            else 
            setFab(true)
          }}
          style={{ position: "fixed", bottom: 20, right: 20 }}
        >
          {!fab && <FilterListIcon style={{ color: "#fff" }} />}
          {fab && <ClearIcon style={{color:"#fff"}}/>}
        </Fab>
      )}
      
    </div>
  );
}
