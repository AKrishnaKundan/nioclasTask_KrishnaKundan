import React, { useState, useEffect } from 'react';

import { MathJax } from 'better-react-mathjax';
import { enqueueSnackbar } from 'notistack';

function TestPage(
  {setTestComplete, setTimesPerQuestion,questions,selectedQuestions, timeRemaining, setTimeRemaining}
  ) {

    const totalQuestions = selectedQuestions.length; 
    const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
      setTimesPerQuestion((prevTimes) => {
        const updatedTimes = [...prevTimes];
        updatedTimes[currentQuestion] += 1;
        return updatedTimes;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  });

  const handleNextQuestion = () => {
      setCurrentQuestion(currentQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmitTest = () => {

    if (timeRemaining > 0) {
      const confirmSubmission = window.confirm(
        'Are you sure you want to submit the test with time remaining?'
      );

      if (confirmSubmission) {
        // Handle the submission logic here
        alert('Test submitted!');
        setTimeout(setTestComplete(true), 2000);
      }
    } 
    else {
      // Handle the submission logic here
      alert('Test submitted!');
      setTimeout(setTestComplete(true), 2000);
    }
  };

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  return (
    <div className="TestPage">
      
      <h1 style={{color: 'rgb(9, 9, 146)'}}>Test Page</h1>
      <p>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </p>

      {/* Display Question */}
      <div>
        <h3>Question {currentQuestion+1}</h3>
        <MathJax 
          style={{fontSize: '18px', marginTop: '15px', width: '80vw'}}
        > 
          {questions[selectedQuestions[currentQuestion]]}
        </MathJax>   
        {/* Insert your question content here */}
      </div>

      {/* Navigation Buttons */}
      <div>
        <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
          Previous
        </button>
        {currentQuestion < selectedQuestions.length-1 && (
          <button onClick={handleNextQuestion}>Next</button>
        )}
        {currentQuestion === selectedQuestions.length-1 && (
          <button onClick={()=>{
            enqueueSnackbar("You still have time. Do you want to submit", {"variant" : " info"});

            handleSubmitTest();
          }}>Submit</button>
        )}
      </div>

      <div className="question-numbers">
        {selectedQuestions.map((questionNumber, index) => (
          <span 
            key={questionNumber} 
            style={{borderRadius: '10px', backgroundColor: 'rgb(223, 209, 26)'}}
            className="question-number"
            onClick={()=>{
              setCurrentQuestion(index);
            }}
          >
            {index+1}
          </span>
        ))}
      </div>
      <h5 className="note">NOTE: Do not refresh the browser</h5>
    </div>
  );
}

export default TestPage;
