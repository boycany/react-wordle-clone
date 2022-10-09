import { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

function Wordle({ solution, setSolution }) {
    const {
        currentGuess,
        handleKeyup,
        guesses,
        isCorrect,
        turn,
        usedKeys,
        resetAll,
    } = useWordle(solution);

    const [showModal, setShowModal] = useState(false);

    const handleReset = () => {
        setSolution("");
        setShowModal(false);
        resetAll();
    };

    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);

        if (isCorrect) {
            //等動畫跑完才秀出 Ｍodal
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener("keyup", handleKeyup);
            return;
        }

        if (turn > 5) {
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener("keyup", handleKeyup);
            return;
        }
        return () => window.removeEventListener("keyup", handleKeyup);
    }, [handleKeyup, isCorrect, turn]);

    // useEffect(() => {
    // console.log("guesses: >> ", guesses);
    // console.log("turn :>> ", turn);
    // console.log("isCorrect :>> ", isCorrect);
    // }, [guesses, turn, isCorrect]);

    return (
        <div className="container">
            {/* <dir>Solution - {solution}</dir> */}
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
            <Keypad usedKeys={usedKeys} />
            {showModal && (
                <Modal
                    isCorrect={isCorrect}
                    turn={turn}
                    solution={solution}
                    handleReset={handleReset}
                />
            )}
        </div>
    );
}

export default Wordle;
