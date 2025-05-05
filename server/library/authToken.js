import jwt from "jsonwebtoken";

export const genrateToken = (res, userId) => {
    try {

        const jwtToken = jwt.sign({userId}, 
        process.env.JWT_SECRET, 
        {
            expiresIn: '30d'
        })

        res.cookie(
            "authToken",
            jwtToken,
            {
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: process.env.NODE_ENV !== "development", 
                sameSite: "Strict",
                secure: process.env.NODE_ENV !== "development",
            }
          );

    } catch (error) {
        console.log(`error while genrating token "" ${error}`);

    }
}