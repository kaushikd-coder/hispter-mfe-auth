import React from "react";
import "../index.css";

const UserProfile = ({ user, onLogout }) => {
  const logout = () => {
    window.dispatchEvent(new CustomEvent("auth:logout"));
    onLogout?.();
  };



  if (!user) {
    return (
      <div className="rounded-xl border border-dashed p-5 text-gray-600">
        No user is logged in.
      </div>
    );
  }

  return (
    // ProfilePanel.jsx
    <div className="min-h-[calc(90vh-64px)]  relative flex items-center justify-center px-6 py-12">
      {/* soft radial glow behind the card */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(20,184,166,0.2),transparent_60%)]" />

      <section className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0e3a38]/80 shadow-2xl shadow-black/40 backdrop-blur-md">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar (initials) */}
            <div className="grid h-14 w-14 place-items-center rounded-full bg-teal-500 text-lg font-semibold text-white shadow">
              {(user.name || "A").slice(0, 1)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{user.name}</h1>
              <p className="text-sm text-teal-300">{user.email}</p>
            </div>
          </div>

          {/* Role badge */}
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-200">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5">
              <path
                fill="currentColor"
                d="M10 2a6 6 0 0 0-6 6v2.1l-1.2 3A1 1 0 0 0 3.7 14h12.6a1 1 0 0 0 .9-1.4l-1.2-3V8a6 6 0 0 0-6-6Zm0 16a4 4 0 0 1-3.6-2h7.2A4 4 0 0 1 10 18Z"
              />
            </svg>
            {user.role}
          </span>
        </div>

        {/* Body */}
        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-white/80">
              Account
            </h2>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 h-[110px]">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-white/60">Name</dt>
                  <dd className="font-medium text-white">{user.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/60">Email</dt>
                  <dd className="font-medium text-white">{user.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/60">Role</dt>
                  <dd className="font-medium text-white">{user.role}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-white/80">
              Security
            </h2>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 h-[110px]">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-white/70">
                    Two-factor authentication
                  </span>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
                    Enabled
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-white/70">Last login</span>
                  <span className="text-white font-medium">
                    {new Date().toLocaleString()}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-row justify-end gap-3 border-t border-white/10 p-6 ">
          <button
            onClick={logout}
            className="inline-flex items-center cursor-pointer justify-center rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200 hover:bg-red-500/20"
          >
            Logout
          </button>

          {/* <div className="flex gap-3">
        <button
          type="button"
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
        >
          Edit profile
        </button>
        <button
          type="button"
          className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 focus:ring-2 focus:ring-teal-300"
        >
          Manage account
        </button>
      </div> */}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
