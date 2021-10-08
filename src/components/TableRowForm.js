import { useState } from "react";
import styles from "../styles/TableRowForm.module.css";

const TableRowForm = ({ onSubmit, student }) => {
  const [form, setForm] = useState(student);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleForm = (e) => {
    e.preventDefault();
    const updatedStudent = { ...student, showForm: !student.showForm };
    onSubmit(e, updatedStudent);
  };

  return (
    <form className={styles.form} onSubmit={(e) => onSubmit(e, form)}>
        <input
        className={styles.inputs}
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={onChange}
        />
        <input
        className={styles.inputs}
          name="potential"
          placeholder="Potential Earnings"
          value={form.potential}
          onChange={onChange}
        />
        <input
        className={styles.inputs}
          name="hours"
          placeholder="Instruction Hours"
          value={form.hours}
          onChange={onChange}
        />
      <span>
        <button type="submit">Update</button>
        <button onClick={(e) => toggleForm(e)}>Cancel</button>
      </span>
    </form>
  );
};

export default TableRowForm;
