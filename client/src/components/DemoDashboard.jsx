import { useEffect, useState } from "react";
function DemoDashboard({
  events,
  formatDate,
  setShowDemoDashboard,
}) {
  const [demoEvents, setDemoEvents] = useState(events);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    setDemoEvents(events);
  }, [events]);

  return (
    <section className="flex-1 bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <button
       onClick={() => {
        localStorage.removeItem("showDemoDashboard");
        setShowDemoDashboard(false);
      }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-slate-700 hover:-translate-x-1"
        >
          ← Back to Login
        </button>

        <h1 className="text-4xl font-bold text-slate-900">
          Demo Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
        Demo Mode — Changes are temporary and reset after refresh.        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Events
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              3
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Upcoming Events
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              3
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Top Category
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              Career
            </p>
          </div>
        </div>

        {editingEvent && (
  <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
    <label className="text-sm font-medium text-slate-700">
      Event Title
    </label>

    <input
      type="text"
      value={editingEvent.title}
      onChange={(e) =>
        setEditingEvent({
          ...editingEvent,
          title: e.target.value,
        })
      }
      className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
    />
    <button
  onClick={() => {
    setDemoEvents(
      demoEvents.map((event) =>
        event._id === editingEvent._id
          ? editingEvent
          : event
      )
    );

        setEditingEvent(null);
    }}
    className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
    >
    Save Demo Changes
    </button>
  </div>
)}

        <h2 className="mt-10 text-2xl font-bold text-slate-900">
          Existing Events
        </h2>

        <div className="mt-4 space-y-4">
          {demoEvents.map((event) => (
            <div
              key={event.title}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <h3 className="text-lg font-semibold">
                {event.title}
              </h3>

              <p className="text-slate-600">
                {event.location}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {formatDate(event.date)}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {event.category}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setEditingEvent(event)}
                  className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
                >
                  Edit
                </button>
                <button
                onClick={() => {
                    setDemoEvents(
                    demoEvents.filter((demoEvent) => demoEvent._id !== event._id)
                    );
                }}
                className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200"
                >
                Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DemoDashboard;