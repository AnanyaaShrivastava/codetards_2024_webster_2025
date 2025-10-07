import React from 'react';
import './App.css';

// This component represents a navigation link
const NavLink = ({ children }) => (
  <li className="nav-item">
    <a href="#">&gt; {children}</a>
  </li>
);

function App() {
  return (
    <div className="dashboard-container">
      <h1 className="main-title">Alchemist's Grand Grimoire</h1>
      
      {/* Navigation Section */}
      <div className="section">
        <h2 className="section-title">Navigation</h2>
        <ul className="nav-list">
          <NavLink>Profile</NavLink>
          <NavLink>Dashboard</NavLink>
          <NavLink>Chatbot</NavLink>
          <NavLink>Setup Page</NavLink>
          <NavLink>Reminders</NavLink>
        </ul>
      </div>

      {/* Upcoming Potions Section */}
      <div className="section">
        <h2 className="section-title">Upcoming Potions</h2>
        <ul className="potion-list">
          <li className="potion-item">&gt; Solar Elixir (AM) - 7:50 AM</li>
          <li className="potion-item">&gt; Lutrar Draught (PM) - 7:50 PM</li>
        </ul>
      </div>

      {/* Daily Oracle Section */}
      <div className="section">
        <h2 className="section-title">Daily Oracle</h2>
        <p className="daily-oracle-text">"The greatest wealth is health."</p>
      </div>
      
      {/* Wellness Setup Section */}
      <div className="section">
         <h2 className="section-title">Wellness Setup</h2>
         <div className="wellness-setup-buttons">
           <button className="potion-button secondary">Potion Setup</button>
           <button className="potion-button">Add & Edit Medications</button>
         </div>
      </div>

    </div>
  );
}

export default App;