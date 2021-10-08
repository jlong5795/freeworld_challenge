import styles from "../styles/TableRowDisplay.module.css";

const TableRowDisplay = ({ editStudent, removeStudent, student }) => {
  const toggleForm = (e) => {
    const updatedStudent = { ...student, showForm: true };
    editStudent(e, updatedStudent);
  };

  return (
    <div className={styles.rowContainer}>
      <span>{student.name}</span>
      <span>${student.potential}</span>
      <span>{student.hours}</span>
      <span>
        <button onClick={(e) => toggleForm(e)}>Edit</button>
        <button onClick={() => removeStudent(student)}>Remove</button>
      </span>
    </div>
  );
};

export default TableRowDisplay;
