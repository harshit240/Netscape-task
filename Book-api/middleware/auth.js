const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')

const CheckUserAuth = async(req,res,next)=>{
    const{token}=req.cookies;
    // console.log(token);
    if(!token){
        req.flash('error','Unauthorized user, Please Login!')
        return res.redirect('/login')
    }
    else{
        const verify_token = jwt.verify(token,process.env.JWT_SECRET_KEY)
        // console.log(verify_token);
        const data = await UserModel.findOne({_id:verify_token.userId})
        // console.log(data);
        req.data1 = data;
        next()
    }
}

module.exports= CheckUserAuth
