import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useKenyaPhone } from "../hooks/useKenyaPhone";

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    phone,
    error,
    handlePhoneChange,
    validateForSubmit,
    setDemoPhone,
  } = useKenyaPhone("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForSubmit()) {
      return;
    }

    setIsSubmitting(true);
    login();
    navigate("/home", { replace: true });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-slate-800 selection:bg-sky-500/20 selection:text-sky-900">
      {/* فل اسکرین بیک گراؤنڈ تصویر */}
      <img
        src="/LoginPage/login.jpeg"
        alt="Login background"
        className="pointer-events-none fixed inset-0 h-full w-full object-cover object-center"
      />

      {/* نرم برفیلا ٹنٹ اور درمیان میں ہموار بلر / فیڈ تاکہ کوئی لکیر نظر نہ آئے */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-r from-sky-900/15 via-cyan-100/45 to-sky-200/75" />
      <div className="pointer-events-none fixed inset-y-0 left-1/2 hidden w-72 -translate-x-1/2 bg-white/20 blur-3xl lg:block" />

      {/* مین لے آؤٹ: بائیں طرف کھلی تصویر اور دائیں طرف لاگ ان فارم */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-10">
        {/* بایاں حصہ: فل اسکرین تصویر پر نرم کیپشن */}
        <div className="hidden lg:flex h-full flex-col justify-end pb-12 pr-8">
          <div className="max-w-md rounded-3xl border border-white/60 bg-white/35 p-6 shadow-[0_16px_40px_rgba(14,116,144,0.14)] backdrop-blur-xl">
            <span className="inline-block rounded-full border border-white/70 bg-white/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-800">
              People &amp; Profiles
            </span>
            <p className="mt-3 text-lg font-bold text-slate-900">
              Seamless &amp; Secure Access
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              Sign in with your phone number to manage and explore users.
            </p>
          </div>
        </div>

        {/* دایاں حصہ: لاگ ان فارم */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-[32px] border border-white/75 bg-white/55 p-8 sm:p-10 shadow-[0_24px_60px_rgba(14,116,144,0.18)] backdrop-blur-2xl">
            {/* ٹاپ لوگو */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white/75 p-1.5 shadow-[0_8px_24px_rgba(2,132,199,0.15)] backdrop-blur-md">
                <img
                  src="/logo/logo.jpeg"
                  alt="Site Logo"
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Welcome Back
              </h1>

              <p className="mt-2 text-sm font-medium text-slate-600">
                Enter your phone number to continue
              </p>
            </div>

            {/* فارم */}
            <form onSubmit={handleLogin} className="space-y-5" noValidate>
              <div>
                <label
                  htmlFor="phone-input"
                  className="mb-2 block pl-1 text-xs font-bold uppercase tracking-wider text-sky-900/75"
                >
                  Phone Number
                </label>

                <input
                  id="phone-input"
                  type="tel"
                  placeholder="+254712345678"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`w-full rounded-2xl border bg-white/60 px-4 py-3.5 text-base font-medium text-slate-900 placeholder:text-slate-400 backdrop-blur-md outline-none transition-all duration-200 ${
                    error
                      ? "border-rose-400/90 focus:border-rose-500 focus:ring-4 focus:ring-rose-400/20"
                      : "border-white/75 focus:border-sky-500 focus:bg-white/80 focus:ring-4 focus:ring-sky-400/25"
                  }`}
                />

                {error && (
                  <p
                    role="alert"
                    className="mt-2 pl-1 text-xs font-semibold text-rose-600"
                  >
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer rounded-2xl border border-white/60 bg-gradient-to-r from-sky-600 to-cyan-600 py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_12px_28px_rgba(2,132,199,0.28)] transition-all duration-200 hover:from-sky-500 hover:to-cyan-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* ڈیمو لاگ ان ہنٹ */}
            <div className="mt-7 border-t border-white/60 pt-5 text-center">
              <p className="text-xs font-medium text-slate-600">
                Demo Login:{" "}
                <button
                  type="button"
                  onClick={setDemoPhone}
                  className="cursor-pointer rounded-lg border border-white/70 bg-white/55 px-2.5 py-1 font-mono text-xs font-semibold text-sky-700 backdrop-blur-sm transition hover:bg-white/85"
                >
                  +254712345678
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;