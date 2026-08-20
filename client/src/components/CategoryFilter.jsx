function CategoryFilter({
    categories,
    selectedCategory,
    setSelectedCategory,
  }) {
    return (
      <div className="mt-4 flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-lg ${
              selectedCategory === category
                ? "bg-emerald-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
  
  export default CategoryFilter;