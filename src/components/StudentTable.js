import { useState } from "react";
import { v4 as uuid } from "uuid";
import { exampleStudents } from "../data/exampleStudents.json";
import TableRow from "./TableRow";

const StudentTable = () => {
  const [students, setStudents] = useState(exampleStudents);
  const [maxHours, setMaxHours] = useState(20);

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

  const calculate = (e) => {
    e.preventDefault()
    let data = maximizeEarning(maxHours, students);
    console.log(data);
  };

  return (
    <>
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
      <button onClick={addStudent}>Add Student</button>
      <button onClick={() => setStudents([])}>Clear All</button>
      <input
        type="text"
        value={maxHours}
        onChange={(e) => setMaxHours(e.target.value)}
      />
      <button onClick={(e) => calculate(e)}>Evaluate</button>
    </>
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
      acceptedStudents.push(data[currentIndex].student);
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
