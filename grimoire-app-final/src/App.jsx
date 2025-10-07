import React from 'react';
import './App.css';

// Importing placeholder assets (you'll need to provide these)
// const HeaderIcon = () => <div className="header-icon"></div>; 
// const ProfileAvatar = () => <div className="profile-avatar"></div>; 
// const DashboardIcon = () => <div className="sidebar-icon">D</div>; 
// const ChatbotIcon = () => <div className="sidebar-icon">C</div>; 
// const SetupPageIcon = () => <div className="sidebar-icon">S</div>; 
// const RemindersIcon = () => <div className="sidebar-icon">R</div>; 
// Replace the above placeholders with actual imported SVG/PNG components or use a library like react-icons.

// A component for the sidebar navigation items
const SidebarItem = ({ icon, label }) => (
  <div className={`sidebar-item ${label.toLowerCase()}`}>
    {icon}
    <span>{label}</span>
  </div>
);

// A simple card component for the main content
const Card = ({ title, children, className = '' }) => (
  <div className={`card ${className}`}>
    {title && <h2 className="card-title">{title}</h2>}
    <div className="card-content">
      {children}
    </div>
  </div>
);

function App() {
  return (
    <div className="app-container">
      {/* --- Top Header / Title Section --- */}
      <header className="main-header">
        <div className="header-icon"></div> {/* Placeholder for the top banner icon */}
        <h1 className="main-title">alchmist's grand grimoire</h1>
        <div className="profile-section">
          <div className="profile-info">
            <span className="profile-role">PERFORMER</span>
            <span className="profile-link">Profile</span>
          </div>
          <div className="profile-avatar"></div> {/* Placeholder for the profile image */}
        </div>
      </header>

      {/* --- Main Layout: Sidebar & Content Grid --- */}
      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <SidebarItem icon={<div className="sidebar-icon dashboard-icon"></div>} label="DASHBOARD" />
          <SidebarItem icon={<div className="sidebar-icon chatbot-icon"></div>} label="CHATBOT" />
          <SidebarItem icon={<div className="sidebar-icon setup-icon"></div>} label="SETUP PAGE" />
          <SidebarItem icon={<div className="sidebar-icon reminders-icon"></div>} label="REMINDERS" />
        </aside>

        {/* Content Grid */}
        <main className="content-grid">
          {/* Top Row Cards */}
          <Card title="UPCOMING POTIONS" className="card-potions">
            <p className="potion-entry">Solar Elbar (AM) - 7:50 AM</p>
            <p className="potion-entry">Lunar Draught (PM) - 7:50 PM</p>
          </Card>

          <Card title="DAILY ORACLE" className="card-oracle">
            <p className="oracle-quote">The greatest wealth is health.</p>
          </Card>

          <Card title="WELLNESS SETUP" className="card-wellness">
            <button className="setup-button">Potion Setup</button>
            <button className="setup-button">Add & Edit Medications</button>
          </Card>

          {/* Bottom Row Cards */}
          <Card title="AI HEALTH ASSISTANT (CHATBOT)" className="card-chatbot">
            <div className="chatbot-search">
              <input type="text" placeholder="Add items and doses (returned both)" />
            </div>
            <div className="chatbot-options">
                <p>Eat your cake (calories)</p>
                <p>Gave us all (nutrition)</p>
                <p>Encyelopedia (health, transit)</p>
            </div>
          </Card>

          <Card title="GREAT SKY CALENDAR" className="card-calendar">
            <div className="calendar-placeholder"></div>
          </Card>
        </main>
      </div>

      {/* --- Footer/Bottom Bar --- */}
      <footer className="footer-bar">
        <span>Team Info</span>
        <span className="footer-year">WEBSTER 2025</span>
        <span>Team Name</span>
        <span className="footer-social">@CureVerse </span>
        <div className="footer-star"></div> {/* Placeholder for the star/logo icon */}
      </footer>
    </div>
  );
}

export default App;