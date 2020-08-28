const path    = require('path'); 
const express = require('express');
const hbs     = require('hbs') 

const geoCode  = require(path.join(__dirname,'./utils/geocode'));
const forecast = require(path.join(__dirname,'./utils/forecast'));

const app = express()
const port  = process.env.PORT || 3000

// Define pats for Express config
const publicDir    = path.join(__dirname,'../public')
const viewPath     = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
  
// Setup handlebars engine and views,partials location
app.set('view engine','hbs')
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))





app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name :'Test User'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Weather app',
        name :'created by Test User'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name :'Example help message'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address field is required.'
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        console.log(error)
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,req.query.address,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                latitude,
                longitude,
                location,
                address:req.query.address,
                forecastData
                
            })
            
        })
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
    


    
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        message: 'Help Article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        message : 'Page Not found.'
    })
})

app.listen(port,()=>{
    console.log('server is up on port 3000.')
})
