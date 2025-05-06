import jwt from "jsonwebtoken"
import User from "../models/User.js"

const protectRoute = async (req, res, next) => {

    try {

        const authToken = req.cookies.authToken;

        if (!authToken) {
            return res.status(401).json({
                success: false,
                messgae: "unauthorized user"
            })
        }

        const decode = jwt.verify(authToken, process.env.JWT_SECRET);

        const findUser = await User.findById(decode.userId).select("-resetToken -resetTokenExpire");

        if (!findUser) {
            return res.status(401).json({
                success: false,
                messgae: "user not found"
            })
        }

        req.user = findUser;

        next();


    } catch (error) {
        console.log(`auth middleware stopped 🛑 :: ${error}`);
        return res.status(500).json({
            success: false,
            messgae: "Internal Server Error"
        });
    }

}

export default protectRoute;