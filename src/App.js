import React, { useState, useRef } from "react";
import { jsonData } from "./data";
import './App.css'

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const videoRef = useRef();
  const filteredData = jsonData.filter((data) =>
    data.Que.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedQuestion(null);
  };

  return (
    <div className="app-container">
      <h1 className="app-heading">Talk to Mahatma Gandhi</h1>
      <input
        type="text"
        placeholder="Search question..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />

      <ul className="question-list">
        {filteredData.map((data, index) => (
          <li
            key={index}
            onClick={() => handleQuestionClick(data)}
            className={
              selectedQuestion === data
                ? "question-item selected"
                : "question-item"
            }
          >
            {data.Que}
          </li>
        ))}
      </ul>

      {selectedQuestion && (
        <div className="answer-container">
          <h3 className="question">{selectedQuestion.Que}</h3>
          {selectedQuestion.video_file && (
            <video controls className="video-player" ref={videoRef}>
              <source src={selectedQuestion.video_file} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
