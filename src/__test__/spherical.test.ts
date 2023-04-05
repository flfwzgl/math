import Speherical from '../Spherical'

const eps = 1e-6
const sqrt2 = Math.sqrt(2)
const sqrt3 = Math.sqrt(3)

// prettier-ignore
describe('spherical', () => {
  let n = 0

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 1
    spherical.theta = 0
    spherical.phi = 0

    const res = spherical.toCartesianCoord().slice()

    return expect(res).toEqual([0, 0, 1])
  })

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 1
    spherical.theta = 90
    spherical.phi = 0

    const [x, y, z] = spherical.toCartesianCoord()

    expect(x).toBeCloseTo(1, 6)
    expect(y).toBeCloseTo(0, 6)
    expect(z).toBeCloseTo(0, 6)
  })

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 1
    spherical.theta = 45
    spherical.phi = 0

    const [x, y, z] = spherical.toCartesianCoord()

    expect(x).toBeCloseTo(sqrt2 / 2, 6)
    expect(y).toBeCloseTo(0, 6)
    expect(z).toBeCloseTo(sqrt2 / 2, 6)
  })

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 1
    spherical.theta = -30
    spherical.phi = 0

    const [x, y, z] = spherical.toCartesianCoord()

    expect(x).toBeCloseTo(-.5, 6)
    expect(y).toBeCloseTo(0, 6)
    expect(z).toBeCloseTo(sqrt3 / 2, 6)
  })

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 1
    spherical.theta = -90
    spherical.phi = 0

    const [x, y, z] = spherical.toCartesianCoord()

    expect(x).toBeCloseTo(-1, 6)
    expect(y).toBeCloseTo(0, 6)
    expect(z).toBeCloseTo(0, 6)
  })

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 1
    spherical.theta = 45
    spherical.phi = 90

    const [x, y, z] = spherical.toCartesianCoord()

    expect(x).toBeCloseTo(0, 6)
    expect(y).toBeCloseTo(1, 6)
    expect(z).toBeCloseTo(0, 6)
  })

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 1
    spherical.theta = 90
    spherical.phi = 90

    const [x, y, z] = spherical.toCartesianCoord()

    expect(x).toBeCloseTo(0, 6)
    expect(y).toBeCloseTo(1, 6)
    expect(z).toBeCloseTo(0, 6)
  })

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 12
    spherical.theta = 90
    spherical.phi = 90

    const [x, y, z] = spherical.toCartesianCoord()

    expect(x).toBeCloseTo(0, 6)
    expect(y).toBeCloseTo(12, 6)
    expect(z).toBeCloseTo(0, 6)
  })

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 1
    spherical.theta = 90
    spherical.phi = 45

    const [x, y, z] = spherical.toCartesianCoord()

    expect(x).toBeCloseTo(sqrt2 / 2, 6)
    expect(y).toBeCloseTo(sqrt2 / 2, 6)
    expect(z).toBeCloseTo(0, 6)
  })

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 1
    spherical.theta = 45
    spherical.phi = 45

    const [x, y, z] = spherical.toCartesianCoord()

    expect(x).toBeCloseTo((sqrt2 / 2) ** 2, 6)
    expect(y).toBeCloseTo(sqrt2 / 2, 6)
    expect(z).toBeCloseTo((sqrt2 / 2) ** 2, 6)
  })

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 1
    spherical.theta = 45
    spherical.phi = 60

    const [x, y, z] = spherical.toCartesianCoord()

    expect(x).toBeCloseTo(sqrt2 / 2 * .5, 6)
    expect(y).toBeCloseTo(sqrt3 / 2, 6)
    expect(z).toBeCloseTo(sqrt2 / 2 * .5, 6)
  })

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 1
    spherical.theta = 60
    spherical.phi = 60

    const [x, y, z] = spherical.toCartesianCoord()

    expect(x).toBeCloseTo(sqrt3 / 2 * .5, 6)
    expect(y).toBeCloseTo(sqrt3 / 2, 6)
    expect(z).toBeCloseTo(.5  * .5, 6)
  })

  it(`${++n}`, () => {
    const spherical = new Speherical()

    spherical.radius = 1
    spherical.theta = 60
    spherical.phi = 60

    const [x, y, z] = spherical.toCartesianCoord()

    expect(x).toBeCloseTo(sqrt3 / 2 * .5, 6)
    expect(y).toBeCloseTo(sqrt3 / 2, 6)
    expect(z).toBeCloseTo(.5  * .5, 6)
  })

})
