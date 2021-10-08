const DisplayAccepted = ({ accepted }) => {
  let resultString = `Max earnings of $${
    accepted.earnings
  } with ${accepted.students.toString()}`;

  return <>{resultString}</>;
};

export default DisplayAccepted;
