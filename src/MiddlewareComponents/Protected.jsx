import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom'


const Protected = (props) => {
    let history = useHistory();
    console.log(props)
    let Component = props.Comp;

    useEffect(()=>{
        
        let payload = {
            accessToken:localStorage.accessToken
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }
        fetch('http://ec2-3-17-161-123.us-east-2.compute.amazonaws.com:3000/validate',requestOptions).then(res =>res.json()).then(data => {
            if (data.message === "Done") {
                console.log("Validation done")
                if (data.type === 2) 
                    history.push('/form')
                else 
                    history.push('/admin')
            }
            else {
                console.log("Validation of accesstoken failed")
                const payload = {
                    refreshToken:localStorage.refreshToken
                }
        
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }
                console.log("Generate new key with refresh token")
                fetch('http://ec2-3-17-161-123.us-east-2.compute.amazonaws.com:3000/refresh_session',requestOptions).then(res => res.json()).then(data=>{
                    if (data.message === "session refreshed") {
                        console.log("access token refreshed by using refreshtoken")
                        localStorage.accessToken  = data.accessToken
                        localStorage.refreshToken = data.refreshToken
                        if (data.type === 2)
                            history.push('/form')
                        else 
                            history.push('/admin')
                    }
                    else {
                        console.log("Refresh token is also expired")
                        history.push('/');
                    }
                })
            }
        })
       
    },[history])

    return <Component />;
}

export default (Protected);