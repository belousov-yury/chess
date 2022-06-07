import {Figure, FiguresNames} from './Figure';
import {Colors} from '../Colors';
import {Cell} from '../Cell';
import blackLogo from '../../assets/figures/black-rook.png';
import whiteLogo from '../../assets/figures/white-rook.png';

export class Rook extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FiguresNames.ROOK
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    if (this.cell.isEmptyHorizontal(target)) {
      return true
    }

    return this.cell.isEmptyVertical(target)
  }
}