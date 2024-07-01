export default function NextButton({ dispatch, answer, index, noQuestion }) {
    if (answer === null) return;
    if (index < noQuestion - 1) {
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "nextQuestion" })}
            >
                Next
            </button>
        );
    } else {
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "finished" })}
            >
                Finish
            </button>
        );
    }
}
