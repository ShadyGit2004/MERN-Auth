const userModel = require("../models/userModel");

const transporter = require("../config/nodemailer")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const {USER_REGISTER_TEMPLATE, EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE} = require("../config/emailTemplates");

module.exports.register = async (req, res) => {
    let {username, email, password} = req.body; 

    console.log({username, email, password});

    if(!username || !email || !password){
        return res.json({
            success : false,
            message : "Data should not be empty",
        });
    }
    
    try {

        let existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.json({
                success : false,
                message : "User already exist",
            });
        };
        
        let hashPassword = await bcrypt.hash(password, 10); 

        let user = new userModel({
            username,
            email,
            password : hashPassword
        });

        await user.save();
    
        console.log(user);

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "7d"});
        
        res.cookie('token' , token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge : 7 * 24 * 60 * 60 * 1000,
        });

        const mailOptions = {
            from : process.env.COMPANY_EMAIL,
            to : email,
            subject : "Welcome to Rajat's platform",
            // text :  `Welcome to Rajat's website. Your account has been created with email id : ${email}`,
            html : USER_REGISTER_TEMPLATE.replace("{{name}}", user.username).replace("{{email}}", email),
        };

        await transporter.sendMail(mailOptions);
        
        return res.json({
            success : true,
            message : "Resgisterd successfully"
        });

    } catch (e) {
        console.log(e);
        return res.json({
            success : false,
            message : e.message
        });
    }
};

module.exports.login = async (req, res) => {
    let {username, password} = req.body;

    if(!username || !password){
        return res.json({
            success : false,
            message : "Username or password is missing!",
        });
    }

    try {

        let user = await userModel.findOne({username});

        if(!user){
            return res.json({
                success : false,
                message : "Invalid username!",
            });
        };   

        let isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({
                success : false,
                message : "Invalid password!",
            });
        };

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "7d"});
        
        res.cookie('token' , token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge : 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            success : true,
            message : "Login successfully"
        });
        
    } catch (e) {
        return res.json({
            success : false,
            message : e.message,
        });
    }
};

module.exports.logout = async (req, res) => {
    try {
        
    res.clearCookie('token', {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({
        success : true,
        message : "Logout successfully"
    });

    } catch (e) {
        return res.json({
            success : false,
            message : e.message,
        });
    }
};

module.exports.sendVerifyOtp = async (req, res) => {
   try {
        const {id} = req.body;
        const user = await userModel.findById(id);

        if(!user){
            return res.json({
                success : false,
                message : "User not found!",
            });
        };

        if(user.isEmailVerified){
            return res.json({
                success : true,
                message : "Account already verified!",
            });
        };

        const otp = String(Math.floor(Math.random() * 900000 + 100000));

        user.emailVerifyOtp = otp;
        user.emailVerifyOtpExpiry = Date.now() + 1 * 60 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from : process.env.COMPANY_EMAIL,
            to : user.email,
            subject : "Account verification OTP",
            // text : `Your OTP is ${otp}. Verify your account using this OTP. `,
            html : EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email),
        };

        await transporter.sendMail(mailOptions);

        return res.json({
            success : true,
            message : "Verification OTP sent to your email",
        });
        
    } catch (e) {
        return res.json({
            success : false,
            message : e.message,
        });  
    }
};

module.exports.verifyEmail = async (req, res) => {
    
    const {id, otp} = req.body;

    if(!id || !otp){
        return res.json({
            success : false,
            message : "Missing Details",
        });
    }

    try {
        const user = await userModel.findById(id);

        if(!user){
            return res.json({
                success : false,
                message : "User not found!",
            });
        };

        if(user.emailVerifyOtp = "" || otp !== user.emailVerifyOtp){
            return res.json({
                success : false,
                message : "Invalid OTP",
            });
        };

        if(user.emailVerifyOtpExpiry < Date.now()){
            return res.json({
                success : false,
                message : "OTP is Expired",
            });
        }

        user.isEmailVerified = true;
        user.emailVerifyOtp = "";
        user.emailVerifyOtpExpiry = 0;
        await user.save();

        return res.json({
            success : true,
            message : "Account verified successfully",
        });
        
    } catch (e) {
        return res.json({
            success : false,
            message : e.message,
        });  
    }
};

module.exports.isAuthenticated = async (req, res) => {
    try {
        return res.json({
            success : true,
            message : "User is Authenticated",
        });
    } catch (e) {
        res.json({
            success : false,
            message : e.message,
        });
    }
};

module.exports.sendResetOtp = async (req, res) => {
    let {email} = req.body;

    if(!email){
        return res.json({
            success : false,
            message : "Email is required"
        })
    };

    try {
        const user = await userModel.findOne({email});
        
        if(!user){
            return res.json({
                success : false,
                message : "User not found"
            })
        };

        const otp = String(Math.floor(Math.random() * 900000 + 100000));

        console.log(otp);        

        user.passwordResetOtp = otp;
        user.passwordResetOtpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from : process.env.COMPANY_EMAIL,
            to : user.email,
            subject : "Password Reset OTP",
            // text : `Your OTP for resetting your password is ${otp}.
            // Use this OTP to proceed with resetting your password`,            
            html : PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email),
        };

        await transporter.sendMail(mailOptions);

        return res.json({
            success : true,
            message : "Reset OTP sent to your email"
        });

    } catch (e) {
        return res.json({
            success : false,
            message : e.message
        })
    }
};

module.exports.resetPassword = async (req, res) => {
    let {otp, newPassword, email} = req.body;   

    if(!otp || !newPassword || !email){
        return res.json({
            success : false,
            message : "Email, OTP and New password are required"
        });
    };

    try {

        const user = await userModel.findOne({email});        

        if(!user){
            return res.json({
                success : false,
                message : "User not found"
            })
        }

        if(user.passwordResetOtp === "" || user.passwordResetOtp !== otp){
            return res.json({
                success : false,
                message : "Invalid OTP",
            });
        }

        if(user.passwordResetOtpExpiry < Date.now()){
            return res.json({
                success : false,
                message : "OTP is Expired",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.passwordResetOtp = "";
        user.passwordResetOtpExpiry = 0;
        await user.save();

        return res.json({
            success : true,
            message : "Password has been reset successfully"
        });
        
    } catch (e) {
        return res.json({
            success : false,
            message : e.message
        })
    }
};

