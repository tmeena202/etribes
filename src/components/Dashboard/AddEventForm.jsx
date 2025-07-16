import React from "react";
import { FaPlus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEventForm = ({ open, form, onChange, onSubmit, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-gradient-to-tr from-sky-100 via-emerald-50 to-blue-100 bg-blend-lighten flex items-center justify-center z-50 min-h-screen transition-all">
      <div className="bg-white rounded-2xl shadow-2xl p-10 min-w-[340px] max-w-[95vw] relative flex flex-col gap-5 animate-fadeIn">
        <button
          className="absolute top-4 right-4 bg-none border-none text-2xl text-slate-400 hover:text-blue-600 transition-colors z-10"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="mb-7 text-2xl font-extrabold text-slate-800 text-center tracking-tight flex items-center gap-2 justify-center">
          <FaPlus className="text-blue-600" /> Add Event
        </h2>
        <form
          className="flex flex-col gap-5"
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="event"
              className="text-base text-slate-800 font-semibold mb-0.5"
            >
              Event Name
            </label>
            <input
              id="event"
              name="event"
              value={form.event}
              onChange={onChange}
              required
              placeholder="Enter event name"
              className="py-2.5 px-4 border border-slate-200 rounded-lg text-base bg-slate-50 font-medium text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="agenda"
              className="text-base text-slate-800 font-semibold mb-0.5"
            >
              Agenda
            </label>
            <input
              id="agenda"
              name="agenda"
              value={form.agenda}
              onChange={onChange}
              required
              placeholder="Enter agenda"
              className="py-2.5 px-4 border border-slate-200 rounded-lg text-base bg-slate-50 font-medium text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="venue"
              className="text-base text-slate-800 font-semibold mb-0.5"
            >
              Venue
            </label>
            <input
              id="venue"
              name="venue"
              value={form.venue}
              onChange={onChange}
              required
              placeholder="Enter venue"
              className="py-2.5 px-4 border border-slate-200 rounded-lg text-base bg-slate-50 font-medium text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="datetime"
              className="text-base text-slate-800 font-semibold mb-0.5"
            >
              Date & Time
            </label>
            <DatePicker
              id="datetime"
              name="datetime"
              selected={form.datetime ? new Date(form.datetime) : null}
              onChange={(date) =>
                onChange({ target: { name: "datetime", value: date } })
              }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select date and time"
              className="py-2.5 px-4 border border-slate-200 rounded-lg text-base bg-slate-50 font-medium text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              className="bg-slate-200 text-slate-800 rounded-md px-6 py-2 text-base font-semibold transition hover:bg-slate-300 hover:text-blue-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md px-7 py-2 text-base font-bold shadow-md transition-all duration-200 hover:bg-green-600 hover:from-green-600 hover:to-green-700 focus:bg-green-600 scale-105"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm;
