

const TableRowDisplay = ({editStudent, removeStudent, student}) => {
    const toggleForm = (e) => {
        const updatedStudent = {...student, showForm: true}
        editStudent(e, updatedStudent)
    }

    return (
        <div>
            <span>{student.name}</span>
            <span>{student.potential}</span>
            <span>{student.hours}</span>
            <span><button onClick={() => removeStudent(student)}>Remove</button></span>
            <span><button onClick={(e) => toggleForm(e)}>Edit</button></span>
        </div>
    )
};

export default TableRowDisplay;