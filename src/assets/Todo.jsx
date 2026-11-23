function Todo({ task, status, appFunction }) {
  const colors = {
    Done: "#00ff00",
    Running: "#ff0000",
    Pending: "#0000ff",
  };

  const fonts = {
    Done: "Times New Roman",
    Running: "Arial",
    Pending: "Calibri",
  };

  return (
    <>
      <h1 onClick={appFunction}>
        Task Name: {task}
      </h1>

      <h3
        style={{
          color: colors[status] || "#0000ff",
          fontFamily: fonts[status] || "Calibri",
        }}
      >
        Task Status: {status}
      </h3>

      <hr />
    </>
  );
}

export default Todo;