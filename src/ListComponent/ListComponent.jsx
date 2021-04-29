import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { fetchData } from "../MiddlewareComponents/RequestHandle";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import Divider from "@material-ui/core/Divider";
import Form from "../FormComponents/Form";
import Login from "../AuthComponents/Login";

const ListComponent = (props) => {
  const [rows, setRows] = useState([]);

  const columns = [
    {
      field: "id",
      headerName: "No.",
      width: 80,
      disableClickEventBubbling: true,
    },
    {
      field: "consumerName",
      headerName: "Consumer name",
      width: 130,
      disableClickEventBubbling: true,
    },
    {
      field: "fatherName",
      headerName: "Father name",
      width: 130,
      disableClickEventBubbling: true,
    },
    {
      field: "meterId",
      type: "number",
      headerName: "Meter Id",
      width: 130,
      disableClickEventBubbling: true,
    },
  ];

  useEffect(() => {
    let payload = null;
    if (props._id) {
      payload = {
        id: props._id,
      };
    } else {
      payload = {
        id: localStorage.userId,
      };
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    fetchData("/getList", requestOptions).then((data) => {
      console.log(data);
      setRows(data);
      props.callback(data);
    });
  }, []);
  console.log("rows");
  console.log(rows);
  console.log(" end");
  return (
    <>
      {/* <div style={{ height: window.innerHeight-60, width: "100%" }}>
        <DataGrid  
          rows={rows}
          columns={columns}
          pageSize={8}
        />
      </div> */}
      <div style={{ textAlign: "center",marginBottom:100 }}>
        {rows.map((e) => {
          return (
            <Paper
              elevation={3}
              style={{
                minWidth: 300,
                maxWidth: 300,
                maxHeight: 300,
                minHeight: 300,
                display: "inline-block",
                margin: 20,
                height: "100%",
                // padding: 10,
              }}
            >
              <div style={{ minHeight: 220, textAlign: "start" }}>
                <div style={{minHeight:30,background:"#34495E",fontSize:18,color:"#fff",textAlign:"center"}}>
                  Meter Id : {e.meterId ?? "NULL"}
                </div>
                <div style={{padding:20,maxHeight:190,maxWidth:250}}>
                {<b>Consumer Name : </b>}{ e.consumerName ?? "NULL"} <br></br>
                <Divider />
                {<b>Father Name : </b>}{ e.fatherName ?? "NULL"}
                <br></br>
                <Divider />
                {<b>District : </b>}{ e.district ?? "NULL"}
                <br></br>
                <Divider />
                {<b>Account Id : </b>}{ e.accountId ?? "NULL"}
                <br></br>
                <Divider />
                </div>
              </div>
              <div
                style={{
                  minHeight: 80,
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  style={{ background: "#4481eb", color: "#fff" }}
                >
                  Photo <GetAppIcon style={{marginLeft:5, color: "#fff" }} />
                </Button>
                <Button
                  variant="contained"
                  style={{ background: "#54C401", color: "#fff" }}
                  onClick={()=>{console.log(e); props.loadForm(e)}}
                >
                  Edit
                </Button>
              </div>
            </Paper>
          );
        })}
      </div>
    </>
  );
};

export default ListComponent;
