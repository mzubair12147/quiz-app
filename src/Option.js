export default function Option({ question, dispatch, answer }) {
    const hasAnswered = answer !== null;
    return (
        <div className="options">
            {question.options.map((option, i) => (
                <button
                    className={`btn btn-option ${
                        i === answer ? "answer" : ""
                    } ${
                        hasAnswered
                            ? i === question.correctOption
                                ? "correct"
                                : "wrong"
                            : ""
                    }`}
                    onClick={() => dispatch({ type: "newAnswer", payLoad: i })}
                    key={option}
                    disabled={hasAnswered}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
