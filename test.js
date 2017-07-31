require('whatwg-fetch')
fetch('http://cdn.code.baidu.com/imgs/angular.js.png').then(function(res){
	return res.json()
})
.then(function(res){
	console.log(res)
})