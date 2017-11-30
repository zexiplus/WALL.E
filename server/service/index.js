var express = require('express'),
    fs      = require('fs')
var router = express.Router()
router.get('/temperature/getTemperature',function(req,res,next) {
    console.log(req.params)
    fs.stat('../db/temperatureRecord.json',function(err,stats) {
        if(err) throw err
        if(stats) {
            fs.readFile('../db/temperatureRecord.json',function(err,data) {
                if(err) throw err
                else {
                    res.end(data)
                }
            })
        }
    })
    next()
})

module.exports = router