function Difficulty({ username, onSelectDifficulty }) {
  return (
    <div className="difficulty-container">
      <div className="difficulty-card">

        <div className="difficulty-icon">
          🎯
        </div>

        <h1>Choose Difficulty</h1>

        <p>
          Hello {username}! Choose your question level.
        </p>

        <div className="difficulty-buttons">

          <button
            className="difficulty-button"
            onClick={() => onSelectDifficulty("easy")}
          >
            <span>🟢</span>
            Easy
          </button>

          <button
            className="difficulty-button"
            onClick={() => onSelectDifficulty("medium")}
          >
            <span>🟠</span>
            Medium
          </button>

          <button
            className="difficulty-button"
            onClick={() => onSelectDifficulty("hard")}
          >
            <span>🔴</span>
            Hard
          </button>

        </div>

      </div>
    </div>
  );
}

export default Difficulty;