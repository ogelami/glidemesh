interface PointMapInterface {
  a?: Array<number>
  b?: Array<number>
  c?: Array<number>
  d?: Array<number>
  e?: Array<number>
  k?: Array<number>
  s?: Array<number>
  v?: Array<number>
}

interface PairColorsInterface {
  a: string
  b: string
  c?: string
  d?: string
  e?: string
  k?: string
  s?: string
  v?: string
}

interface GliderInterface {
  left: PointMapInterface
  right: PointMapInterface
  pairColors: PairColorsInterface
}

export const getRightLeftSpacing = (glider: GliderInterface): number => {
  return Math.abs(glider.left.v[0][0] - glider.left.v[1][0])
}

export const gliderObject: GliderInterface = {
  left: {},
  right: {},
  pairColors: {
    a: "red", // a
    b: "yellow", // b
    c: "blue", // c, if available
    d: "black", // d, if available
    e: "black", // e, if available
    k: "orange", // break-lines
    s: "green", // stabilo
    v: "purple", // vMin
  },
}

class Glider {
  glider: GliderInterface

  constructor() {
    this.glider = gliderObject
  }

  set left(pointMap) {
    this.glider.left = pointMap
  }

  get left() {
    return this.glider.left
  }

  set pairColors(pairColors) {
    this.glider.pairColors = pairColors
  }

  get pairColors() {
    return this.glider.pairColors
  }

  get right() {
    return this.glider.right
  }

  push(pairSelect: string, x: number, y: number): void {
    if (!(pairSelect in this.glider.left)) {
      glider.left[pairSelect] = []
    }

    this.glider.left[pairSelect].push([x, y])

    this.mirror()
  }

  pop(pairSelect: string): void {
    this.glider.left[pairSelect].pop()

    this.mirror()
  }

  move(pairSelect: string, offset: number, x: number, y: number) {
    this.glider.left[pairSelect][offset][0] = x
    this.glider.left[pairSelect][offset][1] = y

    this.mirror()
  }

  mirror(): void {
    const rightLeftSpacing = this.getRightLeftSpacing()

    if (rightLeftSpacing === false) {
      return
    }

    const startX = this.glider.left.a[0][0]

    this.glider.right = JSON.parse(JSON.stringify(this.glider.left))

    delete this.glider.right.v

    for (const [key, value] of Object.entries(this.glider.right)) {
      for (let i = 0; i < value.length; i++) {
        this.glider.right[key][i][0] =
          -this.glider.right[key][i][0] +
          startX * 2 +
          (rightLeftSpacing as number)
      }
    }
  }

  getRightLeftSpacing(): number | boolean {
    if (!("v" in this.glider.left) || this.glider.left.v.length !== 2) {
      return false
    }

    return Math.abs(this.glider.left.v[0][0] - this.glider.left.v[1][0])
  }

  clone(wing: PointMapInterface) {
    return JSON.parse(JSON.stringify(wing))
  }

  getData() {
    const rightLeftSpacing = this.getRightLeftSpacing()
    const cloneLeft = this.clone(this.glider.left)

    if (rightLeftSpacing === false) {
      return false
    }

    delete cloneLeft.v

    const data = {
      getRightLeftSpacing: this.getRightLeftSpacing(),
      pairColors: this.glider.pairColors,
      left: cloneLeft,
    }

    console.log(data)

    return data
  }

  load(data) {
    this.glider.left = data.left
    this.glider.pairColors = data.pairColors

    const a0XMin = data.left.a[0][0]
    const a0YMin = data.left.a[0][1]

    this.glider.left = data.left
    this.glider.pairColors = data.pairColors

    this.push("v", a0XMin, a0YMin - 60)
    this.push("v", a0XMin + data.getRightLeftSpacing, a0YMin - 60)
  }
}

export const glider = new Glider()
