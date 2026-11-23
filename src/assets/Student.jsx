function Student({ name, grade, onStudentClick }) {
  const colors = {
    Excellent: "#00aa00",
    Average: "#ff9900",
    Poor: "#ff0000",
  };

   const fonts = {
    Done: "Times New Roman",
    Running: "Arial",
    Pending: "Calibri",
  };

  return (
    <>
      <h1 onClick={onStudentClick}>
        Student Name: {name}
      </h1>

      <h3
        style={{
          color: colors[grade] || "#000000",
          fontFamily: fonts[grade] || "Arial",
        }}
      >
        Grade: {grade}
      </h3>

      <hr />
    </>
  );
}

export default Student;
