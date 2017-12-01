var express = require('express'),
    fs      = require('fs')
var router = express.Router()
router.get('/temperature/getTemperature',function(req,res,next) {
    var index = req.query.total;
    var	arr;
    fs.readFile('./server/db/temperatureRecord.txt','utf8',function(err,data) {
	if(err) throw err
	arr = data.split(';')
	res.end(JSON.stringify(arr.slice(arr.length - index - 1,arr.length - 1)))
	next()
    })
})
router.post('/temperature/saveTemperature',function(req,res,next) {
    if(req.body) {
	var str = JSON.stringify({label:req.body.time,val:req.body.temperature}) + ';'
	fs.writeFile('./server/db/temperatureRecord.txt',str,{flag:'a'},function(err) {
	    if(err) throw err	
	    console.log('str saved')
	    res.end(JSON.stringify({success:true}))
    	    next()
	})
    }
})

module.exports = router
