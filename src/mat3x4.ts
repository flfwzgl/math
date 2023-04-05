import { baseProto, setProto, MatBase, multiply4, setup, types } from './common'
import mat4, { Mat4 } from './mat4'
import mat4x3, { Mat4x3 } from './mat4x3'
import { Vec3 } from './vec3'
import vec4, { Vec4 } from './vec4'

export interface Mat3x4 extends MatBase<Mat3x4, Vec4 | Vec3, Mat4x3> {
  toMat4(): Mat4
}

const p = setProto(
  {
    // prettier-ignore
    from(
      a00 = 1, a01 = 0, a02 = 0, a03 = 0,
      a10 = 0, a11 = 1, a12 = 0, a13 = 0,
      a20 = 0, a21 = 0, a22 = 1, a23 = 0
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
      
      return this
    },

    // prettier-ignore
    fromArray(m: number[]) {
      const [
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23
      ] = m
      
      return this.from(
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23
      )
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

      return this
    },

    // prettier-ignore
    transpose() {
      const [
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23
      ] = this

      return mat4x3(
        a00, a10, a20,
        a01, a11, a21,
        a02, a12, a22,
        a03, a13, a23
      )
    },

    invert() {
      // prettier-ignore
      const [
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
      ] = this

      const b00 = a00 * a11 - a01 * a10
      const b01 = a00 * a12 - a02 * a10
      const b02 = a00 * a13 - a03 * a10
      const b03 = a01 * a12 - a02 * a11
      const b04 = a01 * a13 - a03 * a11
      const b05 = a02 * a13 - a03 * a12
      const b08 = a20
      const b10 = a21
      const b11 = a22

      // Calculate the determinant
      let det = b00 * b11 - b01 * b10 + b03 * b08

      if (!det) return null

      det = 1 / det

      this[0] = (a11 * b11 - a12 * b10) * det
      this[1] = (a02 * b10 - a01 * b11) * det
      this[2] = b03 * det
      this[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det
      this[4] = (a12 * b08 - a10 * b11) * det
      this[5] = (a00 * b11 - a02 * b08) * det
      this[6] = -b01 * det
      this[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det
      this[8] = (a10 * b10 - a11 * b08) * det
      this[9] = (a01 * b08 - a00 * b10) * det
      this[10] = b00 * det
      this[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det

      return this
    },

    // prettier-ignore
    transformVec(v: Vec4 | Vec3) {
      const [
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23
      ] = this
      
      const [x, y, z, w = 1] = v
      
      return vec4(
        a00 * x + a10 * y + a20 * z,
        a01 * x + a11 * y + a21 * z,
        a02 * x + a12 * y + a22 * z,
        a03 + x + a13 * y + a23 * z + w
      )
    },

    append(m: Mat4 | Mat3x4 | Mat4x3) {
      return multiply4(this, m, this)
    },

    prepend(m: Mat4 | Mat3x4 | Mat4x3) {
      return multiply4(m, this, this)
    },

    // prettier-ignore
    toMat4 () {
      const [
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22,
        a30, a31, a32,
      ] = this
      
      return mat4(
        a00, a01, a02, 0,
        a10, a11, a12, 0,
        a20, a21, a22, 0,
        a30, a31, a32, 1
      )
    },
  },
  baseProto
)

// prettier-ignore
export default function mat3x4(
  a00 = 1, a01 = 0, a02 = 0, a03 = 0,
  a10 = 0, a11 = 1, a12 = 0, a13 = 0,
  a20 = 0, a21 = 0, a22 = 1, a23 = 0
) {
  return setup([
    a00, a01, a02, a03,
    a10, a11, a12, a13,
    a20, a21, a22, a23
  ], p, types.mat3x4) as Mat3x4
}
