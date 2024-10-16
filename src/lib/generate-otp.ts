/**
 * Generates a one-time password (OTP) with a specified length.
 *
 * @param {number} [length=6] The length of the OTP to generate.
 * @returns {string} A string containing the generated OTP.
 */
export const generateOTP = (length: number = 6): string => {
  let otp = "";
  const digits = "0123456789";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
};
