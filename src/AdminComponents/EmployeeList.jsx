import { makeStyles, Button } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import ListComponent from "../ListComponent/ListComponent";
import { fetchData } from "../MiddlewareComponents/RequestHandle";

const useStyles = makeStyles({
  card: {
    width: 350,
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

  useEffect(() => {
    let requestOptions = {
      method: "GET",
    };
    fetchData("/getEmployees", requestOptions).then((data) => {
      setEmployees(data.employees);
    });
  }, []);

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
                        alert("In progress");
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
    </>
  );
};

export default EmployeeList;
