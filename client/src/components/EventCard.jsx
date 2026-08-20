function EventCard({ title, date, time, location, category, onSelect, isFavorite, onFavorite, onDelete, onEdit, isAdmin, }) {    return (
<div
  onClick={onSelect}
  className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300" >       
   <div className="flex justify-between items-center mb-2">
  <h2 className="text-xl font-bold">
    {title}
  </h2>

  {!isAdmin && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onFavorite();
    }}
  >
    {isFavorite ? "⭐" : "☆"}
  </button>
)}

</div>
  
        <p className="text-sm font-medium text-slate-500 mb-1">
        📅 {date}
        </p>
        <p className="text-gray-600 mb-2">
          {time}
            </p>
            <p className="text-gray-600 mb-2">
            {location}
            </p>
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
          {category}
   </span>

   {isAdmin && (
  <div className="mt-4 flex gap-4">
    <button
      onClick={(e) => {
        e.stopPropagation();
        onEdit();
      }}
      className="text-sm text-blue-600 hover:underline"
    >
     ✏️ Edit
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      className="text-sm text-red-600 hover:underline"
    >
     🗑 Delete
      </button>
        </div>
      )}
    </div>
  );
}

  
  export default EventCard;