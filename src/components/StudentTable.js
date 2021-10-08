import { useState, } from "react";
import { v4 as uuid } from 'uuid';
import { exampleStudents } from '../data/exampleStudents.json';
import TableRow from "./TableRow";

const StudentTable = () => {
  const [students, setStudents] = useState(exampleStudents);
  const [maxHours, setMaxHours] = useState(20);

  const onSubmit = (e, updatedStudent) => {
    e.preventDefault()
    setStudents(
      students.map((student) => {
        if (student?.id === updatedStudent?.id) {
          updatedStudent.showForm = false
          return updatedStudent;
        }
        return student
      })
    );

    console.log(students)
  };

  const editStudent = (e, updatedStudent) => {
    e.preventDefault()
    setStudents(
      students.map((student) => {
        if (student?.id === updatedStudent?.id) {
          return updatedStudent;
        }
        return student
      })
    );

    console.log(students)
  };

  const addStudent = () => {
    setStudents([...students, {
      id: uuid(),
      name: '',
      potential: '',
      hours: '',
      showForm: true
    }])
  }

  const removeStudent = (toRemove) => {
    setStudents(
      students.filter(student => {
        return student.id !== toRemove.id
      })
    )
  }

  return (
    <>
      {students.length ? students?.map((student) => {
        return <TableRow key={student.id} onSubmit={onSubmit} removeStudent={removeStudent} student={student} showForm={student.showForm} editStudent={editStudent} />;
      }) : "No Students!"}
      <button onClick={addStudent}>Add Student</button>
      <button onClick={() => setStudents([])}>Clear All</button>
      <input type='text' value={maxHours} onChange={(e) => setMaxHours(e.target.value)}/>
      <button>Evaluate</button>
      </>
  );
};

export default StudentTable;
