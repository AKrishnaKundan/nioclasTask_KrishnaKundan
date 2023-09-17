import React, { useState, useEffect } from 'react';
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from 'notistack'
import { RingLoader } from 'react-spinners';

const Landing = ({handleSubmit, name, setName, selectedQuestions, setSelectedQuestions}) => {
  
  const [loading, setLoading] = useState(false); 

  // Function to handle changes in the selected questions
  const handleQuestionChange = (e) => {
    const questionId = e.target.id;
    if (e.target.checked) {
      setSelectedQuestions([...selectedQuestions, questionId]);
    } else {
      setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
    }
  }

  return (
    <div className="Landing">  
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom', // Customize vertical position (top, bottom)
          horizontal: 'center', // Customize horizontal position (left, center, right)
        }}
      />

      <h1 style={{color: 'rgb(9, 9, 146)'}}>Welcome to the Test</h1>
      <p>Please provide your name and select the questions you want to answer.</p>

      {/* User's Name Input */}
      <div style={{display: "flex", gap:'10px', alignItems: "center"}}>
      <label htmlFor="name" style={{fontSize: "20px"}}>Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        style={{fontSize: "15px", fontWeight: '400'}}
        onChange={(e) => setName(e.target.value)}
        required
      /></div>

      {/* Question Selection with Checkboxes */}
      <form className="select-questions">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(questionId => (
          <label style={{fontSize:'20px'}} key={questionId} htmlFor={`question${questionId}`}>
            <input
              type="checkbox"
              id={`${questionId}`}
              name="question"
              value={`Question ${questionId}`}
              onChange={handleQuestionChange}
              style={{transform: 'scale(2.0)', marginRight: '10px'}}
            /> Question {questionId}
          </label>

        ))}

    </form>
          
    <input type="submit" value="Submit" 
        style={{fontSize: '20px', padding:'10px 20px', borderRadius: '20px', fontWeight: '200', cursor: 'pointer'}}
        className="submit"
        onClick = {(e)=>{
          e.preventDefault();
          if (name.length === 0){
            enqueueSnackbar('Enter your name',  {
              autoHideDuration: 2000,
              variant: "warning"
            })
          }
          else if (selectedQuestions.length === 0){
            enqueueSnackbar('Select atleast one question',  {
              autoHideDuration: 2000,
              variant: "warning"
            })
          }
          else{
            setLoading(true);
            enqueueSnackbar('Don\'t refresh the browser during the exam',  {
              autoHideDuration: 2000,
              variant: "warning"
            })
            setTimeout(()=>{
              setLoading(false);
              handleSubmit(true);
            }, 5000)
          }
        }}
      />

    <p>Total time for the test: {selectedQuestions.length * 5} minutes</p>
    {loading && 
      <>
      <h4>Loading the test</h4>
      <RingLoader color="#3498db" loading={loading} size={150} />
      </>
    }
    <h5 className="note">NOTE: Do not refresh the browser</h5>
  </div>
  
  );
}

export default Landing;
