var express     = require('express'),
    db	        = require('./connectMongo.js'),
    Temperature = require('./temperatureModel.js'),
    router      = express.Router()
router.get('/temperature/getTemperature',function(req,res,next) {
    var num = req.query.total
    res.end('wait ok?')
    next()

})
router.post('/temperature/saveTemperature',function(req,res,next) {
    if(req.body) {
	var data = new Temperature({time:req.body.time,temValue:req.body.temperature}).saveAndLog()
	
	res.end(JSON.stringify({success:true}))
    	next()
    }
})

module.exports = router
