import { baseProto, setProto, setup, types, VecBase } from './common'
import { Mat3 } from './mat3'
import { Mat3x2 } from './mat3x2'
import { Mat4 } from './mat4'
import vec2, { Vec2 } from './vec2'
import vec4, { Vec4 } from './vec4'

export interface Vec3 extends VecBase<Vec3, Mat3 | Mat4> {
  z: number
  cross(v: Vec3): Vec3
  toVec2(): Vec2
  toVec4(): Vec4
  readonly length: 3
}

const p = setProto(
  {
    get x() {
      return this[0]
    },

    set x(v: number) {
      this[0] = v
    },

    get y() {
      return this[1]
    },

    set y(v: number) {
      this[1] = v
    },

    get z() {
      return this[2]
    },

    set z(v: number) {
      this[2] = v
    },

    get len() {
      const [x, y, z] = this
      return Math.hypot(x, y, z)
    },

    from(x: number, y: number, z: number) {
      this[0] = x
      this[1] = y
      this[2] = z
      return this
    },

    fromArray(v: Vec3) {
      const [x, y, z] = v
      return this.from(x, y, z)
    },

    clone() {
      const [x, y, z] = this
      return vec3(x, y, z)
    },

    dot(v: Vec3) {
      const [x, y, z] = v
      return this[0] * x + this[1] * y + this[2] * z
    },

    cross(v: Vec3) {
      const [a, b, c] = this
      const [x, y, z] = v

      this[0] = b * z - c * y
      this[1] = c * x - a * z
      this[2] = a * y - b * x

      return this
    },

    normalize() {
      const l = this.len
      this[0] /= l
      this[1] /= l
      this[2] /= l

      return this
    },

    add(v: Vec3) {
      const [x, y, z] = v
      this[0] += x
      this[1] += y
      this[2] += z
      return this
    },

    substract(v: Vec3) {
      const [x, y, z] = v
      this[0] -= x
      this[1] -= y
      this[2] -= z
      return this
    },

    multiply(v: Vec3) {
      const [x, y, z] = v
      this[0] *= x
      this[1] *= y
      this[2] *= z
      return this
    },

    divide(v: Vec3) {
      const [x, y, z] = v
      this[0] /= x
      this[1] /= y
      this[2] /= z
      return this
    },

    scale(n: number) {
      this[0] *= n
      this[1] *= n
      this[2] *= n
      return this
    },

    distance(v: Vec3) {
      return this.clone().substract(v).len
    },

    inverse() {
      const [x, y, z] = this
      this[0] = 1 / x
      this[1] = 1 / y
      this[2] = 1 / z
      return this
    },

    ceil() {
      this[0] = Math.ceil(this[0])
      this[1] = Math.ceil(this[1])
      this[2] = Math.ceil(this[2])
      return this
    },

    floor() {
      this[0] = Math.floor(this[0])
      this[1] = Math.floor(this[1])
      this[2] = Math.floor(this[2])
      return this
    },

    toVec2() {
      const [x, y] = this
      return vec2(x, y)
    },

    toVec4(w = 1) {
      const [x, y, z] = this
      return vec4(x, y, z, w)
    },

    // prettier-ignore
    transform(m: Mat3 | Mat4) {
      if (m.type === types.mat4) m = (m as Mat4).toMat3()
      m = m as Mat3
      
      const [
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22
      ] = m

      const [x, y, z] = this
      
      this[0] = a00 * x + a10 * y + a20 * z
      this[1] = a01 * x + a11 * y + a21 * z
      this[2] = a02 * x + a12 * y + a22 * z

      return this
    },
  },
  baseProto
)

export default function vec3(x = 0, y = 0, z = 0) {
  return setup([x, y, z], p, types.vec3) as Vec3
}
