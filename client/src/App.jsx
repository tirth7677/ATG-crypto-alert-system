import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SetAlerts from './pages/SetAlerts';
import ActiveAlerts from './pages/ActiveAlerts';
import CompleteAlerts from './pages/CompletedAlerts';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/set-alerts" element={<SetAlerts />} />
        <Route path="/active-alerts" element={<ActiveAlerts />} />
        <Route path="/complete-alerts" element={<CompleteAlerts />} />
      </Routes>
    </Router>
  );
};

export default App;
