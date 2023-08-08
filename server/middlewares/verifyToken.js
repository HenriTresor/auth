import { verify } from "jsonwebtoken"
import errorResponse from "../utils/errorResponse.js"

export default async (req, res, next) => {
    try {
        let authToken = req.headers['authorization'].split(' ')[1]
        if (!authToken) return next(errorResponse(401, 'provide access token cookie'))

        let decodedToken = await verify(authToken, 'my-secret-key')
        if (!decodedToken) throw new Error('access token is not valid')
        req.userId = decodedToken.id
        next()
    } catch (error) {
        console.log('error loggin in', error.message)
        next(errorResponse(401, 'check your token'))
    }
}