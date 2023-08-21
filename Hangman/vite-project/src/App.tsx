import { useCallback, useEffect, useState } from "react";
import words from "../wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() { 
  const [wordToGuess, setWordToGuess] = useState(getWord);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrerctLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

  const bodyPartCount = 6;
  const isLoser = incorrerctLetters.length >= bodyPartCount;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) 
      return
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) 
      return
      e.preventDefault();
      addGuessedLetter(key);
    }
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") 
      return
      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    }
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])
  
  return <div style={{
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    margin: "0 auto",
    alignItems: "center",
  }}>
    <div style={{fontSize: "2rem", textAlign: "center"}}>
      {isWinner && "You won! Refresh to try again!"}
      {isLoser && "Nice try! Refresh to try again!"}
    </div> 
    <HangmanDrawing numberOfGuesses={incorrerctLetters.length}/>
    <HangmanWord reveal={isLoser} 
    guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
    <div style={{alignSelf: "stretch"}}>
    <Keyboard 
    disabled={isWinner || isLoser}
    activeLetter={guessedLetters.filter(letter => wordToGuess.includes(letter) 
    )}
    inactiveLetters={incorrerctLetters}
    addGuessedLetter={addGuessedLetter}
    />
    </div>


  </div>
}

export default App
