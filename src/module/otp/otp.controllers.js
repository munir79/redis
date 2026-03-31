import redisClient from "../../config/redis";
import { generateOTP } from "./otp.service";


// SEND OTP
export const sendOtpController = async (req, res, next) => {
  try {
    const { phone } = req.body;

    const otp = generateOTP();

    const key = `otp:${phone}`;

    // save OTP in Redis with TTL (60 sec)
    await redisClient.set(key, otp, { ex: 60 });

    console.log("OTP:", otp); // later send via SMS API

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    next(err);
  }
};

// VERIFY OTP
export const verifyOtpController = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    const key = `otp:${phone}`;

    const storedOtp = await redisClient.get(key);

    if (!storedOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP correct → delete it
    await redisClient.del(key);

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    next(err);
  }
};