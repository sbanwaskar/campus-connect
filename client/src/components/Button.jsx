function Button({ text }) {
    return (
      <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-300">
        {text}
      </button>
    );
  }
  
  export default Button;