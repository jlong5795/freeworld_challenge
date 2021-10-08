import { useState } from "react";
import { v4 as uuid } from "uuid";
import { exampleStudents } from "../data/exampleStudents.json";
import TableRow from "./TableRow";
import DisplayAccepted from "./DisplayAccepted";

import styles from "../styles/StudentTable.module.css";

const StudentTable = () => {
  const [students, setStudents] = useState(exampleStudents);
  const [maxHours, setMaxHours] = useState(20);
  const [accepted, setAccepted] = useState(null);

  const onSubmit = (e, updatedStudent) => {
    e.preventDefault();
    setStudents(
      students.map((student) => {
        if (student?.id === updatedStudent?.id) {
          updatedStudent.showForm = false;
          return updatedStudent;
        }
        return student;
      })
    );

    console.log(students);
  };

  const editStudent = (e, updatedStudent) => {
    e.preventDefault();
    setStudents(
      students.map((student) => {
        if (student?.id === updatedStudent?.id) {
          return updatedStudent;
        }
        return student;
      })
    );

    console.log(students);
  };

  const addStudent = () => {
    setStudents([
      ...students,
      {
        id: uuid(),
        name: "",
        potential: "",
        hours: "",
        showForm: true,
      },
    ]);
  };

  const removeStudent = (toRemove) => {
    setStudents(
      students.filter((student) => {
        return student.id !== toRemove.id;
      })
    );
  };

  const calculate = () => {
    // copy array to avoid mutation
    let studentsCopy = JSON.stringify(students);

    let data = maximizeEarning(maxHours, JSON.parse(studentsCopy));
    setAccepted(data[0]);
    console.log(accepted);
  };

  return (
    <div className={styles.container}>
      <div className={styles.labels}>
        <span>Name</span>
        <span>Potential</span>
        <span>Hours</span>
        <span className={styles.options}>Options</span>
      </div>

      {students.length
        ? students?.map((student) => {
            return (
              <TableRow
                key={student.id}
                onSubmit={onSubmit}
                removeStudent={removeStudent}
                student={student}
                showForm={student.showForm}
                editStudent={editStudent}
              />
            );
          })
        : "No Students!"}
      <div className={styles.listControls}>
        <button onClick={addStudent}>Add Student</button>
        <button onClick={() => setStudents([])}>Clear All</button>
      </div>
      <label> Max Instruction Hours: 
        <input
        className={styles.input}
          type="text"
          value={maxHours}
          onChange={(e) => setMaxHours(e.target.value)}
        />
      </label>
      <button className={styles.evaluate} onClick={calculate}>Evaluate</button>
      {accepted ? <DisplayAccepted accepted={accepted} /> : null}
    </div>
  );
};

function maximizeEarning(
  hours,
  data,
  count = 0,
  acceptedStudentCombos = [],
  acceptedStudentCache = {},
  orderedByEarningPotential = []
) {
  // console.log('data', data)
  let usedHours = 0;
  let earnings = 0;
  let acceptedStudents = [];

  orderedByEarningPotential =
    count > 0
      ? orderedByEarningPotential
      : data.sort(function (a, b) {
          return (
            earningPerInstructionalHour(b.potential, b.hours) -
            earningPerInstructionalHour(a.potential, a.hours)
          );
        });

  let currentIndex = 0;
  while (usedHours < hours && currentIndex < data.length) {
    if (data[currentIndex].hours + usedHours <= hours) {
      usedHours += data[currentIndex].hours;
      earnings += data[currentIndex].potential;
      acceptedStudents.push(data[currentIndex].name);
    }
    currentIndex++;
  }

  if (
    acceptedStudentCache[acceptedStudents] === undefined &&
    acceptedStudents.length > 0
  ) {
    acceptedStudentCache[acceptedStudents] = true;
    acceptedStudentCombos.push({
      students: acceptedStudents,
      earnings: earnings,
      usedHours: usedHours,
    });
  }

  if (data.length > 0) {
    count++;
    data.shift();
    return maximizeEarning(
      hours,
      data,
      count,
      acceptedStudentCombos,
      acceptedStudentCache,
      orderedByEarningPotential
    );
  }
  if (acceptedStudentCombos.length > 0) {
    acceptedStudentCombos.sort((a, b) => {
      return b.earnings - a.earnings;
    });
  }
  return acceptedStudentCombos;
}

function earningPerInstructionalHour(value, hours) {
  if (hours <= 0) return value;
  return value / hours;
}

export default StudentTable;
