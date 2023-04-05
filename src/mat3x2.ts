import { baseProto, setProto, MatBase, multiply3, setup, types } from './common'
import mat2x3, { Mat2x3 } from './mat2x3'
import mat3, { Mat3 } from './mat3'
import vec3, { Vec3 } from './vec3'

export interface Mat3x2 extends MatBase<Mat3x2, Vec3> {
  toMat3(): Mat3
}

const p = setProto(
  {
    // prettier-ignore
    from(
    a = 1, b = 0,
    c = 0, d = 1,
    e = 0, f = 0
  ) {
    this[0] = a
    this[1] = b
    this[2] = c
    this[3] = d
    this[4] = e
    this[5] = f
    
    return this
  },

    fromArray(m: number[]) {
      // prettier-ignore
      const [
      a, b,
      c, d,
      e, f
    ] = m

      return this.from(a, b, c, d, e, f)
    },

    clone() {
      return mat3x2(...this)
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
      this[3] = 1
      this[4] = 0
      this[5] = 0

      return this
    },

    // prettier-ignore
    transpose() {
    const [
      a00, a10,
      a01, a11,
      a02, a12
    ] = this
    
    return mat2x3(
      a00, a01, a02,
      a10, a11, a12
    )
  },

    invert() {
      // prettier-ignore
      const [
      a, b,
      c, d,
      e, f
    ] = this

      const n = a * d - b * c

      this[0] = d / n
      this[1] = -b / n
      this[2] = -c / n
      this[3] = a / n
      this[4] = (c * f - d * e) / n
      this[5] = -(a * f - b * e) / n

      return this
    },

    // prettier-ignore
    transformVec(v: Vec3) {
    const [
      a, b,
      c, d,
      e, f
    ] = this
    
    const [x, y, z] = v
    
    return vec3(
      a * x + c * y + e * z,
      b * x + d * y + f * z,
      z
    )
  },

    toMat3() {
      // prettier-ignore
      const [
      a, b,
      c, d,
      e, f
    ] = this

      // prettier-ignore
      return mat3(
      a, b, 0,
      c, d, 0,
      e, f, 1
    )
    },
  },
  baseProto
)

// prettier-ignore
export default function mat3x2(
  a = 1, b = 0,
  c = 0, d = 1,
  e = 0, f = 0
) {
  return setup([a, b, c, d, e, f], p, types.mat3x2) as Mat3x2
}
