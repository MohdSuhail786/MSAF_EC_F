import React from 'react';
import registerIcon from '../icons/register.svg';
import logIcon from '../icons/log.svg';

const Panel = (props) => {
    return (
        <div className="panels-container">
            <div className="panel left-panel">
            <div className="content">
                <h3>New here ?</h3>
                <p>
                Lets move towards the signup page
                </p>
                <button className="btn transparent" id="sign-up-btn" onClick={()=>{props.onChange("container sign-up-mode")}}>
                Sign up
                </button>
            </div>
            <img src={logIcon} className="image" alt="" />
            </div>
            <div className="panel right-panel">
            <div className="content">
                <h3>One of us ?</h3>
                <p>
                Lets move towards the signin page
                </p>
                <button className="btn transparent" id="sign-in-btn" onClick={()=>{props.onChange("container")}} >
                Sign in
                </button>
            </div>
            <img src={registerIcon} className="image" alt="" />
            </div>
      </div>
    )
}

export default Panel;