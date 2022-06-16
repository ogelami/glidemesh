import ion4LineplanPath from '/data/ion4-lineplan.json'

interface Vector3 {
  x: number,
  y: number,
  z: number
}

interface PointMapInterface {
  a?: Array<Vector3>
  b?: Array<Vector3>
  c?: Array<Vector3>
  d?: Array<Vector3>
  e?: Array<Vector3>
  k?: Array<Vector3>
  s?: Array<Vector3>
  v?: Array<Vector3>
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
  return Math.abs(glider.left.v[0]['x'] - glider.left.v[1]['x'])
}

export const gliderObject: GliderInterface = {
  left: {},
  right: {},
  pairColors: {
    a: 'red', // a
    b: 'yellow', // b
    c: 'blue', // c, if available
    d: 'black', // d, if available
    e: 'black', // e, if available
    k: 'orange', // break-lines
    s: 'green', // stabilo
    v: 'purple', // vMin
  },
}

class Glider {
  glider: GliderInterface

  constructor() {
    this.glider = gliderObject
    console.log(ion4LineplanPath)
    this.load(ion4LineplanPath)
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
      this.glider.left[pairSelect] = []
    }

    this.glider.left[pairSelect].push({x, y})

    this.mirror()
  }

  pop(pairSelect: string): void {
    this.glider.left[pairSelect].pop()

    this.mirror()
  }

  move(pairSelect: string, offset: number, x: number, y: number) {
    this.glider.left[pairSelect][offset]['x'] = x
    this.glider.left[pairSelect][offset]['y'] = y

    this.mirror()
  }

  mirror(): void {
    const rightLeftSpacing = this.getRightLeftSpacing()

    if (rightLeftSpacing === false) {
      return
    }

    const startX = this.glider.left.a[0]['x']

    this.glider.right = JSON.parse(JSON.stringify(this.glider.left))

    delete this.glider.right.v

    for (const [key, value] of Object.entries(this.glider.right)) {
      for (let i = 0; i < value.length; i++) {
        this.glider.right[key][i]['x'] =
          -this.glider.right[key][i]['x'] +
          startX * 2 +
          (rightLeftSpacing as number)
      }
    }
  }

  getRightLeftSpacing(): number | boolean {
    if (!('v' in this.glider.left) || this.glider.left.v.length !== 2) {
      return false
    }

    return Math.abs(this.glider.left.v[0]['x'] - this.glider.left.v[1]['x'])
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

    const a0XMin = data.left.a[0]['x']
    const a0YMin = data.left.a[0]['y']

    this.glider.left = data.left
    this.glider.pairColors = data.pairColors

    this.push('v', a0XMin, a0YMin - 60)
    this.push('v', a0XMin + data.getRightLeftSpacing, a0YMin - 60)
  }
}

export const glider = new Glider()
