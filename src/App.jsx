import { useState } from "react";
import { questions } from "./Questions";

function App() {
  const [page, setPage] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [category, setCategory] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const [scoreHistory, setScoreHistory] = useState({});

  const filteredQuestions = questions.filter(
    (question) => question.category === category
  );

  const subjectLabels = {
    gk: "General Knowledge",
    english: "English",
    computer: "Computer",
  };

  function login() {
    if (username.trim() !== "" && password.trim() !== "") {
      setPage("dashboard");
    } else {
      alert("Please enter username and password");
    }
  }

  function logout() {
    setUsername("");
    setPassword("");
    setCategory("");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScoreHistory({});
    setPage("login");
  }

  function goToDashboard() {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCategory("");
    setPage("dashboard");
  }

  function chooseCategory(subject) {
    setCategory(subject);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setPage("quiz");
  }

  function handleAnswer(answer) {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(answer);

    const question = filteredQuestions[currentQuestion];

    if (answer === question.answer) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  function nextQuestion() {
    if (currentQuestion + 1 < filteredQuestions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setScoreHistory((prev) => ({
        ...prev,
        [category]: { score, total: filteredQuestions.length },
      }));
      setShowResult(true);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setPage("quiz");
  }

  function changeCategory() {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCategory("");
    setPage("category");
  }

  function NavBar() {
    return (
      <div className="app-nav">
        <button className="nav-button" onClick={goToDashboard}>
          Dashboard
        </button>
        <button className="nav-button nav-logout" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  if (page === "login") {
    return (
      <div className="quiz-container">
        <div className="quiz-card login-card">
          <div className="page-icon">QZ</div>
          <h1>Quiz App</h1>
          <p className="subtitle">
            Test your knowledge and improve your skills
          </p>

          <div className="input-group">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="main-button" onClick={login}>
            Login
          </button>
        </div>
      </div>
    );
  }

  if (page === "dashboard") {
    return (
      <div className="quiz-container">
        <div className="quiz-card dashboard-card">
          <NavBar />

          <div className="page-icon">DB</div>
          <h1>Dashboard</h1>
          <p className="subtitle">
            Welcome back, {username}. Pick a subject to start a quiz.
          </p>

          <div className="dashboard-grid">
            {Object.keys(subjectLabels).map((key) => {
              const record = scoreHistory[key];
              return (
                <div className="dashboard-tile" key={key}>
                  <div className="dashboard-tile-top">
                    <span className="difficulty-icon">
                      {key.slice(0, 2).toUpperCase()}
                    </span>
                    <strong>{subjectLabels[key]}</strong>
                  </div>

                  <p className="dashboard-tile-score">
                    {record
                      ? `Last score: ${record.score} out of ${record.total}`
                      : "Not attempted yet"}
                  </p>

                  <button
                    className="secondary-button"
                    onClick={() => chooseCategory(key)}
                  >
                    {record ? "Retake Quiz" : "Start Quiz"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (page === "category") {
    return (
      <div className="quiz-container">
        <div className="quiz-card difficulty-card">
          <NavBar />

          <div className="page-icon">SB</div>
          <h1>Choose Subject</h1>
          <p className="subtitle">
            Hello, {username}. Choose a subject to begin.
          </p>

          <div className="difficulty-buttons">
            <button
              className="difficulty-button"
              onClick={() => chooseCategory("gk")}
            >
              <span className="difficulty-icon">GK</span>
              <div>
                <strong>General Knowledge</strong>
                <small>Facts about the world</small>
              </div>
            </button>

            <button
              className="difficulty-button"
              onClick={() => chooseCategory("english")}
            >
              <span className="difficulty-icon">EN</span>
              <div>
                <strong>English</strong>
                <small>Grammar and vocabulary</small>
              </div>
            </button>

            <button
              className="difficulty-button"
              onClick={() => chooseCategory("computer")}
            >
              <span className="difficulty-icon">CS</span>
              <div>
                <strong>Computer</strong>
                <small>Tech and programming basics</small>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percent = Math.round(
      (score / filteredQuestions.length) * 100
    );

    return (
      <div className="quiz-container">
        <div className="quiz-card result-card">
          <NavBar />

          <div
            className="score-ring"
            style={{
              background: `conic-gradient(#6f4527 ${
                (score / filteredQuestions.length) * 360
              }deg, #ecdcc7 0deg)`,
            }}
          >
            <div className="score-ring-inner">{percent} percent</div>
          </div>

          <h1>Quiz Completed</h1>

          <p className="difficulty-name">{category.toUpperCase()}</p>

          <p className="your-score">Your Score</p>

          <div className="score">
            {score} out of {filteredQuestions.length}
          </div>

          <p className="result-message">
            {score === filteredQuestions.length
              ? "Excellent. You got everything correct."
              : score >= filteredQuestions.length / 2
              ? "Good job. Keep learning."
              : "Keep practicing. You can do better."}
          </p>

          <button className="main-button" onClick={restartQuiz}>
            Restart Quiz
          </button>

          <button className="secondary-button" onClick={changeCategory}>
            Choose Another Subject
          </button>
        </div>
      </div>
    );
  }

  const question = filteredQuestions[currentQuestion];

  if (!question) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <NavBar />
          <h1>No Questions Found</h1>
          <p>There are no questions available for this subject.</p>
          <button className="main-button" onClick={changeCategory}>
            Choose Subject
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-card quiz-page">
        <NavBar />

        <div className="quiz-header">
          <h1>React Quiz</h1>

          <div className="quiz-info">
            <span>
              Question {currentQuestion + 1} of {filteredQuestions.length}
            </span>
            <span>Score: {score}</span>
          </div>
        </div>

        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${
                ((currentQuestion + 1) / filteredQuestions.length) * 100
              }%`,
            }}
          ></div>
        </div>

        <div className="level">{category.toUpperCase()}</div>

        <h2 className="question">{question.question}</h2>

        <div className="answers">
          {question.options.map((option, index) => {
            let answerClass = "answer-button";

            if (selectedAnswer !== null) {
              if (option === question.answer) {
                answerClass += " correct";
              } else if (option === selectedAnswer) {
                answerClass += " wrong";
              }
            }

            return (
              <button
                key={index}
                className={answerClass}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
              >
                <span className="option-number">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <button className="next-button" onClick={nextQuestion}>
            {currentQuestion + 1 === filteredQuestions.length
              ? "Show Result"
              : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;