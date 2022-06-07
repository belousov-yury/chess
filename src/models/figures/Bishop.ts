import {Figure, FiguresNames} from './Figure'
import {Colors} from '../Colors'
import {Cell} from '../Cell'

import blackLogo from '../../assets/figures/black-bishop.png'
import whiteLogo from '../../assets/figures/white-bishop.png'

export class Bishop extends Figure {

  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FiguresNames.BISHOP
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target)) {
      return false
    }
    return this.cell.isEmptyDiagonal(target)
  }
}