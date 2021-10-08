
const DisplayAccepted = ({ accepted }) => {
    const resultString = `Max earnings of $${accepted.earnings} with ${accepted.students.toString()}`

    return (
        <>
        {resultString}
        </>
    )
}

export default DisplayAccepted;