import { useState } from 'react';
import Confetti from 'react-confetti';

function Quiz() {
  const questions = [
    { text: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris", difficulty: "easy" },
    { text: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars", difficulty: "medium" },
    { text: "What is 5 + 7?", options: ["10", "12", "14", "15"], answer: "12", difficulty: "easy" },
    { text: "Who wrote 'Macbeth'?", options: ["Shakespeare", "Hemingway", "Tolkien", "Rowling"], answer: "Shakespeare", difficulty: "hard" },
    { text: "What is the largest ocean?", options: ["Pacific", "Atlantic", "Indian", "Arctic"], answer: "Pacific", difficulty: "medium" },
    { text: "What gas do plants breathe in?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: "Carbon Dioxide", difficulty: "easy" },
    { text: "What is the boiling point of water in Celsius?", options: ["90", "100", "110", "120"], answer: "100", difficulty: "easy" },
    { text: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Michelangelo", "Van Gogh", "Picasso"], answer: "Leonardo da Vinci", difficulty: "medium" },
    { text: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7", difficulty: "easy" },
    { text: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond", difficulty: "hard" }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const [correctStreak, setCorrectStreak] = useState(0);
  const [attempts, setAttempts] = useState(Array(questions.length).fill(0));
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [times, setTimes] = useState(Array(questions.length).fill(0));

  // NEW: quizStarted state
  const [quizStarted, setQuizStarted] = useState(false);

  const handleClick = (option) => {
    const newAttempts = [...attempts];
    newAttempts[currentQuestion] += 1;
    setAttempts(newAttempts);

    const timeSpent = (Date.now() - questionStartTime) / 1000;
    const newTimes = [...times];
    newTimes[currentQuestion] = timeSpent;
    setTimes(newTimes);

    let streak = correctStreak;

    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
      setFeedback("Correct! 🎉");
      setShowConfetti(true);
      streak += 1;
    } else {
      setFeedback("Nope! ❌");
      streak = 0;
    }
    setCorrectStreak(streak);

    setTimeout(() => {
      setShowConfetti(false);

      let nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setFeedback("");
        setQuestionStartTime(Date.now());
      } else {
        setShowScore(true);
      }
    }, 2000);
  };

  return (
    <div style={{
      backgroundColor: "#d0f0ff",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
        padding: "30px",
        width: "100%",
        maxWidth: "500px",
        textAlign: "center"
      }}>

        {!quizStarted ? (
          // START BUTTON SCREEN
          <div>
            <h2>Welcome to the Trivia Quiz!</h2>
            <button
              onClick={() => setQuizStarted(true)}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                backgroundColor: "#00aaff",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Start Quiz
            </button>
          </div>
        ) : (
          // EXISTING QUIZ UI
          <>
            {showConfetti && (
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={300}
                gravity={0.3}
                recycle={false}
              />
            )}

            {showScore ? (
              <>
                <h2>Quiz Completed!</h2>
                <p>Your score: {score} / {questions.length}</p>
                <h3>Attempts per question:</h3>
                <ul style={{ textAlign: "left" }}>
                  {questions.map((q, index) => (
                    <li key={index}>
                      Q{index + 1}: {attempts[index]} attempt(s), {times[index].toFixed(1)}s spent
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => {
                    setCurrentQuestion(0);
                    setScore(0);
                    setShowScore(false);
                    setFeedback("");
                    setAttempts(Array(questions.length).fill(0));
                    setTimes(Array(questions.length).fill(0));
                    setCorrectStreak(0);
                    setQuestionStartTime(Date.now());
                  }}
                  style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#00aaff",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Restart Quiz
                </button>
              </>
            ) : (
              <>
                <h2>{questions[currentQuestion].text}</h2>
                <div>
                  {questions[currentQuestion].options.map((option, index) => (
                    <button 
                      key={index} 
                      onClick={() => handleClick(option)}
                      style={{
                        margin: "5px",
                        padding: "10px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        backgroundColor: "#00aaff",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        width: "100%"
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <h3>{feedback}</h3>
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default Quiz;








