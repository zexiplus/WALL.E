var mongoose = require('mongoose')
var temSchema = mongoose.Schema({
    time: {
      	type: String,
      	required: true
    },
    temValue: {
      	type: Number,
      	required: true
    }
})

temSchema.methods.saveAndLog = function() {
    return this.save((err,doc) => {
	     if(err) console.log('error at saving temperature')
    })
}
var Temperature = mongoose.model('temperature',temSchema)
module.exports = Temperature
