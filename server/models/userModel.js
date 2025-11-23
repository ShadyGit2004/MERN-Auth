const mongoose = require("mongoose");

const authUserSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isEmailVerified : {
        type : Boolean,
        default : false,
    },
    emailVerifyOtp : {
        type : String,
        default : "",
    },
    emailVerifyOtpExpiry : {
        type : Number,
        default : 0,
    },
    passwordResetOtp : {
        type : String,
        default : "",
    },
    passwordResetOtpExpiry : {
        type : Number,
        default : 0,
    } 
});


const userModel = mongoose.models.user || mongoose.model("user", authUserSchema);

module.exports = userModel;