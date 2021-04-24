const proxy = 'http://ec2-3-17-161-123.us-east-2.compute.amazonaws.com:3000';

export async function fetchData(path,requestOptions) {
    let response;
    
    requestOptions.headers = {
        ...requestOptions.headers,
        'Authorization' : localStorage.accessToken
    } 

    console.log(requestOptions)
          await fetch(proxy + path,requestOptions).then(res => res.json()).then(async data =>{
          if (data.message !== "Unauthorized") {
            console.log("AUTHORIZED")
            response= data; 
          }
          else {
            console.log("Message is unauthorized Try to refresh session")
            const payload = {
                refreshToken:localStorage.refreshToken
            }
    
            const requestoptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }
            console.log("Generate new key with refresh token")
            await fetch('http://ec2-3-17-161-123.us-east-2.compute.amazonaws.com:3000/refresh_session',requestoptions).then(res => res.json()).then(data=>{
                if (data.message === "session refreshed") {
                    console.log("access token refreshed by using refreshtoken",data)
                    localStorage.accessToken  = data.accessToken
                    localStorage.refreshToken = data.refreshToken
                    response = this.fetchData(path,requestOptions,payload)
                }
                else {
                    console.log("Refresh token is also expired")
                    response = null;
                }
            })
          }
      })
      return response;
}
