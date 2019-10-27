const request = require('request')

const geocd = (placeName, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ placeName + ".json?access_token=pk.eyJ1IjoibWFya2Rzb3V6YSIsImEiOiJjazI3ZXh1MnMwZmVsM2VtamRhOWRtZ2I0In0.YK0PyWrXRxlmdz97DMVM5g&limit=1"
    request({url, json:true}, (error, {body}) => {
        if (error){
            callback('THere was connectivity error', undefined)
        }else if (body.features.length == 0){
            callback('Could not find the location',undefined)
            }
        else {
            const data = body
            const url = 'https://api.darksky.net/forecast/70262b561022eedbc2f22e4e7ac7c967/'+  data.features[0].center[1]+ "," + data.features[0].center[0]
            callback(undefined, {
                Location : data.features[0].place_name,
                Latitude : data.features[0].center[1] ,
                Longtitude : data.features[0].center[0] 
            })
            }
})
}


module.exports = geocd