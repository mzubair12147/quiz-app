import Option from "./Option";

export default function Question({ question, dispatch, answer }) {
    return (
        <div style={{ textAlign: "center", width: "100%" }}>
            <h4>{question.question}</h4>
            <Option question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
}
