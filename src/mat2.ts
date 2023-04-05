import { baseProto, setProto, MatBase, multiply2, setup, types } from './common'
import mat3, { Mat3 } from './mat3'
import vec2, { Vec2 } from './vec2'

export interface Mat2 extends MatBase<Mat2, Vec2> {
  rotate(rad: number): this
  toMat3(tx?: number, ty?: number): Mat3
}

const p = setProto(
  {
    from(a: number, b: number, c: number, d: number) {
      this[0] = a
      this[1] = b
      this[2] = c
      this[3] = d
      return this
    },

    fromArray(m: number[]) {
      const [a, b, c, d] = m
      return this.from(a, b, c, d)
    },

    identity() {
      this[0] = 1
      this[1] = 0
      this[2] = 0
      this[3] = 1

      return this
    },

    clone() {
      // prettier-ignore
      const [
      a, b, // the first col
      c, d
    ] = this

      return mat2(a, b, c, d)
    },

    transpose() {
      const b = this[1]
      const c = this[2]

      this[1] = c
      this[2] = b
      return this
    },

    invert() {
      // prettier-ignore
      const [
      a, b,
      c, d
    ] = this

      let det = a * d - b * d

      if (!det) return null

      det = 1 / det

      this[0] = d * det
      this[1] = -b * det
      this[2] = -c * det
      this[3] = a * det

      return this
    },

    append(m: Mat2) {
      return multiply2(this, m, this)
    },

    prepend(m: Mat2) {
      return multiply2(m, this, this)
    },

    // prettier-ignore
    transformVec(v: Vec2) {
    const [
      a, b,
      c, d
    ] = this

    const [x, y] = v

    return vec2(
      a * x + c * y,
      b * x + d * y
    )
  },

    rotate(rad: number) {
      const c = Math.cos(rad)
      const s = Math.sin(rad)

      // prettier-ignore
      return this.prepend([
      c, s,
      -s, c,
    ] as Mat2)
    },

    toMat3(tx = 0, ty = 0) {
      const [a, b, c, d] = this

      // prettier-ignore
      return mat3(
      a, b, 0,
      c, d, 0,
      tx, ty, 1
    )
    },
  },
  baseProto
) as any

p.i = p.identity

export default function mat2(a = 1, b = 0, c = 0, d = 1) {
  return setup([a, b, c, d], p, types.mat2) as Mat2
}
