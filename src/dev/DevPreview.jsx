import React, { useEffect, useState } from "react";
import Login from "../auth/Login";
import UserProfile from "../auth/UserProfile";

export default function DevPreview() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const onLogin = (e) => setUser(e.detail);
    const onLogout = () => setUser(null);
    window.addEventListener("auth:login", onLogin);
    window.addEventListener("auth:logout", onLogout);
    return () => {
      window.removeEventListener("auth:login", onLogin);
      window.removeEventListener("auth:logout", onLogout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {!user ? (
          <Login onSuccess={setUser} />
        ) : (
          <UserProfile user={user} onLogout={() => setUser(null)} />
        )}
        <div className="rounded-xl border border-dashed p-4 text-xs text-gray-500">
          <strong>Dev preview:</strong> This page only exists in the remote for
          local testing. Host app will import <code>authApp/Login</code> and{" "}
          <code>authApp/UserProfile</code>.
        </div>
      </div>
    </div>
  );
}
