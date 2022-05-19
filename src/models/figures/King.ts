import {Figure, FiguresNames} from './Figure';
import {Colors} from '../Colors';
import {Cell} from '../Cell';
import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';
import {GameManager} from '../GameManager';

export class King extends Figure {

  isFirstStep: boolean = true

  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FiguresNames.KING
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }

    if (this.isFirstStep && target.x === this.cell.x + 2
      && target.y === this.cell.y && target.isEmpty()
      && this.cell.board.getCell(this.cell.x + 1, this.cell.y).isEmpty()
      && this.cell.board.getCell(this.cell.x + 3, this.cell.y).figure?.name === FiguresNames.ROOK
      && !GameManager.isKingUnderAttack(this.color, this.cell.board)) {
      return true
    }

    if (this.isFirstStep && target.x === this.cell.x - 2
      && target.y === this.cell.y && target.isEmpty()
      && this.cell.board.getCell(this.cell.x - 1, this.cell.y).isEmpty()
      && this.cell.board.getCell(this.cell.x - 3, this.cell.y).isEmpty()
      && this.cell.board.getCell(this.cell.x - 4, this.cell.y).figure?.name === FiguresNames.ROOK
      && !GameManager.isKingUnderAttack(this.color, this.cell.board)) {
      return true
    }

    const dx = Math.abs(this.cell.x - target.x)
    const dy = Math.abs(this.cell.y - target.y)
    return ((dx === 1 && dy === 1) || (dx === 0 && dy === 1) || (dx === 1 && dy === 0))
  }

  movedFigure() {
    super.movedFigure();
    this.isFirstStep = false
  }
}