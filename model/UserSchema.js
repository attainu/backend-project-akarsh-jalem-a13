var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    firstname :String,
    lastname:String,
    email: String,  
    phone: Number,
    password: String
    
})

// var UserSchema = new mongoose.Schema({
//     firstname:{
//         type:String,
//         required : true,
//         min:3,
//         max:255
//     },
//     lastname:{
//         type:String,
//         required : true,
//         min:3,
//         max:255
//     },
//     email: {
//         type:String,
//         required : true,
//         min:6,
//         max:255
//     },

//     phone: {
//         type:Number,
//         required : true,
//         min:6,
//         max:255
//     },
//     password:{
//         type:String,
//         required : true,
//         min:6,
//         max:1024
//     },
//     // passwordConfirmation:{
    //     type:String,
    //     required : true,
    //     min:6,
    //     max:255
    // },
    
// })

//define collection name and design of collection

mongoose.model('LoginUser',UserSchema);

module.exports = mongoose.model('LoginUser')