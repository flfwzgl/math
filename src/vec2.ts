import { setProto, VecBase, baseProto, types, setup } from './common'
import { Mat2 } from './mat2'
import vec3, { Vec3 } from './vec3'
import vec4, { Vec4 } from './vec4'

export interface Vec2 extends VecBase<Vec2, Mat2> {
  cross(v: Vec2): number
  toVec3(): Vec3
  toVec4(): Vec4
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

    get len() {
      const [x, y] = this
      return Math.hypot(x, y)
    },

    from(x: number, y: number) {
      this[0] = x
      this[1] = y
      return this
    },

    fromArray(v: Vec2) {
      const [x, y] = v
      return this.from(x, y)
    },

    clone() {
      const [x, y] = this
      return vec2(x, y)
    },

    dot(v: Vec2) {
      const [x, y] = v
      return this[0] * x + this[1] * y
    },

    normalize() {
      const l = this.len
      this[0] /= l
      this[1] /= l

      return this
    },

    cross(v: Vec2) {
      const [x, y] = v
      return this[0] * y - this[1] * x
    },

    add(v: Vec2) {
      const [x, y] = v
      this[0] += x
      this[1] += y
      return this
    },

    substract(v: Vec2) {
      const [x, y] = v
      this[0] -= x
      this[1] -= y
      return this
    },

    multiply(v: Vec2) {
      const [x, y] = v
      this[0] *= x
      this[1] *= y
      return this
    },

    divide(v: Vec2) {
      const [x, y] = v
      this[0] /= x
      this[1] /= y
      return this
    },

    scale(n: number) {
      this[0] *= n
      this[1] *= n
      return this
    },

    distance(v: Vec2) {
      return this.substract(v).len
    },

    inverse() {
      const [x, y] = this
      this[0] = 1 / x
      this[1] = 1 / y
      return this
    },

    ceil() {
      this[0] = Math.ceil(this[0])
      this[1] = Math.ceil(this[1])
      return this
    },

    floor() {
      this[0] = Math.floor(this[0])
      this[1] = Math.floor(this[1])
      return this
    },

    transform(m: Mat2) {
      const [a, b, c, d] = m
      const [x, y] = this

      this[0] = a * x + c * y
      this[1] = b * x + d * y
      return this
    },

    toVec3() {
      const [x, y] = this
      return vec3(x, y, 0)
    },

    toVec4() {
      const [x, y] = this
      return vec4(x, y, 0, 1)
    },
  },
  baseProto
)

export default function vec2(x = 0, y = 0) {
  return setup([x, y], p, types.vec2) as Vec2
}
