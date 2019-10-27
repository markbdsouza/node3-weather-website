const request = require('request')

const forecast = (lat, lon, callback) =>  {
    const url = "https://api.darksky.net/forecast/70262b561022eedbc2f22e4e7ac7c967/"+lat+","+lon
    request({url, json:true}, (err, {body}) => {
    if (err){
        callback('There was an error connecting to the weather API ', undefined)
    }else if (typeof body.currently === 'undefined' ){
        callback('There was an error in the paramteres', undefined)
    }
    else {
    const data = body.currently
    callback(undefined, body.daily.summary + ". It is currently " + data.temperature + " degrees and there is " + data.precipIntensity +" probablity of rain ")
    }
})
}


module.exports  = forecast