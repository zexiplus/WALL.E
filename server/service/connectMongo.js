var mongoose = require('mongoose')
var db = mongoose.connect('mongodb://pi:0211@ds141766.mlab.com:41766/iot_db')
db.connection.on('error', err => { console.error('connect fail',err) })
db.connection.on('open', () => { console.log('connected to ds141766.mlab.com:41766/iot_db') })
module.exports = db
