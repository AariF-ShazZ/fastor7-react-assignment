import api from "./client";
const DIAL_CODE = "+91";
export const sendOtp = (phone) =>
  api.post(
    "/v1/pwa/user/register",
    new URLSearchParams({ phone, dial_code: DIAL_CODE })
  );
export const verifyOtp = (phone, otp) =>
  api.post(
    "/v1/pwa/user/login",
    new URLSearchParams({ phone, otp, dial_code: DIAL_CODE })
  );