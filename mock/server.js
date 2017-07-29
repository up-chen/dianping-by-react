var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cookieParser = require('cookie-parser')

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

var HomeAdData = require('./home/ad.js')
app.get('/api/homead', function(req, res){
	res.json(HomeAdData)
})

var HomeListData = require('./home/list.js')
app.get('/api/homelist', function(req, res){
	var query = req.query
	var city = query.city
	var page = query.p

	res.json(HomeListData)
})

var CityListData = require('./cityList')
app.get('/api/cityList', function(req, res){
	res.json(CityListData)
})

app.listen(8000, function(){
	console.log('listening in the port 8000')
})