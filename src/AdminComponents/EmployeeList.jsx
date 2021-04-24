import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ListComponent from "../ListComponent/ListComponent";
import { fetchData } from "../MiddlewareComponents/RequestHandle";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
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
      {employees.map((employee) => {
        return (
          <>
            <Card className={classes.root} onClick={() => {props.callback(employee)}}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h5">
                    {employee.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {employee.email}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Divider />
          </>
        );
      })}
    </>
  );
};

export default EmployeeList;
