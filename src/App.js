import React, { useState, useRef } from "react";
import { jsonData } from "./data";
import './App.css'

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const audioRef = useRef();
  const filteredData = jsonData.filter((data) =>
    data.Que.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
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
          <p className="answer">{selectedQuestion.ans}</p>
          {selectedQuestion.audio_file && (
            <audio controls className="audio-player" ref={audioRef}>
              <source src={selectedQuestion.audio_file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
