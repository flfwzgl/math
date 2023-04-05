import mat4 from './mat4'
import { Vec3 } from './vec3'

export const lookAt = (camera: Vec3, target: Vec3, up: Vec3) => {
  const Z = camera.clone().substract(target).normalize()
  const X = up.clone().cross(Z).normalize()
  const Y = Z.clone().cross(X).normalize()
  const C = camera

  // prettier-ignore
  return mat4(
    X.x, X.y, X.z, 0,
    Y.x, Y.y, Y.z, 0,
    Z.x, Z.y, Z.z, 0,
    C.x, C.y, C.z, 1
  )
}

export const perspective = (
  fov: number,
  aspect: number,
  n: number,
  f: number
) => {
  const tan = Math.tan(fov / 2)
  const range = n - f

  // prettier-ignore
  return mat4(
    1 / tan / aspect , 0, 0, 0,
    0, 1 / tan, 0, 0,
    0, 0, (n + f) / range, -1,
    0, 0, 2 * n * f / range, 0
  )
}

export const orthographic = (
  l: number,
  r: number,
  b: number,
  t: number,
  n: number,
  f: number
) => {
  // prettier-ignore
  return mat4(
    2 / (r - l), 0, 0, 0,
    0, 2 / (t - b), 0, 0,
    0, 0, 2 / (n - f), 0,
    (l + r) / (l - r), (b + t) / (b - t), (n + f) / (n - f), 1
  )
}
