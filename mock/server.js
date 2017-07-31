var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cookieParser = require('cookie-parser')

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
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
app.get('/api/citylist', function(req, res){
	res.json(CityListData)
})

var searchListData = require('./search/list.js')
app.get('/api/search/:page/:city/:category/:keyword', function(req, res){
	const params = req.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category
    const paramsKeyword = params.keyword

    res.json(searchListData)
})

var commentData = require('./detail/comment.js')
app.get('/api/detail/comment/:id', function(req, res) {
	var id = req.params.id
	res.json(commentData)
})

var infoData = require('./detail/info.js')
app.get('/api/detail/info/:id', function(req, res) {
	var id = req.params.id
	res.json(infoData)
})

const orderList = require('./orderlist/orderList.js')
app.get('/api/orderlist/:username', function(req, res) {
	var id = req.params.username
	res.json(orderList)
})

app.post('/api/submitComment', function(req, res){
	console.log(req.body)

	res.json({
		errno: 0,
        msg: 'ok'
	})
})

app.listen(8000, function(){
	console.log('listening in the port 8000')
})