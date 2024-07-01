export default function StartScreen({ noQuestions, dispatch }) {
    return (
        <div className="start">
            <h2>Welcome to TWIZ App</h2>
            <h3>{noQuestions} questions to test your react mastery</h3>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "start" })}
            >
                Let's start
            </button>
        </div>
    );
}
