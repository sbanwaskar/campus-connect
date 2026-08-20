import EventCard from "./EventCard";

function EventGrid({
  filteredEvents,
  favoriteEvents,
  handleFavoriteEvent,
  handleRemoveFavorite,
  handleDeleteEvent,
  handleEditEvent,
  handleSelectEvent,
  formatDate,
  formatTime,
  isAdmin,
}) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {filteredEvents.map((event) => (
        <EventCard
          key={event.title}
          title={event.title}
          date={formatDate(event.date)}
          time={formatTime(event.time)}
          location={event.location}
          category={event.category}
          onSelect={() => handleSelectEvent(event)}
          isFavorite={favoriteEvents.includes(event.title)}
          onFavorite={() => {
            if (favoriteEvents.includes(event.title)) {
              handleRemoveFavorite(event.title);
            } else {
              handleFavoriteEvent(event.title);
            }
          }}
          onDelete={() => handleDeleteEvent(event.title)}
          onEdit={() => handleEditEvent(event)}
          isAdmin={isAdmin}
        />
      ))}

      {filteredEvents.length === 0 && (
        <p className="text-gray-600 mt-4">
          No events found. Try searching for something else.
        </p>
      )}
    </div>
  );
}

export default EventGrid;