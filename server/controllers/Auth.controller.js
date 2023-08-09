import { compare } from "bcrypt"
import User from "../models/User.model.js"
import errorResponse from "../utils/errorResponse.js"
import createToken from "../utils/createToken.js"
import _ from "lodash"

const loginUser = async (req, res, next) => {

    try {

        let { email, password } = req.body
        if (!email || !password) return res.status(400).json({ status: false, message: 'provide email address and password' })

        // check if the user exists

        let user = await User.findOne({ email })
        if (!user) return res.status(404).json({ status: false, message: 'account not found. Try again.' })

        // compare passwords

        const isPasswordMatch = await compare(password, user.password)
        if (!isPasswordMatch) return res.status(400).json({ status: false, message: 'invalid email address or password' })

        // create token and send it in cookies

        const token = await createToken(user._id)
        // respond with user data

        res.status(200).json({
            status: true,
            user: _.omit(user, 'password'),
            access_token: token
        })

    } catch (error) {
        console.log("error logging in", error.message)
        res.status(500).json({ status: false, message: 'an error occurred' })
    }
}


const logoutUser = async (req, res, next) => {

}

export const getUserProfile = async (req, res, next) => {
    try {

        if (req.userId) {
            let user = await User.findOne({
                $or: [
                    { _id: req.userId },

                    { googleId: req.userId }
                ]
            }).select('-password')
            if (!user) return next(errorResponse(403, 'user was not found'));
            res.status(200).json({
                status: true,
                user
            })

            return
        }
        next(errorResponse(401, 'you are not logged in'));
    } catch (error) {
        console.log('error getting user profile', error.message)
        next(errorResponse(500, 'unexpected error occurred'));
    }
}
export { loginUser, logoutUser }