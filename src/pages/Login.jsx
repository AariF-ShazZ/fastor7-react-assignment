import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sendOtp } from "../api/auth";
import { getErrorMessage } from "../utils/getErrorMessage";
import Spinner from "../components/Spinner";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isValid = /^\d{10}$/.test(phone);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return toast.error("Enter a valid 10 digit mobile number");

    try {
      setLoading(true);
      await sendOtp(phone);
      toast.success("OTP sent");
      navigate("/verify", { state: { phone } });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <h1 className="text-3xl font-bold">Welcome 👋</h1>
      <p className="mt-2 text-gray-500">Enter your mobile number to continue</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="flex items-center rounded-xl border border-gray-300 bg-white focus-within:border-orange-500">
          <span className="border-r border-gray-300 px-4 py-3 text-gray-600">+91</span>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="Mobile number"
            className="w-full rounded-r-xl px-4 py-3 outline-none"
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={!isValid || loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {loading ? <Spinner className="h-5 w-5" /> : "Send OTP"}
        </button>
      </form>
    </main>
  );
}