import React from "react";

function Modal({ isCorrect, turn, solution, handleReset }) {
    return (
        <div className="modal">
            {isCorrect ? (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                    <p>You found the solution in {turn} guesses.</p>
                    <button onClick={handleReset}>Play Again</button>
                </div>
            ) : (
                <div>
                    <h1>Nevermind :)</h1>
                    <p className="solution">{solution}</p>
                    <p>Better luck next time!</p>
                    <button onClick={handleReset}>Play Again</button>
                </div>
            )}
        </div>
    );
}

export default Modal;
