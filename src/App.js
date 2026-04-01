import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './screens/Dashboard';
import ExperienceHub from './screens/ExperienceHub';
import SmartItinerary from './screens/SmartItinerary';
import {
  EchoTN, LocalMarket, ARVRTours, Emergency,
  AIAlerts, CulturalHub, TravelEssentials,
  EnhancedSafety, GroupTracking, WeatherScreen,
  BlockchainID, SimpleScreen
} from './screens/AllScreens';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const onMenu = () => setSidebarOpen(true);
  const onClose = () => setSidebarOpen(false);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar open={sidebarOpen} onClose={onClose} />
        <Routes>
          <Route path="/" element={<Dashboard onMenu={onMenu} />} />
          <Route path="/experience" element={<ExperienceHub onMenu={onMenu} />} />
          <Route path="/itinerary" element={<SmartItinerary onMenu={onMenu} />} />
          <Route path="/alerts" element={<AIAlerts onMenu={onMenu} />} />
          <Route path="/market" element={<LocalMarket onMenu={onMenu} />} />
          <Route path="/cultural" element={<CulturalHub onMenu={onMenu} />} />
          <Route path="/essentials" element={<TravelEssentials onMenu={onMenu} />} />
          <Route path="/echotn" element={<EchoTN onMenu={onMenu} />} />
          <Route path="/arvr" element={<ARVRTours onMenu={onMenu} />} />
          <Route path="/safety" element={<EnhancedSafety onMenu={onMenu} />} />
          <Route path="/group" element={<GroupTracking onMenu={onMenu} />} />
          <Route path="/maps" element={<SimpleScreen title="Google Maps" emoji="📍" onMenu={onMenu} />} />
          <Route path="/weather" element={<WeatherScreen onMenu={onMenu} />} />
          <Route path="/emergency" element={<Emergency onMenu={onMenu} />} />
          <Route path="/notifications" element={<SimpleScreen title="Notifications" emoji="🔔" onMenu={onMenu} />} />
          <Route path="/connectivity" element={<SimpleScreen title="Connectivity" emoji="📶" onMenu={onMenu} />} />
          <Route path="/blockchain" element={<BlockchainID onMenu={onMenu} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
