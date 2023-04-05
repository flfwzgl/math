import { baseProto, setProto, setup, types, VecBase } from './common'
import { Mat4 } from './mat4'
import vec2, { Vec2 } from './vec2'
import vec3, { Vec3 } from './vec3'

export interface Vec4 extends VecBase<Vec4, Mat4> {
  z: number
  w: number
  toVec2(): Vec2
  toVec3(): Vec3
  divideByW(): this
}

const p = setProto(
  {
    get x() {
      return this[0]
    },

    set x(n: number) {
      this[0] = n
    },

    get y() {
      return this[1]
    },

    set y(n: number) {
      this[1] = n
    },

    get z() {
      return this[2]
    },

    set z(n: number) {
      this[2] = n
    },

    get w() {
      return this[3]
    },

    set w(n: number) {
      this[3] = n
    },

    get len() {
      const [x, y, z, w] = this
      return Math.hypot(x, y, z, w)
    },

    from(x: number, y: number, z = 0, w = 1) {
      this[0] = x
      this[1] = y
      this[2] = z
      this[3] = w
      return this
    },

    fromArray(v: Vec4) {
      const [x, y, z, w] = v
      return this.from(x, y, z, w)
    },

    clone() {
      const [x, y, z, w] = this
      return vec4(x, y, z, w)
    },

    dot(v: Vec4) {
      const [x, y, z, w] = v
      return this[0] * x + this[1] * y + this[2] * z + this[3] * w
    },

    normalize() {
      const l = this.len
      this[0] /= l
      this[1] /= l
      this[2] /= l
      this[3] /= l

      return this
    },

    add(v: Vec4) {
      const [x, y, z, w] = v
      this[0] += x
      this[1] += y
      this[2] += z
      this[3] += w
      return this
    },

    substract(v: Vec4) {
      const [x, y, z, w] = v
      this[0] -= x
      this[1] -= y
      this[2] -= z
      this[3] -= w
      return this
    },

    multiply(v: Vec4) {
      const [x, y, z, w] = v
      this[0] *= x
      this[1] *= y
      this[2] *= z
      this[3] *= w
      return this
    },

    divide(v: Vec4) {
      const [x, y, z, w] = v
      this[0] /= x
      this[1] /= y
      this[2] /= z
      this[3] /= w
      return this
    },

    scale(n: number) {
      this[0] *= n
      this[1] *= n
      this[2] *= n
      this[3] *= n
      return this
    },

    distance(v: Vec4) {
      return this.substract(v).len
    },

    inverse() {
      const [x, y, z, w] = this
      this[0] = 1 / x
      this[1] = 1 / y
      this[2] = 1 / z
      this[3] = 1 / w
      return this
    },

    ceil() {
      this[0] = Math.ceil(this[0])
      this[1] = Math.ceil(this[1])
      this[2] = Math.ceil(this[2])
      this[3] = Math.ceil(this[3])
      return this
    },

    floor() {
      this[0] = Math.floor(this[0])
      this[1] = Math.floor(this[1])
      this[2] = Math.floor(this[2])
      this[3] = Math.floor(this[3])
      return this
    },

    toVec2() {
      const [x, y] = this
      return vec2(x, y)
    },

    toVec3() {
      const [x, y, z] = this
      return vec3(x, y, z)
    },

    divideByW() {
      const w = this[3]
      this[0] /= w
      this[1] /= w
      this[2] /= w
      this[3] = 1
      return this
    },

    // prettier-ignore
    transform(m: Mat4) {
      const [
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33
      ] = m

      const [x, y, z, w] = this
      
      this[0] = a00 * x + a10 * y + a20 * z + a30 * w
      this[1] = a01 * x + a11 * y + a21 * z + a31 * w
      this[2] = a02 * x + a12 * y + a22 * z + a32 * w
      this[3] = a03 * x + a13 * y + a23 * z + a33 * w

      return this
    },
  },
  baseProto
)

export default function vec4(x = 0, y = 0, z = 0, w = 1) {
  return setup([x, y, z, w], p, types.vec4) as Vec4
}
