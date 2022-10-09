import React from "react";

function KeypadRow({ row, usedKeys }) {
    return (
        <div className="keypad-row">
            {row &&
                row.map((letter) => {
                    const color = usedKeys[letter.key];
                    return (
                        <div key={letter.key} className={color}>
                            {letter.key}
                        </div>
                    );
                })}
        </div>
    );
}

export default KeypadRow;
