import { baseProto, setProto, MatBase, multiply4, types, setup } from './common'
import mat3x4, { Mat3x4 } from './mat3x4'
import { Mat4 } from './mat4'
import { Vec4 } from './vec4'

export interface Mat4x3 extends MatBase<Mat4x3, Vec4, Mat3x4> {
  toMat4(): Mat4
}

const p = setProto(
  {
    // prettier-ignore
    from(
      a00 = 1, a01 = 0, a02 = 0,
      a10 = 0, a11 = 1, a12 = 0,
      a20 = 0, a21 = 0, a22 = 1,
      a30 = 0, a31 = 0, a32 = 0,
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
      this[9] = a30
      this[10] = a31
      this[11] = a32

      return this
    },

    // prettier-ignore
    fromArray(m: number[]) {
      const [
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22,
        a30, a31, a32,
      ] = m

      return this.from(
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22,
        a30, a31, a32,
      )
    },

    clone() {
      return mat4x3(...this)
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
      this[9] = 0
      this[10] = 0
      this[11] = 0
      return this
    },

    // prettier-ignore
    transpose() {
      const [
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22,
        a30, a31, a32,
      ] = this
      
      return mat3x4(
        a00, a10, a20, a30,
        a01, a11, a21, a31,
        a02, a12, a22, a32
      )
    },

    append(m: Mat4 | Mat3x4 | Mat4x3) {
      return multiply4(this, m, this)
    },

    prepend(m: Mat4 | Mat3x4 | Mat4x3) {
      return multiply4(m, this, this)
    },

    // prettier-ignore
    invert() {
      const [
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22,
        a30, a31, a32,
      ] = this

      const b00 = a00 * a11 - a01 * a10
      const b01 = a00 * a12 - a02 * a10
      const b03 = a01 * a12 - a02 * a11
      const b06 = a20 * a31 - a21 * a30
      const b07 = a20 * a32 - a22 * a30
      const b08 = a20
      const b09 = a21 * a32 - a22 * a31
      const b10 = a21
      const b11 = a22

      // Calculate the determinant
      let det = b00 * b11 - b01 * b10 + b03 * b08

      if (!det) return null

      det = 1 / det

      this[0] = (a11 * b11 - a12 * b10 + 0) * det
      this[1] = (a02 * b10 - a01 * b11 - 0) * det
      this[2] = b03 * det
      this[3] = (a12 * b08 - a10 * b11 - 0) * det
      this[4] = (a00 * b11 - a02 * b08 + 0) * det
      this[5] = b01 * det
      this[6] = (a10 * b10 - a11 * b08 + 0) * det
      this[7] = (a01 * b08 - a00 * b10 - 0) * det
      this[8] = b00 * det
      this[9] = (a11 * b07 - a10 * b09 - a12 * b06) * det
      this[10] = (a00 * b09 - a01 * b07 + a02 * b06) * det
      this[11] = (a31 * b01 - a30 * b03 - a32 * b00) * det

      return this
    },
  },
  baseProto
)

// prettier-ignore
export default function mat4x3(
  a00 = 1, a01 = 0, a02 = 0, 
  a10 = 0, a11 = 1, a12 = 0,
  a20 = 0, a21 = 0, a22 = 1,
  a30 = 0, a31 = 0, a32 = 0
) {
  return setup([
    a00, a01, a02, 
    a10, a11, a12,
    a20, a21, a22,
    a30, a31, a32
  ], p, types.mat4x3) as Mat4x3
}
