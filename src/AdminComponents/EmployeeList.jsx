import { makeStyles, Button } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import ListComponent from "../ListComponent/ListComponent";
import { fetchData } from "../MiddlewareComponents/RequestHandle";
import SnackBarComponent from "../CommonComponents/SnackBarComponent";
import CircularProgressBar from "../MiddlewareComponents/CircularProgressBar";
import { CenterFocusStrong } from "@material-ui/icons";

const useStyles = makeStyles({
  card: {
    width: 300,
    backgroundColor: "whhiteSmoke",
    border: "10px solid white",
    margin: 20,
    boxShadow: "3px 12px 18px -8px #308edb",
  },

  upper_card: {
    padding: 10,
  },
  btnDiv: {
    textAlign: "center",
    marginTop: 50,
  },
});

const EmployeeList = (props) => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState();
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const [progressBar, setProgressBar] = useState(false);
  const [progressBarD, setProgressBarD] = useState(false);
  const [noData, setNoData] = useState(false);
  const inputEl = useRef(null);

  useEffect(() => {
    setProgressBar(true);
    let requestOptions = {
      method: "GET",
    };
    fetchData("/getEmployees", requestOptions).then((data) => {
      setEmployees(data.employees);
      if (data.employees.length == 0) {
        setNoData(true)
      }
      else setNoData(false)
      setProgressBar(false);
    });
  }, [open]);

  const deleteEmployee = (employeeId) => {
    
    console.log("DELETE CLICKED")
    setProgressBarD(true);
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId: employeeId }),
    };
    fetchData("/deleteEmployee", requestOptions).then((data) => {
      setProgressBarD(false);
      if (data == "Error") {
        setMessage("Some error occurred");
        setSeverity("error");
        setOpen(true);
        return;
      }
      setMessage(data);
      setSeverity("success");
      setOpen(true);
    });
  };
  const classes = useStyles();

  if (progressBar) {
    return (
      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgressBar />
      </div>
    );
  }
  
  if (noData) {
    return (
      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          color:"#000",
          alignItems: "center",
        }}
      >
        No data to show
      </div>
    );
  }

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 100 }} >
        {employees.map((employee) => {
          return (
            <>
              <div className={classes.card} style={{ display: "inline-block" }}>
                <div className={classes.inner_card}>
                  <div className={classes.upper_card}>
                    <p style={{ color: "blue", padding: 10 }}>
                      <span style={{ color: "DarkBlue" }}>Name : </span>
                      {employee.name}
                    </p>
                    <hr></hr>
                    <p style={{ color: "blue", padding: 10 }}>
                      <span style={{ color: "DarkBlue" }}>Email : </span>
                      {employee.email}
                    </p>

                    <hr></hr>
                  </div>

                  <div
                    className={classes.btnDiv}
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#4481eb", color: "white" }}
                      onClick={() => {
                        console.log(inputEl.current)
                        deleteEmployee(employee._id);
                      }}
                    >
                      Delete
                    </Button>
                    
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#54C401", color: "white" }}
                      onClick={() => {
                        props.callback(employee);
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {open && (
        <SnackBarComponent
          setOpen={(e) => {
            setOpen(false);
          }}
          message={message}
          severity={severity}
        />
      )}
      {progressBarD && <div style={{position:"fixed", top:50,left:0,height:"100%",width:"100%",backgroundColor:"rgb(123 123 123 / 69%)"}}><CircularProgressBar style={{justifyContent:"center",height:"100%",alignItems:"center"}}/></div> }
    </>
  );
};

export default EmployeeList;
