const path = require("path")
const express = require('express')
const hbs = require("hbs")
const forecast = require('./utils/forecast')
const geocd = require('./utils/geocd')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirPath = path.join(__dirname,'..','public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine and views location 
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name : 'Mark DSouza'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name : 'Mark DSouza'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        name : 'Mark Dsouza',
        help : 'This is the help page. Below are some FAQs'
    })
})


app.get('/help/*',(req,res)=> {
    res.render('error',{
        title: '404',
        name : 'Mark Dsouza',      
        errormsg : 'the help article not found'
    })

})


app.get('/weather', (req,res)=> {
    if(!req.query.address) {
        const error= 'A valid address must be provided'
        return res.send({error})
    }
    geocd(req.query.address, (error, {Latitude, Longtitude,Location } = {} ) => {
        if (error){
            return res.send({error})
        }
        //res.send (data)
        forecast(Latitude, Longtitude, (errForecast,dataForecast) => {
            if(errForecast){
                return res.send({errForecast})
            }
            res.send({
        requestedaddress : req.query.address,
        ActualLocation : Location,
        Latitude ,
        Longtitude,
        forecast : dataForecast        
    })
        })

    })
       
    
    //res.send(sendback)
})

app.get('/products', (req,res) => 
{   if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send(
        {products:'t shirt'
    })
})

app.get('*', (req,res)=> {
    res.render('error', {
        title: '404',
        name : 'Mark Dsouza',
      
        errormsg: 'My 404 Page' 
    })  
})





app.listen(port, () => {console.log('Server is up @port' + port )})