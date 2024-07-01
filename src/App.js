import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finished from "./Finished";
import Footer from "./Footer";
import Timer from "./Timer";

const SECONDS_PER_QUESTION = 20;

const initialState = {
    questions: [],
    // not loading
    // all status states: ['loading','error', 'ready', 'finished', 'running'];
    status: "",
    currIndex: 0,
    answer: null,
    score: 0,
    highscore: 0,
    remainingTime: null,
};

function reducer(state, action) {
    const { type, payLoad } = action;

    switch (type) {
        case "data_received":
            return { ...state, questions: payLoad, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        case "start":
            return {
                ...state,
                status: "active",
                remainingTime: state.questions.length * SECONDS_PER_QUESTION,
            };
        case "newAnswer":
            const question = state.questions.at(state.currIndex);
            return {
                ...state,
                answer: payLoad,
                score:
                    payLoad === question.correctOption
                        ? state.score + question.points
                        : state.score,
            };
        case "nextQuestion":
            return { ...state, answer: null, currIndex: state.currIndex + 1 };
        case "finished":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.score > state.highscore
                        ? state.score
                        : state.highscore,
            };
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
            };
        case "tick":
            return {
                ...state,
                remainingTime: state.remainingTime - 1,
                status: state.remainingTime === 0 ? "finished" : state.status,
            };
        default:
            throw Error("You choose an invalid action!");
    }
}

function App() {
    const [
        {
            questions,
            status,
            currIndex,
            answer,
            score,
            highscore,
            remainingTime,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    const noQuestions = questions.length;
    const maxScore = questions.reduce((prev, curr) => prev + curr.points, 0);
    useEffect(function () {
        fetch("http://localhost:3001/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "data_received", payLoad: data }))
            .catch((err) => dispatch({ type: "dataFailed" }));
    }, []);

    return (
        <div className="App">
            <Header />

            <Main>
                {status === "loading" && <Loader />}
                {status === "Error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        noQuestions={noQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === "active" && (
                    <>
                        <Progress
                            i={currIndex}
                            noQuestion={noQuestions}
                            score={score}
                            maxScore={maxScore}
                            answer={answer}
                        />
                        <Question
                            question={questions.at(currIndex)}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                remainingTime={remainingTime}
                            />
                            <NextButton
                                dispatch={dispatch}
                                answer={answer}
                                index={currIndex}
                                noQuestion={noQuestions}
                            />
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <Finished
                        score={score}
                        maxScore={maxScore}
                        highscore={highscore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}

export default App;
