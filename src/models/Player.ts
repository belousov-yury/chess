import {Colors} from './Colors';

export class Player {
  color: Colors
  check: boolean = false
  mate: boolean = false


  constructor(color: Colors) {
    this.color = color;
  }

  public setCheck(check: boolean) : void {
    this.check = check
  }
  public setMate(mate: boolean) : void {
    this.mate = mate
  }
}