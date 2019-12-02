export class Vector {
  constructor(public x: number, public y: number) {
  }

  static isEqual(v: Vector, other: Vector): boolean {
    return v && other && v.x === other.x && v.y === other.y;
  }
}
