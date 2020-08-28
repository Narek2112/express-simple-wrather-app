const request = require('request')

const forecast = (lat,lng,address,callback) => {



    const url ='http://api.weatherstack.com/current?access_key=a2077043de36f89fddd770fe0a0b27ac&query='+encodeURIComponent(address)

    request({url,json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect Weather Web services!',undefined)
        }else if(body.error){
            callback('Unable to find location.Try another search',undefined)
        }else{
            callback(undefined,body)
        }
    })

}

module.exports = forecast




