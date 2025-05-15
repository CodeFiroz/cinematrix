import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username : {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    profile_picture : {
        type: String,
        default: ""
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: "🍿🎥"
    },
    resetToken : {
        type: String,
        default: null
    },    
    resetTokenExpire : {
        type: Date,
        default: null
    }
});

const User = mongoose.model('User', UserSchema);

export default User;