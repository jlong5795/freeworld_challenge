import TableRowDisplay from "./TableRowDisplay";
import TableRowForm from "./TableRowForm";

const TableRow = ({ editStudent, onSubmit, removeStudent, showForm, student }) => {
    if (showForm) return <TableRowForm onSubmit={onSubmit} student={student} />
  return <TableRowDisplay editStudent={editStudent} removeStudent={removeStudent} student={student} />;
};

export default TableRow;
