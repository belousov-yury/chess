import {Board} from './Board';
import {Cell} from './Cell';
import {FiguresNames} from './figures/Figure';
import {Colors} from './Colors';

export abstract class GameManager {

  static isKingUnderAttack(color: Colors, board: Board) : boolean {
    const kingCell = this.getKingCell(color, board)
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const cell = board.getCell(i,j)
        if(!cell.isEmpty() && cell.figure?.color !== color && kingCell) {
          if(cell.figure?.canMove(kingCell)) {
            return true
          }
        }
      }
    }
    return false
  }

  static isMate(color: Colors, board: Board): boolean {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const cell = board.getCell(i,j)
        if(!cell.isEmpty()) {
          if(cell.figure?.color === color) {
            cell.calcPossibleMoves()
            if(cell.possibleMoves.length > 0) {
              return false
            }
          }
        }
      }
    }
    return true
  }

  static getKingCell(color: Colors, board: Board): Cell | null {
    let cell = null
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const findCell = board.getCell(i,j)
        if(findCell.figure?.name === FiguresNames.KING && findCell.figure.color === color) {
          return findCell
        }
      }
    }
    return cell
  }
}