import { hash } from "bcrypt";
import _ from 'lodash';
import User from "../models/User.model.js";
import errorResponse from "../utils/errorResponse.js";
import UserValidObject from "../validators/User.joi.js";
import Token from "../models/Token.model.js";
import sendEmail from "../utils/transport.js";
import crypto from 'crypto'

export const createUser = async (req, res, next) => {
    try {
        // validate user

        const { value, error } = UserValidObject.validate(req.body)

        if (error) {

            return next(errorResponse(400, error.details[0].message))
        }
        // check if user already exists

        let user = await User.findOne({ email: value.email })
        if (user) {
            return res.status(409).json({ status: false, message: 'user exists' })
        }
        // create user

        const hashedPwd = await hash(value.password, 10)
        let newUser = new User({
            fullName: value.fullName,
            email: value.email,
            username: value.username,
            password: hashedPwd
        })


        let token = new Token({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString("hex"),
        })

        const message = `${process.env.BASE_URL}/user/verify/${newUser._id}/${token.token}`;
        const nodeRes = await sendEmail(newUser.email, "Verify Email", message);

        if (nodeRes === true) {
            await newUser.save()
            await token.save()
            res.status(200).json({
                status: true,
                message: 'a message was sent to your email. Please check to verify your account'
            })
            return
        } else {
            console.log('email not sent', nodeRes)
            res.status(500).json({
                status: false,
                message: 'error occurred'
            })
        }

       
    } catch (error) {
        console.log('error creating user', error.message)
        next(errorResponse(500, 'Unexpected error occurred'))
    }
}


export const verifyAccount = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).json({
            status: false,
            message: 'invalid link'
        });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).json({
            status: false,
            message: 'invalid link'
        });

        await User.updateOne({ _id: user._id, verified: true });
        await Token.findByIdAndRemove(token._id);

        res.json({
            status: true,
            message: 'email verified successfully'
        });
    } catch (error) {
        res.status(400).send("An error occured");
    }
}



