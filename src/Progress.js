export default function Progress({ i, noQuestion, score, maxScore, answer }) {
    return (
        <div className="progress">
            <progress
                style={{ borderRadius: "10px" }}
                max={noQuestion}
                value={i + Number(answer !== null)}
            />
            <p>
                Question <strong>{i + 1}</strong> / {noQuestion}
            </p>

            <p>
                <strong>{score}</strong> / {maxScore}
            </p>
        </div>
    );
}
