import {useState, useEffect} from "react";
import axios from "axios";

import { MathJaxContext } from 'better-react-mathjax';

import './App.css';
import Landing from './components/Landing';
import TestPage from './components/TestPage';
import FinishPage from "./components/FinishPage";


function App() {

  const [name, setName] = useState('');

  const questionNames= ["AreaUnderTheCurve_21", "BinomialTheorem_13", "BinomialTheorem_24", "AreaUnderTheCurve_15", "AreaUnderTheCurve_2", "BinomialTheorem_3", "BinomialTheorem_4", "AreaUnderTheCurve_5"]
  const [questions, setQuestions] = useState(Array(8).fill(""));
  const [submit, handleSubmit] = useState(false);
  const [testComplete, setTestComplete] = useState(false);

  const [timesPerQuestion, setTimesPerQuestion] = useState(Array(8).fill(0));
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const [timeRemaining, setTimeRemaining] = useState(0);

  const fetchQuestionDetails = async()=>{
    const url = "https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=";
    for (let i=0; i<questionNames.length; i++){
      const response = await axios.get(`${url}${questionNames[i]}`);
      const str = response.data[0].Question;

      let ans = "";
      for (let j=0; j<str.length; j++){
        if (str[j]!=='$') ans += str[j];
        else{
          ans += '$';
          ans += '$';
        }
      }
      questions[i] =  ans;        
    }

  }

  useEffect(()=>{
    fetchQuestionDetails();
  }, []);

  useEffect(()=>{
    setTimeRemaining(selectedQuestions.length * 5 * 60);
  }, [submit])

  return (
      <MathJaxContext>

        <div className="App">
          {
          (submit === false)?
            <Landing
              handleSubmit={handleSubmit}
              name = {name}
              setName={setName}
              selectedQuestions={selectedQuestions}
              setSelectedQuestions={setSelectedQuestions}
            />
          :
          (testComplete === false)? 
            <TestPage 
              setTestComplete = {setTestComplete} 
              setTimesPerQuestion={setTimesPerQuestion}
              questions = {questions}
              selectedQuestions = {selectedQuestions}
              timeRemaining = {timeRemaining}
              setTimeRemaining = {setTimeRemaining}
            />
            :
            <FinishPage 
              timesPerQuestion={timesPerQuestion}
              selectedQuestions={selectedQuestions}
              timeElapsed = {selectedQuestions.length*5*60-timeRemaining}
              name={name}
            />
          }
          
        </div>
      </MathJaxContext>
  );
}

export default App;
