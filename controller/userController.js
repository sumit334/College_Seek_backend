import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

import User from "../model/user.js";
import Token from "../model/token.js";

dotenv.config();

export const signupUser = async (req, res) => {
    try {
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);

        const user = { username: req.body.username, name: req.body.name, password: hashedPassword };
        const newUser = new User(user);
        await newUser.save();
        return res.status(200).json({ msg: "SignUp Successful" });
    } catch (error) {
        console.log("Error while Signing Up:", error);
        return res.status(500).json({ msg: "Error in SignUp" });
    }
}

export const loginUser = async (req,res) => {
    let user= await User.findOne({username: req.body.username});//returns full object from the db, if it exists
    if(!user){
        return res.status(400).json({ msg: "Username does not match" });
    }

    try {
        let match=await bcryptjs.compare(req.body.password,user.password);
        if(match){
            const accessToken=jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '5d'});
            const refreshToken=jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken=new Token({token: refreshToken});
            await newToken.save();

            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username});
        }
        else{
            return res.status(400).json({ msg: "Password does not match" });
        }
    } catch (error) {
        return res.status(500).json({ msg: "Error while login in user" });
    }   
}


