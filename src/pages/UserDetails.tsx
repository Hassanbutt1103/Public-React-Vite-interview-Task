import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById, type User } from "../services/userService";

function UserDetails() {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          throw new Error("Invalid user ID");
        }

        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-200 via-cyan-100 to-indigo-200 px-4 text-slate-800 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/80 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-sky-400/25 blur-3xl" />
        <div className="relative flex items-center gap-3 rounded-3xl border border-white/80 bg-white/55 px-8 py-6 text-base font-bold text-sky-800 shadow-[0_16px_40px_rgba(14,116,144,0.14)] backdrop-blur-2xl">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-sky-600/30 border-t-sky-600" />
          <span>Loading user details...</span>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-200 via-cyan-100 to-indigo-200 px-4 text-slate-800 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/80 blur-3xl" />
        <div className="relative w-full max-w-md rounded-3xl border border-white/80 bg-white/55 p-8 text-center shadow-[0_20px_50px_rgba(14,116,144,0.16)] backdrop-blur-2xl">
          <p className="text-base font-bold text-rose-600">
            {error || "User not found"}
          </p>

          <Link
            to="/home"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/70 bg-gradient-to-r from-sky-600 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:from-sky-500 hover:to-cyan-500"
          >
            <span>←</span>
            <span>Back to Users</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-200 via-cyan-100 to-indigo-200 px-4 py-8 sm:py-10 text-slate-800 overflow-x-hidden selection:bg-sky-500/20 selection:text-sky-900">
      {/* برفیلے بیک گراؤنڈ کے گلو ایفیکٹس */}
      <div className="pointer-events-none fixed -top-32 -left-24 h-96 w-96 rounded-full bg-white/80 blur-3xl" />
      <div className="pointer-events-none fixed top-1/2 -right-24 h-96 w-96 rounded-full bg-sky-400/25 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 left-1/3 h-96 w-96 rounded-full bg-cyan-300/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* ٹاپ گلاس ٹول بار */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/80 bg-white/50 px-5 py-3.5 shadow-[0_12px_35px_rgba(14,116,144,0.12)] backdrop-blur-2xl">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/65 px-4 py-2 text-sm font-bold text-sky-800 shadow-sm transition-all duration-200 hover:bg-white/90"
          >
            <span>←</span>
            <span>Back to Users</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <img
              src="/logo/logo.jpeg"
              alt="Site Logo"
              className="h-8 w-8 rounded-xl border border-white/80 object-cover shadow-sm"
            />
            <span className="text-xs font-bold uppercase tracking-wider text-sky-900/75">
              User Profile #{user.id}
            </span>
          </div>
        </div>

        {/* مین پروفائل Winter Glass کارڈ */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/45 shadow-[0_24px_60px_rgba(14,116,144,0.16)] backdrop-blur-2xl">
          {/* ٹاپ آئس ہائی لائٹ */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-sky-400/70 via-white to-cyan-400/70" />

          {/* پروفائل ہیڈر */}
          <div className="border-b border-white/65 bg-gradient-to-r from-sky-600/85 via-cyan-600/85 to-sky-700/85 px-6 sm:px-8 py-10 text-center text-white backdrop-blur-xl">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/85 bg-white/85 text-3xl font-extrabold text-sky-700 shadow-lg backdrop-blur-md">
              {user.name.charAt(0)}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {user.name}
            </h1>

            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full border border-white/35 bg-white/15 px-3.5 py-1 text-xs sm:text-sm font-semibold text-sky-50 backdrop-blur-sm">
                @{user.username}
              </span>
              <span className="rounded-full border border-white/35 bg-white/15 px-3.5 py-1 text-xs sm:text-sm font-semibold text-sky-50 backdrop-blur-sm">
                {user.address.city}
              </span>
            </div>
          </div>

          {/* تفصیلات گرڈ */}
          <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2">
            {/* Personal Information */}
            <div className="rounded-3xl border border-white/75 bg-white/45 p-6 shadow-sm backdrop-blur-md">
              <div className="mb-5 flex items-center justify-between border-b border-white/70 pb-3">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Personal Information
                </h2>
                <span className="rounded-lg border border-white/80 bg-white/60 px-2.5 py-0.5 text-[11px] font-bold text-sky-700">
                  Contact
                </span>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="rounded-2xl border border-white/65 bg-white/50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-800/75">
                    Email
                  </p>
                  <p className="mt-0.5 break-all font-semibold text-slate-800">
                    {user.email}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/65 bg-white/50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-800/75">
                    Phone
                  </p>
                  <p className="mt-0.5 font-semibold text-slate-800">
                    {user.phone}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/65 bg-white/50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-800/75">
                    Website
                  </p>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 inline-flex items-center gap-1 font-bold text-sky-700 underline decoration-sky-500/40 underline-offset-4 transition hover:text-sky-900"
                  >
                    <span>{user.website}</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="rounded-3xl border border-white/75 bg-white/45 p-6 shadow-sm backdrop-blur-md">
              <div className="mb-5 flex items-center justify-between border-b border-white/70 pb-3">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Address Information
                </h2>
                <span className="rounded-lg border border-white/80 bg-white/60 px-2.5 py-0.5 text-[11px] font-bold text-sky-700">
                  Location
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3.5 text-sm sm:grid-cols-2">
                <div className="rounded-2xl border border-white/65 bg-white/50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-800/75">
                    Street
                  </p>
                  <p className="mt-0.5 font-semibold text-slate-800">
                    {user.address.street}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/65 bg-white/50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-800/75">
                    Suite
                  </p>
                  <p className="mt-0.5 font-semibold text-slate-800">
                    {user.address.suite}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/65 bg-white/50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-800/75">
                    City
                  </p>
                  <p className="mt-0.5 font-semibold text-slate-800">
                    {user.address.city}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/65 bg-white/50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-800/75">
                    Zip Code
                  </p>
                  <p className="mt-0.5 font-semibold text-slate-800">
                    {user.address.zipcode}
                  </p>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="rounded-3xl border border-white/75 bg-white/45 p-6 shadow-sm backdrop-blur-md md:col-span-2">
              <div className="mb-5 flex items-center justify-between border-b border-white/70 pb-3">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Company Information
                </h2>
                <span className="rounded-lg border border-white/80 bg-white/60 px-2.5 py-0.5 text-[11px] font-bold text-sky-700">
                  Organization
                </span>
              </div>

              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <div className="rounded-2xl border border-white/65 bg-white/50 px-4 py-3.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-800/75">
                    Company Name
                  </p>
                  <p className="mt-0.5 text-base font-bold text-slate-900">
                    {user.company.name}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/65 bg-white/50 px-4 py-3.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-800/75">
                    Catch Phrase
                  </p>
                  <p className="mt-0.5 font-medium italic text-slate-700">
                    "{user.company.catchPhrase}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;