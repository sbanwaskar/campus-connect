import { useEffect, useState } from "react";

function OrganizerLogin({
    setShowOrganizerPortal,
    setShowDemoDashboard,
    setIsOrganizerLoggedIn,
  }) {   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    async function handleLogin() {
      
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/organizer/login`, {        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      const data = await response.json();
      localStorage.setItem("organizerToken", data.token);   
      if (response.ok) {
        setIsOrganizerLoggedIn(true);
        setShowOrganizerPortal(false);
        alert("Login successful!");
      }
            }
    
    return (
      <section className="flex-1 bg-slate-50 px-6 py-10">
       <button
        onClick={() => setShowOrganizerPortal(false)}
        className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-slate-700 hover:-translate-x-1"        >
        ← Back to Events
      </button>
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-md">
          <h1 className="text-3xl font-bold text-slate-900">
            Organizer Login
          </h1>
  
          <p className="mt-2 text-slate-600">
            Sign in to manage campus events.
          </p>
          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-slate-500 focus:outline-none"
        />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-slate-500 focus:outline-none"
      />
        <button
        onClick={handleLogin}
        className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
      >
        Login
      </button>
        <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-slate-300"></div>
        <span className="mx-4 text-sm text-slate-500">
            OR
        </span>
        <div className="h-px flex-1 bg-slate-300"></div>
        </div>
        <button
      onClick={() => {
        localStorage.setItem("showDemoDashboard", "true");
        setShowDemoDashboard(true);
      }}       
       className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
        >
        View Demo Dashboard
        </button>
        </div>
      </section>
    );
  }
  
  export default OrganizerLogin;