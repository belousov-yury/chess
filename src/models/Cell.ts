import {Colors} from './Colors'
import {Board} from './Board'
import {Figure, FiguresNames} from './figures/Figure'
import {GameManager} from './GameManager'

export class Cell {
  readonly x: number
  readonly y: number
  readonly color: Colors
  figure: Figure | null
  board: Board
  possibleMoves: Cell[] = []
  available: boolean // Можешь ли переместиться
  id: number // для реакт ключей

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x
    this.y = y
    this.color = color
    this.figure = figure
    this.board = board
    this.available = false
    this.id = Math.random()
    this.calcPossibleMoves()
  }

  public calcPossibleMoves(): void {
    this.possibleMoves = []
    if (this.figure) {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const target = this.board.getCell(i, j)
          if (this.figure?.canMove(target)) {
            const color = this.figure?.color
            const copyFigure = target.figure
            target.setFigure(this.figure)
            this.setFigure(null)
            if (!GameManager.isKingUnderAttack(color, this.board)) {
              this.setFigure(target.figure)
              target.setFigure(copyFigure)
              this.possibleMoves.push(this.board.getCell(i, j))
            } else {
              this.setFigure(target.figure)
              target.setFigure(copyFigure)
            }
          }
        }
      }
    }
  }

  isEmpty(): boolean {
    return this.figure === null
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color
    }
    return false
  }

  public isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false
    }

    const min = Math.min(this.y, target.y)
    const max = Math.max(this.y, target.y)

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false
      }
    }

    return true
  }

  public isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false
    }

    const min = Math.min(this.x, target.x)
    const max = Math.max(this.x, target.x)

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false
      }
    }

    return true
  }

  public isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x)
    const absY = Math.abs(target.y - this.y)

    if (absX !== absY) {
      return false
    }

    const dy = this.y < target.y ? 1 : -1
    const dx = this.x < target.x ? 1 : -1

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false
      }
    }
    return true
  }

  setFigure(figure: Figure | null) {
    this.figure = figure
    if (this.figure) {
      this.figure.cell = this
    }
  }

  addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.board.lostBlackFigures.push(figure)
      : this.board.lostWhiteFigures.push(figure)
  }

  moveFigure(target: Cell): boolean {
    if (this.possibleMoves.length) {
      for (let i = 0; i < this.possibleMoves.length; i++) {
        const cell = this.possibleMoves[i]
        if (cell.x === target.x && cell.y === target.y) {
          if (target.figure) {
            this.addLostFigure(target.figure)
          }
          if(this.figure?.name === FiguresNames.KING && Math.abs(target.x - this.x) > 1) {
            if(target.x > this.x) {
              this.board.getCell(this.x + 1, this.y).setFigure(this.board.getCell(this.x + 3, this.y).figure)
              this.board.getCell(this.x + 3, this.y).setFigure(null)
            } else {
              this.board.getCell(this.x - 1, this.y).setFigure(this.board.getCell(this.x - 4, this.y).figure)
              this.board.getCell(this.x - 4, this.y).setFigure(null)
            }
          }
          target.setFigure(this.figure)
          this.setFigure(null)
          target.figure?.movedFigure()
          return true
        }
      }
    }
    return false
  }
}