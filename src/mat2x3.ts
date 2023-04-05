import { baseProto, setup, MatBase, multiply3, setProto, types } from './common'
import mat3, { Mat3 } from './mat3'
import mat3x2, { Mat3x2 } from './mat3x2'
import vec3, { Vec3 } from './vec3'

export interface Mat2x3 extends MatBase<Mat2x3, Vec3, Mat3x2> {
  toMat3(): Mat3
}

const p = setProto(baseProto, {
  // prettier-ignore
  from(
    a00 = 1, a01 = 0, a02 = 0, 
    a10 = 0, a11 = 1, a12 = 0
  ) {
    this[0] = a00
    this[1] = a01
    this[2] = a02
    this[3] = a10
    this[4] = a11
    this[5] = a12

    return this
  },

  fromArray(m: number[]) {
    // prettier-ignore
    const [
      a00 = 1, a01 = 0, a02 = 0, 
      a10 = 0, a11 = 1, a12 = 0
    ] = m

    return this.from(a00, a01, a02, a10, a11, a12)
  },

  clone() {
    return mat2x3(...this)
  },

  append(m: Mat3 | Mat3x2 | Mat2x3) {
    return multiply3(this, m, this)
  },

  prepend(m: Mat3 | Mat3x2 | Mat2x3) {
    return multiply3(m, this, this)
  },

  identity() {
    this[0] = 1
    this[1] = 0
    this[2] = 0
    this[3] = 0
    this[4] = 1
    this[5] = 0

    return this
  },

  // prettier-ignore
  transpose() {
    const [
      a00, a01, a02,
      a10, a11, a12,
    ] = this
    
    return mat3x2(
      a00, a10,
      a01, a11,
      a02, a12
    )
  },

  invert() {
    // prettier-ignore
    const [
      a00, a01, a02,
      a10, a11, a12,
    ] = this

    const b01 = a11
    const b11 = -a10

    // Calculate the determinant
    let det = a00 * b01 + a01 * b11

    if (!det) return null
    det = 1.0 / det

    this[0] = b01 * det
    this[1] = -a01 * det
    this[2] = (a12 * a01 - a02 * a11) * det
    this[3] = b11 * det
    this[4] = a00 * det
    this[5] = (-a12 * a00 + a02 * a10) * det

    return this
  },

  // prettier-ignore
  transformVec(v: Vec3) {
    const [
      a00, a01, a02,
      a10, a11, a12,
    ] = this
    
    const [x, y, z] = v
    
    return vec3(
      a00 * x + a10 * y,
      a01 * x + a11 * y,
      a02 * x + a12 * y + z
    )
  },

  // prettier-ignore
  toMat3() {
    const [
      a00 = 1, a01 = 0, a02 = 0, 
      a10 = 0, a11 = 1, a12 = 0
    ] = this

    return mat3(
      a00, a01, a02,
      a10, a11, a12,
      0,   0,   1
    )
  },
})

// prettier-ignore
export default function mat2x3(
  a00 = 1, a01 = 0, a02 = 0, 
  a10 = 0, a11 = 1, a12 = 0
) {
  return setup([
    a00, a01, a02, a10, a11, a12
  ], p, types.mat2x3) as Mat2x3
}
