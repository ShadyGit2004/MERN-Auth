const userModel = require("../models/userModel.js");

module.exports.getUserData = async (req, res) => {

    try {
        const {id} = req.body;

        const user = await userModel.findById(id);

        if(!user){
            return res.json({
                success : false,
                message : "User not found!"
            })
        }

        return res.json({
            success : true,
            userData : {
                name : user.username,
                isAccountVerified : user.isEmailVerified
            }
        });
        
    } catch (e) {
        return res.json({
            success : false,
            message : e.message
        })
    }
};

module.exports.userController;