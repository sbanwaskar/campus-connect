function SearchBar({ searchTerm, setSearchTerm }) {
    return (
      <input
      type="text"
      placeholder="🔍 Search events, workshops, hackathons..."
      className="mt-8 w-full max-w-3xl mx-auto block rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg shadow-sm transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    );
  }
  
  export default SearchBar;