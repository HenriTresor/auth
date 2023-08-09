import mongoose, { Schema } from 'mongoose'

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    token_type: {
        type: String,
        enum:['account_verification', 'password_reset']
    }
}, {
    timestamps: true
});

const Token = mongoose.model("token", tokenSchema);

export default Token