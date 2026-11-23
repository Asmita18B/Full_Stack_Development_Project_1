function Login({
  username,
  setUsername,
  password,
  setPassword,
  login
}) {
  return (
    <div className="quiz-container">
      <div className="quiz-card login-card">

        <div className="page-icon">
          🧠
        </div>

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

        <button
          className="main-button"
          onClick={login}
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;