import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchData } from "../MiddlewareComponents/RequestHandle.js";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import "./form.css";
import SnackBarComponent from "../CommonComponents/SnackBarComponent";
import Button from "@material-ui/core/Button";
import CircularProgressBar from "../MiddlewareComponents/CircularProgressBar.jsx";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

const Form = (props) => {
  let history = useHistory();

  const [fileName, setfileName] = useState("No file");
  const [consumerName, setConsumerName] = useState();
  const [fatherName, setFatherName] = useState();
  const [address, setAddress] = useState();
  const [accountId, setAccountId] = useState();
  const [meterId, setMeterId] = useState();
  const [district, setDistrict] = useState();
  const [sellingBookNo, setSellingBookNo] = useState();
  const [sellingPageNo, setSellingPageNo] = useState();
  const [meterPosition, setMeterPosition] = useState();
  const [installationDate, setInstallationDate] = useState();
  const [plasticSeal, setPlasticSeal] = useState();
  const [filePath, setFilePath] = useState();
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const [open, setOpen] = useState();
  const [user_id, setuser_id] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [progressBar,setProgressBar] = useState(false)

  useEffect(()=>{
    if (props.formData) {
      setConsumerName(props.formData.consumerName);
      setFatherName(props.formData.fatherName);
      setAddress(props.formData.address);
      setAccountId(props.formData.accountId);
      setMeterId(props.formData.meterId);
      setMeterPosition(props.formData.meterPosition);
      setDistrict(props.formData.district);
      setSellingPageNo(props.formData.sellingPageNo);
      setSellingBookNo(props.formData.sellingBookNo);
      setInstallationDate(props.formData.installationDate);
      // setInstallationDate(props.formData.);
      setPlasticSeal(props.formData.plasticSeal);
      setfileName(props.formData.originalFileName ?? "No file");
      setFilePath("");
      setuser_id(props.formData._id);
      setEmployeeId(props.formData.userId);
      console.log(props.formData," FORM DATA")
    }
  },[])

  const clearForm = () => {
    setuser_id("")
    setConsumerName("");
    setFatherName("");
    setAddress("");
    setAccountId("");
    setMeterId("");
    setMeterPosition("");
    setDistrict("");
    setSellingPageNo("");
    setSellingBookNo("");
    setInstallationDate(new Date());
    setInstallationDate(undefined);
    setPlasticSeal("");
    setfileName("No file");
    setFilePath("");
    setEmployeeId("");
  };

  const validateData = (payload)=> {
    let result = {
      message : "",
      status : true
    }
    if (!payload.meterId) {
      result.message = "Please enter meter id"
      result.status = false
    }
    if (!payload.fatherName) {
      result.message = "Please enter father's name"
      result.status = false
    }
    if (!payload.consumerName) {
      result.message = "Please enter consumer name"
      result.status = false
    }
    
    result.status = true;
    return result;
  }

  const submitForm = () => {
    setProgressBar(true)
    console.log(
      user_id,
      consumerName,
      fatherName,
      address,
      accountId,
      meterId,
      district,
      meterPosition,
      sellingBookNo,
      sellingPageNo,
      installationDate,
      plasticSeal,
      fileName
    );
    var data = new FormData();
    data.append("fileUploaded", filePath);
    console.log(data);
    let payload = {
      user_id,  
      consumerName,
      fatherName,
      address,
      accountId,
      meterId,
      district,
      meterPosition,
      sellingBookNo,
      sellingPageNo,
      installationDate,
      plasticSeal,
      employeeId,
      originalFileName: filePath ? filePath.name : (props.formData) ? props.formData.originalFileName : null,
    };
    let result = validateData(payload)
    if (!result.status) {
      setSeverity("warning");
      setMessage(result.message);
      setOpen(true)
      setProgressBar(false)
      return;
    }

    console.log(payload)
    let requestOptions = {
      method: "POST",
      body: data,
    };
    fetchData("/upload", requestOptions).then((data) => {
      
      if (data == null) {
        setSeverity("error");
        setMessage("Unable to submit the form. Please login again.");
        setOpen(true)
        setTimeout(() => {
          setProgressBar(false)
          return history.push("/");
        }, 2000);
      }
      payload = {
        ...payload,
        fileName: data.filename,
      };
      console.log(data.fileName)
      fetchData("/submitForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then((data) => {
        setProgressBar(false)
        setMessage(data.message);
        setSeverity("success");
        setOpen(true)
        clearForm();
        if (props.formData) {props.callback()}
      });
    });
  };

  // const logOut = ()=> {
  //     localStorage.removeItem("accessToken")
  //     localStorage.removeItem("refreshToken")
  //     history.push('/')
  // }

  const handleInputSelect = (event) => {
    let name = event.target.files[0].name;

    setFilePath(event.target.files[0]);
    if (name.length >= 15) {
      name =
        name.slice(0, 13) + "..." + name.slice(name.length - 5, name.length);
    }
    setfileName(name);
  };

  return (
    <>
      {/* <div className="background-color"></div> */}
      <div className="backcontainer ">
        <div className="card-container">
          <div className="wrapper card">
          {props.formData && <Button onClick={()=>{props.callback()}}><KeyboardBackspaceIcon /></Button>}
            {window.innerWidth >480 && <h2> Data Form </h2>}
            <form
              action="http://ec2-3-17-161-123.us-east-2.compute.amazonaws.com:3000/upload"
              method="post"
              encType="multipart/form-data"
            >
              <div className="input-name">
                <i className="fa fa-user lock"></i>
                <input
                  type="text"
                  placeholder="Consumer Name"
                  value={consumerName}
                  required
                  onChange={(e) => setConsumerName(e.target.value)}
                  className="name"
                />
              </div>
              <div className="input-name">
                <i className="fa fa-user lock"></i>
                <input
                  type="text"
                  placeholder="Father Name"
                  required
                  className="name"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                />
              </div>
              <div className="input-name">
                <i className="fa fa-address-card"></i>
                <input
                  type="text"
                  placeholder="Address(village)"
                  className="text-name"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="input-name">
                <i className="fa fa-user circle-o"></i>
                <input
                  type="text"
                  placeholder="Account Id"
                  className="text-name"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                />
              </div>
              <div className="input-name">
                <i className="fa fa-calculator"></i>
                <input
                  type="text"
                  placeholder="Meter Id"
                  className="text-name"
                  requiredz
                  value={meterId}
                  onChange={(e) => setMeterId(e.target.value)}
                />
              </div>
              <div className="input-name">
                <i className="fa fa-location-arrow"></i>
                <input
                  type="text"
                  placeholder="District"
                  className="text-name"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>
              <div className="input-name">
                <i className="fa fa-line-chart"></i>
                <input
                  type="text"
                  placeholder="Meter position"
                  className="text-name"
                  value={meterPosition}
                  onChange={(e) => setMeterPosition(e.target.value)}
                />
              </div>
              <div className="input-name">
                <i className="fa fa-book"></i>
                <input
                  type="text"
                  placeholder="Selling book No."
                  className="text-name"
                  value={sellingBookNo}
                  onChange={(e) => setSellingBookNo(e.target.value)}
                />
              </div>
              <div className="input-name">
                <i className="fa fa-file-text-o"></i>
                <input
                  type="text"
                  placeholder="Selling page No."
                  className="text-name"
                  value={sellingPageNo}
                  onChange={(e) => setSellingPageNo(e.target.value)}
                />
              </div>
              <div className="input-name">
                <span style={{ marginLeft: "0px" }}>Installation date</span>
                <input
                  type="date"
                  required
                  value={installationDate}
                  onChange={(e) => setInstallationDate(e.target.value)}
                  className="text-name"
                />
              </div>
              <div className="input-name">
                <i className="fa fa-map-pin"></i>
                <input
                  type="text"
                  placeholder="Plastic seal"
                  className="text-name"
                  value={plasticSeal}
                  onChange={(e) => setPlasticSeal(e.target.value)}
                />
              </div>

              <div className=" input-name">
                <input
                  type="file"
                  id="fileUploaded"
                  name="fileUploaded"
                  hidden="hidden"
                  onChange={(event) => handleInputSelect(event)}
                />
                <label
                  type="button"
                  htmlFor="fileUploaded"
                  className="label-button"
                >
                  Choose photo
                </label>
                {/* <button type="button" id="custom-button" onClick={customButtonClick}>Choose photo</button> */}
                <span id="custom-text">{fileName} </span>
              </div>
              <div className="input-name" style={{display:"flex",justifyContent:"space-evenly"}}>
                <input
                  className="button"
                  type="button"
                  style={{marginBottom:0}}
                  onClick={submitForm}
                  value="submit"
                />
                {/* {progressBar && <CircularProgressBar style={{marginLeft:15}}/>} */}
              </div>
              {props.formData && (
                <div className="input-name" style={{marginTop:0}}>
                <input
                  className="button"
                  type="button"
                  
                  onClick={() => {
                    props.callback()
                  }}
                  value="Back"
                />
              </div>
              )}
            </form>
          </div>
        </div>
      </div>
      { open && <SnackBarComponent setOpen = {(e) => {setOpen(false)}} message={message} severity={severity}/> }
      {progressBar && <div style={{position:"absolute", top:50,left:0,height:"100%",width:"100%",backgroundColor:"rgb(123 123 123 / 69%)"}}><CircularProgressBar style={{justifyContent:"center",height:"100%",alignItems:"center"}}/></div> }
    </>
  );
};

export default Form;
