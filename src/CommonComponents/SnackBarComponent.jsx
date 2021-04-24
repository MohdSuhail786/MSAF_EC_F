import { Slide, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React from "react";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SnackBarComponent = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    props.setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      // TransitionComponent={() => { return <Slide  direction="up"/>}}
      style={{marginTop:50}}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComponent;
