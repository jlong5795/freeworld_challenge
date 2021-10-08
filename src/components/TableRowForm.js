import { useState } from "react";

const TableRowForm = ({ onSubmit, student }) => {
    const [form, setForm] = useState(student)

    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const toggleForm = (e) => {
        e.preventDefault()
        const updatedStudent = {...student, showForm: !student.showForm}
        onSubmit(e, updatedStudent)
    }

  return (
    <form onSubmit={(e) => onSubmit(e, form)}>
      <input name="name" placeholder="Student Name" value={form.name} onChange={onChange} />
      <input name="potential" placeholder="Potential Earnings" value={form.potential} onChange={onChange} />
      <input name="hours" placeholder="Instruction Hours" value={form.hours} onChange={onChange} />
      <button type='submit'>Update</button>
      <button onClick={(e) => toggleForm(e)}>Cancel</button>
    </form>
  );
};

export default TableRowForm;
