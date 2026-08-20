function Navbar({
  setShowOrganizerPortal,
  isOrganizerLoggedIn,
  setIsOrganizerLoggedIn,
}) {return (
    <nav className="bg-slate-800 text-white px-8 py-4">
  <div className="flex items-center justify-between">
  <h1 className="text-xl md:text-2xl font-bold">
  <span className="hidden sm:inline">
    Campus Connect 
  </span>
  <span className="sm:hidden">
    Campus Events
  </span>
</h1>

{isOrganizerLoggedIn ? (
  <button
    onClick={() => {
      localStorage.removeItem("organizerToken");
      setIsOrganizerLoggedIn(false);
    }}
    className="rounded-xl border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-800"
  >
    Logout
  </button>
) : (
  <button
    onClick={() => setShowOrganizerPortal(true)}
    className="rounded-xl border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-800"
  >
    Organizer Portal
  </button>
)} 
  </div>
</nav>

);
}

export default Navbar;