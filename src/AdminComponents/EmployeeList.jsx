import { makeStyles, Button } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import ListComponent from "../ListComponent/ListComponent";
import { fetchData } from "../MiddlewareComponents/RequestHandle";
import SnackBarComponent from "../CommonComponents/SnackBarComponent";

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

  useEffect(() => {
    let requestOptions = {
      method: "GET",
    };
    fetchData("/getEmployees", requestOptions).then((data) => {
      setEmployees(data.employees);
    });
  }, [open]);

  const deleteEmployee = (employeeId) => {
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({employeeId: employeeId})
    };
    fetchData("/deleteEmployee", requestOptions).then((data) => {
      
      if (data == "Error") {
        setMessage("Some error occurred");
        setSeverity("error")
        setOpen(true)
        return;
      }
      setMessage(data);
      setSeverity("success")
      setOpen(true)
    });
  }

  const classes = useStyles();
  return (
    <>
      <div style={{ textAlign:"center",marginBottom:100}}>
        {employees.map((employee) => {
          return (
            <>
              <div className={classes.card} style={{display:"inline-block"}}>
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
                        deleteEmployee(employee._id)

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
      { open && <SnackBarComponent setOpen = {(e) => {setOpen(false)}} message={message} severity={severity}/> }
    </>
  );
};

export default EmployeeList;
