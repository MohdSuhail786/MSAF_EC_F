import React, { useEffect, useState } from "react";
import { fetchData } from "../MiddlewareComponents/RequestHandle";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import Divider from "@material-ui/core/Divider";
import CircularProgressBar from "../MiddlewareComponents/CircularProgressBar";

const ListComponent = (props) => {
  const [rows, setRows] = useState([]);

  console.log(props.reRenderData, " OUT SIDE");
  let newRow = props.reRenderData;
  const [progressBar, setProgressBar] = useState(false);

  useEffect(() => {
    setProgressBar(true);
    newRow = [];
    let payload = null;

    if (props.flag == true) {
      fetchData("/getFilterData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }).then((data) => {
        setRows(data);
        setProgressBar(false);
        props.callback(data);
      });
      return;
    }

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
      setProgressBar(false);
      props.callback(data);
    });
  }, []);

  const downloadPhoto = (path,originalFileName) => {
    console.log(path.slice(8))
    if (path && path!='NULL' && path != 'null' )
    window.open(`http://ec2-3-17-161-123.us-east-2.compute.amazonaws.com:3000/download/${path.slice(8)}/${originalFileName}`);
    else 
    alert("Photo not available")
  }

  if (progressBar) {
    return (
      <div style={{height:"90vh",display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
        <CircularProgressBar />
      </div>
    );
  }

  return (
    <>
      {/* <div style={{ height: window.innerHeight-60, width: "100%" }}>
        <DataGrid  
          rows={rows}
          columns={columns}
          pageSize={8}
        />
      </div> */}
      <div style={{ textAlign: "center", marginBottom: 100 }}>
        {newRow &&
          newRow.map((e) => {
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
                  <div
                    style={{
                      minHeight: 30,
                      background: "#34495E",
                      fontSize: 18,
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Meter Id : {e.meterId ?? "NULL"}
                  </div>
                  <div style={{ padding: 20, maxHeight: 190, maxWidth: 250 }}>
                    {<b>Consumer Name : </b>}
                    {e.consumerName ?? "NULL"} <br></br>
                    <Divider />
                    {<b>Father Name : </b>}
                    {e.fatherName ?? "NULL"}
                    <br></br>
                    <Divider />
                    {<b>District : </b>}
                    {e.district ?? "NULL"}
                    <br></br>
                    <Divider />
                    {<b>Account Id : </b>}
                    {e.accountId ?? "NULL"}
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
                    onClick={()=>{ downloadPhoto(e.fileName,e.originalFileName)}}
                    style={{ background: "#4481eb", color: "#fff" }}
                  >
                    Photo
                    <GetAppIcon style={{ marginLeft: 5, color: "#fff" }} />
                  </Button>
                  <Button
                    variant="contained"
                    style={{ background: "#54C401", color: "#fff" }}
                    onClick={() => {
                      console.log(e);
                      props.loadForm(e);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </Paper>
            );
          })}
        {newRow.length == 0 &&
          rows.map((e) => {
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
                  <div
                    style={{
                      minHeight: 30,
                      background: "#34495E",
                      fontSize: 18,
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Meter Id : {e.meterId ?? "NULL"}
                  </div>
                  <div style={{ padding: 20, maxHeight: 190, maxWidth: 250 }}>
                    {<b>Consumer Name : </b>}
                    {e.consumerName ?? "NULL"} <br></br>
                    <Divider />
                    {<b>Father Name : </b>}
                    {e.fatherName ?? "NULL"}
                    <br></br>
                    <Divider />
                    {<b>District : </b>}
                    {e.district ?? "NULL"}
                    <br></br>
                    <Divider />
                    {<b>Account Id : </b>}
                    {e.accountId ?? "NULL"}
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
                    onClick={()=>{ downloadPhoto(e.fileName,e.originalFileName)}}
                    style={{ background: "#4481eb", color: "#fff" }}
                  >
                    Photo
                    <GetAppIcon style={{ marginLeft: 5, color: "#fff" }} />
                  </Button>
                  <Button
                    variant="contained"
                    style={{ background: "#54C401", color: "#fff" }}
                    onClick={() => {
                      console.log(e);
                      props.loadForm(e);
                    }}
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
