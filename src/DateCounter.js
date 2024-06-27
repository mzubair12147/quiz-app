import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
    const { type, payLoad } = action;

    switch (type) {
        case "inc":
            return { ...state, count: state.count + state.step };
        case "dec":
            return { ...state, count: state.count - state.step };
        case "setCount":
            return { ...state, count: payLoad };
        case "setStep":
            return { ...state, step: payLoad };
        case "reset":
            return initialState;
        default:
            throw Error("Invalid action");
    }
}

function DateCounter() {
    // const [tempCount, setCount] = useState(0);
    // const [step, setStep] = useState(1);

    const [state, dispatch] = useReducer(reducer, initialState);

    const { count, step } = state;

    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({ type: "dec" });
        // setCount((count) => count - 1);
        // setCount((count) => count - step);
    };

    const inc = function () {
        dispatch({ type: "inc" });
        // setCount((count) => count + 1);
        // setCount((count) => count + step);
    };

    const defineCount = function (e) {
        dispatch({ type: "setCount", payLoad: Number(e.target.value) });
        // setCount(Number(e.target.value));
    };

    const defineStep = function (e) {
        dispatch({ type: "setStep", payLoad: Number(e.target.value) });
        // setStep(Number(e.target.value));
    };

    const reset = function () {
        dispatch({ type: "reset" });
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;
