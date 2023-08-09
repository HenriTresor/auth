import { hash } from "bcrypt";
import _ from 'lodash';
import User from "../models/User.model.js";
import errorResponse from "../utils/errorResponse.js";
import UserValidObject from "../validators/User.joi.js";
import Token from "../models/Token.model.js";
import sendEmail from "../utils/transport.js";
import crypto from 'crypto'
import createToken from '../utils/createToken.js'

export const createUser = async (req, res, next) => {
    try {

        const { value, error } = UserValidObject.validate(req.body)

        if (error) {
            return res.status(400).json({ status: false, message: error.details[0].message })
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

        await newUser.save()
        const access_token = await createToken(newUser._id)
        res.status(201).json({ status: true, access_token, user: _.pick(newUser, ['_id', 'fullName', 'email', 'username', 'verified', 'createdAt']) })
    } catch (error) {
        console.log('error creating user', error.message)
        next(errorResponse(500, 'Unexpected error occurred'))
    }
}

export const requestVerifyToken = async (req, res, next) => {
    try {

        let { userId, token_type, email } = req.body
        let user;
        if (email) {
            user = await User.findOne({ email })
        }
        else {
            user = await User.findById(userId)
        }
        if (!user) return res.status(404).json({ status: false, message: 'user was not found' })

        let token = new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
            token_type
        })

        const verifyMessage = `${process.env.BASE_URL}/users/verify/${user._id}/${token.token}`;
        const resetMessage = `${process.env.BASE_URL}/password/reset/${user._id}/${token.token}`
        const nodeRes = await sendEmail(user.email, "Verify Email", token_type === 'password_reset' ? resetMessage : verifyMessage);

        if (nodeRes === true) {
            await token.save()
            res.status(200).json({
                status: true,
                message: 'a link was sent to your email address. Please check.'
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
        console.log('error requesting verifyToken', error.message)
        res.status(500).json({ status: false, message: 'an error occurred' })
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




export const resetPassword = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}