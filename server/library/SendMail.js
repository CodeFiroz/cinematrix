import nodemailer from "nodemailer"
import path from "path"
import ejs from "ejs"

const sendEmail = async (sendTo, subject, template, data) => {

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const templatePath = path.join(process.cwd(), "emails", `${template}.ejs`);
        const emailHtml = await ejs.renderFile(templatePath, data);

        await transporter.sendMail({
            from: `Cinematrix. - <${process.env.EMAIL_USER}>`,
            to: sendTo,
            subject: subject,
            html: emailHtml,
        });


    } catch (error) {
        console.log(`❌📨 can't send email :: ${error}`);
    }

}

export default sendEmail;