import { genrateToken } from "../library/authToken.js";
import sendEmail from "../library/SendMail.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

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

        sendEmail(savedUser.email, "Welcome to Cinematrix", "welcome", { username: savedUser.username, website_url: process.env.CLIENT_URL });

        return res.status(201).json({
            success: true,
            messgae: `${username} is successfully registred.`
        })


    } catch (error) {
        console.log(`🤖 can't register User :: ${error}`);
        return res.status(500).json({
            success: false,
            messgae: "Internal Server Error"
        });

    }
}

export const loginUser = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            messgae: "Missing data"
        })
    }

    try {

        const findUser = await User.findOne({
            $or: [{ username }, { email: username }]
        })

        if (!findUser) {
            return res.status(400).json({
                success: false,
                messgae: `${username} not found.`
            })
        }

        const MatchPassword = await bcrypt.compare(password, findUser.password);

        if (!MatchPassword) {
            return res.status(400).json({
                success: false,
                messgae: `Incorrect password.`
            })
        }




        genrateToken(res, findUser._id);

        return res.status(200).json({
            success: true,
            messgae: `logged in`
        })

    } catch (error) {
        console.log(`🤖 can't login User :: ${error}`);
        return res.status(500).json({
            success: false,
            messgae: "Internal Server Error"
        });
    }
}

export const sendResetLink = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({
            success: false,
            messgae: "Missing data"
        })
    }

    try {

        const findUser = await User.findOne({
            $or: [{ username }, { email: username }]
        })

        if (!findUser) {
            return res.status(400).json({
                success: false,
                messgae: `${username} not found.`
            })
        }

        const UserEmail = findUser.email;

        const newResetToken = jwt.sign({
            userid: findUser._id
        }, process.env.JWT_SECRET, { expiresIn: '15m' });

        const resetLink = `${process.env.CLIENT_URL}/reset-password/${newResetToken}`;
        const hashToken = await bcrypt.hash(newResetToken, 10);

        findUser.resetToken = hashToken;
        findUser.resetTokenExpire = Date.now() + 15 * 60 * 1000;

        await findUser.save();

        sendEmail(UserEmail, "Reset Your Password", "reset-link", { resetLink: resetLink, username: findUser.username })

        return res.status(200).json({
            success: true,
            messgae: `reset email is send`
        })

    } catch (error) {
        console.log(`can't send reset link :: ${error}`);
        return res.status(500).json({
            success: false,
            messgae: "Internal Server Error"
        });
    }
}

export const ResetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
        return res.status(400).json({
            success: false,
            messgae: "no token found"
        })
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            messgae: "empty new password"
        })
    }

    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const findUser = await User.findById(decode.userid);

        if (!findUser) {
            return res.status(400).json({
                success: false,
                messgae: `Invalid or expired token`
            })
        }


        if (findUser.resetTokenExpire < Date.now()) {
            return res.status(400).json({
                success: false,
                messgae: `Token has expired.`
            });
        }

        const isValidToken = await bcrypt.compare(token, findUser.resetToken);
        if (!isValidToken) {
            return res.status(400).json({
                success: false,
                messgae: `Invalid or expired token`
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        findUser.resetToken = null;
        findUser.resetTokenExpire = null;
        findUser.password = hashPassword;

        await findUser.save();

        sendEmail(findUser.email, "Password Changed", "reset-password", { username: findUser.username });

        return res.status(200).json({
            success: true,
            messgae: `Password is changed`
        })

    } catch (error) {
        console.log(`can't reset password :: ${error}`);
        return res.status(500).json({
            success: false,
            messgae: "Internal Server Error"
        });
    }
}

export const getCurrentUser = async (req, res) => {
    try {

        const { user } = req.user;

        return res.status(200).json({
            success: true,
            messgae: `signed in user`,
            user
        })

    } catch (error) {
        console.log(`can't get user :: ${error}`);
        return res.status(500).json({
            success: false,
            messgae: "Internal Server Error"
        });
    }
}

export const logoutUser = (req, res) => {
    try {

        res.clearCookie("authToken");

        res.status(200).json({
            success: true,
            message: "logout succesfully ✅"
        })

    } catch (err) {
        console.log(`logout error :: ${err}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
