const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserController {

    static register = async (req, res) => {
        // console.log(req.body);
        const { name, email, password } = req.body;
        const admin = await userModel.findOne({ email: email });
        if (!admin) {
            if (name && email && password) {
                if (password) {
                    try {
                        const hashpassword = await bcrypt.hash(password, 10);
                        // console.log(hashpassword);
                        const result = await userModel({
                            name: name,
                            email: email,
                            password: hashpassword,
                        })
                        await result.save();
                        res.status(201).send({
                            status: "success",
                            message: "Registration Successful 😃🍻",
                        });
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    console.log("Password and Confirm password does not match");
                }
            }
        } else {
            res.status(201).json({
                status: 'failed',
                message: 'user already exists'
            });
        }

    };

    static login = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await userModel.findOne({ email: email })
                if (user != null) {
                    const isMatched = await bcrypt.compare(password, user.password)
                    if ((user.email === email) && isMatched) {
                        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
                            expiresIn: '20m'
                        });
                        res.cookie("token", token);
                        res.status(201).json({
                            status: "success",
                            message: "login successfully with web token 😃🍻",
                            Token: token,
                            user
                        });

                    }
                    else {
                        res.status(500).json({
                            status: "failed",
                            message: "Enter correct credentials",
                        });
                    }
                } else {
                    console.log('You are not a registered user');
                    res.status(500).json({
                        status: 'error',
                        message: 'Internal server error'
                    });
                }
            } else {
                console.log('EMail and Password Required')
                res.status(500).json({
                    status: 'error',
                    message: 'Internal server error'
                });
            }
        } catch (err) {
            console.log(err);


        }
    }

}
module.exports = UserController