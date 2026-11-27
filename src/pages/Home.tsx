import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, type User } from "../services/userService";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError("Unable to fetch users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-200 via-cyan-100 to-indigo-200 text-slate-800 overflow-x-hidden selection:bg-sky-500/20 selection:text-sky-900">
      {/* برفیلے بیک گراؤنڈ کے گلو ایفیکٹس */}
      <div className="pointer-events-none fixed -top-32 -left-24 h-96 w-96 rounded-full bg-white/75 blur-3xl" />
      <div className="pointer-events-none fixed top-1/2 -right-24 h-96 w-96 rounded-full bg-sky-400/25 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 left-1/3 h-96 w-96 rounded-full bg-cyan-300/35 blur-3xl" />

      {/* Winter Glass Navbar */}
      <nav className="sticky top-0 z-20 border-b border-white/65 bg-white/45 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white/75 p-1 shadow-sm backdrop-blur-md">
              <img
                src="/logo/logo.jpeg"
                alt="User Dashboard Logo"
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              User <span className="text-sky-600">Dashboard</span>
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="cursor-pointer rounded-2xl border border-white/75 bg-white/55 px-4 py-2.5 text-sm font-bold text-rose-600 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-white/80 active:scale-[0.98]"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* ہیڈر اور کاؤنٹر */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Users
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Manage and explore all registered users.
            </p>
          </div>

          {!loading && !error && (
            <div className="w-fit rounded-2xl border border-white/75 bg-white/50 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md">
              Showing{" "}
              <span className="font-bold text-sky-700">
                {filteredUsers.length}
              </span>{" "}
              of <span className="font-bold text-slate-900">{users.length}</span>{" "}
              users
            </div>
          )}
        </div>

        {/* گلاس سرچ بار */}
        <div className="mb-8">
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-4 text-sky-700/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Search by name, username or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/75 bg-white/55 pl-12 pr-11 py-4 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-500 shadow-[0_10px_30px_rgba(14,116,144,0.08)] backdrop-blur-xl outline-none transition-all duration-200 focus:border-sky-500 focus:bg-white/75 focus:ring-4 focus:ring-sky-400/20"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3.5 cursor-pointer rounded-xl border border-white/70 bg-white/60 p-1.5 text-slate-600 transition hover:bg-white hover:text-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-[28px] border border-white/70 bg-white/45 py-20 text-center shadow-[0_16px_40px_rgba(14,116,144,0.1)] backdrop-blur-xl">
            <p className="text-lg font-bold text-sky-700">Loading users...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-rose-300/80 bg-rose-100/75 p-6 text-center text-sm font-bold text-rose-700 backdrop-blur-md">
            {error}
          </div>
        )}

        {/* Users List */}
        {!loading && !error && (
          <>
            {filteredUsers.length === 0 ? (
              <div className="rounded-[28px] border border-white/70 bg-white/45 p-12 text-center shadow-[0_16px_40px_rgba(14,116,144,0.1)] backdrop-blur-xl">
                <p className="text-base font-bold text-slate-700">
                  No users found.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-col justify-between rounded-[28px] border border-white/75 bg-white/45 p-6 shadow-[0_18px_45px_rgba(14,116,144,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/60"
                  >
                    <div>
                      {/* یوزر ہیڈر */}
                      <div className="mb-5 flex items-center gap-4">
                        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white/65 text-lg font-extrabold text-sky-700 shadow-sm">
                          {user.name.charAt(0)}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-lg font-extrabold text-slate-900">
                            {user.name}
                          </h3>
                          <p className="truncate text-sm font-medium text-sky-700">
                            @{user.username}
                          </p>
                        </div>
                      </div>

                      {/* شفاف انفو باکس */}
                      <div className="space-y-2.5 rounded-2xl border border-white/65 bg-white/40 p-4 text-sm text-slate-700 backdrop-blur-md">
                        <p className="truncate">
                          <span className="font-bold text-slate-900">Email:</span>{" "}
                          {user.email}
                        </p>

                        <p className="truncate">
                          <span className="font-bold text-slate-900">Phone:</span>{" "}
                          {user.phone}
                        </p>

                        <p className="truncate">
                          <span className="font-bold text-slate-900">Company:</span>{" "}
                          {user.company.name}
                        </p>

                        <p className="truncate">
                          <span className="font-bold text-slate-900">City:</span>{" "}
                          {user.address.city}
                        </p>
                      </div>
                    </div>

                    {/* View Details گلاس بٹن */}
                    <Link
                      to={`/user/${user.id}`}
                      className="mt-6 block rounded-2xl border border-white/60 bg-gradient-to-r from-sky-600 to-cyan-600 py-3 text-center text-sm font-bold text-white shadow-[0_10px_24px_rgba(2,132,199,0.25)] transition-all duration-200 hover:from-sky-500 hover:to-cyan-500 active:scale-[0.99]"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Home;