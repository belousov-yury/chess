import React, {FC, Fragment, useEffect, useState} from 'react'
import {Board} from '../models/Board'
import CellComponent from './CellComponent'
import {Cell} from '../models/Cell'
import {Player} from '../models/Player'

interface BoardProps {
  board: Board
  setBoard: (board: Board) => void
  currentPlayer: Player | null
  swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      if (selectedCell.moveFigure(cell)) {
        cell.calcPossibleMoves()
        swapPlayer()
        setSelectedCell(null)
        updateBoard()
      } else {
        alert('Шах')
      }
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        if (selectedCell === cell) {
          setSelectedCell(null)
        } else {
          cell.calcPossibleMoves()
          setSelectedCell(cell)
        }
      }
    }
  }

  useEffect(() => {
    highlightCells()
    // eslint-disable-next-line
  }, [selectedCell])

  function highlightCells() {
    board.highlightCells(selectedCell)
    updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  return (
    <div>
      <h3>Текущий игрок {currentPlayer?.color}</h3>
      <div className='board'>
        {board.cells.map((row, index) =>
          <Fragment key={index}>
            {
              row.map((cell) =>
                <CellComponent
                  click={click}
                  cell={cell}
                  key={cell.id}
                  selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                />
              )
            }
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default BoardComponent