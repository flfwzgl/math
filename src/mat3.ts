import { baseProto, setProto, MatBase, multiply3, setup, types } from './common'
import mat2, { Mat2 } from './mat2'
import mat2x3, { Mat2x3 } from './mat2x3'
import mat3x2, { Mat3x2 } from './mat3x2'
import mat4, { Mat4 } from './mat4'
import { Vec2 } from './vec2'
import vec3, { Vec3 } from './vec3'

export interface Mat3 extends MatBase<Mat3, Vec3 | Vec2> {
  translate(tx?: number, ty?: number): this
  t(tx?: number, ty?: number): this

  scale(sx?: number, sy?: number): this
  s(sx?: number, sy?: number): this

  translateX(tx: number): this
  translateY(ty: number): this
  tx(tx: number): this
  ty(ty: number): this

  scaleX(sx: number): this
  scaleY(sy: number): this
  sx(sx: number): this
  sy(sy: number): this

  rotate(rad: number): this
  r(rad: number): this

  toPosVec(): Vec3
  toRotateMat(): Mat2
  removePos(): this

  toMat3x2(): Mat3x2
  toMat2x3(): Mat2x3
  toMat4(): Mat4
}

const p = setProto(
  {
    // prettier-ignore
    from(
      a00: number, a01: number, a02: number,
      a10: number, a11: number, a12: number,
      a20: number, a21: number, a22: number
    ) {
      this[0] = a00
      this[1] = a01
      this[2] = a02
      this[3] = a10
      this[4] = a11
      this[5] = a12
      this[6] = a20
      this[7] = a21
      this[8] = a22
      return this
    },

    fromArray(m: number[]) {
      // prettier-ignore
      const [
      a00, a01, a02,
      a10, a11, a12,
      a20, a21, a22
    ] = m

      return this.from(a00, a01, a02, a10, a11, a12, a20, a21, a22)
    },

    clone() {
      return mat3(...this)
    },

    identity() {
      this[0] = 1
      this[1] = 0
      this[2] = 0
      this[3] = 0
      this[4] = 1
      this[5] = 0
      this[6] = 0
      this[7] = 0
      this[8] = 1
      return this
    },

    transpose() {
      // prettier-ignore
      const [
      a00, a01, a02,
      a10, a11, a12,
      a20, a21, a22
    ] = this

      this[1] = a10
      this[2] = a20
      this[3] = a01
      this[5] = a21
      this[6] = a02
      this[7] = a12

      return this
    },

    append(m: Mat3 | Mat3x2 | Mat2x3) {
      return multiply3(this, m, this)
    },

    prepend(m: Mat3 | Mat3x2 | Mat2x3) {
      return multiply3(m, this, this)
    },

    translate(tx = 0, ty = 0) {
      // prettier-ignore
      return this.prepend(mat3(
        1, 0, 0,
        0, 1, 0,
        tx, ty, 1
      ))
    },

    translateX(tx: number) {
      return this.translate(tx)
    },

    translateY(ty: number) {
      return this.translate(0, ty)
    },

    scale(sx = 1, sy = 1) {
      // prettier-ignore
      return this.prepend(mat3(
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1
    ))
    },

    scaleX(sx: number) {
      return this.scale(sx)
    },

    scaleY(sy: number) {
      return this.scale(1, sy)
    },

    rotate(rad: number) {
      const c = Math.cos(rad)
      const s = Math.sin(rad)

      // prettier-ignore
      return this.prepend(mat3(
        c, s, 0,
        -s, c, 0,
        0, 0, 1,
      ))
    },

    invert() {
      // prettier-ignore
      const [
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22
      ] = this

      const b01 = a22 * a11 - a12 * a21
      const b11 = -a22 * a10 + a12 * a20
      const b21 = a21 * a10 - a11 * a20

      // Calculate the determinant
      let det = a00 * b01 + a01 * b11 + a02 * b21

      if (!det) return null
      det = 1 / det

      this[0] = b01 * det
      this[1] = (-a22 * a01 + a02 * a21) * det
      this[2] = (a12 * a01 - a02 * a11) * det
      this[3] = b11 * det
      this[4] = (a22 * a00 - a02 * a20) * det
      this[5] = (-a12 * a00 + a02 * a10) * det
      this[6] = b21 * det
      this[7] = (-a21 * a00 + a01 * a20) * det
      this[8] = (a11 * a00 - a01 * a10) * det
      return this
    },

    transformVec(v: Vec3 | Vec2) {
      // prettier-ignore
      const [
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22
      ] = this

      const [x, y, z = 1] = v

      return vec3(
        a00 * x + a10 * y + a20 * z,
        a01 * x + a11 * y + a21 * z,
        a02 * x + a12 * y + a22 * z
      )
    },

    toPosVec() {
      return vec3(this[6], this[7], this[8])
    },

    removePos() {
      this[6] = this[7] = 0
      this[8] = 1
      return this
    },

    // prettier-ignore
    toMat3x2() {
      const [
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22,
      ] = this

      return mat3x2(a00, a01, a10, a11, a20, a21)
    },

    // prettier-ignore
    toMat2x3() {
      const [
        a00, a01, a02,
        a10, a11, a12
      ] = this

      return mat2x3(a00, a01, a02, a10, a11, a12)
    },

    // prettier-ignore
    toMat2() {
      const [
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22,
      ] = this
      
      return mat2(
        a00, a01,
        a10, a11
      )
    },

    // prettier-ignore
    toMat4() {
      const [
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22,
      ] = this
      
      return mat4(
        a00, a01, a02, 0,
        a10, a11, a12, 0,
        a20, a21, a22, 0,
        0,   0,   0,   1
      )
    },
  },
  baseProto
) as any

p.t = p.translate
p.tx = p.translateX
p.ty = p.translateY

p.s = p.scale
p.sy = p.scaleX
p.sy = p.scaleY

p.r = p.rotate

p.i = p.identity

p.toRotateMat = p.toMat2

// prettier-ignore
export default function mat3(
  a00 = 1, a01 = 0, a02 = 0, 
  a10 = 0, a11 = 1, a12 = 0,
  a20 = 0, a21 = 0, a22 = 1
) {
  return setup([
    a00, a01, a02, 
    a10, a11, a12,
    a20, a21, a22
  ], p, types.mat3) as Mat3
}
