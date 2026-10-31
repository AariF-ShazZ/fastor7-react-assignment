import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyOtp } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../utils/getErrorMessage";
import Spinner from "../components/Spinner";

export default function VerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  if (!state?.phone) return <Navigate to="/login" replace />;
  const isValid = /^\d{6}$/.test(otp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return toast.error("Enter the 6 digit OTP");

    try {
      setLoading(true);
      const { data } = await verifyOtp(state.phone, otp);
      login(data.data.token);
      toast.success("Login successful");
      navigate("/restaurants", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <h1 className="text-3xl font-bold">Verify OTP</h1>
      <p className="mt-2 text-gray-500">
        Code sent to +91 {state.phone}{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="font-medium text-orange-500"
        >
          Change
        </button>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="------"
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none focus:border-orange-500"
          autoFocus
        />

        <button
          type="submit"
          disabled={!isValid || loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {loading ? <Spinner className="h-5 w-5" /> : "Verify & Continue"}
        </button>
      </form>
    </main>
  );
}