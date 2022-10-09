import React from "react";
import { useEffect, useState } from "react";
import KeypadRow from "./KeypadRow";

function Keypad({ usedKeys }) {
    const [letterRow1, setLetterRow1] = useState([]);
    const [letterRow2, setLetterRow2] = useState([]);
    const [letterRow3, setLetterRow3] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/letters")
            .then((res) => res.json())
            .then((data) => {
                // console.log("data", data);
                let row1 = [];
                let row2 = [];
                let row3 = [];

                for (let i = 0; i < 10; i++) {
                    row1.push(data[i]);
                }
                for (let i = 10; i < 19; i++) {
                    row2.push(data[i]);
                }
                for (let i = 19; i < 26; i++) {
                    row3.push(data[i]);
                }
                setLetterRow1(row1);
                setLetterRow2(row2);
                setLetterRow3(row3);
            });
    }, [setLetterRow1, setLetterRow2, setLetterRow3]);

    return (
        <div className="keypad">
            <KeypadRow row={letterRow1} usedKeys={usedKeys} />
            <KeypadRow row={letterRow2} usedKeys={usedKeys} />
            <KeypadRow row={letterRow3} usedKeys={usedKeys} />
            {/* <div className="keypad-row">
                {letterRow1 &&
                    letterRow1.map((letter) => {
                        const color = usedKeys[letter.key];
                        return (
                            <div key={letter.key} className={color}>
                                {letter.key}
                            </div>
                        );
                    })}
            </div>
            <div className="keypad-row">
                {letterRow2 &&
                    letterRow2.map((letter) => {
                        const color = usedKeys[letter.key];
                        return (
                            <div key={letter.key} className={color}>
                                {letter.key}
                            </div>
                        );
                    })}
            </div>
            <div className="keypad-row">
                {letterRow3 &&
                    letterRow3.map((letter) => {
                        const color = usedKeys[letter.key];
                        return (
                            <div key={letter.key} className={color}>
                                {letter.key}
                            </div>
                        );
                    })}
            </div> */}
        </div>
    );
}

export default Keypad;
