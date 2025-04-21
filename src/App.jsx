import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { YoutubeVideos } from "./screens/YoutubeVideos/YoutubeVideos"; // You'll need to create this
import { LearningPath } from "./screens/Roadmap"; // You'll need to create this
import { Explore } from "./screens/Explore"; // You'll need to create this

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white flex flex-row justify-center w-full">
        <div className="bg-white overflow-hidden w-[1280px] h-[832px] relative">
          <Header />
          <Sidebar />
          <main>
            <Routes>
              <Route path="/dashboard" element={<YoutubeVideos />} />
              <Route path="/learning-path" element={<LearningPath />} />
              {/* <Route path="/explore" element={<Explore />} /> */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;