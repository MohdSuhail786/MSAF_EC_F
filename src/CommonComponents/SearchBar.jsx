/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { fetchData } from "../MiddlewareComponents/RequestHandle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    }
  }
}));


export default function SearchBar(props) {
  const classes = useStyles();
  const [searchData,setSearchData] = useState([])
  const [style,setStyle] = useState(props.style)
  const flatData = () => {
    let result = []
    props.data.forEach(e => {
      let temp = {}
      if (e.consumerName) {temp['title'] = "Name: " + (e.consumerName); result.push(temp); temp={}}
      if (e.meterId) {temp['title'] = "Meter Id: " + e.meterId; result.push(temp); temp={}}
      if (e.accountId) {temp['title'] = "Account Id: " + e.accountId; result.push(temp); temp={}}
    });
    console.log(result,"RESULT")
    setSearchData(result)
  }

  useEffect(()=>{
    flatData();
    setStyle({background:"#fff",margin:10,...style})
    console.log(searchData)
  },[])

  const find = (arr,element)=> {
    let res = false;
    arr.forEach(e=>{
      console.log(e._id,element,"SUHAIL",e._id.toString() == element.toString())
      if (e._id.toString() == element.toString()) {
        res = true;
      }
    })
    return res;
  }

  const filterData = (value) => {
    if (!value) return;
    let result = []
    console.log(value,props.data,"THIS IS SEARCHBAR DATA")
   props.data.forEach(e => {
     value.forEach(v => {
      if (v.title[0] == "N" && e.consumerName) {
        if (v.title.slice(5).trim() == e.consumerName.trim() && !find(result,e._id)) {
          result.push(e);
        }
      }
      else if (v.title[0]=="M" && e.meterId) {
        if (v.title.slice(9).trim() == e.meterId.trim() && !find(result,e._id)) {
          result.push(e);
        }
      }
      else if (v.title[0] == "A" && e.accountId){
        if (v.title.slice(11).trim() == e.accountId.trim() && !find(result,e._id)) {
          result.push(e);
        }
      }
    })
   })
   console.log("SUHAIL",result)
   props.reRenderList(result);
  }

// props.style = {background:"#fff",margin:10,...props.style,}
console.log(props.data,"THIS IS SEARCH BAR DATA")
  return (
    <div className={classes.root} style={{transitionDuration:3}}>
      <Autocomplete
        multiple
        style={style}
        // style={props.style}
        limitTags={2}
        id="multiple-limit-tags"
        options={searchData}
        getOptionLabel={(option) => option['title']}
        defaultValue={[]}
        onChange={(event, value) => {filterData(value)}} 
        renderInput={(params) => (
          <div style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
          <TextField
            {...params}
            onClick={filterData()}
            variant="filled"
            style={{alignContent:"center"}}
            label="Search here"
            placeholder="Name, Meter Id, Account Id"
          />
          {/* <Button ></Button> */}
          </div>
        )}
      />
    </div>
  );
}