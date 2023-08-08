import { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const UserSchema = new Schema(
    {
     
        fullName: { type: String, required: true, trim: true },
        email: { type: String, unique: true, trim: true, lowercase: true },
        username: {
            type: String,
            required: true,
            unique: true
        },

        password: { type: String },
        verified: {
            type: Boolean,
            default:false
        }
    },
    {
        timestamps: true
    }
)


const User = model('users', UserSchema)

export default User