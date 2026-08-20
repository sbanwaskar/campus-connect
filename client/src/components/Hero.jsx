import SearchBar from "./SearchBar";
import OrganizerLogin from "./OrganizerLogin";
import CategoryFilter from "./CategoryFilter";
import EventGrid from "./EventGrid";
import DemoDashboard from "./DemoDashboard";
import { useEffect, useState } from "react";
// import EventCard from "./EventCard";
const API_URL = `${import.meta.env.VITE_API_URL}/events`;

function Hero({
    showOrganizerPortal,
    setShowOrganizerPortal,
    showDemoDashboard,
    setShowDemoDashboard,
    isOrganizerLoggedIn,
    setIsOrganizerLoggedIn,
  }) {
    const [events, setEvents] = useState([]);

      const categories = [
        "All",
        "Academic",
        "Career",
        "Workshop",
        "Networking",
        "Sports",
        "Community",
        "Hackathon",
      ];
      const [selectedEvent, setSelectedEvent] = useState("");
      const [searchTerm, setSearchTerm] = useState("");
      const [selectedCategory, setSelectedCategory] = useState("All");
      const [favoriteEvents, setFavoriteEvents] = useState([]);
      const isAdmin = isOrganizerLoggedIn;   
      const [newEvent, setNewEvent] = useState({
      title: "",
        date: "",
        time: "",
        location: "",
        category: "",
        description: "",
      });
      const [editingEventTitle, setEditingEventTitle] = useState(null);
      useEffect(() => {
        loadEvents();
      }, []);
      
      async function loadEvents() {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error("Failed to load events.");
          }
          
          const data = await response.json();
          setEvents(data);
        } catch (error) {
          console.error("Error loading events:", error);
        }
      }

    //   function handleToggleEvents() {
    //     setShowEvents(!showEvents);
    //   }
      function handleSelectEvent(event) {
        setSelectedEvent(event);
      }
      function handleFavoriteEvent(eventTitle) {
        if (!favoriteEvents.includes(eventTitle)) {
          setFavoriteEvents([...favoriteEvents, eventTitle]);
        }
      }
      function handleRemoveFavorite(eventTitle) {
        setFavoriteEvents(
          favoriteEvents.filter(
            (event) => event !== eventTitle
          )
        );
      }
      async function handleAddEvent() {
  if (!newEvent.title) {
    alert("Please enter an event title.");
    return;
  }

  if (!newEvent.date) {
    alert("Please enter an event date.");
    return;
  }

  if (!newEvent.time) {
    alert("Please enter an event time.");
    return;
  }

  if (!newEvent.location) {
    alert("Please enter an event location.");
    return;
  }

  if (!newEvent.category) {
    alert("Please select a category.");
    return;
  }

  if (!newEvent.description) {
    alert("Please enter an event description.");
    return;
  }

  try {

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("organizerToken")}`,
      },
      body: JSON.stringify(newEvent),
    });
    if (!response.ok) {
        throw new Error("Failed to add event.");
      }

    await loadEvents();

    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      category: "",
      description: "",
    });
  } catch (error) {
    console.error("Error adding event:", error);
  }
}
async function handleDeleteEvent(eventTitle) {
  
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
  
    if (!confirmDelete) {
      return;
    }
  
    try {
        const response = await fetch(
        `${API_URL}/${encodeURIComponent(eventTitle)}`,          
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("organizerToken")}`,
          },
        }
          );
          
          if (!response.ok) {
            throw new Error("Failed to delete event.");
          }
  
      await loadEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }
  function handleEditEvent(event) {
    setNewEvent({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      description: event.description,
    });
  
    setEditingEventTitle(event.title);
  }
      async function handleSaveChanges() {
        if (!newEvent.title) {
            alert("Please enter an event title.");
            return;
          }
          if (!newEvent.date) {
            alert("Please enter an event date.");
            return;
          }
          if (!newEvent.time) {
            alert("Please enter an event time.");
            return;
          }
          if (!newEvent.location) {
            alert("Please enter an event location.");
            return;
          }
        if (!newEvent.category) {
          alert("Please select a category.");
          return;
        }
        if (!newEvent.description) {
  alert("Please enter an event description.");
  return;
}
      
        try {
            const response = await fetch(
              `${API_URL}/${encodeURIComponent(editingEventTitle)}`,
        {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("organizerToken")}`,
            },
            body: JSON.stringify(newEvent),
        }
        );
        if (!response.ok) {
            throw new Error("Failed to update event.");
          }
      
          await loadEvents();
      
          setEditingEventTitle(null);
      
          setNewEvent({
            title: "",
            date: "",
            time: "",
            location: "",
            category: "",
            description: "",
          });
        } catch (error) {
          console.error("Error updating event:", error);
        }
      }
      function formatTime(time) {
        if (!time) return "";
      
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(hours, minutes);
      
        return date.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        });
      }
      function formatDate(date) {
        if (!date) return "";
      
        const [year, month, day] = date.split("-");
      
        return new Date(year, month - 1, day).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }


      const filteredEvents = events.filter((event) => {
        const matchesSearch = event.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      
        const matchesCategory =
          selectedCategory === "All" ||
          event.category === selectedCategory;
      
        return matchesSearch && matchesCategory;
      });
  

      if (showDemoDashboard) {
        return (
          <DemoDashboard
        events={events}
        formatDate={formatDate}
        setShowDemoDashboard={setShowDemoDashboard}
      />
              ); }

      if (showOrganizerPortal) {
        return (
            <section className="flex-1 bg-slate-50 px-6 py-10">
          <OrganizerLogin
        setShowOrganizerPortal={setShowOrganizerPortal}
        setShowDemoDashboard={setShowDemoDashboard}
        setIsOrganizerLoggedIn={setIsOrganizerLoggedIn}
     />
          </section>
        );
      }
      return (

<section className="flex-1 bg-slate-50 px-6 py-6">
<div className="max-w-5xl mx-auto">
    <div className="text-center pt-8 pb-6">  <h1 className="text-5xl font-extrabold text-slate-900">
    Connecting students with opportunities across campus.
  </h1>

  <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
  Discover what's happening on campus.
</p>
</div>

    
    <SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>

<CategoryFilter
  categories={categories}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
/>
{selectedEvent && (
  <div className="mt-6 bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
    <h3 className="font-bold text-emerald-700">
      Selected Event
    </h3>
   

    <p className="mt-1 font-semibold">
      {selectedEvent.title}
    </p>

    <p className="text-sm text-gray-600">
    {formatDate(selectedEvent.date)}
    </p>
    <p className="text-sm text-gray-600">
    Time: {formatTime(selectedEvent.time)}
        </p>

        <p className="text-sm text-gray-600">
        Location: {selectedEvent.location}
        </p>

    <p className="text-sm text-gray-600">
      {selectedEvent.category}
    </p>
    <p className="mt-3 text-gray-700">
        {selectedEvent.description}
        </p>
  </div>
)}


    <EventGrid
  filteredEvents={filteredEvents}
  favoriteEvents={favoriteEvents}
  handleFavoriteEvent={handleFavoriteEvent}
  handleRemoveFavorite={handleRemoveFavorite}
  handleDeleteEvent={handleDeleteEvent}
  handleEditEvent={handleEditEvent}
  handleSelectEvent={handleSelectEvent}
  formatDate={formatDate}
  formatTime={formatTime}
  isAdmin={isAdmin}
/>


{isAdmin && (
<div className="mt-12">
  <h2 className="text-2xl font-bold mb-4">
    Manage Events
  </h2>
  <input
  type="text"
  placeholder="Event Title"
  value={newEvent.title}
  onChange={(e) =>
    setNewEvent({ ...newEvent, title: e.target.value })
  }
  className="border p-2 rounded-lg w-full"
/>
<input
    type="date"
    placeholder="Date"
    value={newEvent.date}
    onChange={(e) =>
      setNewEvent({ ...newEvent, date: e.target.value })
    }
    className="border p-2 rounded-lg w-full mt-3"
/>
<input
  type="time"
  placeholder="Time"
  value={newEvent.time}
  onChange={(e) =>
    setNewEvent({
      ...newEvent,
      time: e.target.value,
    })
  }
  className="border p-2 rounded-lg w-full mt-3"
/>
<input
  type="text"
  placeholder="Location"
  value={newEvent.location}
  onChange={(e) =>
    setNewEvent({
      ...newEvent,
      location: e.target.value,
    })
  }
  className="border p-2 rounded-lg w-full mt-3"
/>
<select
  value={newEvent.category}
  onChange={(e) =>
    setNewEvent({
      ...newEvent,
      category: e.target.value,
    })
  }
  className="border p-2 rounded-lg w-full mt-3"
>
<option value="">Select a category</option>
<option>Academic</option>
<option>Career</option>
<option>Workshop</option>
<option>Networking</option>
<option>Sports</option>
<option>Community</option>
<option>Hackathon</option>
</select>
<textarea
  placeholder="Description"
  value={newEvent.description}
  onChange={(e) => 
    setNewEvent({
      ...newEvent,
      description: e.target.value,
    })
  }
  className="border p-2 rounded-lg w-full mt-3"
/>
<button
onClick={
    editingEventTitle
      ? handleSaveChanges
      : handleAddEvent
  }  className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
>
{editingEventTitle ? "Save Changes" : "Add Event"}
</button>
</div>
)}
</div>
    </section>
  );
}

export default Hero;