import { baseProto, setProto, MatBase, multiply4, setup, types } from './common'
import mat3, { Mat3 } from './mat3'
import { Mat3x4 } from './mat3x4'
import mat4x3, { Mat4x3 } from './mat4x3'
import { Vec3 } from './vec3'
import vec4, { Vec4 } from './vec4'

export interface Mat4 extends MatBase<Mat4, Vec4 | Vec3> {
  translate(tx?: number, ty?: number, tz?: number): this
  t(tx?: number, ty?: number, tz?: number): this

  scale(sx?: number, sy?: number, sz?: number): this
  s(sx?: number, sy?: number, sz?: number): this

  translateX(tx: number): this
  translateY(ty: number): this
  translateZ(tz: number): this
  tx(tx: number): this
  ty(ty: number): this
  tz(tz: number): this

  scaleX(sx: number): this
  scaleY(sy: number): this
  scaleZ(sz: number): this
  sx(sx: number): this
  sy(sy: number): this
  sz(sz: number): this

  rotate(v: Vec3): this
  r(v: Vec3): this

  rx(rad: number): this
  ry(rad: number): this
  rz(rad: number): this

  toPosVec(): Vec4
  toRotateMat(): Mat3
  removePos(): this

  toMat3(): Mat3
  toMat4x3(): Mat4x3
  toMat3x4(): Mat3x4
}

const p = setProto(
  {
    // prettier-ignore
    from(
      a00 = 1, a01 = 0, a02 = 0, a03 = 0,
      a10 = 0, a11 = 1, a12 = 0, a13 = 0,
      a20 = 0, a21 = 0, a22 = 1, a23 = 0,
      a30 = 0, a31 = 0, a32 = 0, a33 = 1
    ) {
      this[0] = a00
      this[1] = a01
      this[2] = a02
      this[3] = a03
      this[4] = a10
      this[5] = a11
      this[6] = a12
      this[7] = a13
      this[8] = a20
      this[9] = a21
      this[10] = a22
      this[11] = a23
      this[12] = a30
      this[13] = a31
      this[14] = a32
      this[15] = a33

      return this
    },

    // prettier-ignore
    fromArray(m: number[]) {
      const [
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33
      ] = m

      return this.from(
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33
      )
    },

    clone() {
      return mat4(...this)
    },

    identity() {
      this[0] = 1
      this[1] = 0
      this[2] = 0
      this[3] = 0
      this[4] = 0
      this[5] = 1
      this[6] = 0
      this[7] = 0
      this[8] = 0
      this[9] = 0
      this[10] = 1
      this[11] = 0
      this[12] = 0
      this[13] = 0
      this[14] = 0
      this[15] = 1
      return this
    },

    // prettier-ignore
    transpose() {
      const [
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33
      ] = this

      this[1] = a10
      this[2] = a20
      this[3] = a30
      this[6] = a21
      this[7] = a31
      this[11] = a32

      return this
    },

    append(m: Mat4 | Mat3x4 | Mat4x3) {
      return multiply4(this, m, this)
    },

    prepend(m: Mat4 | Mat3x4 | Mat4x3) {
      return multiply4(m, this, this)
    },

    translate(tx = 0, ty = 0, tz = 0) {
      // prettier-ignore
      return this.prepend(
      mat4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        tx, ty, tz, 1
      )
    )
    },

    translateX(tx: number) {
      return this.translate(tx)
    },

    translateY(ty: number) {
      return this.translate(0, ty)
    },

    translateZ(tz: number) {
      return this.translate(0, 0, tz)
    },

    scale(sx = 1, sy = 1, sz = 1) {
      // prettier-ignore
      return this.prepend(
        mat4(
          sx, 0, 0, 0,
          0, sy, 0, 0,
          0, 0, sz, 0,
          0, 0,  0, 1
        )
      )
    },

    scaleX(sx: number) {
      return this.scale(sx)
    },

    scaleY(sy: number) {
      return this.scale(1, sy)
    },

    scaleZ(sz: number) {
      return this.scale(1, 1, sz)
    },

    rotate() {
      //
    },

    rotateX(rad: number) {
      const c = Math.cos(rad)
      const s = Math.sin(rad)

      // prettier-ignore
      return this.prepend(
        mat4(
          1, 0, 0, 0,
          0, c, s, 0,
          0, -s, c, 0,
          0, 0, 0, 1
        )
      )
    },

    rotateY(rad: number) {
      const c = Math.cos(rad)
      const s = Math.sin(rad)

      // prettier-ignore
      return this.prepend(
        mat4(
          c, 0, -s, 0,
          0, 1, 0, 0,
          s, 0, c, 0,
          0, 0, 0, 1
        )
      )
    },

    rotateZ(rad: number) {
      const c = Math.cos(rad)
      const s = Math.sin(rad)

      // prettier-ignore
      return this.prepend(
        mat4(
          c, s, 0, 0,
          -s, c, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        )
      )
    },

    invert() {
      // prettier-ignore
      const [
      a00, a01, a02, a03,
      a10, a11, a12, a13,
      a20, a21, a22, a23,
      a30, a31, a32, a33
    ] = this

      const b00 = a00 * a11 - a01 * a10
      const b01 = a00 * a12 - a02 * a10
      const b02 = a00 * a13 - a03 * a10
      const b03 = a01 * a12 - a02 * a11
      const b04 = a01 * a13 - a03 * a11
      const b05 = a02 * a13 - a03 * a12
      const b06 = a20 * a31 - a21 * a30
      const b07 = a20 * a32 - a22 * a30
      const b08 = a20 * a33 - a23 * a30
      const b09 = a21 * a32 - a22 * a31
      const b10 = a21 * a33 - a23 * a31
      const b11 = a22 * a33 - a23 * a32

      // Calculate the determinant
      let det =
        b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

      if (!det) return null

      det = 1 / det

      this[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det
      this[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det
      this[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det
      this[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det
      this[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det
      this[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det
      this[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det
      this[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det
      this[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det
      this[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det
      this[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det
      this[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det
      this[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det
      this[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det
      this[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det
      this[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det

      return this
    },

    // prettier-ignore
    transformVec(v: Vec4 | Vec3) {
      if (v.type === types.vec3) v = (v as Vec3).toVec4()
      v = v as Vec4
      
      const [
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33
      ] = this
      
      const [x, y, z, w] = v
      
      return vec4(
        a00 * x + a10 * y + a20 * z + a30 * w,
        a01 * x + a11 * y + a21 * z + a31 * w,
        a02 * x + a12 * y + a22 * z + a32 * w,
        a03 * x + a13 * y + a23 * z + a33 * w
      )
    },

    // prettier-ignore
    toMat3 () {
      const [
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33
      ] = this
      
      return mat3(
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22
      )
  },

    // prettier-ignore
    toMat4x3 () {
      const [
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33
      ] = this
      
      return mat4x3(
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22,
        a30, a31, a32
      )
  },

    // prettier-ignore
    toMat3x4 () {
      const [
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
      ] = this
      
      return mat4x3(
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
      )
    },

    toPosVec() {
      return vec4(this[12], this[13], this[14], this[15])
    },

    removePos() {
      this[12] = this[13] = this[14] = 0
      this[15] = 1
      return this
    },
  },
  baseProto
) as any

p.t = p.translate
p.tx = p.translateX
p.ty = p.translateY
p.tz = p.translateZ

p.s = p.scale
p.sy = p.scaleX
p.sy = p.scaleY
p.sz = p.scaleZ

p.r = p.rotate
p.rx = p.rotateX
p.ry = p.rotateY
p.rz = p.rotateZ

p.i = p.identity

p.toRotateMat = p.toMat3

// prettier-ignore
export default function mat4(
  a00 = 1, a01 = 0, a02 = 0, a03 = 0,
  a10 = 0, a11 = 1, a12 = 0, a13 = 0,
  a20 = 0, a21 = 0, a22 = 1, a23 = 0,
  a30 = 0, a31 = 0, a32 = 0, a33 = 1
) {
  return setup([
    a00, a01, a02, a03,
    a10, a11, a12, a13,
    a20, a21, a22, a23,
    a30, a31, a32, a33
  ], p, types.mat4) as Mat4
}
