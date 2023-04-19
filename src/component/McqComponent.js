import React, { useState } from "react";
import Star from "../images/Star";
import { questions } from "../question";

const McqComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [marks, setMarks] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [correntAnswer, setCorrentAnswer] = useState();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [optionClicked, setOptionClicked] = useState(false);
  const [counter, setCounter] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswer = (answer) => {
    setOptionClicked(true);
    if (answer === questions[currentQuestion].correct_answer) {
      if (answer !== selectedAnswer) {
        setCorrentAnswer(true);
        setCorrectAnswers((prevState) => prevState + 1);
        setSelectedAnswer(answer);
        setCounter((prevState) => prevState + 1);
      }
    } else {
      setCorrentAnswer(false);
      if (counter > 0) {
        setCorrectAnswers((prevState) => prevState - 1);
        setSelectedAnswer(answer);
      }
    }
  };

  const handleNextQuestion = () => {
    setMarks((correctAnswers / questions.length) * 100);
    setOptionClicked(false);
    setCounter(0);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleLevel = (level) => {
    switch (level) {
      case "easy":
        return (
          <>
            <Star />
            <Star className="star" />
            <Star className="star" />
          </>
        );
      case "medium":
        return (
          <>
            <Star />
            <Star />
            <Star className="star" />
          </>
        );
      case "hard":
        return (
          <>
            <Star />
            <Star />
            <Star />
          </>
        );
    }
  };

  const decodeString = (string) => {
    const urlEncodedString = string;
    const simpleString = decodeURIComponent(urlEncodedString);
    return simpleString;
  };

  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <div>
          <input
            type="range"
            className="progress_bar"
            style={{ backgroundSize: `${(currentQuestion + 1) * 5}%` }}
          ></input>
          {showScore ? (
            <p>your have scored {marks}% out of 100%</p>
          ) : (
            <>
              <div className="question">
                <div className="question_number">
                  <span className="question_track">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <br />
                  <span>
                    {decodeString(questions[currentQuestion].category)}
                  </span>
                </div>
                <div className="star_div">
                  {handleLevel(questions[currentQuestion].difficulty)}
                </div>
                <div className="question_text">
                  {decodeString(questions[currentQuestion].question)}
                </div>
                <div className="answer">
                  <button
                    onClick={() =>
                      handleAnswer(questions[currentQuestion].correct_answer)
                    }
                  >
                    {decodeString(questions[currentQuestion].correct_answer)}
                  </button>
                  {questions[currentQuestion].incorrect_answers.map(
                    (answer) => (
                      <button onClick={() => handleAnswer(answer)}>
                        {decodeString(answer)}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div>
                {currentQuestion < 19 ? (
                  optionClicked ? (
                    correntAnswer ? (
                      <div>
                        <p>Correct !</p>
                        <button onClick={() => handleNextQuestion()}>
                          Next Question
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p>Sorry Please try again.</p>
                        <button onClick={() => handleNextQuestion()}>
                          Next Question
                        </button>
                      </div>
                    )
                  ) : null
                ) : (
                  <button onClick={() => handleNextQuestion()}>
                    Show Marks
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        <div className="marks_outer_div">
          <div className="marks_div">
            <p>Score: {marks}%</p>
            <p>Max Score: {currentQuestion * 5}%</p>
          </div>
          <input
            type="range"
            className="progress_bar_marks"
            style={{ backgroundSize: `${marks}%` }}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default McqComponent;
