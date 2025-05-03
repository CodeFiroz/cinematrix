import { genrateToken } from "../library/authToken.js";
import sendEmail from "../library/SendMail.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            messgae: "Missing data"
        })
    }

    try {

        const findUserByUsername = await User.findOne({ username });

        if (findUserByUsername) {
            return res.status(409).json({
                success: false,
                messgae: `${username} is already registred.`
            })
        }

        const findUserByEmail = await User.findOne({ email });

        if (findUserByEmail) {
            return res.status(409).json({
                success: false,
                messgae: `${email} is already registred.`
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const register = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await register.save();

        genrateToken(res, savedUser._id);

        sendEmail(savedUser.email, "Welcome to Cinematrix", "welcome", {username: savedUser.username, website_url: process.env.CLIENT_URL});

        return res.status(201).json({
            success: true,
            messgae: `${username} is successfully registred.`,
            savedUser
        })


    } catch (error) {
        console.log(`🤖 can't register User :: ${error}`);
        return res.status(500).json({
            success: false,
            messgae: "Internal Server Error"
        });

    }
}

