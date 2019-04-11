var mongoose = require ('mongoose');

const jobSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    birth:{
        type: String,
        require: true,
        default: '/'
    },
    gender:{
        type: String,
        require: true,
        default: '/'
    },
    faculty:{
        type: String,
        require: true,
        default: '/'
    },
    message:{
        type: String,
        require: true,
        
    }
});

const Job = module.exports = mongoose.model('Job', jobSchema);