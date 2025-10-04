import React, { useState } from 'react';
import { MessageSquare, Twitter, Zap, Moon, Send } from 'lucide-react';

// --- Configuration and Colors ---
const customColors = {
  deepBlue: '#0f0f1a', 
  midBlue: 'rgba(26, 30, 58, 0.6)', 
  cardBorder: '#a08a42', 
  cardBg: 'rgba(35, 42, 69, 0.5)', 
  textLight: '#e0cfa0', 
  userBubble: 'rgba(59, 67, 97, 0.5)', 
};
const BACKGROUND_IMAGE_URL = "uploaded:WhatsApp Image 2025-10-04 at 12.16.41 AM.jpeg";

// --- Helper Components ---

// Custom icon handler to unify lucide icons and custom SVGs
const CustomIcon = ({ Icon, size = 18 }) => (
  <div className="w-5 h-5 flex items-center justify-center">
    <Icon size={size} style={{ color: customColors.textLight }} />
  </div>
);

// Component for a single navigation link
const NavItem = ({ name, Icon, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center p-1.5 cursor-pointer transition-all duration-300 rounded-lg hover:bg-opacity-50 hover:bg-cardBorder
      ${isActive ? 'bg-cardBorder bg-opacity-20 border-l-4 border-cardBorder' : 'border-l-4 border-transparent'}`}
  >
    <CustomIcon Icon={Icon} size={18} />
    <span className="mt-0.5 text-[10px] font-medium text-center" style={{ color: customColors.textLight }}>
      {name}
    </span>
  </div>
);

// Component for the content cards
const DashboardCard = ({ title, children, className = '' }) => (
  <div
    className={`p-2 rounded-lg shadow-2xl border-2 transition-transform duration-300 hover:scale-[1.01] ${className}`}
    style={{
      backgroundColor: customColors.cardBg,
      borderColor: customColors.cardBorder,
      boxShadow: `0 0 10px ${customColors.cardBorder}50, 0 4px 15px ${customColors.deepBlue}aa`,
    }}
  >
    <h3 className="text-sm font-serif mb-2 uppercase tracking-wider" style={{ color: customColors.textLight }}>
      {title}
    </h3>
    {children}
  </div>
);

// --- Dashboard Card Components ---

const UpcomingPotionsCard = () => (
  <DashboardCard title="UPCOMING POTIONS" className="lg:col-span-1">
    <div className="space-y-1 text-xs" style={{ color: customColors.textLight }}>
      <div className="flex items-center space-x-1 p-0.5 bg-white bg-opacity-5 rounded-md transition duration-300 hover:bg-opacity-10">
        <Zap size={14} className="text-yellow-400" />
        <span>Solar Elixir (AM) - 7:50 AM</span>
      </div>
      <div className="flex items-center space-x-1 p-0.5 bg-white bg-opacity-5 rounded-md transition duration-300 hover:bg-opacity-10">
        <Moon size={14} className="text-indigo-400" />
        <span>Lutrar Draught (PM) - 7:50 PM</span>
      </div>
    </div>
  </DashboardCard>
);

const DailyOracleCard = () => (
  <DashboardCard 
      title="DAILY ORACLE" 
      className="lg:col-span-1 flex flex-col justify-center items-center text-center min-h-[128px]" 
  >
    <p className="text-2xl italic font-serif my-1 leading-relaxed" style={{ color: customColors.textLight }}>
      The greatest wealth is health.
    </p>
  </DashboardCard>
);

const WellnessSetupCard = () => (
  <DashboardCard title="WELLNESS SETUP" className="lg:col-span-1 space-y-1.5">
    <button
      className="w-full p-1.5 font-semibold text-xs rounded-lg transition-all duration-300 hover:brightness-110"
      style={{ backgroundColor: customColors.cardBorder, color: customColors.midBlue }}
    >
      Potion Setup
    </button>
    <button
      className="w-full p-1.5 font-semibold text-xs rounded-lg border-2 transition-all duration-300 hover:bg-white hover:bg-opacity-5"
      style={{ borderColor: customColors.cardBorder, color: customColors.textLight }}
    >
      Add & Edit Medications
    </button>
  </DashboardCard>
);

const ChatbotCard = () => (
    <DashboardCard title="AI HEALTH ASSISTANT (CHATBOT)" className="lg:col-span-2 h-full flex flex-col">
        <div className="flex flex-col h-full space-y-2 flex-1">
            <div className="flex-1 overflow-y-auto p-2 space-y-2 mb-1 rounded-lg" style={{ backgroundColor: customColors.midBlue }}>
                <p className="text-xs italic p-1 text-center" style={{ color: customColors.cardBorder }}>
                    Query the Oracle's wisdom to begin your journey...
                </p>
                {/* Mock chat bubbles */}
                <div className={`flex justify-end`}>
                    <div className={`p-1.5 rounded-xl max-w-[80%] text-[10px] rounded-br-none shadow-md`} style={{ backgroundColor: customColors.userBubble, color: customColors.textLight, border: `1px solid ${customColors.cardBorder}50` }}>
                      What is the elixir for sound sleep?
                    </div>
                </div>
                <div className={`flex justify-start`}>
                    <div className={`p-1.5 rounded-xl max-w-[80%] text-[10px] rounded-tl-none shadow-md`} style={{ backgroundColor: customColors.cardBg, color: customColors.textLight, border: `1px solid ${customColors.cardBorder}50` }}>
                      The *Draught of Somnus* requires three pinches of lunar dust and the sap of the Elder Tree, gathered at midnight.
                    </div>
                </div>
            </div>
            {/* Static Input Area */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Ask your query..."
                className="flex-1 p-1.5 rounded-l-lg bg-white bg-opacity-10 border border-cardBorder focus:ring focus:ring-cardBorder focus:ring-opacity-50 transition-colors duration-200 text-xs"
                style={{ color: customColors.textLight }}
                disabled
              />
              <button
                className="p-1.5 rounded-r-lg flex items-center justify-center transition-colors duration-300 disabled:opacity-50 hover:brightness-110"
                style={{ backgroundColor: customColors.cardBorder, color: customColors.midBlue }}
                disabled
              >
                <Send size={14} />
              </button>
            </div>
          </div>
    </DashboardCard>
);

const CalendarCard = () => (
    <DashboardCard title="GREAT SKY CALENDAR" className="lg:col-span-1 h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-full aspect-square max-w-[160px] border border-cardBorder p-3 rounded-lg grid grid-cols-7 grid-rows-7 gap-0.5">
              {Array.from({ length: 49 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-full aspect-square rounded-sm ${i % 8 === 0 ? 'bg-cardBorder' : 'bg-white bg-opacity-10'} transition duration-500 hover:bg-opacity-20`}
                ></div>
              ))}
            </div>
        </div>
    </DashboardCard>
);

// --- Structural Components ---

const HeaderContent = () => (
  <header 
    className="p-1 grid grid-cols-1 md:grid-cols-3 items-center border-b-2 shrink-0" 
    style={{ borderColor: customColors.cardBorder, backgroundColor: customColors.midBlue }}
  >
    <div className="hidden md:block"></div>
    <div className="col-span-1 flex flex-col items-center justify-center mb-1 md:mb-0">
      {/* Ornate Crest SVG */}
      <svg width="25" height="15" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cardBorder">
        <path d="M2 24V14H0L10 0L20 14H18V24H2Z" fill="currentColor"/>
        <path d="M22 24V14H20L30 0L40 14H38V24H22Z" fill="currentColor"/>
        <path d="M20 14L15 2H25L20 14Z" fill={customColors.deepBlue}/>
        <path d="M10 0L20 14H0L10 0Z" fill={customColors.deepBlue}/>
        <path d="M30 0L40 14H20L30 0Z" fill={customColors.deepBlue}/>
        <path d="M10 0L20 14L30 0" stroke={customColors.cardBorder} strokeWidth="1" strokeLinejoin="round"/>
        <circle cx="20" cy="1" r="1" fill={customColors.cardBorder}/>
      </svg>
      <h1 className="text-xl font-serif mt-0.5 tracking-widest text-center" 
        style={{ color: customColors.textLight, textShadow: `0 0 10px ${customColors.textLight}90, 0 0 5px ${customColors.textLight}80` }}>
        alchemist's grand grimoire
      </h1>
    </div>
    <div className="col-span-1 flex items-center justify-center md:justify-end space-x-2">
      <div className="text-right">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: customColors.textLight }}>PERFORMER</p>
        <p className="text-xxs italic" style={{ color: customColors.cardBorder }}>Profile</p>
      </div>
      <div className="w-7 h-7 rounded-full border-2 overflow-hidden flex items-center justify-center" style={{ borderColor: customColors.cardBorder }}>
        <div className="bg-gray-600 w-full h-full"></div>
      </div>
    </div>
  </header>
);

const FooterContent = () => (
  <footer
    className="p-1 flex flex-col md:flex-row justify-between items-center text-xxs border-t-2 shrink-0 relative"
    style={{ borderColor: customColors.cardBorder, backgroundColor: customColors.midBlue }}
  >
    <div className="flex space-x-3 mb-0.5 md:mb-0" style={{ color: customColors.textLight }}>
      <span>Team Info</span>
      <span>WEBSTER 2025</span>
      <span>Team Name</span>
    </div>
    <div className="flex items-center space-x-2" style={{ color: customColors.textLight }}>
      <span>© CureVerse</span>
      <Twitter size={12} className="text-blue-400" />
    </div>
    {/* Star Icon */}
    <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2">
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cardBorder">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
      </div>
  </footer>
);

const DashboardGrid = () => (
  <div className="grid grid-rows-2 gap-2 p-2 h-full"> 
    
    {/* Grid Row 1 (Auto Height) - Three smaller cards */}
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 shrink-0 h-auto">
      <UpcomingPotionsCard />
      <DailyOracleCard />
      <WellnessSetupCard />
    </div>

    {/* Grid Row 2 (Remaining Height: 1fr) - Two large cards */}
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 min-h-0">
      <ChatbotCard />
      <CalendarCard />
    </div>
    
  </div>
);

// --- Main App Component ---

const App = () => {
  const [activePage, setActivePage] = useState('DASHBOARD');
  
  // Sidebar navigation data (Icons updated to match reference image 84a58b.jpg)
  const navItems = [
    { name: 'DASHBOARD', icon: ({ size }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-2 2-2 3 2 4 2 3-2 4-2 3 2 4 2V4C15 4 12 2 10 2S7 4 4 4V15z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>)},
    { name: 'CHATBOT', icon: MessageSquare },
    { name: 'SETUP PAGE', icon: ({ size }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"></circle><path d="M12 22s-8-4-8-10c0-4.42 3.58-8 8-8s8 3.58 8 8c0 6-8 10-8 10z"></path></svg>)},
    { name: 'REMINDERS', icon: ({ size }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.44a2 2 0 0 0-2 2h-.44a2 2 0 0 0-2 2v.44a2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 0 2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 0 2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.44a2 2 0 0 0 2-2h.44a2 2 0 0 0 2-2v-.44a2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2h-.44a2 2 0 0 0-2-2v-.44a2 2 0 0 0-2-2h-.44a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"></circle></svg>)},
  ];

  return (
    <div className="min-h-screen font-sans flex flex-col" 
         style={{ 
            color: customColors.textLight, 
            backgroundColor: customColors.deepBlue,
            backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
         }}
    >
      
      <HeaderContent />

      <div id="content-wrapper" className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside
          className="w-full md:w-24 p-1.5 border-b-2 md:border-r-2 md:border-b-0 flex flex-col justify-start space-y-2 shrink-0 h-full"
          style={{ borderColor: customColors.cardBorder, backgroundColor: customColors.midBlue }}
        >
          {navItems.map(item => (
            <NavItem 
                key={item.name} 
                name={item.name} 
                Icon={item.icon} 
                isActive={activePage === item.name} 
                onClick={() => setActivePage(item.name)} 
            />
          ))}
        </aside>

        {/* Dashboard Grid */}
        <div className="flex-1 h-full overflow-y-auto">
            <DashboardGrid />
        </div>
      </div>

      <FooterContent />
    </div>
  );
};

export default App;
