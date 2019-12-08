export type CellState = 0 | 1 | -1;

export class CellValue {
  static isEmptyCell(value: CellValue): boolean {
    return !value || value.isEmpty();
  }

  constructor(public state: CellState = 0, public score: number = 0) {
  }

  equals(v: CellValue): boolean {
    return !!v && v.state === this.state;
  }

  toggleValue() {
    if (!this.isEmpty()) {
      this.state = this.state > 0 ? -1 : 1;
    }
  }

  isEmpty() {
    return !this.state;
  }

  setEmpty() {
    this.state = 0;
  }
}
