import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {

const [chosenLevel, setChosenLevel] = useState(null);
const [words, setWords] = useState(null);
const [correctAnswers, setCorrectAnswers] = useState([]);
const [clicked, setClicked] = useState([]);
const [score, setScore] = useState(0)

const getRandomWords = () => { 
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/results',
    params: {level: chosenLevel, area: 'sat'}
  };

  axios.request(options).then((res) => {
  	console.log(res.data);
    setWords(res.data);

  }).catch((error) => {
  	console.error(error);
  });
}
  
console.log(words && words.quizlist)

  useEffect(() => {
    if (chosenLevel) getRandomWords()
  }, [chosenLevel]);

  const checkAnswer = (options, optionIndex, correctAnswer) => {
    console.log(optionIndex, correctAnswer)
    if (optionIndex === correctAnswer) {
      setCorrectAnswers([...correctAnswers, options]);
      setScore((score) => score + 1);
    }else {
      setScore((score) => score - 1);
    }
    setClicked([...clicked, options]);
  }

  console.log('Correct Answers', correctAnswers);
  console.log('Clicked', clicked);
  

  return (
    <div className="app">
      {!chosenLevel && <div  className='level-selector'>
        <h1>Word Association App</h1>
        <p>Select your level to start</p>
        <select 
            name="levels" 
            id="levels" value={chosenLevel} 
            onChange={(e) => setChosenLevel(e.target.value)}>
          <option value={null}>Select a Level</option>
          <option value = '1'>Level 1</option>
          <option value = '2'>Level 2</option>
          <option value = '3'>Level 3</option>
          <option value = '4'>Level 4</option>
          <option value = '5'>Level 5</option>
          <option value = '6'>Level 6</option>
          <option value = '7'>Level 7</option>
          <option value = '8'>Level 8</option>
          <option value = '9'>Level 9</option>
          <option value = '10'>Level 10</option>
        </select>
      </div>}

      {chosenLevel && words && <div className='question-area'>
        <h1>Welcome to level: {chosenLevel}</h1>
        <h3>Your score is: {score}</h3>

        <div className='questions'>
          {words.quizlist.map((question, _questionIndex) => (
            <div key={_questionIndex} className='question-box'>
              {question.quiz.map((hint, _index) => (
                <p key={_index}>{hint}</p>
              ))}
              <div className='question-buttons'>
                {question.option.map((options, optionIndex) => (
                  <div key={optionIndex} className='question-button'>
                    <button
                      disabled={clicked.includes(options)}
                      onClick={() => checkAnswer(options, optionIndex + 1, question.correct)}
                      >{options}  
                    </button>
                    {correctAnswers.includes(options) && <p>Correct!</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setChosenLevel(null)}>Go Back</button>

      </div>}

    </div>
  );
}

export default App;
