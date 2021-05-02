import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchData } from "../MiddlewareComponents/RequestHandle.js";
import "./form.css";
import SnackBarComponent from "../CommonComponents/SnackBarComponent";

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

const Form = () => {
  let history = useHistory();

  const [fileName, setfileName] = useState("No file");
  const [consumerName, setConsumerName] = useState();
  const [fatherName, setFatherName] = useState();
  const [address, setAddress] = useState();
  const [Subdivision, setSubdivision] = useState();
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

  const clearForm = () => {
    setConsumerName("");
    setFatherName("");
    setAddress("");
    setSubdivision("")
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
  };

  const validateData = (payload)=> {
    let result = {
      message : "",
      status : true
    }
    if (payload.meterId === "") {
      result.message = "Please enter meter NO."
      result.status = false
    }
    if (payload.fatherName === "") {
      result.message = "Please enter father's name"
      result.status = false
    }
    if (payload.consumerName === "") {
      result.message = "Please enter consumer name"
      result.status = false
    }
    
    
    return result;
  }

  const submitForm = () => {
    console.log(
      consumerName,
      fatherName,
      address,
      Subdivision,
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
      consumerName,
      fatherName,
      address,
      Subdivision,
      accountId,
      meterId,
      district,
      meterPosition,
      sellingBookNo,
      sellingPageNo,
      installationDate,
      plasticSeal,
      originalFileName: filePath ? filePath.name : null,
    };
    let result = validateData(payload)
    if (!result.status) {
      setSeverity("warning");
      setMessage(result.message);
      setOpen(true)
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
          return history.push("/");
        }, 2000);
      }
      payload = {
        ...payload,
        fileName: data.filename,
      };
      fetchData("/submitForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then((data) => {
        setMessage(data.message);
        setSeverity("success");
        setOpen(true)
        clearForm();
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
                <i className="fa fa-address-card"></i>
                <input
                  type="text"
                  placeholder="Subdivision"
                  className="text-name"
                  value={Subdivision}
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
                  placeholder="Meter No."
                  className="text-name"
                  requiredz
                  value={meterId}
                  onChange={(e) => setMeterId(e.target.value)}
                />
                {/* <label style={{margin: 50}}
                  type="button"
                  htmlFor="fileUploaded"
                  className="label-button"
                >
                  Choose photo
                </label> */}
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
              <div className="input-name">
                <input
                  className="button"
                  type="button"
                  onClick={submitForm}
                  value="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      { open && <SnackBarComponent setOpen = {(e) => {setOpen(false)}} message={message} severity={severity}/> }
    </>
  );
};

export default Form;
