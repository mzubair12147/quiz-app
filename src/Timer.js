import { useEffect } from "react";

export default function Timer({ dispatch, remainingTime }) {
    const min = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    useEffect(
        function () {
            const id = setInterval(() => {
                dispatch({ type: "tick" });
            }, 1000);

            return () => clearInterval(id);
        },
        [dispatch]
    );

    return (
        <div className="timer">
            {min < 10 ? `0${min}` : min}:{" "}
            {seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
}
