import React, {useEffect, useState} from 'react'
import './App.scss'
import BoardComponent from './components/BoardComponent'
import {Board} from './models/Board'
import {Player} from './models/Player'
import {Colors} from './models/Colors'
import LostFigures from './components/LostFigures'
import Timer from './components/Timer'
import {GameManager} from './models/GameManager'

function App() {

  const [board, setBoard] = useState(new Board())

  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    restart()
    // eslint-disable-next-line
  }, [])

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)

  }

  useEffect(() => {
    if (whitePlayer.mate || blackPlayer.mate) {
      setGameOver(true)
    }
  }, [whitePlayer.mate, blackPlayer.mate])

  useEffect(() => {
    if (currentPlayer) {
      checkMate()
    }
  // eslint-disable-next-line
  }, [currentPlayer])

  function checkMate(): void {
    const whiteCheck = GameManager.isKingUnderAttack(whitePlayer.color, board)
    const blackCheck = GameManager.isKingUnderAttack(blackPlayer.color, board)

    if (whiteCheck) {
      const isMate = GameManager.isMate(whitePlayer.color, board)
      if (isMate) {
        setWhitePlayer(prev => {
          prev.setCheck(whiteCheck)
          prev.setMate(isMate)
          return prev
        })
        return
      }
    }

    if (blackCheck) {
      const isMate = GameManager.isMate(blackPlayer.color, board)
      if (isMate) {
        setBlackPlayer(prev => {
          prev.setCheck(blackCheck)
          prev.setMate(isMate)
          return prev
        })
        return
      }
    }

    if (whitePlayer.check !== whiteCheck) {
      setWhitePlayer(prev => {
        prev.setCheck(whiteCheck)
        return prev
      })
    }
    if (blackPlayer.check !== blackCheck) {
      setBlackPlayer(prev => {
        prev.setCheck(blackCheck)
        return prev
      })
    }
  }


  function restart() {
    setGameOver(false)
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
  }

  return (
    <div className='app'>
      <LostFigures
        title={'Черные фигуры'}
        figures={board.lostBlackFigures}
      />
      <div>
        <h1>{gameOver ? 'Конец игры!' : ''}</h1>
        <Timer currentPlayer={currentPlayer} restart={restart}/>
        <h2>{whitePlayer.check ? 'Шах' + (whitePlayer.mate ? ' и Мат ' : ' ') + 'черному игроку' : ''}</h2>
        <h2>{blackPlayer.check ? 'Шах' + (blackPlayer.mate ? ' и Мат ' : ' ') + 'черному игроку' : ''}</h2>
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
      </div>
      <LostFigures
        title={'Белые фигуры'}
        figures={board.lostWhiteFigures}
      />
    </div>
  )
}

export default App
