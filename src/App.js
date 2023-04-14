import logo from './logo.svg';
import './App.css';
import QuizStepper from './QuizStepper';
import questionsdata   from './questions.json'; 


function App() {
  return (
    <div className="App">
      <QuizStepper questions={questionsdata.questions} /> 
    </div>
  );
}

export default App;
