import mat4 from './mat4'
import { Vec3 } from './vec3'

// prettier-ignore
export const lookAt = (c: Vec3, t: Vec3, up: Vec3) => {
  const z = c.clone().substract(t).normalize()
  const x = up.clone().cross(z).normalize()
  const y = z.clone().cross(x).normalize()

  return mat4(
    x[0], x[1], x[2], 0,
    y[0], y[1], y[2], 0,
    z[0], z[1], z[2], 0,
    c[0], c[1], c[2], 1
  )
}

// prettier-ignore
export const perspective = (fov: number, aspect: number, n: number, f: number) => {
  const tan = Math.tan(fov / 2)
  const range = n - f

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
