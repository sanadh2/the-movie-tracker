import nodemailer from "nodemailer";
import { env } from "./env";

type Options = {
  otp: string | number;
  email: string;
  subject: string;
  reason?: "resetPassword" | "activateAccount";
};

export const sendMail = async (options: Options) => {
  const { reason = "activateAccount" } = options;
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT, 10),
    auth: {
      user: env.SMTP_MAIL,
      pass: env.SMTP_PASSWORD,
    },
  });
  const resetPassword = `<div style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
                         <div style="max-width: 600px; margin: auto; background: white; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 20px;">
                        <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
                        <p style="color: #555; font-size: 16px;">Hello,</p>
                        <p style="color: #555; font-size: 16px;">You requested to reset your password. Here is your One-Time Password (OTP):</p>
                        <h2 style="color: #007bff; font-size: 24px; text-align: center; border: 2px dashed #007bff; padding: 10px; display: inline-block;">
                            ${options.otp}
                        </h2>
                        <p style="color: #555; font-size: 16px;">This OTP is valid for <strong>10 minutes</strong>. Please use it to reset your password. If you did not request a password reset, please ignore this email.</p>
                        <p style="color: #555; font-size: 16px; text-align: center;">Thank you!</p>
                          </div>
                        </div>`;
  const activateAccout = `
                      <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2 style="color: #4CAF50; text-align: center;">Activate Your Account</h2>
                        <p>Hello,</p>
                        <p>Thank you for registering with <strong>THE MOVIE TRACKER</strong>. To complete the activation of your account, please use the following One-Time Password (OTP):</p>
                        <h3 style="text-align: center; color: #333; background-color: #f9f9f9; padding: 10px; border-radius: 5px;">${options.otp}</h3>
                        <p>This OTP is valid for the next 10 minutes.</p>
                        <p>If you didn’t create an account with us, you can ignore this email.</p>
                        <br>
                        <p>Best regards,</p>
                        <p><strong>THE MOVIE TRACKER</strong> Team</p>
                        <hr style="border: none; border-top: 1px solid #eee;">
                        <p style="font-size: 12px; color: #888;">This is an automated message, please do not reply.</p>
                      </div>
                      `;
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    html: reason === "resetPassword" ? resetPassword : activateAccout,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};
