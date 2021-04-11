const request = require('request-promise')

const json = await request.get({
    url:`https://api.line.me/oauth2/v2.1/verify?access_token=${acessToken}`,
    json:true
})

if(json.client_id !==CHANNEL_ID){
    return 401
}

const profile = await request.get({
    url:`https://api.line.me/v2/profile`,
    headers:{Authorization:`Bearer ${accessToken}`},
    json:true
})

//revoke - clear token
await  request.post({
    url:`https://api.line.me/oauth2/v2.1/revoke`,
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    form:{
        accessToken:`${accessToken}`,
        client_id:CHANNEL_ID,
        client_secret:CHANNEL_SECRET
    }
})