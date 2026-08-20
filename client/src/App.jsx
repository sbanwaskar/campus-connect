import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

function App() {
  const [showOrganizerPortal, setShowOrganizerPortal] = useState(false);
  const [showDemoDashboard, setShowDemoDashboard] = useState(
    localStorage.getItem("showDemoDashboard") === "true"
  );
    const [isOrganizerLoggedIn, setIsOrganizerLoggedIn] = useState(
    !!localStorage.getItem("organizerToken")
  );
    return (
    <div className="min-h-screen flex flex-col">
     <Navbar
    setShowOrganizerPortal={setShowOrganizerPortal}
    isOrganizerLoggedIn={isOrganizerLoggedIn}
    setIsOrganizerLoggedIn={setIsOrganizerLoggedIn}
  />
    <Hero
  showOrganizerPortal={showOrganizerPortal}
  setShowOrganizerPortal={setShowOrganizerPortal}
  showDemoDashboard={showDemoDashboard}
  setShowDemoDashboard={setShowDemoDashboard}
  isOrganizerLoggedIn={isOrganizerLoggedIn}
  setIsOrganizerLoggedIn={setIsOrganizerLoggedIn}
  
/>
      <Footer />
    </div>
  );
}

export default App;
