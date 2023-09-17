import React, {useEffect} from 'react';

function FinishPage({timesPerQuestion, timeElapsed, name, selectedQuestions}) {
  // Calculate the total time taken by summing up question times

  const minutes = Math.floor(timeElapsed/ 60);
  const seconds = timeElapsed % 60;

  useEffect(()=>{
    for (let i=0; i<timesPerQuestion; i++){
      console.log(timesPerQuestion[i]);
    }
  })

  return (
    <div className="FinishPage">
      <h1 style={{color: 'rgb(9, 9, 146)'}}>Test Completed</h1>
      <p>Thank you, &nbsp; 
        <span style={{color: 'green', fontSize: '25px', fontWeight: '500'}}>{name}</span>, 
      for completing the test!</p>

      <h2>Question Times:</h2>

      {/* Display Question Times */}
      <div style={{display:'flex', justifyContent:'center', flexDirection: 'column'}}>
        <ul style={{listStyleType: 'none'}}>
          {selectedQuestions.map((element, index) => (
            <li key={index}>
              <b>{index+1}</b> - &nbsp; {Math.floor(timesPerQuestion[index]/60)} min {timesPerQuestion[index]%60} sec
            </li>
          ))}
        </ul>
      </div>

      {/* Display Total Time */}
      <h2>Total Time Taken:</h2>
      <div>        
          {minutes} min &nbsp; {seconds} sec
      </div>
    </div>
  );
}

export default FinishPage;
