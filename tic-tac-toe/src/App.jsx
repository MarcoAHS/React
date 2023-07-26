import { useState } from 'react'
import confetti from "canvas-confetti"
const TURNS = {
  X: 'x',
  O: 'o'
}
const Square = ({ children, updateBoard, isSelected, index}) => {
  const classList = (isSelected ? 'square is-selected' : 'square');
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={classList} key={index}>
      {children}
    </div>
  )
}
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
function App() {
  const [ board, setBoard ] = useState(Array(9).fill(null))
  const [ turn, setTurn ] = useState(TURNS.X)
  const [ winner, setWinner ] = useState(null)
  const [ i, setI ] = useState(0) 
  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo;
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a]
      }
    }
    return null
  }
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    setI(0)
  }
  const updateBoard = (index) => {
    if(board[index] || winner) return
    if(i === 8) setWinner(false)
    setI(i + 1)
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const ganador = checkWinner(newBoard)
    if(ganador){
      confetti()
      setWinner(ganador)
      return
    }
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return(
              <Square updateBoard={updateBoard} key={index} index={index}>{board[index]}</Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false ? `Empate Turnos:` : `Gano: ` + winner
                }
              </h2>
              <header className='win'>
                <Square>{i}</Square>
              </header>
              <footer>
                <button onClick={resetGame}>Reset</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )

}

export default App
