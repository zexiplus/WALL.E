var express     = require('express'),
    db	        = require('./connection.js'),
    Temperature = require('./temperatureModel.js'),
    router      = express.Router()
router.get('/temperature/getTemperature',function(req,res,next) {
    var num = req.query.total
    Temperature.find({},(err,records) => {
	var ret = records.filter((item,index) => {
	    return (index >= (records.length - num))
	})
	res.end(JSON.stringify(ret))
   	next()
    })
})
router.post('/temperature/saveTemperature',function(req,res,next) {
    if(req.body) {
	var data = new Temperature({time:req.body.time,temValue:req.body.temperature}).saveAndLog()
	res.end(JSON.stringify({success:true}))
    	next()
    }
})

module.exports = router
