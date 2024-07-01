export default function Finished({ score, maxScore, highscore, dispatch }) {
    const percentage = (score / maxScore) * 100;

    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";

    return (
        <>
            <p className="result">
                You Scored{" "}
                <strong>
                    {emoji} {score}
                </strong>{" "}
                out of {maxScore} ({Math.ceil(percentage)})
            </p>

            <p className="highscore">Highscorer: {highscore}</p>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "restart" })}
            >
                Restart
            </button>
        </>
    );
}
