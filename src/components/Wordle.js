import { useEffect } from "react"
import useWordle from "../hooks/useWordle"
import Grid from './Grid'

function Wordle({ solution }){
    const { currentGuess, handleKeyup, guesses, isCorrect, turn } = useWordle(solution)

    useEffect(()=>{
        window.addEventListener('keyup', handleKeyup)

        return ()=> window.removeEventListener('keyup', handleKeyup)
    },[handleKeyup])

    useEffect(()=>{
        console.log("guesses: >> ", guesses)
        console.log('turn :>> ', turn);
        console.log('isCorrect :>> ', isCorrect);
    }, [guesses, turn, isCorrect])

    return (
        <div>
            <dir>Solution - {solution}</dir>
            <div>current guess - {currentGuess}</div>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
        </div>
    )
}

export default Wordle