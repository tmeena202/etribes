import React from 'react';
import './AddEventForm.css';

const AddEventForm = ({ onClose }) => {
  return (
    <div className="add-event-modal-bg">
      <div className="add-event-modal">
        <div className="add-event-header">
          <h2>Add Event</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form className="add-event-form">
          <label>
            <span>*Event Title</span>
            <input type="text" placeholder="" required />
          </label>

          <label>
            <span>*Agenda</span>
            <textarea rows={6} placeholder="" required />
          </label>

          <label>
            <span>*Venue</span>
            <input type="text" placeholder="" required />
          </label>

          <div className="add-event-row">
            <label>
              <span>*Date</span>
              <input type="date" required />
            </label>
            <label>
              <span>*Time</span>
              <input type="time" required />
            </label>
          </div>

          <div className="add-event-row">
            <label>
              <span>Do you want send Reminder?</span>
              <input type="text" placeholder="Yes" />
            </label>
            <label>
              <span>Send Reminder To</span>
              <input type="text" placeholder="Only Approved Members" />
            </label>
          </div>

          <label>
            <span>Invitation Image</span>
            <input type="file" />
          </label>

          <button type="submit" className="btn-primary" style={{marginTop: 16}}>Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm; 