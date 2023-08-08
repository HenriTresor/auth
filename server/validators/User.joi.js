import Joi from "joi";

const UserValidObject = Joi.object({
    fullName: Joi.string().min(4).max(100).required(),
    email: Joi.string().email().min(5).max(100).required(),
    username: Joi.string().required(),
    password: Joi.string().min(5).max(100).required()
})

export default UserValidObject