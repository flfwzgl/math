import { clamp, deg2rad, rad2deg } from './common'
import mat4 from './mat4'
import vec3 from './vec3'

export default class Spherical {
  private _radius: number
  private _theta: number
  private _phi: number

  constructor(radius?: number, theta?: number, phi?: number) {
    this.from(radius, theta, phi)
  }

  public get radius() {
    return this._radius
  }

  public set radius(v) {
    this._radius = v ?? 1
  }

  public get theta() {
    return this._theta
  }

  public set theta(v) {
    this._theta = v ?? 0
  }

  public get phi() {
    return this._phi
  }

  public set phi(v) {
    this._phi = clamp(v ?? 0, -90, 90)
  }

  public from(radius: number, theta: number, phi: number) {
    this.radius = radius
    this.theta = theta
    this.phi = phi
  }

  public clone() {
    const { radius, theta, phi } = this
    return new Spherical(radius, theta, phi)
  }

  public fromArray(v: number[]) {
    const [x = 0, y = 0, z = 1] = v
    return this.fromCartesianCoord(x, y, z)
  }

  public fromCartesianCoord(x: number, y: number, z: number) {
    this.radius = Math.sqrt(x * x + y * y + z * z)

    if (this.radius === 0) {
      this.theta = 0
      this.phi = 0
    } else {
      this.theta = Math.atan2(x, z) * rad2deg // z -> x 经度
      this.phi = Math.asin(clamp(y / this.radius, -1, 1)) * rad2deg // 纬度 [-90, 90]
    }

    return this
  }

  public toMat4() {
    const { radius, theta, phi } = this

    return mat4().tz(radius).rx(-phi).ry(theta)
  }

  public toCartesianCoord() {
    const { radius, theta, phi } = this
    const y = radius * Math.sin(phi * deg2rad)
    const rr = radius * Math.cos(phi * deg2rad)
    const x = rr * Math.sin(theta * deg2rad)
    const z = rr * Math.cos(theta * deg2rad)

    return vec3(x, y, z)
  }
}
