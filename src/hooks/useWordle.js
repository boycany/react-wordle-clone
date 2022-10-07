import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    
    //format a guess into an array of letter objects
    //e.g. [{ key: 'a', color: 'yellow' }]
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map(letter=>{
            return { key: letter, color: 'grey'}
        })

        //find any green letters
        formattedGuess.forEach((letter, i)=>{
            if(solutionArray[i] === letter.key){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        //find any yellow colors
        formattedGuess.forEach((letter, i)=>{
            if(letter.color !== 'green' && solutionArray.includes(letter.key)){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(letter.key)] = null  //有需要嗎???
            }
        })

        return formattedGuess
    }

    //add a new guess to the guesses state
    //update the isCorrect state if the guess is correct
    //add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses(prevGuesses=>{
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory(prevHistory=>{
            return [...prevHistory, currentGuess]
        })
        setTurn(prevTurn=>{
            return prevTurn + 1
        })
        setCurrentGuess('')
    }

    //handle keyup event & track current guess
    //if user presses enter, add the new guess
    const handleKeyup = ({ key }) => {
        if(key === 'Enter'){
            //only add guess if turn is less than 5
            if(turn > 5){
                console.log('you used all your guesses');
                return
            }
            //do not allow duplicate words
            if(history.includes(currentGuess)){
                console.log('you already tried that word')
                return
            }
            //check word is 5 chars long
            if(currentGuess.length !== 5){
                console.log('word must be 5 chars long');
                return
            }
            const formattedGuess = formatGuess()
            console.log('formattedGuess :>> ', formattedGuess);

            addNewGuess(formattedGuess)
        }
        if(key === 'Backspace'){
            setCurrentGuess((prev)=>{
                return prev.slice(0, -1)
            })
            return //如果按 Backspace 就不用再跑下面的驗證了
        }
        if(/^[A-Za-z]$/.test(key)){
            if(currentGuess.length < 5){
                setCurrentGuess(prev=>{
                     return prev + key
                })
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, handleKeyup }
}

export default useWordle