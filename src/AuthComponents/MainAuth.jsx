import React ,{useState} from 'react';
import Login from './Login';
import Register from './Register';
import Panel from './Panel';
import './Auth.css';
import SnackBarComponent from '../CommonComponents/SnackBarComponent';


const MainAuth = (props) => {
    const [value,setValue] = useState("container")
    const [open,setOpen] = useState(false)
    const [message,setMessage] = useState("")
    const [severity,setSeverity] = useState("success")
    
    return (
        <div className={value}>
            <div className="forms-container">
                <div className="signin-signup">
                    <Login callback={()=>props.callback()} setOpen = {(e)=>{setOpen(e)}} setMessage={(e) => {setMessage(e); console.log(e)}} setSeverity = {(e) => setSeverity(e)}/>
                    <Register onChange = {(e) => {setValue(e)}} setOpen = {(e)=>{setOpen(e)}} setMessage={(e) => {setMessage(e); console.log(e)}} setSeverity = {(e) => setSeverity(e)}/>
                </div>
            </div>
            <Panel onChange = {(e) => {setValue(e)}}/>
            { open && <SnackBarComponent setOpen = {(e) => {setOpen(false)}} message={message} severity={severity}/> }
        </div>
    )
}

export default  MainAuth;