import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from "react";
import { fetchData } from '../MiddlewareComponents/RequestHandle';

const ListComponent = (props) => {
    const [rows,setRows] = useState([]);

    const columns = [
        { field: 'id', headerName: 'No.', width: 80, disableClickEventBubbling: true},
        { field: 'consumerName', headerName: 'Consumer name', width: 130, disableClickEventBubbling: true },
        { field: 'fatherName', headerName: 'Father name', width: 130, disableClickEventBubbling: true },
        { field: 'meterId',type:'number', headerName: 'Meter Id', width: 130,disableClickEventBubbling: true },
      ];

      useEffect(()=>{
        let payload = null;
        if (props._id) {
          payload = {
            id:props._id
          }
        } else {
          payload = {
            id:localStorage.userId
          }
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
        fetchData('/getList',requestOptions).then((data) => {
          console.log(data)
          setRows(data)
          props.callback(data);
        })
      },[])

  return (
    <>
      <div style={{ height: window.innerHeight-60, width: "100%" }}>
        <DataGrid  
          rows={rows}
          columns={columns}
          pageSize={8}
        />
      </div>
    </>
  );
};

export default ListComponent;
