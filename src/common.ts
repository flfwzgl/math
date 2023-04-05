import type { Mat2 } from './mat2'
import type { Mat2x3 } from './mat2x3'
import type { Mat3 } from './mat3'
import type { Mat3x2 } from './mat3x2'
import type { Mat3x4 } from './mat3x4'
import type { Mat4 } from './mat4'
import type { Mat4x3 } from './mat4x3'

export const deg2rad = Math.PI / 180
export const rad2deg = 180 / Math.PI

export const assert = (flag: boolean, msg?: string) => {
  if (!flag) {
    throw new Error(msg || 'error')
  }
}

export const setup = <T>(e: T, p: object, t: types) => {
  ;(e as any).type = t
  return setProto(e, p)
}

export const setProto = <T>(e: T, p: object) => {
  if ((e as any).__proto__) {
    ;(e as any).__proto__ = p
  } else {
    Object.setPrototypeOf(e, p)
  }

  return e
}

export const noop = ((...args: any[]) => {}) as any
export const EPSILON = 1e-6

export enum types {
  mat2,

  mat3,
  mat3x2,
  mat2x3,

  mat4,
  mat4x3,
  mat3x4,

  vec2,
  vec3,
  vec4,
}

export interface Base extends Array<number> {
  type: types
  exactEqual(v: number[]): boolean
  equal(v: number[]): boolean
  toFloat32Array(): Float32Array
}

export interface MatBase<M, V, T = M> extends Base {
  from(...args: number[]): this
  fromArray(v: M): this
  clone(): M
  identity(): this
  i(): this
  invert(): this
  transpose(): T
  append(m: M): this
  prepend(m: M): this
  transformVec(v: V): V
}

export interface VecBase<V, M = any> extends Base {
  x: number
  y: number
  len: number
  normalize(): this
  from(...args: number[]): this
  fromArray(v: V): this
  clone(): V
  dot(v: V): number
  add(v: V): this
  substract(v: V): this
  multiply(v: V): this
  divide(v: V): this
  scale(n: number): this
  distance(v: V): number
  inverse(): this
  ceil(): this
  floor(): this
  transform(m: M): V
}

export const baseProto = Object.create(Array.prototype) as Base

baseProto.toFloat32Array = function () {
  return new Float32Array(this)
}

baseProto.exactEqual = function (v: number[]) {
  return this.every((e: number, i: number) => e === v[i])
}

baseProto.equal = function (v: number[]) {
  if (!v) return false
  return this.every((e: number, i: number) => Math.abs(e - v[i]) <= EPSILON)
}
;(baseProto.push as any) =
  (baseProto.pop as any) =
  (baseProto.shift as any) =
  (baseProto.unshift as any) =
  (baseProto.reverse as any) =
  (baseProto.splice as any) =
  (baseProto.sort as any) =
    noop

// prettier-ignore
export function multiply2(
  a: Mat2,
  b: Mat2,
  dst: Mat2
) {
  const [
    a00, a01,
    a10, a11
  ] = a

  const [
    b00, b01,
    b10, b11
  ] = b

  dst[0] = a00 * b00 + a10 * b01
  dst[1] = a01 * b00 + a11 * b01
  dst[2] = a00 * b10 + a10 * b11
  dst[3] = a01 * b10 + a11 * b11

  return dst
}

// prettier-ignore
export function multiply3<T extends Mat3 | Mat3x2 | Mat2x3>(a: T, b: T, dst: T) {
  let a00, a01, a02, a10, a11, a12, a20, a21, a22
  let b00, b01, b02, b10, b11, b12, b20, b21, b22
  
  if (a.type === types.mat3x2) {
    ;[
      a00, a01,
      a10, a11,
      a20, a21
    ] = a
    
    a02 = a12 = 0
    a22 = 1
  } else {
    ;[
      a00, a01, a02,
      a10, a11, a12,
      a20 = 0, a21 = 0, a22 = 1
    ] = a
  }
  
  if (b.type === types.mat3x2) {
    ;[
      b00, b01,
      b10, b11,
      b20, b21
    ] = b
    
    b02 = b12 = 0
    b22 = 1
  } else {
    ;[
      b00, b01, b02,
      b10, b11, b12,
      b20 = 0, b21 = 0, b22 = 1
    ] = b
  }
  
  if (dst.type === types.mat3x2) {
    dst[0] = b00 * a00 + b01 * a10
    dst[1] = b00 * a01 + b01 * a11
    
    dst[2] = b10 * a00 + b11 * a10
    dst[3] = b10 * a01 + b11 * a11
    
    dst[4] = b20 * a00 + b21 * a10 + a20
    dst[5] = b20 * a01 + b21 * a11 + a21
  } else {
    dst[0] = b00 * a00 + b01 * a10 + b02 * a20
    dst[1] = b00 * a01 + b01 * a11 + b02 * a21
    dst[2] = b00 * a02 + b01 * a12 + b02 * a22

    dst[3] = b10 * a00 + b11 * a10 + b12 * a20
    dst[4] = b10 * a01 + b11 * a11 + b12 * a21
    dst[5] = b10 * a02 + b11 * a12 + b12 * a22

    if (dst.length === 9) {
      dst[6] = b20 * a00 + b21 * a10 + b22 * a20
      dst[7] = b20 * a01 + b21 * a11 + b22 * a21
      dst[8] = b20 * a02 + b21 * a12 + b22 * a22
    }
  }

  return dst
}

// col-major
// prettier-ignore
export function multiply4<T extends Mat4 | Mat4x3 | Mat3x4>(a: T, b: T, dst: T) {
  let a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33
  let b00, b01, b02, b03, b10, b11, b12, b13, b20, b21, b22, b23, b30, b31, b32, b33
  
  if (a.type === types.mat4x3) {
    ;[
      a00, a01, a02,
      a10, a11, a12,
      a20, a21, a22,
      a30, a31, a32
    ] = a
    
    a03 = a13 = a23 = 0
    a33 = 1
  } else {
    ;[
      a00, a01, a02, a03,
      a10, a11, a12, a13,
      a20, a21, a22, a23,
      a30 = 0, a31 = 0, a32 = 0, a33 = 1
    ] = a
  }
  
  if (b.type === types.mat4x3) {
    ;[
      b00, b01, b02,
      b10, b11, b12,
      b20, b21, b22,
      b30, b31, b32
    ] = b
    
    b03 = b13 = b23 = 0
    b33 = 1
  } else {
    ;[
      b00, b01, b02, b03,
      b10, b11, b12, b13,
      b20, b21, b22, b23,
      b30 = 0, b31 = 0, b32 = 0, b33 = 1
    ] = b
  }
  
  if (dst.type === types.mat4x3) {
    dst[0] = b00 * a00 + b01 * a10 + b02 * a20
    dst[1] = b00 * a01 + b01 * a11 + b02 * a21
    dst[2] = b00 * a02 + b01 * a12 + b02 * a22
    
    dst[3] = b10 * a00 + b11 * a10 + b12 * a20
    dst[4] = b10 * a01 + b11 * a11 + b12 * a21
    dst[5] = b10 * a02 + b11 * a12 + b12 * a22
    
    dst[6] = b20 * a00 + b21 * a10 + b22 * a20
    dst[7] = b20 * a01 + b21 * a11 + b22 * a21
    dst[8] = b20 * a02 + b21 * a12 + b22 * a22
    
    dst[9] = b30 * a00 + b31 * a10 + b32 * a20 + a30
    dst[10] = b30 * a01 + b31 * a11 + b32 * a21 + a31
    dst[11] = b30 * a02 + b31 * a12 + b32 * a22 + a32
  } else {
    dst[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30
    dst[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31
    dst[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32
    dst[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33

    dst[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30
    dst[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31
    dst[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32
    dst[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33

    dst[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30
    dst[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31
    dst[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32
    dst[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33

    if (dst.length === 16) {
      dst[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30
      dst[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31
      dst[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32
      dst[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
    }
  }

  return dst
}
