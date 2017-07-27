var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cookieParser = require('cookie-parser')

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.get('/', function(req, res){
	res.send('Hello Express')
})

app.get('/api', function(req, res){
	res.send('test data')
})

app.get('/api/1', function(req, res){
	res.send('test data 1')
})

app.get('/api/2', function(req, res){
	res.json({
		a: 1,
		b: '123'
	})
})

app.post('/api/post', function(req, res){
	console.log(req.body)
	res.send(JSON.stringify(req.body))
})

app.listen(8000, function(){
	console.log('listening in the port 8000')
})