import React, {useState} from "react";
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar'
import Homepage from './components/Homepage';
import ProjectsPage from './components/ProjectsPage';
import OurTeam from './components/OurTeam';
import LeaderBoard from './components/ContributionLeaderboard';
import NoPage from './components/NoPage';

function App() {
  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>
      {<Navbar/>}
      <LoadingBar
        color='#b2a6ff'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="topMarginHeader"></div>
        <Routes>
          <Route index element={<Homepage setProgress = {setProgress} />} />
          <Route path="projects" element={<ProjectsPage setProgress = {setProgress} />} />
          <Route path="our-team" element={<OurTeam setProgress = {setProgress} />} />
          <Route path='leaderboard' element={<LeaderBoard setProgress={setProgress} />} />
          <Route path="*" element={<NoPage setProgress = {setProgress} />} />
        </Routes>
      </Router>

    </div>
  );
};


export default App